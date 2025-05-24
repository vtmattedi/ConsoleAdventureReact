
import { useState } from 'react';
import { useEffect } from 'react'
import RTSim from './Components/RTSimWeb/rtsim';
import Header from './Components/Header/Header';
import Info from './Components/Info/Info';
import { SpeedInsights } from "@vercel/speed-insights/react"
import { Analytics } from "@vercel/analytics/react"
import H from './h';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';;
function App({ children }) {
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

  if (width > Infinity) {
    return (
      <div className='bgDiv'>
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
          <span>
            Unfortunatly this site does not support mobile devices yet.
          </span>
          <div
            onClick={() => { window.open('https://www.github.com/vtmattedi', '_blank'); }
            }
            style={{ marginRight: '2vw',
              fontSize: '2em',
             }}>
      
              <span className='bi bi-github'></span>
           
            <div
              onClick={() => { window.open('https://www.linkedin.com/in/vitor-mattedi-dev/', '_blank'); }
              }
            >
              <span className='bi bi-linkedin'
                style={{ color: '#0e76a8' }}></span>

            </div>
          </div>
        </div>



      </div>
    )
  }

  return (
    <div className='bgDiv'>
      {children}
    </div>
  )

  return (
    <div style={{
      height: "100vh",
      backgroundColor: "#333",
      overflowX: "Hidden",
    }}>
      <Header width={width} />

      <SpeedInsights />
      <Analytics />
    </div >

  );
}

export default App;
