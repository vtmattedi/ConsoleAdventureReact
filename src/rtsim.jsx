import React from 'react';
import RTSim from './Components/RTSimWeb/rtsim';
import H from './h';
const Rtsim = () => {
    return (

        <div className='ca-title'
            style={{
                marginTop: '2vh',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                overflowX: 'hidden'
            }}>
            <h3>RTSim</h3>
            <RTSim />

            <div className='github-link'>
                    <span className='bi bi-github' ></span>/vtmattedi/rtsim
                
            </div>
            <H />
        </div>
    );
};

export default Rtsim;