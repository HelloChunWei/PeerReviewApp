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

interface ChooseAIToolDialogProps {
    isOpen: boolean
    close: () => void
}

export default function ChooseAIToolDialog({
    isOpen,
    close,
}: ChooseAIToolDialogProps) {
    const { toast } = useToast()
    const [aiModel, setAiModel] = useState('openAi')

    const submit = async () => {
        console.log(aiModel)
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
                            <RadioGroupItem value="ClaudeAi" id="ClaudeAi" />
                            <Label htmlFor="ClaudeAi">Claude AI</Label>
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
