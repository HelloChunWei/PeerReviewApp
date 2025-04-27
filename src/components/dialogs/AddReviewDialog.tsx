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
import { Copy } from 'lucide-react'
import DatePicker from '@/components/datePicker'

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

    const submit = () => {
        console.log(date)
        console.log(colleagueName)
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
                            isError
                            value={colleagueName}
                            onChange={(e) => {
                                setColleagueName(e.target.value)
                            }}
                            id="colleagueName"
                            placeholder="colleague Name"
                        />
                    </div>
                </div>
                <Button
                    onClick={(e) => {
                        submit()
                    }}
                >
                    Add
                </Button>
            </DialogContent>
        </Dialog>
    )
}
