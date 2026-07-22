import { Sun, Moon, Monitor } from 'lucide-react'
import { useTheme, type Theme } from '../hooks/useTheme'
import './ThemeSelector.css'

const OPTIONS = [
  { value: 'light', Icon: Sun, label: 'Light' },
  { value: 'dark', Icon: Moon, label: 'Dark' },
  { value: 'system', Icon: Monitor, label: 'System' },
] satisfies Array<{
  value: Theme
  Icon: typeof Sun
  label: string
}>

const OPTION_CLASS_NAMES = {
  light: 'theme-selector__option',
  dark: 'theme-selector__option',
  system: 'theme-selector__option',
} satisfies Record<Theme, string>

const COMPACT_CLASS_NAMES = {
  light: 'theme-selector__compact',
  dark: 'theme-selector__compact',
  system: 'theme-selector__compact',
} satisfies Record<Theme, string>

const OPTION_LIST = [...OPTIONS]

const findThemeIndex = (theme: Theme) => {
  const index = OPTION_LIST.findIndex((option) => option.value === theme)

  return index >= 0 ? index : OPTION_LIST.length - 1
}

const getNextTheme = (theme: Theme) => {
  const currentIndex = findThemeIndex(theme)

  return OPTION_LIST[(currentIndex + 1) % OPTION_LIST.length]
}

const getCurrentTheme = (theme: Theme) => {
  return OPTION_LIST[findThemeIndex(theme)]
}

const getOptionClassName = (value: Theme, theme: Theme) => [
  OPTION_CLASS_NAMES[value],
  theme === value ? 'theme-selector__option--active' : '',
]
  .filter(Boolean)
  .join(' ')

type ThemeSelectorProps = {
  compact?: boolean
}

export default function ThemeSelector({ compact = false }: ThemeSelectorProps) {
  const { theme, changeTheme } = useTheme()

  if (compact) {
    const current = getCurrentTheme(theme)
    const next = getNextTheme(theme)
    const { Icon } = current

    return (
      <button
        type="button"
        onClick={() => changeTheme(next.value)}
        aria-label={`Theme: ${current.label}; switch to ${next.label}`}
        title={`Theme: ${current.label} - click for ${next.label}`}
        className={COMPACT_CLASS_NAMES[theme]}
      >
        <Icon aria-hidden="true" size={18} />
      </button>
    )
  }

  return (
    <div className="theme-selector" aria-label="Theme">
      {OPTIONS.map(({ value, Icon, label }) => (
        <button
          key={value}
          type="button"
          onClick={() => changeTheme(value)}
          aria-label={label}
          title={label}
          aria-pressed={theme === value}
          className={getOptionClassName(value, theme)}
        >
          <Icon aria-hidden="true" size={15} />
        </button>
      ))}
    </div>
  )
}
