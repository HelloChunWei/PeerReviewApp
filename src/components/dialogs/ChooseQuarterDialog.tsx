import React, { useState, useMemo } from 'react'
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
import { Loader2 } from 'lucide-react'

interface ChooseQuarterDialogProps {
    isOpen: boolean
    close: () => void
}

export default function ChooseQuarterDialog({
    isOpen,
    close,
}: ChooseQuarterDialogProps) {
    const { toast } = useToast()
    const { openDialog } = useDialog()
    const [loading, setLoading] = useState(false)

    const getAllquarters = useCenterStore((state) => state.getAllquarters)
    const [selectedQuarter, setSelectedQuarter] = useState<string>('')

    const submit = async () => {
        if (!selectedQuarter) {
            toast({
                title: 'Please Choose the quarter',
                variant: 'destructive',
            })
            return
        }
        setLoading(true)
        // TODO:
        // close()
    }

    return (
        <Dialog
            open={isOpen}
            onOpenChange={() => {
                if (loading) return
                close()
            }}
        >
            <DialogContent
                onPointerDownOutside={(e) => {
                    e.preventDefault()
                }}
            >
                <DialogHeader>
                    <DialogTitle>Choose quarter to review</DialogTitle>
                    <DialogDescription>
                        Please select a quarter you want to review
                    </DialogDescription>
                </DialogHeader>
                <div className="flex items-center">
                    <RadioGroup
                        value={selectedQuarter}
                        onValueChange={setSelectedQuarter}
                    >
                        {getAllquarters().map((quarter) => (
                            <div
                                key={quarter}
                                className="flex items-center space-x-2"
                            >
                                <RadioGroupItem value={quarter} id={quarter} />
                                <Label htmlFor={quarter}>{quarter}</Label>
                            </div>
                        ))}
                    </RadioGroup>
                </div>
                <DialogFooter>
                    <Button
                        className="min-w-[115px]"
                        onClick={submit}
                        disabled={loading}
                    >
                        {loading ? (
                            <Loader2 className="animate-spin" />
                        ) : (
                            'Start Review'
                        )}
                    </Button>
                    <DialogClose asChild>
                        <Button
                            type="button"
                            variant="secondary"
                            disabled={loading}
                        >
                            Cancel
                        </Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
