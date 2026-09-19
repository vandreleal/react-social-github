import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import { personFixture, repoFixture, stubFetch, userFixture } from '../../test/fixtures'
import { Github } from './Github'

describe('Github', () => {
  it('renders nothing resolvable without user, repo or an object', () => {
    const { container } = render(<Github />)

    expect(container.querySelector('.rsg-github')).toBeInTheDocument()
    expect(container.querySelector('.rsg-github-wrapper')).not.toBeInTheDocument()
  })

  it('defaults to the widget type', () => {
    const { container } = render(<Github objUser={userFixture} />)

    expect(container.querySelector('.rsg-github-widget')).toBeInTheDocument()
    expect(screen.getByText('Meta')).toBeInTheDocument()
  })

  it('treats an explicit type="widget" the same as the default', () => {
    const { container } = render(<Github objUser={userFixture} type="widget" />)

    expect(container.querySelector('.rsg-github-widget')).toBeInTheDocument()
  })

  it('forwards id, style and className to the root', () => {
    const { container } = render(
      <Github className="custom" id="gh" objUser={userFixture} style={{ margin: 4 }} />,
    )
    const root = container.querySelector('.rsg-github') as HTMLElement

    expect(root.id).toBe('gh')
    expect(root).toHaveClass('custom')
    expect(root.style.margin).toBe('4px')
  })

  describe('resolution precedence', () => {
    it('renders a repo card when repo is set, even alongside user', () => {
      stubFetch({ '/repos/facebook/react': repoFixture })
      const { container } = render(<Github repo="react" user="facebook" />)

      expect(container.querySelector('.rsg-github-repo')).toBeInTheDocument()
    })

    it('prefers objRepo over objUser', () => {
      const { container } = render(<Github objRepo={repoFixture} objUser={userFixture} />)

      expect(container.querySelector('.rsg-github-repo')).toBeInTheDocument()
      expect(container.querySelector('.rsg-github-user')).not.toBeInTheDocument()
    })

    it('prefers objUser over the user string', () => {
      const fetchMock = stubFetch({ '/users/facebook': userFixture })
      render(<Github objUser={personFixture} user="facebook" />)

      expect(screen.getByText('Vandré Leal')).toBeInTheDocument()
      expect(fetchMock).not.toHaveBeenCalled()
    })
  })

  describe('type="link"', () => {
    it('renders the default link text', () => {
      render(<Github objUser={userFixture} type="link" />)

      expect(screen.getByRole('button', { name: 'Github' })).toBeInTheDocument()
    })

    it('honours linkText and children', () => {
      const { rerender } = render(
        <Github linkText="Hover Here" objUser={userFixture} type="link" />,
      )
      expect(screen.getByRole('button', { name: 'Hover Here' })).toBeInTheDocument()

      rerender(
        <Github objUser={userFixture} type="link">
          Custom child
        </Github>,
      )
      expect(screen.getByRole('button', { name: 'Custom child' })).toBeInTheDocument()
    })

    it('opens the card on press', async () => {
      const user = userEvent.setup()
      render(<Github objUser={userFixture} type="link" />)

      expect(screen.queryByText('Meta')).not.toBeInTheDocument()
      await user.click(screen.getByRole('button', { name: 'Github' }))

      await waitFor(() => expect(screen.getByText('Meta')).toBeInTheDocument())
    })
  })

  describe('type="button"', () => {
    it('renders an icon trigger with an accessible name', () => {
      const { container } = render(<Github objUser={userFixture} type="button" />)

      expect(
        screen.getByRole('button', { name: 'Show GitHub details' }),
      ).toBeInTheDocument()
      expect(container.querySelector('.rsg-btn-icon')).toBeInTheDocument()
    })

    it('applies icon sizing as custom properties, and a bare number as px', () => {
      const { container } = render(
        <Github
          iconColor="#3b5998"
          iconHeight={64}
          iconWidth="2rem"
          objUser={userFixture}
          type="button"
        />,
      )
      const trigger = container.querySelector('.rsg-btn-icon') as HTMLElement

      expect(trigger.style.getPropertyValue('--rsg-icon-width')).toBe('2rem')
      expect(trigger.style.getPropertyValue('--rsg-icon-height')).toBe('64px')
      expect(trigger.style.color).toBe('rgb(59, 89, 152)')
    })

    it('defaults the icon box to 48px', () => {
      const { container } = render(<Github objUser={userFixture} type="button" />)
      const trigger = container.querySelector('.rsg-btn-icon') as HTMLElement

      expect(trigger.style.getPropertyValue('--rsg-icon-width')).toBe('48px')
      expect(trigger.style.getPropertyValue('--rsg-icon-height')).toBe('48px')
    })

    it('pins a fab to bottom-right by default and honours fabCorner', () => {
      const { container, rerender } = render(
        <Github fab objUser={userFixture} type="button" />,
      )
      expect(container.querySelector('.rsg-btn-fab--bottom-right')).toBeInTheDocument()

      rerender(<Github fab fabCorner="top-left" objUser={userFixture} type="button" />)
      expect(container.querySelector('.rsg-btn-fab--top-left')).toBeInTheDocument()
    })

    it('does not add fab classes unless fab is set', () => {
      const { container } = render(<Github objUser={userFixture} type="button" />)

      expect(container.querySelector('.rsg-btn-fab')).not.toBeInTheDocument()
    })

    it('opens on press', async () => {
      const user = userEvent.setup()
      render(<Github objUser={userFixture} type="button" />)

      await user.click(screen.getByRole('button', { name: 'Show GitHub details' }))
      await waitFor(() => expect(screen.getByText('Meta')).toBeInTheDocument())
    })
  })

  it('reports request failures through onError instead of throwing', async () => {
    stubFetch({})
    const onError = vi.fn()
    render(<Github onError={onError} user="nope" />)

    await waitFor(() => expect(onError).toHaveBeenCalledTimes(1))
    expect(onError.mock.calls[0]?.[0]).toBeInstanceOf(Error)
    expect(screen.getByRole('alert')).toBeInTheDocument()
  })
})
