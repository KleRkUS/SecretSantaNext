import { useRef } from 'react'

interface UseExecutionDelayProps {
    // eslint-ignore @typescript-eslint/no-explicit-any
    func?: (params: any) => void
    delay: number
}

export const useExecutionDelay = ({ func, delay }: UseExecutionDelayProps): ((params: any) => void) | null => {
    const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

    if (!func) {
        return null;
    }

    // eslint-ignore @typescript-eslint/no-explicit-any
    return (params: any) => {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current)
        }

        timeoutRef.current = setTimeout(() => {
            func(params)
        }, delay)
    }
}
