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
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { getAIKey } from '@/utils/file'
import { useCenterStore } from '@/store'
import useDialog from '@/hooks/use-dialog'
import AddAiKeyDialog from './AddAiKeyDialog'
import ChooseQuarterDialog from './ChooseQuarterDialog'

interface ChooseAIToolDialogProps {
    isOpen: boolean
    close: () => void
}

export default function ChooseAIToolDialog({
    isOpen,
    close,
}: ChooseAIToolDialogProps) {
    const { toast } = useToast()
    const { openDialog } = useDialog()
    const setAiTool = useCenterStore((state) => state.setAiTool)
    const [aiModel, setAiModel] = useState('openAi')

    const submit = async () => {
        try {
            setAiTool(aiModel)
            await getAIKey(aiModel)
            close()
            setTimeout(() => {
                openDialog(ChooseQuarterDialog)
            }, 300)
        } catch (err) {
            if (err && typeof err === 'object' && 'message' in err) {
                close()
                setTimeout(() => {
                    openDialog(AddAiKeyDialog)
                }, 300)
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
                    <DialogTitle> Please choose your AI tool</DialogTitle>
                    <DialogDescription></DialogDescription>
                </DialogHeader>
                <div className="flex items-center">
                    <RadioGroup
                        onValueChange={setAiModel}
                        defaultValue={aiModel}
                    >
                        <div className="flex items-center space-x-2">
                            <RadioGroupItem value="openAi" id="openAi" />
                            <Label htmlFor="openAi">Open AI</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                            <RadioGroupItem value="claudeAi" id="claudeAi" />
                            <Label htmlFor="claudeAi">Claude AI</Label>
                        </div>
                    </RadioGroup>
                </div>
                <DialogFooter>
                    <Button
                        onClick={() => {
                            submit()
                        }}
                    >
                        Next
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
