import "./Info.css";
import { getLocalizedProject, projectIds } from '../../content/projects';
import { useI18n } from '../../MattediWorks/hooks/useI18n';

const Info = ({ hidden = false, project: providedProject }) => {
    const { t } = useI18n();
    const project = providedProject ?? getLocalizedProject(projectIds.consoleAdventure, t);

    return (
        <div className={hidden ? 'info-panel info-panel--hidden' : 'info-panel'}>
            <p className="noSize">
                {project.widthWarning}
            </p>
            <p className="noSizeDescription">
                {project.description}{' '}
                <a href={project.sourceUrl} target='_blank' rel="noreferrer" aria-label={project.sourceAria}>{t.common.github}</a>.
            </p>
            <div className='imageList'>
                {project.screenshots.map((img, index) => {
                    return (<img className="info-panel__screenshot" key={img} src={img} alt={`${project.screenshotAlt} ${index + 1}`} />)
                })}
            </div>
        </div>
    );
};

export default Info;
