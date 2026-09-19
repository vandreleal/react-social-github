# Migrating from 2.x

Every prop kept its name, its type and its default, and every `rsg-` class name
survived, so CSS overrides written against 2.x still apply. What follows is the
behaviour that changed.

## Version number

This release is `3.0.0`, not `2.0.0`. The last published version was `2.1.2`, so a
rewrite has to take the next major — npm will not accept a lower version.

## Install

```sh
bun add react-social-github
```

```diff
- import { Github } from 'react-social-github';
+ import { Github } from 'react-social-github'
+ import 'react-social-github/styles.css'
```

2.x shipped CSS that Babel left as a side-effect import inside the JS bundle. The
stylesheet is now a separate export, so you decide whether to load it.

## Requirements

|                | 2.1.2                                 | 3.0.0                                    |
| -------------- | ------------------------------------- | ---------------------------------------- |
| React          | 15.5                                  | 18.3 or 19                               |
| Module format  | CommonJS                              | ESM + CJS                                |
| Types          | none                                  | shipped                                  |
| Popup engine   | hand-rolled `getBoundingClientRect()` | Base UI Popover                          |
| Icons          | `react-octicons` (unmaintained)       | `@primer/octicons-react`                 |
| Emoji          | `emoji-js` (unmaintained)             | `node-emoji`                             |
| Fetch polyfill | `whatwg-fetch`                        | none — native `fetch`                    |
| Styles         | SCSS, Roboto from Google Fonts        | CSS custom properties, system font stack |

## Props that now behave as documented

- **`tooltipPosition`** was documented in the 2.x README but never read: the
  component hardcoded `let tooltipPosition = 'auto'`. It is now wired up. If you
  were passing it and relying on the popup staying under the trigger, it will now
  move.
- **`style`** was typed `PropTypes.string`. It is typed `CSSProperties`, which is
  what the code always passed to the DOM.
- **`iconWidth` / `iconHeight`** were documented as numbers and typed as strings.
  Both are accepted; a bare number is read as pixels.

## Behaviour changes

- **Loading no longer hides the component.** `.rsg-github-is-loading` was
  `display: none`, so a widget popped into existence and shifted the page. It now
  renders a skeleton. The class name is unchanged, so `display: none` is one rule
  away if you preferred it.
- **Failed requests render an error card** instead of re-throwing inside a promise
  chain. Pass `onError` to handle it yourself.
- **Responses are cached and deduped** for five minutes per URL. Four widgets for
  one account now cost one request instead of four. Call `clearGithubCache()` to
  drop them.
- **`objRepo` is no longer mutated.** 2.x wrote the truncated, emojified
  description back onto the object you passed, so re-rendering with the same
  object truncated the already-truncated text again.
- **Counters pluralise zero.** `public_gists: 0` read "Gist"; it now reads "Gists".
- **The `type="link"` trigger is a `<button>`, not an `<a href>`-less anchor.** It
  carries the same `rsg-inline-link rsg-github-tooltip-link` classes, and it is
  now reachable with the keyboard.
- **External links carry `rel="noreferrer noopener"`.**
- **Empty fields are omitted.** 2.x rendered an empty `<a>` and empty `<span>`s
  when `blog`, `company` or `location` were absent.
- **The unused releases request is gone.** 2.x fetched
  `/repos/:owner/:repo/releases` on every mount and stored the result in state
  that no `render` ever read.
- **The description is no longer italic.** The class `rsg-info--italic` still
  exists; the shadcn-derived type scale uses weight and colour for hierarchy.
- **Roboto is no longer fetched from Google Fonts.** The component uses the system
  font stack. Set `--rsg-font-sans` to put Roboto back.

## Removed

Nothing from the public API. `type="tooltip"`, which appeared in some 2.x README
examples, was never a real value — it fell through to `widget`. It still does.

## New

- `token` and `baseUrl`, for rate limits and GitHub Enterprise.
- `className` and `onError`.
- `GithubUser`, `GithubRepo`, `Widget` and `Tooltip` are exported, as are
  `useGithubUser`, `useGithubRepo`, `fetchGithubUser`, `fetchGithubRepo`,
  `clearGithubCache` and `GithubApiError`.
- Dark mode, via `.dark` / `[data-theme="dark"]` / `prefers-color-scheme`.
- `prefers-reduced-motion` is respected by the popup transition and the skeleton.
