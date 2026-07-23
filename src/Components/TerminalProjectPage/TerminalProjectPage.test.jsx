import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { getLocalizedProject, projectIds } from '../../content/projects'
import { translations } from '../../MattediWorks/translation/i18n'
import TerminalProjectPage from './TerminalProjectPage'

function setViewportWidth(width) {
  Object.defineProperty(window, 'innerWidth', {
    configurable: true,
    value: width,
  })
}

describe('TerminalProjectPage', () => {
  it('renders project title, summary, tags, source link, and live terminal stage above the threshold', () => {
    const project = getLocalizedProject(projectIds.consoleAdventure, translations.en)
    setViewportWidth(1200)

    render(
      <TerminalProjectPage project={project}>
        <div>Console Adventure live terminal</div>
      </TerminalProjectPage>,
    )

    expect(screen.getByRole('heading', { name: 'Console Adventure' })).toBeInTheDocument()
    expect(screen.getByText(project.summary)).toBeInTheDocument()
    expect(screen.getByText('Fantasy RPG')).toBeInTheDocument()
    expect(screen.getByText('Console Adventure live terminal')).toBeInTheDocument()
    expect(screen.getByText(project.widthWarning).closest('.info-panel')).toHaveClass('info-panel--hidden')
    expect(screen.getByRole('link', { name: /open console adventure source/i })).toHaveAttribute(
      'href',
      'https://github.com/vtmattedi/ConsoleAdventure',
    )
  })

  it('renders the reusable narrow fallback and does not mount the terminal stage below the threshold', () => {
    const project = getLocalizedProject(projectIds.rtsim, translations.en)
    setViewportWidth(500)

    render(
      <TerminalProjectPage project={project}>
        <div>RTSim live terminal</div>
      </TerminalProjectPage>,
    )

    expect(screen.getByRole('heading', { name: 'RTSim' })).toBeInTheDocument()
    expect(screen.getByText(project.widthWarning).closest('.info-panel')).not.toHaveClass('info-panel--hidden')
    expect(screen.getByText(/60-column terminal scene/i)).toBeInTheDocument()
    expect(screen.queryByText('RTSim live terminal')).not.toBeInTheDocument()
    expect(screen.getAllByRole('img', { name: /RTSim scheduler screenshot/i }).length).toBeGreaterThan(0)
  })
})
