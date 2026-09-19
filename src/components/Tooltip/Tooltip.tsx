import type { ReactElement, ReactNode } from 'react'
import { Popover } from '@base-ui/react/popover'
import type { TooltipPosition } from '../../types'
import './Tooltip.css'

export interface TooltipProps {
  /** The card rendered inside the popup. */
  children: ReactNode
  /**
   * Element the popup is anchored to. Rendered as the Base UI trigger,
   * so it receives the open state, the ARIA wiring and the event
   * handlers — do not attach your own `onClick` to open it.
   */
  trigger: ReactElement
  /** Whether the trigger's element is a native `<button>`. */
  nativeButton?: boolean
  /** Also open on pointer hover, not just on press. */
  openOnHover?: boolean
  /** @default 'auto' */
  position?: TooltipPosition
  /** Class applied to the popup surface. */
  className?: string
}

/**
 * Maps the v2 `tooltipPosition` values onto Base UI's `side`.
 *
 * `auto` keeps Base UI's default collision handling, which flips the
 * popup to the opposite side when it would leave the viewport. That is
 * what v2 approximated by comparing `getBoundingClientRect()` against
 * `window.innerHeight` on every render.
 */
const SIDE_BY_POSITION = {
  auto: 'bottom',
  top: 'top',
  right: 'right',
  bottom: 'bottom',
  left: 'left',
} as const

/**
 * Popup wrapper around Base UI's Popover.
 *
 * Popover rather than Tooltip: the card holds links and a call to
 * action, so it has to be reachable with the keyboard and stay open
 * while the pointer travels into it — which a tooltip, by definition,
 * must not do.
 */
export function Tooltip({
  children,
  trigger,
  nativeButton = true,
  openOnHover = true,
  position = 'auto',
  className,
}: TooltipProps) {
  const side = SIDE_BY_POSITION[position] ?? 'bottom'

  return (
    <Popover.Root>
      <Popover.Trigger
        closeDelay={120}
        delay={180}
        nativeButton={nativeButton}
        openOnHover={openOnHover}
        render={trigger}
      />
      <Popover.Portal>
        <Popover.Positioner
          align="center"
          className="rsg-github-tooltip-positioner"
          collisionAvoidance={
            position === 'auto' ? undefined : { side: 'none', align: 'shift' }
          }
          collisionPadding={8}
          positionMethod="fixed"
          side={side}
          sideOffset={8}
        >
          <Popover.Popup
            className={['rsg-github-tooltip', className].filter(Boolean).join(' ')}
          >
            {children}
          </Popover.Popup>
        </Popover.Positioner>
      </Popover.Portal>
    </Popover.Root>
  )
}
