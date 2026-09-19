import type { GithubFetchOptions, GithubRepoData, GithubUserData } from '../types'

export const DEFAULT_BASE_URL = 'https://api.github.com'

/** Thrown when the GitHub API answers with a non-2xx status. */
export class GithubApiError extends Error {
  readonly status: number
  readonly url: string

  constructor(message: string, status: number, url: string) {
    super(message)
    this.name = 'GithubApiError'
    this.status = status
    this.url = url
  }
}

interface CacheEntry {
  expires: number
  value: Promise<unknown>
}

/**
 * Process-lifetime response cache.
 *
 * v2 issued a fresh request from every `componentWillMount`, so a page
 * with four widgets for the same account burned four of the sixty
 * requests an unauthenticated browser client is allowed per hour. Here
 * an in-flight promise is shared by every caller asking for the same
 * URL, and the resolved value is reused for `CACHE_TTL_MS`.
 *
 * Requests deliberately carry no `AbortSignal`: the promise is shared,
 * so one unmounting component must not cancel the response every other
 * mounted component is still waiting on. Callers drop late results
 * instead — see `useGithubResource`.
 */
const cache = new Map<string, CacheEntry>()

/** Five minutes — long enough to dedupe a page, short enough to stay fresh. */
export const CACHE_TTL_MS = 5 * 60 * 1000

/** Drops every cached response. Exposed for tests and for manual refreshes. */
export function clearGithubCache(): void {
  cache.clear()
}

function buildUrl(path: string, baseUrl = DEFAULT_BASE_URL): string {
  return `${baseUrl.replace(/\/+$/, '')}${path}`
}

async function request<T>(url: string, token: string | undefined): Promise<T> {
  const headers: Record<string, string> = {
    Accept: 'application/vnd.github+json',
    'X-GitHub-Api-Version': '2022-11-28',
  }

  if (token) {
    headers.Authorization = `Bearer ${token}`
  }

  const response = await fetch(url, { headers })

  if (!response.ok) {
    // GitHub answers 403 with a rate-limit body that is far more useful
    // than the bare status, so surface it when it is there.
    const detail = await response
      .json()
      .then((body: { message?: string }) => body?.message)
      .catch(() => undefined)

    throw new GithubApiError(
      detail ?? `Request to ${url} failed with status ${response.status}`,
      response.status,
      url,
    )
  }

  return (await response.json()) as T
}

function cached<T>(key: string, load: () => Promise<T>): Promise<T> {
  const now = Date.now()
  const hit = cache.get(key)

  if (hit && hit.expires > now) {
    return hit.value as Promise<T>
  }

  const value = load().catch((error: unknown) => {
    // A failed request must not be remembered, otherwise a transient
    // rate-limit answer would poison the entry for the whole TTL.
    cache.delete(key)
    throw error
  })

  cache.set(key, { expires: now + CACHE_TTL_MS, value })

  return value
}

/** Fetches a user or organization by login. */
export function fetchGithubUser(
  login: string,
  options: GithubFetchOptions = {},
): Promise<GithubUserData> {
  const url = buildUrl(`/users/${encodeURIComponent(login)}`, options.baseUrl)
  return cached(`${url}|${options.token ?? ''}`, () =>
    request<GithubUserData>(url, options.token),
  )
}

/** Fetches a repository by owner and name. */
export function fetchGithubRepo(
  owner: string,
  repo: string,
  options: GithubFetchOptions = {},
): Promise<GithubRepoData> {
  const url = buildUrl(
    `/repos/${encodeURIComponent(owner)}/${encodeURIComponent(repo)}`,
    options.baseUrl,
  )
  return cached(`${url}|${options.token ?? ''}`, () =>
    request<GithubRepoData>(url, options.token),
  )
}
