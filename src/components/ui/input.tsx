import * as React from 'react'

import { cn } from '@/lib/utils'

interface InputProps extends React.ComponentProps<'input'> {
    isError?: boolean
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
    ({ className, type, isError, ...props }, ref) => {
        return (
            <>
                <input
                    type={type}
                    className={cn(
                        'flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
                        className
                    )}
                    ref={ref}
                    {...props}
                />
                {isError && (
                    <p className="text-[0.8rem] font-medium text-red-500">
                        test
                    </p>
                )}
            </>
        )
    }
)
Input.displayName = 'Input'

export { Input }
