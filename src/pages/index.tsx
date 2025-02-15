import React, { useState } from 'react'
import Layout from '@/layout/'
import { SidebarTrigger } from '@/components/ui/sidebar'

function App() {
    return (
        <Layout>
            <main className="min-h-svh flex flex-1">
                <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
                    <SidebarTrigger />
                    <div className="grid auto-rows-min gap-4 md:grid-cols-3">
                        <div className="aspect-video rounded-xl bg-muted/50"></div>
                        <div className="aspect-video rounded-xl bg-muted/50"></div>
                        <div className="aspect-video rounded-xl bg-muted/50"></div>
                    </div>
                </div>
            </main>
        </Layout>
    )
}

export default App
