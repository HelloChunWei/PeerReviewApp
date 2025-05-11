import { format } from 'date-fns'
import { CalendarIcon } from 'lucide-react'

import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@/components/ui/popover'

type Props = {
    value: Date
    set: (val: any) => void
}

export default function DatePicker(props: Props) {
    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button
                    variant={'outline'}
                    className={cn(
                        'w-full justify-start text-left font-normal',
                        !props.value && 'text-muted-foreground'
                    )}
                >
                    <CalendarIcon />
                    {props.value ? (
                        format(props.value, 'PPP')
                    ) : (
                        <span>Pick a date</span>
                    )}
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                    mode="single"
                    selected={props.value}
                    onSelect={props.set}
                    initialFocus
                />
            </PopoverContent>
        </Popover>
    )
}
