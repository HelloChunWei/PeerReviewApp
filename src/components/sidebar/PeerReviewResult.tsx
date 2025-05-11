import { useMemo } from 'react'
import {
    Collapsible,
    CollapsibleTrigger,
    CollapsibleContent,
} from '@/components/ui/collapsible'
import { useCenterStore } from '@/store'
import {
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from '@/components/ui/sidebar'
import { ChevronDown, User } from 'lucide-react'
import { useNavigate } from 'react-router'

export default function PeerReviewResult() {
    const navigate = useNavigate()
    const allPeerReviewResult = useCenterStore(
        (state) => state.allPeerReviewResult
    )

    const peerReviewMap = useMemo(() => {
        const reviewMap: Record<string, string[]> = {}
        for (let i = 0; i < allPeerReviewResult.length; i++) {
            const fileName = allPeerReviewResult[i]
            const match = fileName.split('_')
            if (match) {
                const quarter = match[0]
                const name = match[1].split('.md')[0]
                if (!reviewMap[quarter]) reviewMap[quarter] = []
                reviewMap[quarter].push(name)
            }
        }
        return reviewMap
    }, [allPeerReviewResult])

    const goToPeerReview = (date: string, name: string) => {
        const key = `${date}_${name}`
        navigate(`/peerReview/${key}`, { replace: false })
    }

    return (
        <>
            {allPeerReviewResult.length > 0 ? (
                <Collapsible className="group/collapsible-outer">
                    <SidebarGroup>
                        <SidebarGroupLabel asChild>
                            <CollapsibleTrigger>
                                your peer review result
                                <ChevronDown className="ml-auto transition-transform group-data-[state=open]/collapsible-outer:rotate-180" />
                            </CollapsibleTrigger>
                        </SidebarGroupLabel>
                        {Object.keys(peerReviewMap).map((quarter) => {
                            return (
                                <CollapsibleContent key={quarter}>
                                    <Collapsible
                                        defaultOpen
                                        className="group/collapsible-inner"
                                    >
                                        <SidebarGroup>
                                            <SidebarGroupLabel asChild>
                                                <CollapsibleTrigger>
                                                    {quarter}
                                                    <ChevronDown className="ml-auto transition-transform group-data-[state=open]/collapsible-inner:rotate-180" />
                                                </CollapsibleTrigger>
                                            </SidebarGroupLabel>
                                            {peerReviewMap[quarter].map(
                                                (name) => {
                                                    return (
                                                        <CollapsibleContent
                                                            key={`${quarter}_${name}`}
                                                        >
                                                            <SidebarGroupContent>
                                                                <SidebarMenu>
                                                                    <SidebarMenuItem>
                                                                        <SidebarMenuButton
                                                                            onClick={() => {
                                                                                goToPeerReview(
                                                                                    quarter,
                                                                                    name
                                                                                )
                                                                            }}
                                                                        >
                                                                            <User />
                                                                            <span>
                                                                                {
                                                                                    name
                                                                                }
                                                                            </span>
                                                                        </SidebarMenuButton>
                                                                    </SidebarMenuItem>
                                                                </SidebarMenu>
                                                            </SidebarGroupContent>
                                                        </CollapsibleContent>
                                                    )
                                                }
                                            )}
                                        </SidebarGroup>
                                    </Collapsible>
                                </CollapsibleContent>
                            )
                        })}
                    </SidebarGroup>
                </Collapsible>
            ) : null}
        </>
    )
}
