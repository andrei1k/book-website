import { DependencyList, useEffect } from "react";
import { useAsyncAction } from "./useAsyncAction";

export function useAsync<T>(fn: () => Promise<T>, dependencies: DependencyList) {
  
  const { data, loading, error, trigger} = useAsyncAction(fn)

  useEffect(trigger, dependencies)
  
  return { data, loading, error }
}