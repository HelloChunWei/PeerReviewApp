import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import Home from '@/pages/home'
import Welcome from '@/pages/welcome'
import { BrowserRouter, Routes, Route } from 'react-router'
import Layout from './layout'
import './App.css'
import { Toaster } from '@/components/ui/toaster'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <React.StrictMode>
        <BrowserRouter>
            <Routes>
                <Route element={<Layout />}>
                    <Route index element={<App />} />
                    <Route path="home" element={<Home />} />
                    <Route path="welcome" element={<Welcome />} />
                </Route>
            </Routes>
        </BrowserRouter>
        <Toaster />
    </React.StrictMode>
)
