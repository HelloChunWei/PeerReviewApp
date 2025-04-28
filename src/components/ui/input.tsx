import * as React from 'react'

import { cn } from '@/lib/utils'

interface InputProps extends React.ComponentProps<'input'> {
    errorMessage?: string
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
    ({ className, type, errorMessage, ...props }, ref) => {
        return (
            <>
                <input
                    type={type}
                    className={cn(
                        'flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
                        className,
                        !!errorMessage && 'border-red-500'
                    )}
                    ref={ref}
                    {...props}
                />
                {!!errorMessage && (
                    <p className="text-[0.8rem] font-medium text-red-500">
                        {errorMessage}
                    </p>
                )}
            </>
        )
    }
)
Input.displayName = 'Input'

export { Input }
