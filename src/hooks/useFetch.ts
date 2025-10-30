import { useState, useEffect } from 'react'
import axios, { AxiosError } from 'axios'

interface UseFetchResult<T> {
  data: T | null
  loading: boolean
  error: string | null
}

export function useFetch<T>(url: string): UseFetchResult<T> {
  const [data, setData] = useState<T | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const abortController = new AbortController()

    const fetchData = async () => {
      try {
        const response = await axios.get<T>(url, {
          signal: abortController.signal
        })
        setData(response.data)
        setError(null)
      } catch (err) {
        if (axios.isAxiosError(err)) {
          setError((err as AxiosError).message)
        } else {
          setError('Une erreur est survenue')
        }
      } finally {
        setLoading(false)
      }
    }

    void fetchData()

    return () => {
      abortController.abort()
    }
  }, [url])

  return { data, loading, error }
}
