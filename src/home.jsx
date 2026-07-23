import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { terminalAssets } from './assets/terminalAssets';
import { getLocalizedProject, getLocalizedProjects, projectIds, terminalProjectIds } from './content/projects';
import { useI18n } from './MattediWorks/hooks/useI18n';

const Home = () => {
    const nav = useNavigate();
    const { t } = useI18n();
    const [hover, setHover] = useState("");
    const engineProject = getLocalizedProject(projectIds.terminalEngine, t);
    const terminalProjects = getLocalizedProjects(terminalProjectIds, t);
    const mEnter = (projectId) => {
        setHover(projectId);
    }
    const mLeave = () => {
        setHover("");
    }

    const getDescription = (id) => {
        return terminalProjects.find((project) => project.id === id)?.summary ?? '';
    };

    return (
        <div className="home-page">
            <header className="page-heading">
                <h1 className="page-title">{t.shell.productName}</h1>
            </header>
            <p className="home-intro">
                {t.home.intro}
            </p>
            <section className="home-brand-strip" aria-label={t.home.brandPanelLabel}>
                <img
                    className="home-brand-wordmark"
                    src={terminalAssets.mattediWorks.logoWithName}
                    alt={t.home.mattediWorksLogoAlt}
                />
                <p>{t.home.brandPanelCopy}</p>
            </section>
            <section className="home-engine-summary" aria-labelledby="home-engine-title">
                <span className="home-engine-summary__label">{engineProject.label}</span>
                <h2 id="home-engine-title">{engineProject.name}</h2>
                <p>{engineProject.summary}</p>
                <ul>
                    {engineProject.highlights.map((highlight) => (
                        <li key={highlight}>{highlight}</li>
                    ))}
                </ul>
            </section>
            <div className="home-actions">
                {terminalProjects.map((project, index) => (
                    <button
                        key={project.id}
                        id={project.id}
                        type="button"
                        className={index === 0 ? 'home-action-button' : 'home-action-button home-action-button--secondary'}
                        onMouseEnter={() => mEnter(project.id)}
                        onMouseLeave={mLeave}
                        onClick={() => nav(project.routePath)}
                    >
                        {project.ctaLabel}
                        <span className={project.iconClass} aria-hidden="true"></span>
                    </button>
                ))}
                <p className="home-action-description" aria-live="polite">
                    {getDescription(hover)}
                </p>
            </div>
        </div>
    );
};

export default Home;
