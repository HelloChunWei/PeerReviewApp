import React, { useEffect } from 'react'
import { useNavigate } from 'react-router'
import { getSaveFilePath } from '@/utils/file'
import { getAllReviewFile, getAllPeerReviewFile } from '@/utils/file'
import { useCenterStore } from '@/store'
import AppIndex from './pages/home'

function App() {
    const navigate = useNavigate()
    const setReviewResult = useCenterStore((state) => state.setReviewResult)
    const setAllPeerReview = useCenterStore((state) => state.setAllPeerReview)

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
        getAllPeerReviewFile().then((result) => {
            setAllPeerReview(result)
        })
        return () => {
            ignore = true
        }
    }, [])

    return <AppIndex />
}

export default App
