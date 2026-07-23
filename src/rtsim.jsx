import RTSim from './Components/RTSimWeb/rtsim';
import { getLocalizedProject, projectIds } from './content/projects';
import { useI18n } from './MattediWorks/hooks/useI18n';
const Rtsim = () => {
    const { t } = useI18n();
    const project = getLocalizedProject(projectIds.rtsim, t);
    return (

        <section className="terminal-page terminal-page--rtsim">
            <header className="page-heading">
                <h1 className="page-title">{project.name}</h1>
            </header>
            <div className="terminal-page__stage">
                <RTSim />
            </div>

            <a className='github-link terminal-page__source' href={project.sourceUrl} target="_blank" rel="noreferrer" aria-label={project.sourceAria}>
                <span className='bi bi-github' aria-hidden="true"></span>{project.sourceLabel}
            </a>
        </section>
    );
};

export default Rtsim;
