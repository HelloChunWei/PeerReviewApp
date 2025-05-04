import React from 'react'
import { SidebarTrigger } from '@/components/ui/sidebar'
import { useParams } from 'react-router'

export default function Colleague() {
    const { key } = useParams()
    return (
        <main>
            <SidebarTrigger />
            <h1>{key}</h1>
        </main>
    )
}
