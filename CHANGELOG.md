# Changelog

## 3.0.0

Full rewrite. The public API is unchanged — see [MIGRATION.md](./MIGRATION.md).

### Changed

- Rebuilt in TypeScript on React 18.3/19 function components. 2.x used React 15
  class components and three lifecycle methods that React has since removed
  (`componentWillMount`, `componentWillReceiveProps`).
- The popup is Base UI's Popover. 2.x positioned it by reading
  `getBoundingClientRect()` on every render and writing `fixed` offsets, with no
  focus management, no dismissal handling and no collision logic beyond a
  viewport-half comparison.
- The design follows shadcn/ui: an oklch neutral palette, one radius scale, muted
  secondary text, `focus-visible` rings, and light and dark ramps.
- Styles ship as `react-social-github/styles.css` instead of being imported as a
  side effect of the JS.
- Icons come from `@primer/octicons-react`, emoji from `node-emoji`.
- Requests are cached and deduped for five minutes.

### Added

- Type declarations.
- `token`, `baseUrl`, `className` and `onError` props.
- Loading skeletons and error cards.
- Dark mode and `prefers-reduced-motion` support.
- The card bodies, shells, hooks and fetch helpers are exported.

### Removed

- `whatwg-fetch`, `emoji-js`, `react-octicons`,
  `react-addons-css-transition-group` and `prop-types`.
- The Google Fonts request for Roboto.
- The releases request that was issued on every mount and never rendered.

### Fixed

- `tooltipPosition` is read. It was documented in 2.x but never used.
- `objRepo` is no longer mutated in place.
- The FAB class list is no longer concatenated without a separator
  (`rsg-github-tooltip-buttonrsg-btn`).
- Counters pluralise zero.
- External links carry `rel="noreferrer noopener"`.
- The inline trigger is keyboard-reachable.

## 2.1.2 and earlier

See the commit history.
