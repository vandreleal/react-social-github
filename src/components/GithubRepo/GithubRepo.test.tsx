import { render, screen, waitFor } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { repoFixture, stubFetch } from '../../test/fixtures'
import { GithubRepo } from './GithubRepo'

describe('GithubRepo', () => {
  it('fetches owner/name and renders the repository', async () => {
    const fetchMock = stubFetch({ '/repos/facebook/react': repoFixture })
    render(<GithubRepo repo="react" user="facebook" />)

    await waitFor(() => expect(screen.getByText('facebook/react')).toBeInTheDocument())
    expect(fetchMock).toHaveBeenCalledTimes(1)
  })

  it('never requests when the owner is missing', () => {
    const fetchMock = stubFetch({ '/repos': repoFixture })
    render(<GithubRepo repo="react" />)

    expect(fetchMock).not.toHaveBeenCalled()
  })

  it('converts emoji shortcodes in the description', () => {
    render(<GithubRepo objRepo={repoFixture} />)

    expect(
      screen.getByText('🚀 The library for web and native user interfaces'),
    ).toBeInTheDocument()
  })

  it('does not mutate the object it was given', () => {
    const input = { ...repoFixture }
    render(<GithubRepo objRepo={input} />)

    expect(input.description).toBe(repoFixture.description)
  })

  it('truncates a long description to 120 characters', () => {
    render(<GithubRepo objRepo={{ ...repoFixture, description: 'a'.repeat(300) }} />)

    const description = screen.getByText(/a+\.\.\./)
    expect(description.textContent).toHaveLength(120)
  })

  it('renders stars and forks with locale formatting', () => {
    render(<GithubRepo objRepo={repoFixture} />)

    expect(screen.getByText('228,000')).toBeInTheDocument()
    expect(screen.getByText('Stars')).toBeInTheDocument()
    expect(screen.getByText('46,600')).toBeInTheDocument()
    expect(screen.getByText('Forks')).toBeInTheDocument()
  })

  it('links to the repository', () => {
    render(<GithubRepo objRepo={repoFixture} />)

    expect(screen.getByRole('link', { name: /View Repository/ })).toHaveAttribute(
      'href',
      'https://github.com/facebook/react',
    )
  })

  it('omits the language when the repository has none', () => {
    const { container } = render(
      <GithubRepo objRepo={{ ...repoFixture, language: null }} />,
    )

    expect(container.querySelector('.rsg-info--secondary')).not.toBeInTheDocument()
  })
})
