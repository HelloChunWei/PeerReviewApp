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
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import DatePicker from '@/components/datePicker'
import { z } from 'zod'

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
    const [date, setDate] = useState<Date>(new Date())
    const [colleagueName, setColleagueName] = useState('')
    const [error, setError] = useState<string | null>(null)

    const submit = () => {
        try {
            reviewSchema.parse({
                date,
                colleagueName,
            })

            setError(null)
            console.log(date)
            console.log(colleagueName)
        } catch (err) {
            if (err instanceof z.ZodError) {
                setError(err.errors[0].message)
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
                        onClick={(e) => {
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
