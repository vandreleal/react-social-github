import type { CSSProperties, ReactNode } from 'react'

/** Which shell the GitHub card is rendered in. */
export type GithubType = 'widget' | 'link' | 'button'

/** Viewport corner a floating action button is pinned to. */
export type FabCorner = 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right'

/**
 * Preferred side for the popup. `auto` lets it flip away from viewport
 * edges; every other value is honoured even when it overflows, which is
 * what `tooltipPosition` meant in v2.
 */
export type TooltipPosition = 'auto' | 'top' | 'right' | 'bottom' | 'left'

/**
 * The subset of the GitHub users API this component reads.
 *
 * Extra fields returned by the API are preserved — pass a full response
 * object to `objUser` and only these keys are touched.
 *
 * @see https://docs.github.com/en/rest/users/users
 */
export interface GithubUserData {
  login?: string
  name?: string | null
  avatar_url?: string
  html_url?: string
  blog?: string | null
  company?: string | null
  location?: string | null
  hireable?: boolean | null
  public_repos?: number
  public_gists?: number
  type?: 'User' | 'Organization' | (string & {})
  [key: string]: unknown
}

/**
 * The subset of the GitHub repositories API this component reads.
 *
 * @see https://docs.github.com/en/rest/repos/repos
 */
export interface GithubRepoData {
  name?: string
  full_name?: string
  html_url?: string
  description?: string | null
  language?: string | null
  stargazers_count?: number
  forks?: number
  owner?: GithubUserData
  [key: string]: unknown
}

/** Options shared by every network-backed part of the component. */
export interface GithubFetchOptions {
  /**
   * Personal access token used to lift the 60 requests/hour limit that
   * GitHub applies to unauthenticated browser traffic.
   *
   * Only send a token that is safe to expose to end users — anything
   * passed here is readable in the browser's network panel.
   */
  token?: string
  /**
   * Base URL of the GitHub REST API. Point it at a GitHub Enterprise
   * host, or at a proxy of your own that keeps the token server-side.
   *
   * @default 'https://api.github.com'
   */
  baseUrl?: string
}

export interface GithubProps extends GithubFetchOptions {
  /** User or organization login to show info about. */
  user?: string
  /** Repository name to show info about. Requires `user`. */
  repo?: string
  /**
   * A user or organization object to render directly. When set, `user`
   * is not considered and no request is made.
   */
  objUser?: GithubUserData
  /**
   * A repository object to render directly. When set, `user` and `repo`
   * are not considered and no request is made.
   */
  objRepo?: GithubRepoData
  /** @default 'widget' */
  type?: GithubType
  /**
   * Text of the inline link.
   *
   * @default 'Github'
   */
  linkText?: string
  /**
   * Colour of the button icon — any CSS colour value.
   *
   * @default 'currentColor'
   */
  iconColor?: string
  /**
   * Width of the button icon. Bare numbers are read as pixels.
   *
   * @default 48
   */
  iconWidth?: number | string
  /**
   * Height of the button icon. Bare numbers are read as pixels.
   *
   * @default 48
   */
  iconHeight?: number | string
  /** Pin the button to a viewport corner as a floating action button. */
  fab?: boolean
  /** @default 'bottom-right' */
  fabCorner?: FabCorner
  /** @default 'auto' */
  tooltipPosition?: TooltipPosition
  /**
   * Open the popup on pointer hover as well as on press.
   *
   * Ignored for `type="link"`, which is hover-first by definition.
   *
   * @default true
   */
  tooltipOnHover?: boolean
  /** Forwarded to the root element. */
  id?: string
  /** Forwarded to the root element. */
  style?: CSSProperties
  /** Appended to the root element's class list. */
  className?: string
  /** Content of the inline link, when `type="link"`. */
  children?: ReactNode
  /** Called when a request fails, instead of the error being thrown. */
  onError?: (error: Error) => void
}
