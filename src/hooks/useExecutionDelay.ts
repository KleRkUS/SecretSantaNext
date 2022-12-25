import { useRef } from 'react';

interface UseExecutionDelayProps {
    func: (params: any) => void;
    delay: number;
}

export const useExecutionDelay = ({ func, delay }: UseExecutionDelayProps) => {
    const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    return (params: any) => {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }

        timeoutRef.current = setTimeout(() => {
            func(params);
        }, delay);
    };
};
