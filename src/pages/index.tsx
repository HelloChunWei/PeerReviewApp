import React, { useEffect } from 'react'
import { SidebarTrigger } from '@/components/ui/sidebar'
import { useNavigate } from 'react-router'
import { getSaveFilePath } from '@/utils/file'

function App() {
    const navigate = useNavigate()
    useEffect(() => {
        let ignore = false
        // TODO: check if have saveFilePath, if not redirect to first_page. if yes redirect to index page

        getSaveFilePath().then((path) => {
            if (ignore) return
            if (!path) {
                console.log('here')
                return navigate('/welcome')
            }
        })
        return () => {
            ignore = true
        }
    }, [])
    return (
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
    )
}

export default App
