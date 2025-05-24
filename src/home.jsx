import React from 'react';
import Header from './Components/Header/Header';
import { useNavigate } from 'react-router-dom';
const Home = () => {
    const nav = useNavigate();
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
                return 'Turn based RPG game, where you can explore a world full of adventures and challenges.';
            case 'rs':
                return 'Discrete time preemptive scheduler simulator, where you can see the inner workings of many scheduler algorithms.';
            default:
                return '';
        }
    };

    return (
        <div>
           <Header title={'Terminal Applications'}/>
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    overflowX: 'hidden',
                    color: 'white',
                    fontSize: '1em',
                    margin: '2vh 2vw',
                }}>
                These are some apps developped for node.js, that run on any terminal. such as xterm.js.
            </div>
            <div className='home-container'>
                <button
                    id={'ca'}
                    onMouseEnter={mEnter}
                    onMouseLeave={mLeave} onClick={
                        () => {
                            nav('/game');
                        }
                    }>
                    Play Console Adventure
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
                    Scheduler Simulator
                    <span className='bi bi-pc-display-horizontal'></span>
                </button>
                <div
                    style={{
                        marginTop: '2vh',
                        color: 'white',
                        fontSize: '1.1rem',
                    }}>
                    {getDescription(hover)}
                </div>
            </div>
        </div>
    );
};

export default Home;