import React from 'react'
import { SidebarTrigger } from '@/components/ui/sidebar'
import { useCenterStore } from '@/store'

export default function Home() {
    const path = useCenterStore((state) => state.path)
    return (
        <main>
            {path ? <SidebarTrigger /> : <></>}
            <h1>Welcome </h1>
        </main>
    )
}
