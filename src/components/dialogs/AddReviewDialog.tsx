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
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import DatePicker from '@/components/datePicker'
import { z } from 'zod'
import { createReview } from '@/utils/file/'
import { useToast } from '@/hooks/use-toast'
import { useCenterStore } from '@/store'
import { getAllReviewFile } from '@/utils/file'

const reviewSchema = z.object({
    date: z.date(),
    colleagueName: z.string().min(1, 'Colleague name cannot be empty'),
})

interface AddReviewDialogProps {
    isOpen: boolean
    close: () => void
}

export default function AddReviewDialog({
    isOpen,
    close,
}: AddReviewDialogProps) {
    const { toast } = useToast()
    const [date, setDate] = useState<Date>(new Date())
    const [colleagueName, setColleagueName] = useState('')
    const setReviewResult = useCenterStore((state) => state.setReviewResult)
    const [error, setError] = useState<string | null>(null)

    const submit = async () => {
        try {
            reviewSchema.parse({
                date,
                colleagueName,
            })

            setError(null)
            const capitalized =
                colleagueName.charAt(0).toUpperCase() + colleagueName.slice(1)
            await createReview(date, capitalized)
            toast({
                description: 'Add successfully',
            })
            // set review into store
            getAllReviewFile().then((result) => {
                setReviewResult(result)
            })
            setTimeout(() => {
                close()
            }, 0)
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
        <Dialog open={isOpen} onOpenChange={close} modal={false}>
            <DialogContent
                onPointerDownOutside={(e) => {
                    e.preventDefault()
                }}
            >
                <DialogHeader>
                    <DialogTitle>Add new work log</DialogTitle>
                    <DialogDescription></DialogDescription>
                </DialogHeader>
                <div className="flex items-center">
                    <div className="grid flex-1 gap-2">
                        <DatePicker value={date} set={setDate} />
                    </div>
                </div>
                <div className="flex items-center">
                    <div className="grid flex-1 gap-2">
                        <Label htmlFor="colleagueName" className="sr-only">
                            Colleague name
                        </Label>
                        <Input
                            errorMessage={error || ''}
                            value={colleagueName}
                            onChange={(e) => {
                                setColleagueName(e.target.value)
                                setError(null)
                            }}
                            id="colleagueName"
                            placeholder="colleague Name"
                        />
                    </div>
                </div>
                <DialogFooter>
                    <Button
                        onClick={() => {
                            submit()
                        }}
                    >
                        Add
                    </Button>
                    <DialogClose asChild>
                        <Button type="button" variant="secondary">
                            Close
                        </Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
