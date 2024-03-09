import { useRef } from 'react';

export function useDelay<Args extends any[]>(
  action: (...args: Args) => void,
  timeMs: number
) {
  const timeoutRef = useRef<NodeJS.Timeout>();

  const actionRef = useRef(action);
  actionRef.current = action;

  return (...args: Args) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => actionRef.current(...args), timeMs);
  };
}
