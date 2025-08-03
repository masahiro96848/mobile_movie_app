// fetchMovies
// fetchMovieDetails

import { useEffect, useState } from 'react'

// useFetch(fetchMovies)

const useFetch = <T>(fetchFunction: () => Promise<T>, authFetch = true) => {
  const [data, setDate] = useState<T | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<Error | null>(null)

  const fetchData = async () => {
    try {
      setLoading(true)
      setError(null)

      const result = await fetchFunction()

      setDate(result)
    } catch (err) {
      setError(err instanceof Error ? err : new Error('An error occurred'))
    } finally {
      setLoading(false)
    }
  }

  const reset = () => {
    setDate(null)
    setLoading(false)
    setError(null)
  }

  useEffect(() => {
    if (authFetch) {
      fetchData()
    }
  }, [])

  return {
    data,
    loading,
    error,
    refetch: fetchData,
    reset,
  }
}

export default useFetch
