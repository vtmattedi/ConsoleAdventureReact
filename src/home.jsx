import React from 'react';
import { useNavigate } from 'react-router-dom';
import { terminalAssets } from './assets/terminalAssets';
import { useI18n } from './MattediWorks/hooks/useI18n';

const Home = () => {
    const nav = useNavigate();
    const { t } = useI18n();
    const [hover, setHover] = React.useState("");
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
        <div>
            <div className='ca-title'>
                <h3>{t.shell.productName}</h3>
            </div>
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    overflowX: 'hidden',
                    color: 'var(--app-text)',
                    fontSize: '1.2em',
                    margin: '2vh 2vw',
                    textAlign: 'center',
                }}>
                {t.home.intro}
            </div>
            <section className="home-brand-strip" aria-label={t.home.brandPanelLabel}>
                <img
                    className="home-brand-wordmark"
                    src={terminalAssets.mattediWorks.logoWithName}
                    alt={t.home.mattediWorksLogoAlt}
                />
                <p>{t.home.brandPanelCopy}</p>
            </section>
            <div className='home-container'>
                <button
                    id={'ca'}
                    onMouseEnter={mEnter}
                    onMouseLeave={mLeave} onClick={
                        () => {
                            nav('/console-adventure');
                        }
                    }>
                    {t.home.consoleAdventureCta}
                    <span className='bi bi-play'></span>
                </button>

                <button
                    id={'rs'}
                    onMouseEnter={mEnter}
                    onMouseLeave={mLeave}
                    onClick={
                        () => {
                            nav('/rtsim');
                        }
                    }>
                    {t.home.rtsimCta}
                    <span className='bi bi-pc-display-horizontal'></span>
                </button>
                <div
                    style={{
                        marginTop: '2vh',
                        color: 'var(--app-text)',
                        fontSize: '1.1rem',
                    }}>
                    {getDescription(hover)}
                </div>
            </div>
        </div>
    );
};

export default Home;
