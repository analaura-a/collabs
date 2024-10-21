import { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../../context/AuthContext';
import { getUserProjects } from '../../services/projectService';
import { useToast } from '../../context/ToastContext';
import Button from '../../components/Button/Button';
import Tabs from '../../components/Tabs/Tabs';
import MyProjectCard from '../../components/Cards/MyProjectCard';
import Loader from '../../components/Loader/Loader';

const MyProjectsPage = () => {

    const { authState } = useContext(AuthContext);
    const { user } = authState;

    const navigate = useNavigate();

    const [openProjects, setOpenProjects] = useState([]);
    const [inProgressProjects, setInProgressProjects] = useState([]);
    const [completedProjects, setCompletedProjects] = useState([]);

    const [loading, setLoading] = useState(true);

    const { addToast } = useToast();

    const fetchUserProjects = async () => {
        try {
            const userProjects = await getUserProjects(user._id);
            setOpenProjects(userProjects.openProjects);
            setInProgressProjects(userProjects.inProgressProjects);
            setCompletedProjects(userProjects.completedProjects);
            setLoading(false);
        } catch (error) {
            addToast({
                type: 'error',
                title: 'Error al cargar tus proyectos',
                message: 'Ocurrió un error desconocido al intentar cargar los proyectos. Inténtalo de nuevo más tarde.'
            });

            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUserProjects();
    }, []);

    const tabs = [
        {
            label: 'Abiertos',
            content: openProjects.length > 0 ? (
                <div className="my-projects-page__cards">
                    {openProjects.map(project => (
                        <MyProjectCard key={project._id} project={project} />
                    ))}
                </div>
            ) : (
                <div className="my-projects-page__empty-state-tabs">
                    <div className="my-projects-page__empty-state__title">
                        <img src="../../assets/svg/projects-empty-state.svg" alt="Sin postulaciones" />

                        <div>
                            <h2 className="title-32-medium">No tienes proyectos abiertos</h2>
                            <p className="subtitle-18">Cuando un proyecto tenga su convocatoria abierta, aparecerá aquí.</p>
                        </div>
                    </div>
                </div>
            )
        },
        {
            label: 'En curso',
            content: inProgressProjects.length > 0 ? (
                <div className="my-projects-page__cards">
                    {inProgressProjects.map(project => (
                        <MyProjectCard key={project._id} project={project} />
                    ))}
                </div>
            ) : (
                <div className="my-projects-page__empty-state-tabs">
                    <div className="my-projects-page__empty-state__title">
                        <img src="../../assets/svg/projects-empty-state.svg" alt="Sin postulaciones" />

                        <div>
                            <h2 className="title-32-medium">No tienes proyectos en curso</h2>
                            <p className="subtitle-18">Una vez que finalicen las convocatorias y el proyecto tenga un equipo de personas conformado, su estado podrá ser cambiado a “en curso” y podrás empezar a trabajar en él.</p>
                        </div>
                    </div>
                </div>
            )
        },
        {
            label: 'Finalizados',
            content: completedProjects.length > 0 ? (
                <div className="my-projects-page__cards">
                    {completedProjects.map(project => (
                        <MyProjectCard key={project._id} project={project} />
                    ))}
                </div>
            ) : (
                <div className="my-projects-page__empty-state-tabs">
                    <div className="my-projects-page__empty-state__title">
                        <img src="../../assets/svg/projects-empty-state.svg" alt="Sin postulaciones" />

                        <div>
                            <h2 className="title-32-medium">No tienes proyectos finalizados</h2>
                            <p className="subtitle-18">Una vez que tu equipo y tú terminen de trabajar en algún proyecto en particular, podrán cambiar su estado a “finalizado”.</p>
                        </div>
                    </div>
                </div>
            )
        }
    ];

    if (loading) {
        return <Loader />;
    }

    return (
        <main>
            <div className="container">

                {openProjects.length > 0 || inProgressProjects.length > 0 || completedProjects.length > 0 ? (

                    <section className="my-projects-page">
                        <div className="my-projects-page__header">
                            <h1 className="title-48">Mis proyectos</h1>
                            <Button size="large" width="full-then-fit" onClick={() => navigate('/nueva-convocatoria')}>Crear nueva convocatoria</Button>
                        </div>

                        <Tabs tabs={tabs} />
                    </section>
                ) : (
                    <section className="my-projects-page">
                        <div className="my-projects-page__header">
                            <h1 className="title-48">Mis proyectos</h1>
                        </div>


                        <div className="my-projects-page__empty-state">
                            <div className="my-projects-page__empty-state__title">
                                <img src="../../assets/svg/projects-empty-state.svg" alt="Sin postulaciones" />

                                <div>
                                    <h2 className="title-32-medium">Aún no tienes proyectos</h2>
                                    <p className="subtitle-18">Únete a colaborar en proyectos de otras personas o crea tu propia convocatoria y forma un equipo para tu próximo proyecto.</p>
                                </div>
                            </div>

                            <div className="my-projects-page__empty-state__actions">
                                <Button color="secondary" size="large" width="full-then-fit" onClick={() => navigate('/explorar/proyectos')}>Explorar proyectos</Button>
                                <Button size="large" width="full-then-fit" onClick={() => navigate('/nueva-convocatoria')}>Crear nueva convocatoria</Button>
                            </div>
                        </div>
                    </section>
                )}

            </div >
        </main >
    )
}

export default MyProjectsPage;