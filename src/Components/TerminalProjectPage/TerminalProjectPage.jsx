import { useEffect, useState } from 'react'
import Info from '../Info/Info'
import './TerminalProjectPage.css'

const getViewportWidth = () => {
  if (typeof window === 'undefined') {
    return Number.POSITIVE_INFINITY
  }

  return window.innerWidth
}

export default function TerminalProjectPage({ project, children }) {
  const [viewportWidth, setViewportWidth] = useState(getViewportWidth)
  const minimumViewportWidth = project.minimumViewportWidth ?? 0
  const showTerminal = viewportWidth >= minimumViewportWidth

  useEffect(() => {
    const handleResize = () => {
      setViewportWidth(getViewportWidth())
    }

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return (
    <section className="terminal-project-page" aria-labelledby={`${project.id}-page-title`}>
      <header className="terminal-project-page__header">
        <div className="terminal-project-page__summary">
          <span className="terminal-project-page__kicker">{project.label}</span>
          <h1 id={`${project.id}-page-title`}>{project.name}</h1>
          <p>{project.summary}</p>
          <ul className="terminal-project-page__tags" aria-label={`${project.name} capabilities`}>
            {project.tags.map((tag) => (
              <li key={tag}>{tag}</li>
            ))}
          </ul>
        </div>

        <a
          className="terminal-project-page__source"
          href={project.sourceUrl}
          target="_blank"
          rel="noreferrer"
          aria-label={project.sourceAria}
        >
          <span className="bi bi-github" aria-hidden="true"></span>
          {project.sourceLabel}
        </a>
      </header>

      <Info hidden={showTerminal} project={project} />

      {showTerminal && (
        <div className="terminal-project-page__stage">
          {children}
        </div>
      )}
    </section>
  )
}
