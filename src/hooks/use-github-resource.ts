import { useEffect, useRef, useState } from 'react'
import { fetchGithubUrl } from '../lib/github-api'

export interface AsyncResource<T> {
  data: T | undefined
  isLoading: boolean
  error: Error | undefined
}

const SETTLED_EMPTY = { data: undefined, isLoading: false, error: undefined } as const

export interface UseGithubResourceOptions<T> {
  /** Renders this value as-is, without issuing a request. */
  override?: T | undefined
  token?: string | undefined
  onError?: ((error: Error) => void) | undefined
}

/**
 * Loads one GitHub URL.
 *
 * This is the whole data layer. `useGithubUser` and `useGithubRepo` are
 * thin wrappers that decide which URL to ask for; everything about
 * loading, errors, overrides and stale results lives here, once.
 *
 * A `null` url means there is nothing to load — an override was given,
 * or the props do not describe a resource yet — so the hook reports a
 * settled, empty state rather than a permanent spinner.
 *
 * Results that arrive after the url changed, or after unmount, are
 * dropped. The promise itself is shared through the module-level cache,
 * so it must not be aborted on this component's behalf.
 */
export function useGithubResource<T>(
  url: string | null,
  { override, token, onError }: UseGithubResourceOptions<T> = {},
): AsyncResource<T> {
  const target = override === undefined ? url : null

  const [state, setState] = useState<AsyncResource<T>>(() =>
    target === null ? SETTLED_EMPTY : { ...SETTLED_EMPTY, isLoading: true },
  )

  /*
   * The url the current state describes. Without it the effect resets
   * state on mount to the value it already holds, and because that is a
   * fresh object every time React cannot bail out — every mount paid for
   * a second render.
   */
  const loaded = useRef<string | null>(target)

  /*
   * Kept in a ref so a caller passing an inline arrow does not restart
   * the request on every render. Assigned in an effect rather than
   * during render: the catch handler reads it asynchronously, long
   * after commit, so it still sees the newest value.
   */
  const errorHandler = useRef(onError)
  useEffect(() => {
    errorHandler.current = onError
  })

  useEffect(() => {
    if (target === null) {
      if (loaded.current !== null) {
        loaded.current = null
        setState(SETTLED_EMPTY)
      }
      return
    }

    let active = true

    if (loaded.current !== target) {
      loaded.current = target
      setState({ ...SETTLED_EMPTY, isLoading: true })
    }

    fetchGithubUrl<T>(target, token)
      .then((data) => {
        if (!active) return
        setState({ data, isLoading: false, error: undefined })
      })
      .catch((cause: unknown) => {
        if (!active) return
        const error = cause instanceof Error ? cause : new Error(String(cause))
        setState({ data: undefined, isLoading: false, error })
        errorHandler.current?.(error)
      })

    return () => {
      active = false
    }
  }, [target, token])

  if (override !== undefined) {
    return { data: override, isLoading: false, error: undefined }
  }

  return state
}
