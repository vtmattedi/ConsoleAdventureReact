import { fireEvent, render, screen } from '@testing-library/react'
import { createMemoryRouter, Navigate, RouterProvider } from 'react-router-dom'
import { beforeEach, describe, expect, it } from 'vitest'
import App from './App'
import Home from './home'
import NotFound from './Components/AppShell/NotFound'

function renderRoute(path) {
  const router = createMemoryRouter(
    [
      {
        path: '/',
        element: <App />,
        children: [
          {
            index: true,
            element: <Home />,
          },
          {
            path: 'console-adventure',
            element: <div>Console Adventure Route</div>,
          },
          {
            path: 'game',
            element: <Navigate to="/console-adventure" replace />,
          },
          {
            path: 'rtsim',
            element: <div>RTSim Route</div>,
          },
          {
            path: '*',
            element: <NotFound />,
          },
        ],
      },
    ],
    {
      initialEntries: [path],
    },
  )

  render(<RouterProvider router={router} />)

  return router
}

describe('app shell routing', () => {
  beforeEach(() => {
    window.localStorage.clear()
    document.documentElement.className = ''
    delete document.documentElement.dataset.theme
    delete document.documentElement.dataset.themePreference
  })

  it('renders the home catalog inside the shell', () => {
    renderRoute('/')

    expect(screen.getAllByText('Terminal Applications')).not.toHaveLength(0)
    expect(screen.getByRole('button', { name: /play console adventure/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /scheduler simulator/i })).toBeInTheDocument()
  })

  it('redirects the legacy game route to Console Adventure', async () => {
    renderRoute('/game')

    expect(await screen.findByText('Console Adventure Route')).toBeInTheDocument()
  })

  it('renders a not-found page under the shell', () => {
    renderRoute('/missing-route')

    expect(screen.getByRole('heading', { name: /page not found/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /back home/i })).toBeInTheDocument()
  })

  it('persists theme selections and updates the document theme state', () => {
    renderRoute('/')

    const light = screen.getByRole('button', { name: 'Light' })
    const dark = screen.getByRole('button', { name: 'Dark' })
    const system = screen.getByRole('button', { name: 'System' })

    fireEvent.click(light)

    expect(window.localStorage.getItem('terminal-applications-theme')).toBe('light')
    expect(document.documentElement.dataset.theme).toBe('light')
    expect(document.documentElement.dataset.themePreference).toBe('light')

    fireEvent.click(dark)

    expect(window.localStorage.getItem('terminal-applications-theme')).toBe('dark')
    expect(document.documentElement.dataset.theme).toBe('dark')
    expect(document.documentElement.dataset.themePreference).toBe('dark')
    expect(document.documentElement.classList.contains('dark')).toBe(true)

    fireEvent.click(system)

    expect(window.localStorage.getItem('terminal-applications-theme')).toBe('system')
    expect(document.documentElement.dataset.themePreference).toBe('system')
  })
})
