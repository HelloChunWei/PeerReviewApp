import React from 'react'
import FolderSvg from '@/assets/folder.svg'

export default function Home() {
    return (
        <main className="min-h-svh flex w-full justify-center items-center flex-col">
            <h1 className="font-bold text-2xl">
                Please select you folder to save your review{' '}
            </h1>
            <img className="w-[200px] cursor-pointer" src={FolderSvg} />
        </main>
    )
}
