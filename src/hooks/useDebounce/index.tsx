import { useEffect, useState } from 'react'

function useDebounce<T>(value: T, delay = 500) {
  const [debouncedValue, setDebouncedValue] = useState<T>(value)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    setIsLoading(true)
    const timer = setTimeout(() => {
      setDebouncedValue(value), setIsLoading(false)
    }, delay)

    return () => {
      clearTimeout(timer)
    }
  }, [value, delay])

  return { value: debouncedValue, isLoading }
}

export default useDebounce
