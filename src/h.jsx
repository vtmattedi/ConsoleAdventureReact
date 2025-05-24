import React from 'react';
import styles from './h.module.css';
import { useNavigate } from 'react-router-dom';
const H = () => {
    const nav = useNavigate();
    return (
        <div className={styles.container}>
            <div className={styles.subContainer}
                onClick={() => { window.open('https://www.github.com/vtmattedi', '_blank'); }
                }
                style={{ marginRight: '2vw' }}>
                <div className={styles.git}>
                    <span className='bi bi-github'></span>
                </div>
                <div className={styles.ld}
                    onClick={() => { window.open('https://www.linkedin.com/in/vitor-mattedi-dev/', '_blank'); }
                    }
                >
                    <span className='bi bi-linkedin'
                        style={{ color: '#0e76a8' }}></span>

                </div>
            </div>
            <div className={styles.subContainer}>
                <div className={styles.nav}
                onClick={() => {nav('/game')}}>
                    <span className='bi bi-play-fill'></span>
                </div>
                <div className={styles.nav}
                onClick={() => {nav('/rtsim')}}>
                    <span className='bi bi-pc-display-horizontal'></span>
                </div>
                <div className={styles.nav}
                onClick={() => {nav('/')}}>
                    <span className='bi bi-house-fill'></span>
                </div>
            </div>
        </div>
    );
};

export default H;