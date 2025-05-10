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
import { useCenterStore } from '@/store'
import { Input } from '@/components/ui/input'
import { saveAiKey } from '@/utils/file'
import { z } from 'zod'

interface AddAiKeyDialogProps {
    isOpen: boolean
    close: () => void
}

const reviewSchema = z.object({
    key: z.string().min(1, 'Key cannot be empty'),
})

export default function AddAiKeyDialog({ isOpen, close }: AddAiKeyDialogProps) {
    const { toast } = useToast()
    const choosedAiTool = useCenterStore((state) => state.choosedAiTool)
    const [key, setKey] = useState('')
    const [error, setError] = useState<string | null>(null)

    const submit = async () => {
        try {
            reviewSchema.parse({
                key,
            })
            setError(null)
            await saveAiKey(choosedAiTool, key)
            toast({
                description: 'save successfully',
            })
        } catch (err) {
            if (err instanceof z.ZodError) {
                setError(err.errors[0].message)
                return
            }
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
                    <DialogTitle> Please save your AI key first</DialogTitle>
                    <DialogDescription></DialogDescription>
                </DialogHeader>
                <div className="flex items-center">
                    <div className="grid flex-1 gap-2">
                        <Input
                            type="text"
                            errorMessage={error || ''}
                            placeholder="AI Key"
                            value={key}
                            onChange={(e) => {
                                setKey(e.target.value)
                                setError(null)
                            }}
                        />
                    </div>
                </div>
                <DialogFooter>
                    <Button
                        onClick={() => {
                            submit()
                        }}
                    >
                        Save
                    </Button>
                    <DialogClose asChild>
                        <Button type="button" variant="secondary">
                            Cancel
                        </Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
