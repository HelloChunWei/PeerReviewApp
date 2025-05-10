import { getReviewFile } from '@/utils/file'
import { mathPathRegx } from '@/utils/regax'
import { Review } from './types'

export const generateReviewMapByname = async(needReviewList: string[]) =>{ 
    const reviewMap: Record<string, Review[]> = {}
    for (let i =0 ; i < needReviewList.length; i++) {
        const fileName = needReviewList[i]
        const content = await getReviewFile(fileName)
        const match = fileName.match(mathPathRegx)
        if (match) {
          const name = match[2]
          const date = match[1]
          if (!reviewMap[name]) reviewMap[name] = []
          reviewMap[name].push({
            date,
            content
          })
        }
    }
    return reviewMap
}

export const generateReviewPrompt = async (name: string, reviewContents: Review[]) => {
    const reviewsText = reviewContents
        .map(review => `Date: ${review.date}\nContent:\n${review.content}\n---\n`)
        .join('');

    return `Based on the following work logs for ${name}, please provide a comprehensive quarterly review. For each category, provide a rating and detailed explanation with specific examples from the work logs:

1. Working Frequency
Rate how closely you worked with ${name} this quarter:
- Never
- Almost never
- Sometimes
- Frequently
- Daily

2. Core Competencies (Rate each as: Unsatisfactory/Improvement needed/Meets expectations/Exceeds expectations/Truly exceptional/Not Applicable)

Work Quality:
- Accuracy and thoroughness
- Productivity and competence
- Detailed explanation required

Problem Solving:
- Reasoning and analysis capabilities
- Solution identification
- Willingness to tackle problems
- Acceptance of new responsibilities

Work Independence and Autonomy:
- Quality of work with minimal guidance
- Self-sufficiency in delivery
- Independence from management oversight

Attitude:
- Respect for others
- Initiative taking
- Handling mistakes and criticism
- Active listening

Leadership:
- Emerging leadership skills
- Project leadership
- Proactiveness
- Personal ownership of results

Teamwork:
- Collaboration within and across teams
- Relationship maintenance with colleagues

Communication:
- Clarity and timeliness
- Transparency in work progress
- Information sharing with team members

Engagement:
- Participation in discussions
- Solution proposal
- Constructive disagreement when needed

Company Goals:
- Contribution to annual company objectives
- Alignment with organizational aims

Security:
- Adherence to Information Security Policy
- Security practice implementation
- Computer locking when away from desk

Professional Etiquette:
- Meeting punctuality
- Compliance with company policies
- Professional conduct

3. Managerial Assessment (if applicable)
For each item, rate as: Unsatisfactory/Improvement needed/Meets expectations/Exceeds expectations/Truly exceptional/Not Applicable

Mentoring:
- Support and guidance for junior team members

Management Skills:
- Career growth promotion
- Challenge assignment
- Mentoring of other leads
- Effective delegation

Team Culture:
- Fostering positive environment
- Supporting collaboration

Industry Visibility:
- Conference participation
- Public speaking
- Blog post writing
- Meetup hosting

Vision Communication:
- Company vision understanding and explanation
- Strategic direction setting
- Goal alignment
- Operating Principles promotion

4. Strengths and Continuity
Provide specific examples of:
- Notable achievements this quarter
- Successful projects
- Positive behaviors to continue
- Areas of excellence

5. Areas for Improvement
Specify which areas need development (select and explain):
A. Communication
B. Work quality
C. Teamwork
D. Proactiveness
E. Accountability
F. Attention to detail
G. Other

6. Additional Comments
Provide any other relevant feedback or suggestions for ${name}'s development.

Work logs for review:

${reviewsText}`;
}