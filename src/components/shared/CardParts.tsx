import type { ComponentType, ReactNode } from 'react'
import { cx } from '../../lib/class-names'
import './CardParts.css'

/** Props every octicon accepts. */
type IconComponent = ComponentType<{ size?: number; className?: string }>

export interface CardShellProps {
  children: ReactNode
  /** Extra class for the card body, e.g. `rsg-github-user`. */
  variant: string
}

/** The bordered, padded surface every card body shares. */
export function CardShell({ children, variant }: CardShellProps) {
  return <div className={cx('rsg-github-wrapper', variant)}>{children}</div>
}

export interface AvatarProps {
  src: string | undefined
  alt: string
}

export function Avatar({ src, alt }: AvatarProps) {
  if (!src) {
    return <div aria-hidden="true" className="rsg-avatar rsg-skeleton" />
  }

  return (
    <img alt={alt} className="rsg-avatar" decoding="async" loading="lazy" src={src} />
  )
}

export interface CounterProps {
  icon: IconComponent
  value: number | undefined
  /** Singular label — pluralised by adding an `s` when `value !== 1`. */
  label: string
}

/**
 * One half of the stat row.
 *
 * v2 pluralised with `value > 1`, which labelled a zero-repo account
 * "Repo". The rule here is `value !== 1`, so 0 reads "Repos".
 */
export function Counter({ icon: Icon, value, label }: CounterProps) {
  const count = Number(value ?? 0)

  return (
    <div className="rsg-item">
      <div className="rsg-icon">
        <Icon size={16} />
      </div>
      <div className="rsg-description">
        <div className="rsg-count">{count.toLocaleString()}</div>
        <div className="rsg-label">{count === 1 ? label : `${label}s`}</div>
      </div>
    </div>
  )
}

export function Counters({ children }: { children: ReactNode }) {
  return <div className="rsg-counters">{children}</div>
}

export interface ActionLinkProps {
  href: string
  icon: IconComponent
  children: ReactNode
}

/** The full-width call to action at the bottom of a card. */
export function ActionLink({ href, icon: Icon, children }: ActionLinkProps) {
  return (
    <a
      className="rsg-btn rsg-btn-github"
      href={href}
      rel="noreferrer noopener"
      target="_blank"
    >
      <Icon className="rsg-icon" size={16} />
      <span className="rsg-text">{children}</span>
    </a>
  )
}

/**
 * The card to render instead of content, or `null` when there is data.
 *
 * Both card bodies open with the same three lines: skeleton while
 * loading, error card on failure, content otherwise. Keeping that policy
 * in one place means a change to either state lands in both cards.
 */
export function cardFallback(
  resource: { isLoading: boolean; error: Error | undefined },
  variant: string,
): ReactNode {
  if (resource.isLoading) {
    return <CardSkeleton variant={variant} />
  }

  if (resource.error) {
    return <CardError message={resource.error.message} variant={variant} />
  }

  return null
}

/**
 * Placeholder card shown while a request is in flight.
 *
 * v2 hid the component entirely (`.rsg-github-is-loading { display: none }`),
 * which made a widget pop into existence and shift the page. The class
 * name is kept so existing overrides still target the same element.
 */
function CardSkeleton({ variant }: { variant: string }) {
  return (
    <div
      aria-busy="true"
      aria-live="polite"
      className={cx('rsg-github-wrapper', 'rsg-github-is-loading', variant)}
    >
      <span className="rsg-sr-only">Loading</span>
      <div aria-hidden="true" className="rsg-avatar rsg-skeleton" />
      <div aria-hidden="true" className="rsg-skeleton rsg-skeleton--title" />
      <div aria-hidden="true" className="rsg-skeleton rsg-skeleton--line" />
      <div
        aria-hidden="true"
        className="rsg-skeleton rsg-skeleton--line rsg-skeleton--short"
      />
      <div aria-hidden="true" className="rsg-skeleton rsg-skeleton--block" />
    </div>
  )
}

/**
 * Shown when the request failed.
 *
 * v2 re-threw inside a promise chain, which surfaced as an unhandled
 * rejection in the console and left an empty element on the page.
 */
function CardError({ variant, message }: { variant: string; message: string }) {
  return (
    <div
      className={cx('rsg-github-wrapper', 'rsg-github-has-error', variant)}
      role="alert"
    >
      <p className="rsg-error-title">Could not load</p>
      <p className="rsg-error-message">{message}</p>
    </div>
  )
}
