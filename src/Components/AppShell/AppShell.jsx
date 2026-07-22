import { NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom'
import AssetPreload from '../AssetPreload/AssetPreload'
import { terminalAssets } from '../../assets/terminalAssets'
import './AppShell.css'

const navItems = [
  {
    to: '/',
    label: 'Home',
    icon: 'bi bi-house-fill',
    end: true,
  },
  {
    to: '/console-adventure',
    label: 'Console Adventure',
    icon: 'bi bi-play-fill',
  },
  {
    to: '/rtsim',
    label: 'RTSim',
    icon: 'bi bi-pc-display-horizontal',
  },
]

export default function AppShell() {
  const navigate = useNavigate()
  const location = useLocation()
  const isHome = location.pathname === '/'

  return (
    <div className="app-shell">
      <AssetPreload />
      <header className="app-shell-header">
        <button
          type="button"
          className="app-shell-brand"
          onClick={() => navigate('/')}
          aria-label="Terminal Applications home"
        >
          <img
            className="app-shell-logo"
            src={terminalAssets.mattediWorks.logo}
            alt=""
          />
          <span className="app-shell-title">Terminal Applications</span>
        </button>

        <nav className="app-shell-nav" aria-label="Primary">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              className={({ isActive }) => (
                isActive ? 'app-shell-link active' : 'app-shell-link'
              )}
            >
              <span className={item.icon} aria-hidden="true" />
              <span className="app-shell-link-label">{item.label}</span>
            </NavLink>
          ))}
        </nav>

        <div className="app-shell-actions">
          {!isHome && (
            <button
              type="button"
              className="app-shell-icon-button"
              onClick={() => navigate(-1)}
              aria-label="Go back"
              title="Back"
            >
              <span className="bi bi-arrow-left" aria-hidden="true" />
            </button>
          )}
          <button
            type="button"
            className="app-shell-icon-button"
            aria-label="Theme controls"
            title="Theme"
            disabled
          >
            <span className="bi bi-circle-half" aria-hidden="true" />
          </button>
          <button
            type="button"
            className="app-shell-icon-button"
            aria-label="Language controls"
            title="Language"
            disabled
          >
            <span className="bi bi-translate" aria-hidden="true" />
          </button>
        </div>
      </header>

      <main className="app-shell-main">
        <Outlet />
      </main>
    </div>
  )
}
