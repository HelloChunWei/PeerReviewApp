import React from 'react'
import FolderSvg from '@/assets/folder.svg'
import { open } from '@tauri-apps/plugin-dialog'
import { savePath } from '@/utils/file'
import { useCenterStore } from '@/store'
import { useNavigate } from 'react-router'
import { toast } from 'sonner'
import { Toaster } from '@/components/ui/sonner'

export default function Home() {
    const setSavePath = useCenterStore((state) => state.setSavePath)
    const navigate = useNavigate()

    const openFileDialog = async () => {
        try {
            const file = await open({
                multiple: false,
                directory: true,
            })
            if (!file) return
            await savePath(file)
            setSavePath(file)
            navigate('/')
        } catch (e) {
            toast('something went wrong')
        }
    }
    return (
        <main className="min-h-svh flex w-full justify-center items-center flex-col">
            <h1 className="font-bold text-2xl">
                Please select you folder to save your review
            </h1>
            <img
                className="w-[200px] cursor-pointer"
                src={FolderSvg}
                onClick={openFileDialog}
            />
            <Toaster />
        </main>
    )
}
