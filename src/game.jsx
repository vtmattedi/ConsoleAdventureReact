import React from 'react';
import Info from './Components/Info/Info';
import ConsoleAdventure from './Components/ConsoleAdVentureWeb/ConsoleAdventureWeb';
import { useI18n } from './MattediWorks/hooks/useI18n';
const Game = () => {
    const { t } = useI18n();
    const [width, setWidth] = React.useState(window.innerWidth);
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
        <div

        >
            <div className="ca-title" style={{
                marginTop: '2vh',
            }}>
                <h3>{t.consoleAdventure.title}</h3>

                <Info styles={{ display: width > 1040 ? 'none' : 'flex', flexDirection: `column` }} />
                <div style={{ display: width > 1040 ? 'flex' : 'none', }} >
                    <ConsoleAdventure />
                </div>
                <a className='github-link' href="https://github.com/vtmattedi/ConsoleAdventure" target="_blank" rel="noreferrer" aria-label={t.consoleAdventure.sourceAria}>
                    <span className='bi bi-github' aria-hidden="true"></span>{t.consoleAdventure.sourceLabel}
                </a>
            </div>
        </div>
    );
};

export default Game;
