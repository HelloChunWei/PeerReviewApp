import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogClose,
} from '@/components/ui/dialog'
import { useToast } from '@/hooks/use-toast'
import { useNavigate } from 'react-router'
import { deleteFile } from '@/utils/file'

interface DeleteFileDialogProps {
    isOpen: boolean
    close: () => void
    file: string
}

export default function DeleteFileDialog({
    isOpen,
    close,
    file,
}: DeleteFileDialogProps) {
    const { toast } = useToast()
    const navigate = useNavigate()

    const submit = async () => {
        try {
            await deleteFile(file)
            navigate(-1)
            toast({
                description: 'Delete successfully',
            })
        } catch (err) {
            if (err && typeof err === 'object' && 'message' in err) {
                toast({
                    variant: 'destructive',
                    description: err.message as string,
                })
            }
        }
    }

    return (
        <Dialog open={isOpen} onOpenChange={close}>
            <DialogContent
                onPointerDownOutside={(e) => {
                    e.preventDefault()
                }}
            >
                <DialogHeader>
                    <DialogTitle>Delete</DialogTitle>
                    <DialogDescription></DialogDescription>
                </DialogHeader>
                <div className="flex items-center">
                    Are you sure you want to delete it?
                </div>
                <DialogFooter>
                    <Button
                        onClick={() => {
                            submit()
                        }}
                    >
                        Yes
                    </Button>
                    <DialogClose asChild>
                        <Button type="button" variant="secondary">
                            No
                        </Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
