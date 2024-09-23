import { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../../context/AuthContext';
import { getUserProjects } from '../../services/projectService';
import Button from '../../components/Button/Button';
import Tabs from '../../components/Tabs/Tabs';
import MyProjectCard from '../../components/Cards/MyProjectCard';

const MyProjectsPage = () => {

    const { authState } = useContext(AuthContext);
    const { user } = authState;

    const navigate = useNavigate();

    const [openProjects, setOpenProjects] = useState([]);
    const [inProgressProjects, setInProgressProjects] = useState([]);
    const [completedProjects, setCompletedProjects] = useState([]);

    const [loading, setLoading] = useState(true);
    // const [error, setError] = useState(null);

    const fetchUserProjects = async () => {
        try {
            const userProjects = await getUserProjects(user._id);
            setOpenProjects(userProjects.openProjects);
            setInProgressProjects(userProjects.inProgressProjects);
            setCompletedProjects(userProjects.completedProjects);
            setLoading(false);
        } catch (error) {
            console.error('Ocurrió un error al cargar tus proyectos.');
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
                <div className="empty-state">No tienes proyectos abiertos.</div>
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
                <div className="empty-state">No tienes proyectos en curso.</div>
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
                <div className="empty-state">No tienes proyectos finalizados.</div>
            )
        }
    ];

    if (loading) {
        return <div>Cargando...</div>; //Reemplazar por componente de carga
    }

    // if (error) {
    //     return <div>{error}</div>;
    // }

    return (
        <main>
            <div className="container">

                <section className="my-projects-page">

                    <div className="my-projects-page__header">
                        <h1 className="title-48">Mis proyectos</h1>
                        <Button size="large" width="full-then-fit" onClick={() => navigate('/nueva-convocatoria')}>Crear nueva convocatoria</Button>
                    </div>

                    <Tabs tabs={tabs} />

                </section>

                {/* <section className="my-projects-page">

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

                </section> */}

            </div >
        </main >
    )
}

export default MyProjectsPage;