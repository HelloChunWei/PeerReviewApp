import React, { useEffect } from 'react'
import { useNavigate } from 'react-router'
import { getSaveFilePath } from '@/utils/file'
import { getAllReviewFile } from '@/utils/file'
import { useCenterStore } from '@/store'
import AppIndex from './pages/home'

function App() {
    const navigate = useNavigate()
    const setReviewResult = useCenterStore((state) => state.setReviewResult)

    useEffect(() => {
        let ignore = false
        getSaveFilePath().then((path) => {
            if (ignore) return
            if (!path) {
                return navigate('/welcome')
            }
        })
        getAllReviewFile().then((result) => {
            setReviewResult(result)
        })
        return () => {
            ignore = true
        }
    }, [])

    return <AppIndex />
}

export default App
