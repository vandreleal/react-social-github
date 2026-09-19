import { render, screen, waitFor } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { stubFetch, userFixture } from '../test/fixtures'
import { useGithubResource } from './use-github-resource'

let renders = 0

function Probe({ url, override }: { url: string | null; override?: object }) {
  renders += 1
  const { data, isLoading, error } = useGithubResource<{ login?: string }>(url, {
    override,
  })

  return (
    <div>
      {isLoading ? 'loading' : null}
      {error ? `error:${error.message}` : null}
      {data ? `data:${data.login}` : null}
    </div>
  )
}

describe('useGithubResource', () => {
  it('settles a request in two renders, not three', async () => {
    stubFetch({ '/users/facebook': userFixture })
    renders = 0

    render(<Probe url="https://api.github.com/users/facebook" />)
    expect(screen.getByText('loading')).toBeInTheDocument()

    await waitFor(() => expect(screen.getByText('data:facebook')).toBeInTheDocument())

    /*
     * One render for the loading state the initialiser already set, one
     * for the resolved data. The effect used to re-set the loading state
     * it was already in, and because that was a fresh object every time
     * React could not bail out, so every mount cost a wasted render.
     */
    expect(renders).toBe(2)
  })

  it('renders an override once, with no request', () => {
    const fetchMock = stubFetch({})
    renders = 0

    render(
      <Probe override={{ login: 'ghost' }} url="https://api.github.com/users/ghost" />,
    )

    expect(screen.getByText('data:ghost')).toBeInTheDocument()
    expect(renders).toBe(1)
    expect(fetchMock).not.toHaveBeenCalled()
  })

  it('reports a settled empty state for a null url', () => {
    const fetchMock = stubFetch({})
    renders = 0

    render(<Probe url={null} />)

    expect(screen.queryByText('loading')).not.toBeInTheDocument()
    expect(renders).toBe(1)
    expect(fetchMock).not.toHaveBeenCalled()
  })

  it('falls back to a settled empty state when the url goes away', async () => {
    stubFetch({ '/users/facebook': userFixture })

    const { rerender } = render(<Probe url="https://api.github.com/users/facebook" />)
    await waitFor(() => expect(screen.getByText('data:facebook')).toBeInTheDocument())

    // The props stopped describing a resource — a cleared input in the
    // playground, say. The previous result must not linger.
    rerender(<Probe url={null} />)

    await waitFor(() =>
      expect(screen.queryByText('data:facebook')).not.toBeInTheDocument(),
    )
    expect(screen.queryByText('loading')).not.toBeInTheDocument()
  })

  it('refetches when the url changes and drops the stale result', async () => {
    const fetchMock = stubFetch({
      '/users/facebook': userFixture,
      '/users/vercel': { login: 'vercel' },
    })

    const { rerender } = render(<Probe url="https://api.github.com/users/facebook" />)
    await waitFor(() => expect(screen.getByText('data:facebook')).toBeInTheDocument())

    rerender(<Probe url="https://api.github.com/users/vercel" />)
    await waitFor(() => expect(screen.getByText('data:vercel')).toBeInTheDocument())

    expect(fetchMock).toHaveBeenCalledTimes(2)
  })

  it('does not restart the request when only onError identity changes', async () => {
    const fetchMock = stubFetch({ '/users/facebook': userFixture })
    const url = 'https://api.github.com/users/facebook'

    function Host({ tick }: { tick: number }) {
      // A fresh arrow on every render, which is what a caller writing
      // `onError={(e) => ...}` inline produces.
      const { data } = useGithubResource<{ login?: string }>(url, {
        onError: () => undefined,
      })
      return <div>{`${tick}:${data?.login ?? ''}`}</div>
    }

    const { rerender } = render(<Host tick={1} />)
    await waitFor(() => expect(screen.getByText('1:facebook')).toBeInTheDocument())

    rerender(<Host tick={2} />)
    rerender(<Host tick={3} />)

    expect(fetchMock).toHaveBeenCalledTimes(1)
  })
})
