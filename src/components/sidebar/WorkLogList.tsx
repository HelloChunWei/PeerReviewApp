import React, { useMemo } from 'react'
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
import { mathPathRegx } from '@/utils/regax'
import { ChevronDown, Calendar } from 'lucide-react'
import { useNavigate, useHistory } from 'react-router'

export default function WorkLogList() {
    const navigate = useNavigate()
    const reviewResult = useCenterStore((state) => state.reviewResult)

    const reviewMap = useMemo(() => {
        const reviewMap: Record<string, string[]> = {}
        for (let i = 0; i < reviewResult.length; i++) {
            const fileName = reviewResult[i]
            const match = fileName.match(mathPathRegx)
            if (match) {
                const name = match[2]
                const date = match[1]
                if (!reviewMap[name]) reviewMap[name] = []
                reviewMap[name].push(date)
            }
        }
        return reviewMap
    }, [reviewResult])

    const goToWorkLog = (date: string, name: string) => {
        const key = `${date}_${name}`
        navigate(`/colleague/${key}`, { replace: false })
    }

    return (
        <Collapsible defaultOpen className="group/collapsible-outer">
            <SidebarGroup>
                <SidebarGroupLabel asChild>
                    <CollapsibleTrigger>
                        Your work log
                        <ChevronDown className="ml-auto transition-transform group-data-[state=open]/collapsible-outer:rotate-180" />
                    </CollapsibleTrigger>
                </SidebarGroupLabel>
                {Object.keys(reviewMap).map((name) => {
                    return (
                        <CollapsibleContent key={name}>
                            <Collapsible
                                defaultOpen
                                className="group/collapsible-inner"
                            >
                                <SidebarGroup>
                                    <SidebarGroupLabel asChild>
                                        <CollapsibleTrigger>
                                            {name}
                                            <ChevronDown className="ml-auto transition-transform group-data-[state=open]/collapsible-inner:rotate-180" />
                                        </CollapsibleTrigger>
                                    </SidebarGroupLabel>
                                    {reviewMap[name].map((date) => {
                                        return (
                                            <CollapsibleContent
                                                key={`${date}_${name}`}
                                            >
                                                <SidebarGroupContent>
                                                    <SidebarMenu>
                                                        <SidebarMenuItem>
                                                            <SidebarMenuButton
                                                                onClick={() => {
                                                                    goToWorkLog(
                                                                        date,
                                                                        name
                                                                    )
                                                                }}
                                                            >
                                                                <Calendar />
                                                                <span>
                                                                    {date}
                                                                </span>
                                                            </SidebarMenuButton>
                                                        </SidebarMenuItem>
                                                    </SidebarMenu>
                                                </SidebarGroupContent>
                                            </CollapsibleContent>
                                        )
                                    })}
                                </SidebarGroup>
                            </Collapsible>
                        </CollapsibleContent>
                    )
                })}
            </SidebarGroup>
        </Collapsible>
    )
}
