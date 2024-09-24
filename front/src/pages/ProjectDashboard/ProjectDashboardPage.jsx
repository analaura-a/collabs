import { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import AuthContext from '../../context/AuthContext';
import { getProjectById } from '../../services/projectService';
import Button from "../../components/Button/Button";
import DropdownButton from "../../components/Button/DropdownButton";
import Tabs from "../../components/Tabs/Tabs";

const ProjectDashboardPage = () => {

    const { id } = useParams();

    const { authState } = useContext(AuthContext);
    const { user } = authState;

    const [project, setProject] = useState(null);
    const [loading, setLoading] = useState(true);

    const fetchProject = async () => {
        try {
            const projectData = await getProjectById(id);
            setProject(projectData);
            setLoading(false);
        } catch (error) {
            console.error('Error al cargar el proyecto:', error);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProject();
    }, [id]);

    if (loading) {
        return <div>Cargando...</div>; //Reemplazar por componente de carga
    }

    const tabs = [
        { label: 'Postulaciones', content: <></> },
        { label: 'Equipo', content: <></> },
    ]

    return (
        <main>
            <div className="container project-dashboard-page">

                <section className="project-dashboard__header">
                    <div className="project-dashboard__header__top">
                        <div className="project-dashboard__header__top__type">
                            <img src="../../assets/svg/purple-dot-status.svg" alt="Estatus del proyecto" />
                            <p className="subtitle medium-text primary-color-text">Proyecto {project.status.toLowerCase()}</p>
                        </div>

                        <DropdownButton />
                    </div>

                    <div className="project-dashboard__info-and-actions">

                        <div className="project-dashboard__header__info">

                            <div className="project-dashboard__header__info__title">
                                <h1 className="title-40">{project.name}</h1>

                                <ul className="project-dashboard__header__info__title__list">
                                    <li>
                                        <img src="../assets/svg/category.svg" alt="Categoría" />
                                        <p className="light-paragraph">{project.type}</p>
                                    </li>

                                    <li>
                                        <img src="../assets/svg/clock.svg" alt="Reloj" />
                                        <p className="light-paragraph">{new Date(project.created_at).toLocaleDateString('en-GB')}</p>
                                    </li>
                                </ul>
                            </div>

                            <p className="paragraph-18">El proyecto está <span className="medium-text">buscando colaboradores</span>, guía a las personas interesadas en contribuir hacia el repositorio del proyecto.</p>

                        </div>

                        <div className="project-dashboard__header__actions"> {/* Componetizar */}
                            <div className="title-with-icon">
                                <img src="../assets/svg/magic-wand.svg" alt="Destacado" />
                                <h2 className="title-20 medium-text">Acciones importantes</h2>
                            </div>

                            <div className="project-dashboard__header__actions__buttons">
                                <Button size="large" width="fullwidth">Dar inicio al proyecto</Button>
                                <Button size="large" color="secondary" width="fullwidth">Editar convocatoria</Button>
                            </div>
                        </div>
                    </div>
                </section>

                <Tabs tabs={tabs} />

            </div>
        </main>
    )
}

export default ProjectDashboardPage;