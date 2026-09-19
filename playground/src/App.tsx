import { useEffect, useState } from 'react'
import { Github } from 'react-social-github'
import { Playground } from './Playground'

type Theme = 'light' | 'dark'

function initialTheme(): Theme {
  return globalThis.matchMedia?.('(prefers-color-scheme: dark)').matches
    ? 'dark'
    : 'light'
}

export function App() {
  const [theme, setTheme] = useState<Theme>(initialTheme)

  useEffect(() => {
    document.documentElement.dataset.theme = theme
  }, [theme])

  return (
    <div className="page">
      <header className="masthead">
        <div>
          <h1 className="title">React Social Github</h1>
          <p className="subtitle">
            Showcase your GitHub profile, organization or repository information.
          </p>
        </div>

        <button
          className="theme-toggle"
          onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          type="button"
        >
          {theme === 'dark' ? 'Light' : 'Dark'} mode
        </button>
      </header>

      <Playground />

      <section className="examples">
        <h2 className="panel-title">Every type, side by side</h2>

        <div className="example-grid">
          <figure className="example">
            <Github user="facebook" />
            <figcaption>
              <code>&lt;Github user="facebook" /&gt;</code>
            </figcaption>
          </figure>

          <figure className="example">
            <Github repo="react" user="facebook" />
            <figcaption>
              <code>&lt;Github user="facebook" repo="react" /&gt;</code>
            </figcaption>
          </figure>

          <figure className="example">
            <p className="prose">
              The inline trigger sits in a sentence, like this{' '}
              <Github type="link" user="vandreleal">
                hover here
              </Github>{' '}
              — and reveals the card on hover or on press.
            </p>
            <figcaption>
              <code>&lt;Github user="vandreleal" type="link" /&gt;</code>
            </figcaption>
          </figure>

          <figure className="example">
            <Github iconHeight={32} iconWidth={32} type="button" user="vercel" />
            <figcaption>
              <code>&lt;Github user="vercel" type="button" iconWidth={32} /&gt;</code>
            </figcaption>
          </figure>
        </div>
      </section>

      <footer className="footer">
        <a href="https://github.com/vandreleal/react-social-github">
          github.com/vandreleal/react-social-github
        </a>
      </footer>

      <Github fab repo="react-social-github" type="button" user="vandreleal" />
    </div>
  )
}
