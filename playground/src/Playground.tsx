import { useMemo, useState } from 'react'
import {
  Github,
  type FabCorner,
  type GithubType,
  type TooltipPosition,
} from 'react-social-github'

const TYPES: Array<{ value: GithubType; label: string }> = [
  { value: 'widget', label: 'Widget' },
  { value: 'link', label: 'Link' },
  { value: 'button', label: 'Button' },
]

const FAB_CORNERS: Array<{ value: FabCorner; label: string }> = [
  { value: 'top-left', label: 'Top left' },
  { value: 'top-right', label: 'Top right' },
  { value: 'bottom-left', label: 'Bottom left' },
  { value: 'bottom-right', label: 'Bottom right' },
]

const POSITIONS: Array<{ value: TooltipPosition; label: string }> = [
  { value: 'auto', label: 'Auto' },
  { value: 'top', label: 'Top' },
  { value: 'right', label: 'Right' },
  { value: 'bottom', label: 'Bottom' },
  { value: 'left', label: 'Left' },
]

interface Config {
  user: string
  repo: string
  type: GithubType
  linkText: string
  iconColor: string
  iconWidth: string
  iconHeight: string
  fab: boolean
  fabCorner: FabCorner
  tooltipPosition: TooltipPosition
  tooltipOnHover: boolean
}

const INITIAL: Config = {
  user: 'facebook',
  repo: 'react',
  type: 'widget',
  linkText: '',
  iconColor: '',
  iconWidth: '',
  iconHeight: '',
  fab: false,
  fabCorner: 'bottom-right',
  tooltipPosition: 'auto',
  tooltipOnHover: true,
}

/** Renders the JSX a given config corresponds to. */
function toSnippet(config: Config): string {
  const props: Array<[string, string | boolean]> = []

  if (config.user) props.push(['user', config.user])
  if (config.repo) props.push(['repo', config.repo])
  if (config.type !== 'widget') props.push(['type', config.type])
  if (config.type === 'link' && config.linkText) props.push(['linkText', config.linkText])

  if (config.type === 'button') {
    if (config.iconColor) props.push(['iconColor', config.iconColor])
    if (config.iconWidth) props.push(['iconWidth', config.iconWidth])
    if (config.iconHeight) props.push(['iconHeight', config.iconHeight])
    if (config.fab) {
      props.push(['fab', true])
      props.push(['fabCorner', config.fabCorner])
    }
    if (!config.tooltipOnHover) props.push(['tooltipOnHover', false])
  }

  if (config.type !== 'widget' && config.tooltipPosition !== 'auto') {
    props.push(['tooltipPosition', config.tooltipPosition])
  }

  const attributes = props
    .map(([key, value]) =>
      typeof value === 'boolean' ? (value ? key : `${key}={false}`) : `${key}="${value}"`,
    )
    .join(' ')

  return `<Github ${attributes} />`
}

export function Playground() {
  const [config, setConfig] = useState<Config>(INITIAL)

  const update = <K extends keyof Config>(key: K, value: Config[K]) =>
    setConfig((current) => ({ ...current, [key]: value }))

  const snippet = useMemo(() => toSnippet(config), [config])
  const isButton = config.type === 'button'
  const isLink = config.type === 'link'

  // Remounts the component when the identity of the request changes, so
  // switching account does not show the previous card while loading.
  const key = `${config.user}/${config.repo}/${config.type}`

  return (
    <section className="playground">
      <div className="panel">
        <h2 className="panel-title">GitHub info</h2>

        <label className="field">
          <span className="field-label">User or organization</span>
          <input
            className="input"
            onChange={(event) => update('user', event.target.value)}
            placeholder="facebook"
            value={config.user}
          />
        </label>

        <label className="field">
          <span className="field-label">Repository</span>
          <input
            className="input"
            onChange={(event) => update('repo', event.target.value)}
            placeholder="react"
            value={config.repo}
          />
          <span className="field-hint">
            {config.repo && !config.user
              ? 'A repository needs a user.'
              : 'Leave empty to show the profile card.'}
          </span>
        </label>

        <label className="field">
          <span className="field-label">Type</span>
          <select
            className="input"
            onChange={(event) => update('type', event.target.value as GithubType)}
            value={config.type}
          >
            {TYPES.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </label>
      </div>

      <div className="panel">
        <h2 className="panel-title">Options</h2>

        {config.type === 'widget' ? (
          <p className="empty">
            Switch to <code>Link</code> or <code>Button</code> for more options.
          </p>
        ) : null}

        {isLink ? (
          <label className="field">
            <span className="field-label">Link text</span>
            <input
              className="input"
              onChange={(event) => update('linkText', event.target.value)}
              placeholder="Github"
              value={config.linkText}
            />
          </label>
        ) : null}

        {isButton ? (
          <>
            <label className="field">
              <span className="field-label">Icon color</span>
              <input
                className="input"
                onChange={(event) => update('iconColor', event.target.value)}
                placeholder="#3b5998"
                value={config.iconColor}
              />
            </label>

            <div className="field-row">
              <label className="field">
                <span className="field-label">Icon width</span>
                <input
                  className="input"
                  onChange={(event) => update('iconWidth', event.target.value)}
                  placeholder="48px"
                  value={config.iconWidth}
                />
              </label>

              <label className="field">
                <span className="field-label">Icon height</span>
                <input
                  className="input"
                  onChange={(event) => update('iconHeight', event.target.value)}
                  placeholder="48px"
                  value={config.iconHeight}
                />
              </label>
            </div>

            <label className="switch">
              <input
                checked={config.fab}
                onChange={(event) => update('fab', event.target.checked)}
                type="checkbox"
              />
              <span>Floating action button</span>
            </label>

            {config.fab ? (
              <label className="field">
                <span className="field-label">FAB corner</span>
                <select
                  className="input"
                  onChange={(event) =>
                    update('fabCorner', event.target.value as FabCorner)
                  }
                  value={config.fabCorner}
                >
                  {FAB_CORNERS.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </label>
            ) : null}

            <label className="switch">
              <input
                checked={config.tooltipOnHover}
                onChange={(event) => update('tooltipOnHover', event.target.checked)}
                type="checkbox"
              />
              <span>Open on hover</span>
            </label>
          </>
        ) : null}

        {config.type !== 'widget' ? (
          <label className="field">
            <span className="field-label">Tooltip position</span>
            <select
              className="input"
              onChange={(event) =>
                update('tooltipPosition', event.target.value as TooltipPosition)
              }
              value={config.tooltipPosition}
            >
              {POSITIONS.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </label>
        ) : null}
      </div>

      <div className="panel">
        <h2 className="panel-title">Preview</h2>
        <div className="preview">
          <Github
            key={key}
            fab={config.fab}
            fabCorner={config.fabCorner}
            iconColor={config.iconColor || undefined}
            iconHeight={config.iconHeight || undefined}
            iconWidth={config.iconWidth || undefined}
            linkText={config.linkText || undefined}
            repo={config.repo || undefined}
            tooltipOnHover={config.tooltipOnHover}
            tooltipPosition={config.tooltipPosition}
            type={config.type}
            user={config.user || undefined}
          />
        </div>
      </div>

      <div className="panel panel--wide">
        <h2 className="panel-title">Generated code</h2>
        <pre className="code">{snippet}</pre>
      </div>
    </section>
  )
}
