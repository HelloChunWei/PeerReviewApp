import React from 'react'
import { Home, CirclePlus, ChevronDown } from 'lucide-react'
import { Link } from 'react-router'
import AddReviewDialog from '@/components/dialogs/AddReviewDialog'
import useDialog from '@/hooks/use-dialog'

import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from '@/components/ui/sidebar'
import {
    Collapsible,
    CollapsibleTrigger,
    CollapsibleContent,
} from '@/components/ui/collapsible'
import { useCenterStore } from '@/store'
import WorkLogList from './WorkLogList'

// Menu items.
const items = [
    {
        title: 'Home',
        url: '/',
        icon: Home,
    },
]

export function AppSidebar() {
    const { openDialog } = useDialog()
    const getReviewMapByName = useCenterStore(
        (state) => state.getReviewMapByName
    )

    const onClick = () => {
        openDialog(AddReviewDialog)
    }
    return (
        <Sidebar>
            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupLabel>Peer Review</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            <SidebarMenuItem>
                                <SidebarMenuButton onClick={onClick}>
                                    <CirclePlus />
                                    <span>Add new work log</span>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        </SidebarMenu>
                        <SidebarMenu>
                            {items.map((item) => (
                                <SidebarMenuItem key={item.title}>
                                    <SidebarMenuButton asChild>
                                        <Link to={item.url}>
                                            <item.icon />
                                            <span>{item.title}</span>
                                        </Link>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                    {/* display work log list group by name */}
                    <WorkLogList />
                </SidebarGroup>
            </SidebarContent>
        </Sidebar>
    )
}
