import React from 'react';
import { useNavigate } from 'react-router-dom';
import { terminalAssets } from './assets/terminalAssets';
import { useI18n } from './MattediWorks/hooks/useI18n';

const pic = terminalAssets.home.frontPhoto;
const Home = () => {
    const nav = useNavigate();
    const { t } = useI18n();
    const [hover, setHover] = React.useState("");
    const [width, setWidth] = React.useState(window.innerWidth);
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

    React.useEffect(() => {
        const handleResize = () => {
            setWidth(window.innerWidth);
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

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
            {
                width < 768 &&
                <div className='m_open'>
                    <div style={{
                        display: 'flex',
                        width: '100%',
                        justifyContent: 'center',
                        marginTop: '2vh',
                        gap: '2vw',
                    }}>
                        <img src={pic} alt={t.home.photoAlt} className='home-terminal'
                            style={{
                                width: 'auto',
                                height: '24vh',
                                borderRadius: '10px',
                            }}
                        />
                        <div style={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                            height: '100%',
                            margin: '0px 5%',
                            color: 'var(--app-text)',
                            fontSize: '2em',
                            textAlign: 'center',
                        }}>
                            <a
                                href="https://www.github.com/vtmattedi"
                                target="_blank"
                                rel="noreferrer"
                                aria-label={t.home.githubProfileLabel}
                                style={{
                                    fontSize: '2em',
                                    color: 'inherit',
                                    textDecoration: 'none',
                                }}>

                                <span className='bi bi-github' aria-hidden="true"></span>
                            </a>

                            <a
                                href="https://www.linkedin.com/in/vitor-mattedi-dev/"
                                target="_blank"
                                rel="noreferrer"
                                aria-label={t.home.linkedinProfileLabel}
                                style={{
                                    fontSize: '2em',
                                    color: 'inherit',
                                    textDecoration: 'none',
                                }}
                            >
                                <span className='bi bi-linkedin'
                                    style={{ color: '#0e76a8' }} aria-hidden="true"></span>



                            </a>
                        </div>
                    </div>
                    <span className='m_cardText'
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                            height: '100%',
                            margin: '0px 5%',
                            color: 'var(--app-text)',
                            fontSize: '1.5em',
                            textAlign: 'center',
                        }}>
                        {t.home.profileRole}
                    </span>
                </div>
            }
        </div>
    );
};

export default Home;
