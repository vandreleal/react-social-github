import { useEffect, useState } from 'react'

export interface AsyncResource<T> {
  data: T | undefined
  isLoading: boolean
  error: Error | undefined
}

/**
 * Runs `load` on mount and whenever `key` changes.
 *
 * `key` is the identity of the request (the resolved URL, in practice).
 * A `null` key means there is nothing to load — the hook then reports a
 * settled, empty state rather than a permanent spinner.
 *
 * Results that arrive after the key changed, or after unmount, are
 * dropped: the promise itself is shared through the module-level cache,
 * so it must not be aborted on this component's behalf.
 */
export function useGithubResource<T>(
  key: string | null,
  load: () => Promise<T>,
  onError?: ((error: Error) => void) | undefined,
): AsyncResource<T> {
  const [state, setState] = useState<AsyncResource<T>>(() => ({
    data: undefined,
    isLoading: key !== null,
    error: undefined,
  }))

  useEffect(() => {
    if (key === null) {
      setState({ data: undefined, isLoading: false, error: undefined })
      return
    }

    let active = true
    setState({ data: undefined, isLoading: true, error: undefined })

    load()
      .then((data) => {
        if (!active) return
        setState({ data, isLoading: false, error: undefined })
      })
      .catch((cause: unknown) => {
        if (!active) return
        const error = cause instanceof Error ? cause : new Error(String(cause))
        setState({ data: undefined, isLoading: false, error })
        onError?.(error)
      })

    return () => {
      active = false
    }
    // `load` and `onError` are re-created on every render by design;
    // `key` is the value that decides whether a new request is needed.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key])

  return state
}
