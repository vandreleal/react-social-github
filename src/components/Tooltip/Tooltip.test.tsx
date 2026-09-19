import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'
import { Github } from '../Github/Github'
import { Tooltip } from './Tooltip'

async function openAndReadSide(position: 'auto' | 'top' | 'right' | 'bottom' | 'left') {
  const user = userEvent.setup()

  render(
    <Tooltip position={position} trigger={<button type="button">Open</button>}>
      <span>Card</span>
    </Tooltip>,
  )

  await user.click(screen.getByRole('button', { name: 'Open' }))
  await waitFor(() => expect(screen.getByText('Card')).toBeInTheDocument())

  return screen.getByText('Card').closest('.rsg-github-tooltip')
}

describe('Tooltip', () => {
  it('renders the trigger and keeps the popup closed until asked', () => {
    render(
      <Tooltip trigger={<button type="button">Open</button>}>
        <span>Card</span>
      </Tooltip>,
    )

    expect(screen.getByRole('button', { name: 'Open' })).toBeInTheDocument()
    expect(screen.queryByText('Card')).not.toBeInTheDocument()
  })

  it('places the popup below the trigger by default', async () => {
    const popup = await openAndReadSide('auto')

    expect(popup).toHaveAttribute('data-side', 'bottom')
  })

  /*
   * `tooltipPosition` was documented in 2.x but the component hardcoded
   * `auto` and never read the prop, so these four cases are the fix.
   */
  it.each(['top', 'right', 'bottom', 'left'] as const)(
    'honours tooltipPosition="%s"',
    async (position) => {
      const popup = await openAndReadSide(position)

      expect(popup).toHaveAttribute('data-side', position)
    },
  )

  it('is wired through the Github component', async () => {
    const user = userEvent.setup()
    render(
      <Github
        objUser={{ login: 'ghost', name: 'Ghost', type: 'User' }}
        tooltipPosition="top"
        type="button"
      />,
    )

    await user.click(screen.getByRole('button', { name: 'Show GitHub details' }))
    await waitFor(() => expect(screen.getByText('Ghost')).toBeInTheDocument())

    expect(screen.getByText('Ghost').closest('.rsg-github-tooltip')).toHaveAttribute(
      'data-side',
      'top',
    )
  })

  it('closes on Escape', async () => {
    const user = userEvent.setup()
    render(
      <Tooltip trigger={<button type="button">Open</button>}>
        <span>Card</span>
      </Tooltip>,
    )

    await user.click(screen.getByRole('button', { name: 'Open' }))
    await waitFor(() => expect(screen.getByText('Card')).toBeInTheDocument())

    await user.keyboard('{Escape}')
    await waitFor(() => expect(screen.queryByText('Card')).not.toBeInTheDocument())
  })
})
