import { githubRepoUrl, githubUserUrl } from '../lib/github-api'
import type { GithubFetchOptions, GithubRepoData, GithubUserData } from '../types'
import { type AsyncResource, useGithubResource } from './use-github-resource'

export interface UseGithubUserOptions extends GithubFetchOptions {
  /** Renders this object as-is, without issuing a request. */
  objUser?: GithubUserData | undefined
  onError?: ((error: Error) => void) | undefined
}

export interface UseGithubRepoOptions extends GithubFetchOptions {
  /** Renders this object as-is, without issuing a request. */
  objRepo?: GithubRepoData | undefined
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
  return useGithubResource(login ? githubUserUrl(login, baseUrl) : null, {
    override: objUser,
    token,
    onError,
  })
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
  return useGithubResource(owner && name ? githubRepoUrl(owner, name, baseUrl) : null, {
    override: objRepo,
    token,
    onError,
  })
}
