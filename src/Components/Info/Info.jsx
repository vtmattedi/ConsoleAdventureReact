import React from 'react';
import "./Info.css";

const Info = ({styles}) => {

    const imgs = [
        require('../../ConsoleAdventure/Game/Assets/Adventure.png'),
        require('../../ConsoleAdventure/Game/Assets/Adventure2.png'),
        require('../../ConsoleAdventure/Game/Assets/Genies.png'),
        require('../../ConsoleAdventure/Game/Assets/Slain.png'),
        require('../../ConsoleAdventure/Game/Assets/Slain2.png'),
      ];
    return (
        <div style={styles}>
         
        <p className="noSize">
          You need at least 1040 px of width to see the terminal.
        </p>
        <p className="noSizeDescription">
          Console Adventure is a game that started as an OOP project for my Software Engineering course,
          I decided to take it further and make it a full game.
          The game is a console game that runs on the terminal, and here you can play it on the web.
          It was ported using Xterm.js and React.
          You can check the console game at <a href="https://www.github.com/vtmattedi/consoleadventure" target='_blank' rel="noreferrer"> github</a>.
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
    );
};

export default Info;