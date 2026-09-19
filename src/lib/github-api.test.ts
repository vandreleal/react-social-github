import { afterEach, describe, expect, it, vi } from 'vitest'
import { stubFetch, userFixture } from '../test/fixtures'
import {
  clearGithubCache,
  fetchGithubRepo,
  fetchGithubUser,
  GithubApiError,
} from './github-api'

afterEach(() => {
  clearGithubCache()
})

describe('fetchGithubUser', () => {
  it('requests the users endpoint with the versioned Accept header', async () => {
    const fetchMock = stubFetch({ '/users/facebook': userFixture })

    await expect(fetchGithubUser('facebook')).resolves.toEqual(userFixture)

    const call = fetchMock.mock.calls[0]
    expect(call).toBeDefined()
    expect(call?.[0]).toBe('https://api.github.com/users/facebook')

    const headers = call?.[1]?.headers as Record<string, string>
    expect(headers.Accept).toBe('application/vnd.github+json')
  })

  it('sends a bearer token when one is given, and not otherwise', async () => {
    const fetchMock = stubFetch({ '/users/facebook': userFixture })

    await fetchGithubUser('facebook', { token: 'secret' })
    clearGithubCache()
    await fetchGithubUser('facebook')

    const withToken = fetchMock.mock.calls[0]?.[1]?.headers as Record<string, string>
    const without = fetchMock.mock.calls[1]?.[1]?.headers as Record<string, string>

    expect(withToken.Authorization).toBe('Bearer secret')
    expect(without.Authorization).toBeUndefined()
  })

  it('honours a custom baseUrl and strips its trailing slash', async () => {
    const fetchMock = stubFetch({ '/users/facebook': userFixture })

    await fetchGithubUser('facebook', { baseUrl: 'https://ghe.example.com/api/v3/' })

    expect(fetchMock.mock.calls[0]?.[0]).toBe(
      'https://ghe.example.com/api/v3/users/facebook',
    )
  })

  it('percent-encodes the login', async () => {
    const fetchMock = stubFetch({ '/users/': userFixture })

    await fetchGithubUser('a b/c')

    expect(fetchMock.mock.calls[0]?.[0]).toBe('https://api.github.com/users/a%20b%2Fc')
  })

  it('dedupes concurrent and repeated calls for the same URL', async () => {
    const fetchMock = stubFetch({ '/users/facebook': userFixture })

    await Promise.all([fetchGithubUser('facebook'), fetchGithubUser('facebook')])
    await fetchGithubUser('facebook')

    expect(fetchMock).toHaveBeenCalledTimes(1)
  })

  it('keys the cache by token, so two identities never share a response', async () => {
    const fetchMock = stubFetch({ '/users/facebook': userFixture })

    await fetchGithubUser('facebook', { token: 'a' })
    await fetchGithubUser('facebook', { token: 'b' })

    expect(fetchMock).toHaveBeenCalledTimes(2)
  })

  it('throws GithubApiError carrying the API message and status', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn(() =>
        Promise.resolve(
          new Response(JSON.stringify({ message: 'API rate limit exceeded' }), {
            status: 403,
          }),
        ),
      ),
    )

    const error = await fetchGithubUser('facebook').catch((cause: unknown) => cause)

    expect(error).toBeInstanceOf(GithubApiError)
    expect((error as GithubApiError).status).toBe(403)
    expect((error as GithubApiError).message).toBe('API rate limit exceeded')
  })

  it('does not cache failures', async () => {
    const fetchMock = vi.fn(() => Promise.resolve(new Response('{}', { status: 500 })))
    vi.stubGlobal('fetch', fetchMock)

    await fetchGithubUser('facebook').catch(() => undefined)
    await fetchGithubUser('facebook').catch(() => undefined)

    expect(fetchMock).toHaveBeenCalledTimes(2)
  })

  it('falls back to a generic message when the body is not JSON', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn(() => Promise.resolve(new Response('<html>', { status: 502 }))),
    )

    await expect(fetchGithubUser('facebook')).rejects.toThrow(/status 502/)
  })
})

describe('fetchGithubRepo', () => {
  it('requests the repos endpoint', async () => {
    const fetchMock = stubFetch({
      '/repos/facebook/react': { full_name: 'facebook/react' },
    })

    await expect(fetchGithubRepo('facebook', 'react')).resolves.toEqual({
      full_name: 'facebook/react',
    })
    expect(fetchMock.mock.calls[0]?.[0]).toBe(
      'https://api.github.com/repos/facebook/react',
    )
  })
})
