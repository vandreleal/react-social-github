import { vi } from 'vitest'
import type { GithubRepoData, GithubUserData } from '../types'

export const userFixture: GithubUserData = {
  login: 'facebook',
  name: 'Meta',
  avatar_url: 'https://avatars.githubusercontent.com/u/69631?v=4',
  html_url: 'https://github.com/facebook',
  blog: 'opensource.fb.com',
  company: 'Meta Platforms',
  location: 'Menlo Park, California',
  hireable: null,
  public_repos: 127,
  public_gists: 1,
  type: 'Organization',
}

export const personFixture: GithubUserData = {
  ...userFixture,
  login: 'vandreleal',
  name: 'Vandré Leal',
  type: 'User',
  hireable: true,
  public_repos: 42,
  public_gists: 0,
}

export const repoFixture: GithubRepoData = {
  name: 'react',
  full_name: 'facebook/react',
  html_url: 'https://github.com/facebook/react',
  description: ':rocket: The library for web and native user interfaces',
  language: 'JavaScript',
  stargazers_count: 228_000,
  forks: 46_600,
  owner: {
    login: 'facebook',
    avatar_url: 'https://avatars.githubusercontent.com/u/69631?v=4',
  },
}

/** Stubs `fetch` with a URL-keyed lookup table. */
export function stubFetch(routes: Record<string, unknown>, status = 200) {
  const fetchMock = vi.fn((input: RequestInfo | URL, _init?: RequestInit) => {
    const url = String(input)
    const match = Object.keys(routes).find((key) => url.includes(key))

    if (match === undefined) {
      return Promise.resolve(
        new Response(JSON.stringify({ message: 'Not Found' }), { status: 404 }),
      )
    }

    return Promise.resolve(
      new Response(JSON.stringify(routes[match]), {
        status,
        headers: { 'Content-Type': 'application/json' },
      }),
    )
  })

  vi.stubGlobal('fetch', fetchMock)

  return fetchMock
}
