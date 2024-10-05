import React from 'react';
import { useState } from 'react';
import { FaLinkedin, FaGithub } from "react-icons/fa";
import './Header.css';
const Header = ({ width }) => {

    const [mouseHover, setMouseHover] = useState(false);
    const fphoto = require('./Frontphoto.png');

    const onMouseEnter = () => {
        setMouseHover(true);
    }
    const onMouseLeave = () => {
        setMouseHover(false);
    }


    return (
        <div className='headerDiv' style={{
            flexDirection: (width < 1040) && mouseHover ? 'column' : 'row',
            transition: 'flex-direction 1s',
            textAlign: 'center',
            position: (width < 1040) && mouseHover ? 'sticky' : 'relative',
            display: 'flex',
            top: 0,
        }}>
            <img src={fphoto} className="image" alt="logo"
                style={{ visibility: mouseHover ? 'hidden' : 'visible' }}
                onMouseEnter={onMouseEnter} />
            <div className='card' style={{
                display: mouseHover ? 'flex' : 'none',
                margin: width < 1040 ? 'auto' : '0px',
            }}
                onMouseLeave={onMouseLeave} >
                <img src={fphoto} className="image" alt="logo" />
                <a href='https://github.com/vtmattedi' target="_blank" rel="noreferrer">
                    <FaGithub className='icon'
                        color='white' />
                </a>
                <a href='https://www.linkedin.com/in/vitor-mattedi-dev/' target="_blank" rel="noreferrer">
                    <FaLinkedin className='icon'
                        color='#0077B5' />
                </a>
                <span className='cardText'>
                    Dev Jr | Software Engineer Student
                </span>
            </div>
            <div className='titleDiv'>
                <h1 className='title'>
                    {width > 1040 ? 'The Console Adventure Game' : 'Console Adventure'}
                </h1>
            </div>
        </div>
    );
};

export default Header;