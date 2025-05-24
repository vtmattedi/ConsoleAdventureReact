import React from 'react';
import Info from './Components/Info/Info';
import { use } from 'react';
import ConsoleAdventure from './Components/ConsoleAdVentureWeb/ConsoleAdventureWeb';
import H from './h';
const Game = () => {
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
                <h3>Console Adventure</h3>

                <Info styles={{ display: width > 1040 ? 'none' : 'flex', flexDirection: `column` }} />
                <div style={{ display: width > 1040 ? 'flex' : 'none', }} >
                    <ConsoleAdventure />
                </div>
                <div className='github-link'>
                    <span className='bi bi-github' ></span>/vtmattedi/ConsoleAdventure
                </div>
                <H />
            </div>
        </div>
    );
};

export default Game;