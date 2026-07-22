import { useEffect, useState } from 'react';
import Info from './Components/Info/Info';
import ConsoleAdventure from './Components/ConsoleAdVentureWeb/ConsoleAdventureWeb';
import { useI18n } from './MattediWorks/hooks/useI18n';
const Game = () => {
    const { t } = useI18n();
    const [width, setWidth] = useState(window.innerWidth);
    const showTerminal = width > 1040;
    useEffect(() => {
        const handleResize = () => {
            setWidth(window.innerWidth);
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);
    return (
        <section className="terminal-page">
            <header className="page-heading">
                <h1 className="page-title">{t.consoleAdventure.title}</h1>
            </header>

            <Info hidden={showTerminal} />
            <div className={showTerminal ? 'terminal-page__stage' : 'terminal-page__stage terminal-page__stage--hidden'}>
                <ConsoleAdventure />
            </div>
            <a className='github-link terminal-page__source' href="https://github.com/vtmattedi/ConsoleAdventure" target="_blank" rel="noreferrer" aria-label={t.consoleAdventure.sourceAria}>
                <span className='bi bi-github' aria-hidden="true"></span>{t.consoleAdventure.sourceLabel}
            </a>
        </section>
    );
};

export default Game;
