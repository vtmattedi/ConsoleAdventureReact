import React from 'react';
import RTSim from './Components/RTSimWeb/rtsim';
import { useI18n } from './MattediWorks/hooks/useI18n';
const Rtsim = () => {
    const { t } = useI18n();
    return (

        <div className='ca-title'
            style={{
                marginTop: '2vh',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                overflowX: 'hidden'
            }}>
            <h3>{t.rtsim.title}</h3>
            <RTSim />

            <a className='github-link' href="https://github.com/vtmattedi/rtsim" target="_blank" rel="noreferrer" aria-label={t.rtsim.sourceAria}>
                    <span className='bi bi-github' aria-hidden="true"></span>{t.rtsim.sourceLabel}
            </a>
        </div>
    );
};

export default Rtsim;
