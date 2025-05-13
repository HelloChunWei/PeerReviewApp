import { useState } from 'react'
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
import { getAllPeerReviewFile } from '@/utils/file'
import { useCenterStore } from '@/store'
import { Loader2 } from 'lucide-react'
import useReview from '@/hooks/use-review'
import { Progress } from '@/components/ui/progress'
import { Checkbox } from '@/components/ui/checkbox'

interface ChooseQuarterDialogProps {
    isOpen: boolean
    close: () => void
}

export default function ChooseQuarterDialog({
    isOpen,
    close,
}: ChooseQuarterDialogProps) {
    const { toast } = useToast()
    const { startReview } = useReview()
    const [progress, setProgress] = useState(0)
    const [loading, setLoading] = useState(false)
    const [needReset, setNeedReset] = useState(false)

    const getAllquarters = useCenterStore((state) => state.getAllquarters)
    const setAllPeerReview = useCenterStore((state) => state.setAllPeerReview)

    const [selectedQuarter, setSelectedQuarter] = useState<string>('')

    const submit = async () => {
        try {
            if (!selectedQuarter) {
                toast({
                    title: 'Please Choose the quarter',
                    variant: 'destructive',
                })
                return
            }
            setLoading(true)
            await startReview(selectedQuarter, needReset, (percent: number) => {
                setProgress(percent)
            })
            // set peer review into store
            getAllPeerReviewFile().then((result) => {
                setAllPeerReview(result)
            })
            setLoading(false)
            toast({
                description: 'peer review complete',
            })

            close()
        } catch (err) {
            if (err && typeof err === 'object' && 'message' in err) {
                toast({
                    variant: 'destructive',
                    description: err.message as string,
                })
            }
        } finally {
            setLoading(false)
        }
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
                <div className="flex items-center space-x-2">
                    <Checkbox
                        id="reset"
                        checked={needReset}
                        onCheckedChange={(value) => {
                            setNeedReset(value === true)
                        }}
                    />
                    <label
                        htmlFor="reset"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                        Do you want to overwrite the existing result?
                    </label>
                </div>
                <div className="flex items-center mt-3">
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
                <div className="flex items-center">
                    {loading ? <Progress value={progress} /> : null}
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
