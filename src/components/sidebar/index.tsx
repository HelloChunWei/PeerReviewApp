import React, { useState } from 'react'
import { Home, Inbox, CirclePlus } from 'lucide-react'
import { Link } from 'react-router'
import TestDialog from '@/components/dialogs/TestDialog'
import useDialog from '@/hooks/useDialog'

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

// Menu items.
const items = [
    {
        title: 'Inbox',
        url: '/',
        icon: Inbox,
    },
    {
        title: 'Home',
        url: '/home',
        icon: Home,
    },
]

export function AppSidebar() {
    const { openDialog, closeDialog } = useDialog()

    const onClick = () => {
        openDialog(TestDialog)
        setTimeout(() => {
            closeDialog()
        }, 3000)
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
                                    <span>Add new review</span>
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
                </SidebarGroup>
            </SidebarContent>
        </Sidebar>
    )
}
