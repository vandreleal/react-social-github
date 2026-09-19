import { useCallback } from 'react'
import { DEFAULT_BASE_URL, fetchGithubRepo } from '../lib/github-api'
import type { GithubFetchOptions, GithubRepoData } from '../types'
import { type AsyncResource, useGithubResource } from './use-github-resource'

export interface UseGithubRepoOptions extends GithubFetchOptions {
  /** Renders this object as-is, without issuing a request. */
  objRepo?: GithubRepoData | undefined
  onError?: ((error: Error) => void) | undefined
}

/**
 * Resolves the repository to render.
 *
 * Both `owner` and `name` are required for a request — a `repo` without
 * a `user` is the documented "User missing" case and stays unresolved
 * rather than firing a request at `/repos/undefined/react`.
 */
export function useGithubRepo(
  owner: string | undefined,
  name: string | undefined,
  { objRepo, token, baseUrl, onError }: UseGithubRepoOptions = {},
): AsyncResource<GithubRepoData> {
  const key =
    objRepo || !owner || !name
      ? null
      : `${baseUrl ?? DEFAULT_BASE_URL}/repos/${owner}/${name}|${token ?? ''}`

  const load = useCallback(
    () => fetchGithubRepo(owner as string, name as string, { token, baseUrl }),
    [owner, name, token, baseUrl],
  )

  const resource = useGithubResource(key, load, onError)

  if (objRepo) {
    return { data: objRepo, isLoading: false, error: undefined }
  }

  return resource
}
