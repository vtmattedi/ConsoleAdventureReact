import React from 'react';
import Header from './Components/Header/Header';
import { useNavigate } from 'react-router-dom';
import pic from './Frontphoto.png';
const Home = () => {
    const nav = useNavigate();
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
                return 'Turn based RPG game, where you can explore a world full of adventures and challenges.';
            case 'rs':
                return 'Discrete time preemptive scheduler simulator, where you can see the inner workings of many scheduler algorithms.';
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
            {
                width > 768 ?
                    <Header title={'Terminal Applications'} /> :
                    <div className='ca-title'>
                        <h3>Terminal Applications</h3>
                    </div>

            }
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    overflowX: 'hidden',
                    color: 'white',
                    fontSize: '1.2em',
                    margin: '2vh 2vw',
                    textAlign: 'center',
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
                        <img src={pic} alt='terminal' className='home-terminal'
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
                            color: 'white',
                            fontSize: '2em',
                            textAlign: 'center',
                        }}>
                            <div
                                onClick={() => { window.open('https://www.github.com/vtmattedi', '_blank'); }
                                }
                                style={{
                                    fontSize: '2em',
                                }}>

                                <span className='bi bi-github'></span>
                            </div>

                            <div
                                onClick={() => { window.open('https://www.linkedin.com/in/vitor-mattedi-dev/', '_blank'); }
                                }
                                style={{
                                    fontSize: '2em',
                                }}
                            >
                                <span className='bi bi-linkedin'
                                    style={{ color: '#0e76a8' }}></span>



                            </div>
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
                            color: 'white',
                            fontSize: '1.5em',
                            textAlign: 'center',
                        }}>
                        Dev | Engineering Student
                    </span>
                </div>
            }
        </div>
    );
};

export default Home;