import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { terminalAssets } from './assets/terminalAssets';
import { useI18n } from './MattediWorks/hooks/useI18n';

const Home = () => {
    const nav = useNavigate();
    const { t } = useI18n();
    const [hover, setHover] = useState("");
    const mEnter = (e) => {
        setHover(e.target.id);
    }
    const mLeave = () => {
        setHover("");
    }

    const getDescription = (id) => {
        switch (id) {
            case 'ca':
                return t.home.consoleAdventureDescription;
            case 'rs':
                return t.home.rtsimDescription;
            default:
                return '';
        }
    };

    return (
        <div className="home-page">
            <header className="page-heading">
                <h1 className="page-title">{t.shell.productName}</h1>
            </header>
            <p className="home-intro">
                {t.home.intro}
            </p>
            <section className="home-brand-strip" aria-label={t.home.brandPanelLabel}>
                <img
                    className="home-brand-wordmark"
                    src={terminalAssets.mattediWorks.logoWithName}
                    alt={t.home.mattediWorksLogoAlt}
                />
                <p>{t.home.brandPanelCopy}</p>
            </section>
            <section className="home-engine-summary" aria-labelledby="home-engine-title">
                <span className="home-engine-summary__label">{t.home.engineLabel}</span>
                <h2 id="home-engine-title">{t.home.engineTitle}</h2>
                <p>{t.home.engineSummary}</p>
                <ul>
                    <li>{t.home.engineBoundary}</li>
                    <li>{t.home.engineContract}</li>
                </ul>
            </section>
            <div className="home-actions">
                <button
                    id={'ca'}
                    type="button"
                    className="home-action-button"
                    onMouseEnter={mEnter}
                    onMouseLeave={mLeave} onClick={
                        () => {
                            nav('/console-adventure');
                        }
                    }>
                    {t.home.consoleAdventureCta}
                    <span className='bi bi-play' aria-hidden="true"></span>
                </button>

                <button
                    id={'rs'}
                    type="button"
                    className="home-action-button home-action-button--secondary"
                    onMouseEnter={mEnter}
                    onMouseLeave={mLeave}
                    onClick={
                        () => {
                            nav('/rtsim');
                        }
                    }>
                    {t.home.rtsimCta}
                    <span className='bi bi-pc-display-horizontal' aria-hidden="true"></span>
                </button>
                <p className="home-action-description" aria-live="polite">
                    {getDescription(hover)}
                </p>
            </div>
        </div>
    );
};

export default Home;
