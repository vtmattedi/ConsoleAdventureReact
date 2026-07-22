import RTSim from './Components/RTSimWeb/rtsim';
import { useI18n } from './MattediWorks/hooks/useI18n';
const Rtsim = () => {
    const { t } = useI18n();
    return (

        <section className="terminal-page terminal-page--rtsim">
            <header className="page-heading">
                <h1 className="page-title">{t.rtsim.title}</h1>
            </header>
            <div className="terminal-page__stage">
                <RTSim />
            </div>

            <a className='github-link terminal-page__source' href="https://github.com/vtmattedi/rtsim" target="_blank" rel="noreferrer" aria-label={t.rtsim.sourceAria}>
                <span className='bi bi-github' aria-hidden="true"></span>{t.rtsim.sourceLabel}
            </a>
        </section>
    );
};

export default Rtsim;
