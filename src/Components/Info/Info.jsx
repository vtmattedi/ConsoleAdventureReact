import "./Info.css";
import { consoleAdventureFallbackImages } from '../../assets/terminalAssets';
import { useI18n } from '../../MattediWorks/hooks/useI18n';

const Info = ({ hidden = false }) => {
    const { t } = useI18n();

    const imgs = consoleAdventureFallbackImages;
    return (
        <div className={hidden ? 'info-panel info-panel--hidden' : 'info-panel'}>
            <p className="noSize">
                {t.consoleAdventure.widthWarning}
            </p>
            <p className="noSizeDescription">
                {t.consoleAdventure.description}{' '}
                <a href="https://www.github.com/vtmattedi/consoleadventure" target='_blank' rel="noreferrer" aria-label={t.consoleAdventure.sourceAria}>{t.common.github}</a>.
            </p>
            <div className='imageList'>
                {imgs.map((img, index) => {
                    return (<img className="info-panel__screenshot" key={index} src={img} alt={`${t.consoleAdventure.screenshotAlt} ${index + 1}`} />)
                })}
            </div>
        </div>
    );
};

export default Info;
