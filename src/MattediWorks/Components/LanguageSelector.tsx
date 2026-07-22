import { localeLabels, locales, type Locale, type Translation } from '../translation/i18n'

type LanguageSelectorProps = {
  locale: Locale
  setLocale: (locale: Locale) => void
  t: Translation
}

export default function LanguageSelector({ locale, setLocale, t }: LanguageSelectorProps) {
  return (
    <div className="language-switcher" aria-label={t.languageLabel}>
      {locales.map((option) => (
        <button
          key={option}
          type="button"
          aria-pressed={locale === option}
          onClick={() => setLocale(option)}
        >
          {localeLabels[option]}
        </button>
      ))}
    </div>
  )
}
