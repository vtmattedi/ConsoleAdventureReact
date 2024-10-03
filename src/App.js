import './Mystyles.css';
import { useState } from 'react';
import { FaLinkedin, FaGithub } from "react-icons/fa";
import { useEffect, useRef } from 'react';
import ConsoleAdventure from './Components/ConsoleAdventureWeb';
function App() {
  const [mouseHover, setMouseHover] = useState(false);
  const fphoto = require('./Frontphoto.png');
  const imgs = [
    require('./Game/Assets/Adventure.png'),
    require('./Game/Assets/Adventure2.png'),
    require('./Game/Assets/Genies.png'),
    require('./Game/Assets/Slain.png'),
    require('./Game/Assets/Slain2.png'),
  ];
  const onMouseEnter = () => {
    setMouseHover(true);
  }
  const onMouseLeave = () => {
    setMouseHover(false);
  }

  const [width, setWidth] = useState(window.innerWidth);
  const [height, setHeight] = useState(window.innerWidth);

  function handleWindowSizeChange() {
    setWidth(window.innerWidth);
    setHeight(window.innerHeight);
  }

  useEffect(() => {
    window.addEventListener('resize', handleWindowSizeChange);
    return () => {
      window.removeEventListener('resize', handleWindowSizeChange);
    }
  }, []);



  return (
    <div className='background'>
      <div className='headerDiv' style={{
        flexDirection: (width < 1040) && mouseHover ? 'column' : 'row',
        transition: 'flex-direction 1s',
        textAlign: 'center',
        position:  (width < 1040) && mouseHover ? 'sticky' : 'relative',
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
          <img src={fphoto} className="image" alt="logo"
          />
          <a href='https://github.com/vtmattedi' target="_blank" rel="noreferrer">
            <FaGithub className='icon'
              color='black' />
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
      <div className='aboutDiv'>
        
      </div>
      <div style={{ display: width > 1040 ? 'none' : 'flex', flexDirection: `column` }}>
        <p className="noSize">
          You need at least 1040 px of width to see the terminal.
        </p>
        <p className = "noSizeDescription">
          Console Adventure is a game that started as an OOP project for my Software Engineering course, 
          I decided to take it further and make it a full game. 
          The game is a console game that runs on the terminal, and here you can play it on the web.
          It was ported using Xterm.js and React.
          You can check the console game at <a href ="https://www.github.com/vtmattedi/consoleadventure" target='_blank' rel="noreferrer"> github</a>.
        </p>
        <div className='imageList'>
          {imgs.map((img, index) => {
            return (<img key={index} src={img} 
              style={
                {
                  margin: '10px',
                  display: 'block',
                  width: '100%',
                  borderRadius: '10px',
                }
              } />)
          })}


        </div>
      </div>
      <div style={{ display: width > 1040 ? 'flex' : 'none', }} >
        <ConsoleAdventure/>
      </div>
    </div >
  );
}

export default App;
