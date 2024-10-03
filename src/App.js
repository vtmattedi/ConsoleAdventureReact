import { useState } from 'react';
import { useEffect } from 'react';
import ConsoleAdventure from './Components/ConsoleAdVentureWeb/ConsoleAdventureWeb';
import Header from './Components/Header/Header';
import Info from './Components/Info/Info';

function App() {

  const [width, setWidth] = useState(window.innerWidth);

  function handleWindowSizeChange() {
    setWidth(window.innerWidth);
  }

  useEffect(() => {
    window.addEventListener('resize', handleWindowSizeChange);
    return () => {
      window.removeEventListener('resize', handleWindowSizeChange);
    }
  }, []);

  return (
    <div style={{
      height: "100vh",
      backgroundColor: "#333",
      overflowX: "Hidden",
    }}>
      <Header width={width} />
      <Info styles={{ display: width > 1040 ? 'none' : 'flex', flexDirection: `column` }} />
      <div style={{ display: width > 1040 ? 'flex' : 'none', }} >
        <ConsoleAdventure />
      </div>
    </div >
  );
}

export default App;
