# React Social Github

[![CI](https://github.com/vandreleal/react-social-github/actions/workflows/ci.yml/badge.svg)](https://github.com/vandreleal/react-social-github/actions/workflows/ci.yml)
[![NPM Version](https://badge.fury.io/js/react-social-github.svg)](http://badge.fury.io/js/react-social-github)

Showcase your GitHub profile, organization or repository information.

Built on [Base UI](https://base-ui.com) for the popup mechanics, and styled after
[shadcn/ui](https://ui.shadcn.com) — a neutral oklch palette, a single radius scale,
muted secondary text and visible focus rings, in light and dark.

## Install

```sh
bun add react-social-github
# or: npm install react-social-github
```

React 18.3 or 19 is a peer dependency.

## Usage

```jsx
import { Github } from 'react-social-github'
import 'react-social-github/styles.css'

;<Github user="facebook" repo="react" />
```

The stylesheet is a separate entry so you can skip it and write your own, or import
it once at the root of your app. Everything it defines is prefixed `rsg-`.

## Reference

### Options

| Name        | Type                             | Default                  | Description                                                                                  |
| ----------- | -------------------------------- | ------------------------ | -------------------------------------------------------------------------------------------- |
| `user`      | `string`                         | —                        | The user or organization to show info about.                                                 |
| `repo`      | `string`                         | —                        | The repository to show info about. Requires `user`.                                          |
| `objUser`   | `GithubUserData`                 | —                        | A user or organization object to render directly. `user` is not considered when it is set.   |
| `objRepo`   | `GithubRepoData`                 | —                        | A repository object to render directly. `user` and `repo` are not considered when it is set. |
| `type`      | `'widget' \| 'link' \| 'button'` | `'widget'`               | Which shell the card is rendered in.                                                         |
| `id`        | `string`                         | —                        | Forwarded to the root element.                                                               |
| `style`     | `CSSProperties`                  | —                        | Forwarded to the root element.                                                               |
| `className` | `string`                         | —                        | Appended to the root element's class list.                                                   |
| `token`     | `string`                         | —                        | GitHub token, to lift the unauthenticated rate limit. See [Rate limits](#rate-limits).       |
| `baseUrl`   | `string`                         | `https://api.github.com` | GitHub Enterprise host, or your own proxy.                                                   |
| `onError`   | `(error: Error) => void`         | —                        | Called when a request fails.                                                                 |

When more than one source is given, the most specific wins: `objRepo` → `repo` →
`objUser` → `user`.

## Types

### Widget

The card is rendered inline, in the document flow. This is the default type and
requires no configuration.

```jsx
;<Github user="facebook" repo="react" />

{
  /* same as */
}

;<Github user="facebook" repo="react" type="widget" />
```

### Link

The card is anchored to an inline trigger and revealed on hover, on focus or on
press. `type="link"` must be declared.

```jsx
<Github user="hackbit" type="link">Hover Here</Github>

<Github user="vandreleal" repo="vandreleal.github.io" type="link" linkText="Hover Here" />
```

#### Options

| Name       | Type     | Default    | Description                                               |
| ---------- | -------- | ---------- | --------------------------------------------------------- |
| `linkText` | `string` | `'Github'` | Link text. `children` takes precedence when both are set. |

### Button

The card is anchored to an icon button, optionally pinned to a viewport corner as
a floating action button. `type="button"` must be declared.

```jsx
<Github
  user="facebook"
  type="button"
  tooltipOnHover={false}
  fab
  fabCorner="top-left"
  iconColor="#3b5998"
  iconWidth={64}
  iconHeight={64}
/>

<Github user="GustavoKatel" type="button" fab fabCorner="bottom-left" iconWidth={32} iconHeight={32} />
```

#### Options

| Name              | Type                                                           | Default          | Description                                            |
| ----------------- | -------------------------------------------------------------- | ---------------- | ------------------------------------------------------ |
| `iconColor`       | `string`                                                       | `currentColor`   | Any CSS colour value.                                  |
| `iconWidth`       | `number \| string`                                             | `48`             | A bare number is read as pixels.                       |
| `iconHeight`      | `number \| string`                                             | `48`             | A bare number is read as pixels.                       |
| `fab`             | `boolean`                                                      | `false`          | Pin the button to a viewport corner.                   |
| `fabCorner`       | `'bottom-right' \| 'bottom-left' \| 'top-right' \| 'top-left'` | `'bottom-right'` | Which corner.                                          |
| `tooltipPosition` | `'auto' \| 'top' \| 'right' \| 'bottom' \| 'left'`             | `'auto'`         | Preferred side. `auto` flips away from viewport edges. |
| `tooltipOnHover`  | `boolean`                                                      | `true`           | Open on hover as well as on press.                     |

`tooltipPosition` and `tooltipOnHover` apply to `type="link"` too, except that a
link always opens on hover.

## Theming

Every colour, radius and shadow is a CSS custom property on `:root`. Override the
ones you want, anywhere the cascade reaches the component:

```css
:root {
  --rsg-radius: 0.25rem;
  --rsg-border: oklch(0.89 0.02 260);
  --rsg-card: oklch(0.99 0.005 260);
}
```

Dark mode follows a `.dark` or `[data-theme="dark"]` ancestor — the convention
shadcn apps already use — and falls back to `prefers-color-scheme` when neither is
present. Set `[data-theme="light"]` to opt a subtree out.

The full list lives in [`src/styles/tokens.css`](./src/styles/tokens.css).

## Rate limits

GitHub allows 60 requests per hour to unauthenticated browser clients, per IP.
Responses are cached in memory for five minutes and concurrent requests for the
same URL are deduped, so a page with several widgets for one account costs one
request.

For heavier pages, pass a token — but only one that is safe to expose, since
anything sent from the browser is readable in the network panel:

```jsx
<Github user="facebook" token={publicReadOnlyToken} />
```

The safer arrangement is a proxy of your own that holds the token server-side:

```jsx
<Github user="facebook" baseUrl="https://example.com/api/github" />
```

## Bundle size

|                  | gzip     |
| ---------------- | -------- |
| `dist/index.js`  | ~17.6 kB |
| `dist/index.css` | ~2.1 kB  |

About 14 kB of the JS is the emoji table that turns `:rocket:` in a repository
description into 🚀. It is generated from `node-emoji` at development time
(`bun run gen:emoji`) rather than depending on it at runtime: `emojilib`'s search
keywords would have cost 44 kB gzip on their own, eleven times the rest of the
library, for a feature that only rewrites shortcodes.

`react`, `react-dom`, `@base-ui/react` and `@primer/octicons-react` are external
and are not counted here.

## Lower-level exports

The cards, the hooks and the fetch helpers are exported too, for when you want the
data without the shell:

```jsx
import { useGithubUser, fetchGithubRepo, GithubApiError } from 'react-social-github'

const { data, isLoading, error } = useGithubUser('facebook')
```

| Export                               | What it is                            |
| ------------------------------------ | ------------------------------------- |
| `Github`                             | The component.                        |
| `GithubUser`, `GithubRepo`           | The two card bodies, without a shell. |
| `Widget`, `Tooltip`                  | The shells.                           |
| `useGithubUser`, `useGithubRepo`     | The data hooks.                       |
| `fetchGithubUser`, `fetchGithubRepo` | The cached fetch helpers.             |
| `clearGithubCache`                   | Drops every cached response.          |
| `GithubApiError`                     | Carries `status` and `url`.           |

## Upgrading from 2.x

The props are unchanged. See [MIGRATION.md](./MIGRATION.md) for the behaviour that
did change, and why.

## Development

```sh
bun install
bun run playground   # live playground on http://localhost:5173
bun run check        # typecheck + lint + format + tests
bun run build        # dist/index.js, dist/index.cjs, dist/index.css, types
```

## Open source

React Social Github is available on GitHub for downloading, forking, or contributing.

## License

[The MIT License (MIT)](https://github.com/vandreleal/react-social-github/blob/master/LICENSE.MD)
