import React from 'react';
import { useState } from 'react';
import './Header.css';
import { terminalAssets } from '../../assets/terminalAssets';

const brandLogo = terminalAssets.mattediWorks.logo;
const Header = ({ title }) => {

    const [mouseHover, setMouseHover] = useState(false);
    const [width, setWidth] = useState(window.innerWidth);
    React.useEffect(() => {
        const handleResize = () => {
            setWidth(window.innerWidth);
        }

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        }
    }, []);
    const onMouseEnter = () => {
        setMouseHover(true);
    }
    const onMouseLeave = () => {
        setMouseHover(false);
    }


    return (
        <div className='m_headerDiv' style={{
            flexDirection: (width < 1040) && mouseHover ? 'column' : 'row',
            transition: 'flex-direction 1s',
            textAlign: 'center',
            position: (width < 1040) && mouseHover ? 'sticky' : 'relative',
            display: 'flex',
            top: 0,
        }}>
            <div className='m_img_c' onMouseEnter={onMouseEnter}
             style={{ visibility: mouseHover ? 'hidden' : 'visible',
                width: '20vw',
                height: '10vw',
                


              }}
            >
                <img src={brandLogo} className="m_image" alt="MattediWorks logo"
                    style={{ visibility: mouseHover ? 'hidden' : 'visible' }}
                   />
            </div>
            <div className='m_card' style={{
                display: mouseHover ? 'flex' : 'none',
                margin: width < 1040 ? 'auto' : '0px',
            }}
                onMouseLeave={onMouseLeave} >
                <img src={brandLogo} className="m_image" alt="MattediWorks logo" />
                <span className='m_cardText'>
                    MattediWorks
                </span>
            </div>
            <div className='m_titleDiv'>
                <h1 className='m_title'>
                    {title}
                </h1>
            </div>
        </div>
    );
};

export default Header;
