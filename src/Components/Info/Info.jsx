import React from 'react';
import "./Info.css";
import { consoleAdventureFallbackImages } from '../../assets/terminalAssets';
import { useI18n } from '../../MattediWorks/hooks/useI18n';

const Info = ({styles}) => {
    const { t } = useI18n();

    const imgs = consoleAdventureFallbackImages;
    return (
        <div style={styles}>
         
        <p className="noSize">
          {t.consoleAdventure.widthWarning}
        </p>
        <p className="noSizeDescription">
          {t.consoleAdventure.description}{' '}
          <a href="https://www.github.com/vtmattedi/consoleadventure" target='_blank' rel="noreferrer" aria-label={t.consoleAdventure.sourceAria}>{t.common.github}</a>.
        </p>
        <div className='imageList'>
          {imgs.map((img, index) => {
            return (<img key={index} src={img} alt={`${t.consoleAdventure.screenshotAlt} ${index + 1}`}
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
