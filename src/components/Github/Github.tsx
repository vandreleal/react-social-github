import type { CSSProperties, ReactNode } from 'react'
import { MarkGithubIcon } from '@primer/octicons-react'
import { cx, toCssLength } from '../../lib/class-names'
import type { GithubProps } from '../../types'
import { GithubRepo } from '../GithubRepo/GithubRepo'
import { GithubUser } from '../GithubUser/GithubUser'
import { Tooltip } from '../Tooltip/Tooltip'
import { Widget } from '../Widget/Widget'
import './Github.css'

/**
 * Decides which card the props describe.
 *
 * The precedence is v2's, unchanged: an object always beats a string,
 * and anything repository-shaped beats anything user-shaped. So
 * `objRepo` > `repo` > `objUser` > `user`.
 */
function resolveCard(props: GithubProps): ReactNode {
  const { user, repo, objUser, objRepo, token, baseUrl, onError } = props
  const fetchOptions = { token, baseUrl, onError }

  if (objRepo) {
    return <GithubRepo objRepo={objRepo} {...fetchOptions} />
  }

  if (typeof repo === 'string') {
    return <GithubRepo repo={repo} user={user} {...fetchOptions} />
  }

  if (objUser) {
    return <GithubUser objUser={objUser} {...fetchOptions} />
  }

  if (typeof user === 'string') {
    return <GithubUser name={user} {...fetchOptions} />
  }

  return null
}

/**
 * Showcase a GitHub profile, organization or repository.
 *
 * Three shells, selected with `type`:
 * - `widget` (default) renders the card inline, in the document flow.
 * - `link` renders an inline trigger that reveals the card on hover.
 * - `button` renders an icon button — optionally a floating action
 *   button pinned to a viewport corner — that reveals the card on press
 *   and, unless `tooltipOnHover={false}`, on hover.
 */
export function Github(props: GithubProps) {
  const {
    type = 'widget',
    linkText = 'Github',
    iconColor,
    iconWidth,
    iconHeight,
    fab = false,
    fabCorner = 'bottom-right',
    tooltipPosition = 'auto',
    tooltipOnHover = true,
    id,
    style,
    className,
    children,
  } = props

  const card = resolveCard(props)

  let shell: ReactNode

  if (type === 'button') {
    const iconStyle = {
      '--rsg-icon-width': toCssLength(iconWidth) ?? '48px',
      '--rsg-icon-height': toCssLength(iconHeight) ?? '48px',
      ...(iconColor ? { color: iconColor } : {}),
    } as CSSProperties

    shell = (
      <div
        className={cx(
          'rsg-github-tooltip-button',
          fab && 'rsg-btn rsg-btn-fab',
          fab && `rsg-btn-fab--${fabCorner}`,
        )}
      >
        <Tooltip
          openOnHover={tooltipOnHover}
          position={tooltipPosition}
          trigger={
            <button
              aria-label="Show GitHub details"
              className="rsg-btn rsg-btn-icon"
              style={iconStyle}
              type="button"
            >
              <MarkGithubIcon className="rsg-icon-glyph" />
            </button>
          }
        >
          {card}
        </Tooltip>
      </div>
    )
  } else if (type === 'link') {
    shell = (
      <Tooltip
        openOnHover
        position={tooltipPosition}
        trigger={
          <button className="rsg-inline-link rsg-github-tooltip-link" type="button">
            {children ?? linkText}
          </button>
        }
      >
        {card}
      </Tooltip>
    )
  } else {
    shell = <Widget>{card}</Widget>
  }

  return (
    <div
      className={cx('rsg-github', `rsg-github-tooltip-${type}`, className)}
      id={id}
      style={style}
    >
      {shell}
    </div>
  )
}
