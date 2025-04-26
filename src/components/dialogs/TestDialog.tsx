import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

interface TestDialogProps {
    isOpen: boolean
    close: () => void
}
export default function TestDialog({ isOpen, close }: TestDialogProps) {
    return (
        <Dialog open={isOpen} onOpenChange={close}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>dsadsa</DialogTitle>
                    <DialogDescription>
                        This action cannot be undone. This will permanently
                        delete your account and remove your data from our
                        servers.
                    </DialogDescription>
                    <Button
                        onClick={() => {
                            close()
                        }}
                    ></Button>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    )
}
