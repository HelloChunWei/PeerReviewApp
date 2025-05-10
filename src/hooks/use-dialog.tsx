import React, { useState } from 'react'
import { createRoot, Root } from 'react-dom/client'

type ChildrenProp = React.ComponentType<{
    isOpen: boolean
    close: () => void
}>

const dialogState: {
    root: null | Root
    close: null | (() => void)
} = {
    root: null,
    close: null,
}

const DialogApp = (props: { children: ChildrenProp }) => {
    const [isOpen, setIsOpen] = useState(true)

    const handleClose = () => {
        setIsOpen(false)
        setTimeout(() => {
            dialogState.root?.unmount()
            dialogState.root = null
            dialogState.close = null
        }, 300)
    }

    dialogState.close = handleClose

    return <div>{<props.children isOpen={isOpen} close={handleClose} />}</div>
}

export default function useDialog() {
    const openDialog = (Dialog: ChildrenProp) => {
        const dialogRoot = document.getElementById('dialog')!
        dialogState.root = createRoot(dialogRoot)
        dialogState.root.render(<DialogApp>{Dialog}</DialogApp>)
    }

    const closeDialog = () => {
        dialogState.close?.()
    }

    return {
        openDialog,
        closeDialog,
    }
}
