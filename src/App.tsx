import React, { useEffect } from 'react'
import AppIndex from '@/pages/index'
import { getSaveFilePath } from '@/utils/file'

getSaveFilePath()

function App() {
    useEffect(() => {
        let ignore = false
        // TODO: check if have saveFilePath, if not redirect to first_page. if yes redirect to index page

        getSaveFilePath().then((path) => {
            if (ignore) return
            console.log(path)
        })
        return () => {
            ignore = true
        }
    }, [])
    return <AppIndex />
}

export default App
