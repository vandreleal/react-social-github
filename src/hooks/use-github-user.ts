import { useCallback } from 'react'
import { DEFAULT_BASE_URL, fetchGithubUser } from '../lib/github-api'
import type { GithubFetchOptions, GithubUserData } from '../types'
import { type AsyncResource, useGithubResource } from './use-github-resource'

export interface UseGithubUserOptions extends GithubFetchOptions {
  /** Renders this object as-is, without issuing a request. */
  objUser?: GithubUserData | undefined
  onError?: ((error: Error) => void) | undefined
}

/**
 * Resolves the user or organization to render.
 *
 * `objUser` short-circuits the request entirely, matching v2's rule that
 * a supplied object always wins over a login string.
 */
export function useGithubUser(
  login: string | undefined,
  { objUser, token, baseUrl, onError }: UseGithubUserOptions = {},
): AsyncResource<GithubUserData> {
  const key =
    objUser || !login
      ? null
      : `${baseUrl ?? DEFAULT_BASE_URL}/users/${login}|${token ?? ''}`

  const load = useCallback(
    () => fetchGithubUser(login as string, { token, baseUrl }),
    [login, token, baseUrl],
  )

  const resource = useGithubResource(key, load, onError)

  if (objUser) {
    return { data: objUser, isLoading: false, error: undefined }
  }

  return resource
}
