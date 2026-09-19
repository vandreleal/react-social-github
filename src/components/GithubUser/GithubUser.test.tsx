import { render, screen, waitFor } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { personFixture, stubFetch, userFixture } from '../../test/fixtures'
import { fixHttp, GithubUser } from './GithubUser'

describe('fixHttp', () => {
  it('leaves absolute URLs alone', () => {
    expect(fixHttp('https://example.com')).toBe('https://example.com')
    expect(fixHttp('http://example.com')).toBe('http://example.com')
  })

  it('prefixes a bare host with https, not http', () => {
    expect(fixHttp('example.com')).toBe('https://example.com')
  })

  it('returns undefined for empty input', () => {
    expect(fixHttp(undefined)).toBeUndefined()
    expect(fixHttp(null)).toBeUndefined()
    expect(fixHttp('')).toBeUndefined()
  })
})

describe('GithubUser', () => {
  it('shows a skeleton while loading, then the profile', async () => {
    stubFetch({ '/users/facebook': userFixture })
    const { container } = render(<GithubUser name="facebook" />)

    expect(container.querySelector('.rsg-github-is-loading')).toBeInTheDocument()
    await waitFor(() => expect(screen.getByText('Meta')).toBeInTheDocument())
    expect(container.querySelector('.rsg-github-is-loading')).not.toBeInTheDocument()
  })

  it('renders an object without touching the network', () => {
    const fetchMock = stubFetch({})
    render(<GithubUser objUser={userFixture} />)

    expect(screen.getByText('Meta')).toBeInTheDocument()
    expect(fetchMock).not.toHaveBeenCalled()
  })

  it('renders the counters with locale-formatted numbers', () => {
    render(<GithubUser objUser={userFixture} />)

    expect(screen.getByText('127')).toBeInTheDocument()
    expect(screen.getByText('Repos')).toBeInTheDocument()
    // One gist is singular.
    expect(screen.getByText('Gist')).toBeInTheDocument()
  })

  it('pluralises zero, which v2 rendered as a singular', () => {
    render(<GithubUser objUser={personFixture} />)

    expect(screen.getByText('Gists')).toBeInTheDocument()
  })

  it('shows the hire badge only when hireable', () => {
    const { rerender } = render(<GithubUser objUser={personFixture} />)
    expect(screen.getByText('Available for hire')).toBeInTheDocument()

    rerender(<GithubUser objUser={userFixture} />)
    expect(screen.queryByText('Available for hire')).not.toBeInTheDocument()
  })

  it('links an organization with "View" and a user with "Follow"', () => {
    const { rerender } = render(<GithubUser objUser={userFixture} />)
    const orgLink = screen.getByRole('link', { name: /View @facebook/ })
    expect(orgLink).toHaveAttribute('href', 'https://github.com/facebook')
    expect(orgLink).toHaveAttribute('rel', 'noreferrer noopener')

    rerender(<GithubUser objUser={personFixture} />)
    expect(screen.getByRole('link', { name: /Follow @vandreleal/ })).toBeInTheDocument()
  })

  it('omits optional fields that are absent', () => {
    render(<GithubUser objUser={{ login: 'ghost', type: 'User' }} />)

    expect(screen.queryByText('Menlo Park, California')).not.toBeInTheDocument()
    expect(screen.getByText('ghost')).toBeInTheDocument()
  })

  it('renders an error card when the request fails', async () => {
    stubFetch({})
    render(<GithubUser name="does-not-exist" />)

    await waitFor(() => expect(screen.getByRole('alert')).toBeInTheDocument())
    expect(screen.getByText('Could not load')).toBeInTheDocument()
  })
})
