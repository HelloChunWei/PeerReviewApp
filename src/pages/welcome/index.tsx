import React from 'react'
import FolderSvg from '@/assets/folder.svg'
import { open } from '@tauri-apps/plugin-dialog'

export default function Home() {
    const openFileDialog = async () => {
        console.log('click')
        const file = await open({
            multiple: false,
            directory: true,
        })
        console.log(file)
    }
    return (
        <main className="min-h-svh flex w-full justify-center items-center flex-col">
            <h1 className="font-bold text-2xl">
                Please select you folder to save your review{' '}
            </h1>
            <img
                className="w-[200px] cursor-pointer"
                src={FolderSvg}
                onClick={openFileDialog}
            />
        </main>
    )
}
