import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import Colleague from '@/pages/colleague'
import Welcome from '@/pages/welcome'
import { BrowserRouter, Routes, Route } from 'react-router'
import Layout from './layout'
import './App.css'
import { Toaster } from '@/components/ui/toaster'
import PeerReview from '@/pages/peerReview/'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <React.StrictMode>
        <BrowserRouter>
            <Routes>
                <Route element={<Layout />}>
                    <Route index element={<App />} />
                    <Route path="welcome" element={<Welcome />} />
                    <Route path="colleague/:key" element={<Colleague />} />
                    <Route path="peerReview/:key" element={<PeerReview />} />
                </Route>
            </Routes>
            <Toaster />
        </BrowserRouter>
    </React.StrictMode>
)
