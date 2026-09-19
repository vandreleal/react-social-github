import { useMemo } from 'react'
import { RepoForkedIcon, RepoIcon, StarIcon } from '@primer/octicons-react'
import { useGithubRepo } from '../../hooks/use-github-repo'
import { replaceEmoji } from '../../lib/emoji'
import { truncate } from '../../lib/truncate'
import type { GithubFetchOptions, GithubRepoData } from '../../types'
import {
  ActionLink,
  Avatar,
  cardFallback,
  CardShell,
  Counter,
  Counters,
} from '../shared/CardParts'
import './GithubRepo.css'

const VARIANT = 'rsg-github-repo'

export interface GithubRepoProps extends GithubFetchOptions {
  /** Owner login. Ignored when `objRepo` is set. */
  user?: string | undefined
  /** Repository name. Ignored when `objRepo` is set. */
  repo?: string | undefined
  /** A repository object to render without issuing a request. */
  objRepo?: GithubRepoData | undefined
  onError?: ((error: Error) => void) | undefined
}

/** The card for a single repository. */
export function GithubRepo({
  user,
  repo,
  objRepo,
  token,
  baseUrl,
  onError,
}: GithubRepoProps) {
  const resource = useGithubRepo(user, repo, { objRepo, token, baseUrl, onError })

  /**
   * v2 mutated `props.objRepo.description` in place while formatting it,
   * so a caller's own object was rewritten — and re-rendering with the
   * same object truncated the already-truncated text again. Derive it
   * instead and leave the input untouched.
   */
  const description = useMemo(
    () => replaceEmoji(truncate(resource.data?.description)),
    [resource.data?.description],
  )

  const fallback = cardFallback(resource, VARIANT)
  if (fallback) {
    return fallback
  }

  const repository = resource.data ?? {}
  const owner = repository.owner ?? {}
  const fullName =
    repository.full_name ?? (user && repo ? `${user}/${repo}` : (repository.name ?? ''))
  const repoUrl = repository.html_url ?? `https://github.com/${fullName}`

  return (
    <CardShell variant={VARIANT}>
      <Avatar alt={owner.login ?? fullName} src={owner.avatar_url} />

      <span className="rsg-name">{fullName}</span>

      {repository.language ? (
        <span className="rsg-info rsg-info--secondary">{repository.language}</span>
      ) : null}

      {description ? <p className="rsg-info rsg-info--italic">{description}</p> : null}

      <Counters>
        <Counter icon={StarIcon} label="Star" value={repository.stargazers_count} />
        <Counter icon={RepoForkedIcon} label="Fork" value={repository.forks} />
      </Counters>

      {fullName ? (
        <ActionLink href={repoUrl} icon={RepoIcon}>
          View Repository
        </ActionLink>
      ) : null}
    </CardShell>
  )
}
