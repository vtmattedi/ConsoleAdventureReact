import { localeLabels, locales, type Locale, type Translation } from '../translation/i18n'
import './LanguageSelector.css'

type LanguageSelectorProps = {
  locale: Locale
  setLocale: (locale: Locale) => void
  t: Translation
}

export default function LanguageSelector({ locale, setLocale, t }: LanguageSelectorProps) {
  return (
    <div className="language-switcher" aria-label={t.languageLabel} role="group">
      {locales.map((option) => (
        <button
          key={option}
          type="button"
          aria-label={`${t.languageLabel}: ${localeLabels[option]}`}
          aria-pressed={locale === option}
          onClick={() => setLocale(option)}
          title={`${t.languageLabel}: ${localeLabels[option]}`}
        >
          {localeLabels[option]}
        </button>
      ))}
    </div>
  )
}
