import './styles/tokens.css'

export { Github } from './components/Github/Github'
export { GithubRepo, type GithubRepoProps } from './components/GithubRepo/GithubRepo'
export { GithubUser, type GithubUserProps } from './components/GithubUser/GithubUser'
export { Tooltip, type TooltipProps } from './components/Tooltip/Tooltip'
export { Widget, type WidgetProps } from './components/Widget/Widget'

export { useGithubRepo, type UseGithubRepoOptions } from './hooks/use-github-repo'
export { useGithubUser, type UseGithubUserOptions } from './hooks/use-github-user'
export type { AsyncResource } from './hooks/use-github-resource'

export {
  clearGithubCache,
  fetchGithubRepo,
  fetchGithubUser,
  GithubApiError,
} from './lib/github-api'

export type {
  FabCorner,
  GithubFetchOptions,
  GithubProps,
  GithubRepoData,
  GithubType,
  GithubUserData,
  TooltipPosition,
} from './types'
