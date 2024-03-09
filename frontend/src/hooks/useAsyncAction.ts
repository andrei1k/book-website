import { useCallback, useEffect, useRef, useState } from "react";

interface AsyncState<Args extends any[], Result> {
  data: Result | undefined;
  loading: boolean;
  error: unknown | undefined;
  trigger: (...args: Args) => void;
  perform: (...args: Args) => Promise<Result>;
}


export function useAsyncAction<Args extends any[], T>(
  action: (...args: Args) => Promise<T>
): AsyncState<Args, T> {

  const [data, setData] = useState<T>()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<unknown | undefined>()

  const requestIdRef = useRef(0)
  const actionRef = useRef(action)
  actionRef.current = action;
  
  const perform = useCallback(async (...args: Args) => {

    requestIdRef.current++
    const currentRequestId = requestIdRef.current

    setLoading(true)
    setError(undefined)
    setData(undefined)
    
    try{

      const result = await actionRef.current(...args)
      
      if(requestIdRef.current === currentRequestId){
        setLoading(false)
        setError(undefined)
        setData(result)
      }

      return result;
    }
    catch (error) {
      if(requestIdRef.current === currentRequestId){
        setLoading(false)
        setError(error)
      }

      throw error
    }
  }, [])

  const trigger = useCallback((...args: Args) => {
    perform(...args).catch(() => {})
  }, [perform])

  useEffect(() => {
    return () => {
      requestIdRef.current++
    }
  }, [])

  return { data, loading, error, trigger, perform }
}