import {
  CodeSquareIcon,
  MarkGithubIcon,
  OrganizationIcon,
  RepoIcon,
} from '@primer/octicons-react'
import { useGithubUser } from '../../hooks/use-github'
import type { GithubFetchOptions, GithubUserData } from '../../types'
import {
  ActionLink,
  Avatar,
  cardFallback,
  CardShell,
  Counter,
  Counters,
} from '../shared/CardParts'
import './GithubUser.css'

const VARIANT = 'rsg-github-user'

export interface GithubUserProps extends GithubFetchOptions {
  /** Login to fetch. Ignored when `objUser` is set. */
  name?: string | undefined
  /** A user object to render without issuing a request. */
  objUser?: GithubUserData | undefined
  onError?: ((error: Error) => void) | undefined
}

/**
 * Prefixes a bare host with a scheme.
 *
 * GitHub stores the `blog` field exactly as the user typed it, so it is
 * routinely "example.com" with no scheme — which a browser would treat
 * as a relative path.
 */
export function fixHttp(url: string | null | undefined): string | undefined {
  if (!url) {
    return undefined
  }

  return /^https?:\/\//i.test(url) ? url : `https://${url}`
}

/** The profile card for a user or an organization. */
export function GithubUser({ name, objUser, token, baseUrl, onError }: GithubUserProps) {
  const resource = useGithubUser(name, { objUser, token, baseUrl, onError })

  const fallback = cardFallback(resource, VARIANT)
  if (fallback) {
    return fallback
  }

  const user = resource.data ?? {}
  const login = user.login ?? name ?? ''
  const blog = fixHttp(user.blog)
  const profileUrl = user.html_url ?? `https://github.com/${login}`

  return (
    <CardShell variant={VARIANT}>
      <Avatar alt={login} src={user.avatar_url} />

      <span className="rsg-name">{user.name ?? login}</span>

      {user.hireable ? (
        <div className="rsg-status">
          <span className="rsg-available">Available for hire</span>
        </div>
      ) : null}

      {blog ? (
        <a className="rsg-info" href={blog} rel="noreferrer noopener" target="_blank">
          {user.blog}
        </a>
      ) : null}

      {user.company ? <span className="rsg-info">{user.company}</span> : null}
      {user.location ? <span className="rsg-info">{user.location}</span> : null}

      <Counters>
        <Counter icon={RepoIcon} label="Repo" value={user.public_repos} />
        <Counter icon={CodeSquareIcon} label="Gist" value={user.public_gists} />
      </Counters>

      {login && user.type === 'Organization' ? (
        <ActionLink href={profileUrl} icon={OrganizationIcon}>
          View @{login}
        </ActionLink>
      ) : null}

      {login && user.type !== 'Organization' ? (
        <ActionLink href={profileUrl} icon={MarkGithubIcon}>
          Follow @{login}
        </ActionLink>
      ) : null}
    </CardShell>
  )
}
