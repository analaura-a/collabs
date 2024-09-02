import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getOpenProjects } from '../../services/projectService';
import Tabs from '../../components/Tabs/Tabs';
import ProjectCard from '../../components/Cards/ProjectCard';

const ExploreProjectsPage = () => {

    const [projects, setProjects] = useState([]);
    const [personalProjects, setPersonalProjects] = useState([]);
    const [openSourceProjects, setOpenSourceProjects] = useState([]);

    const [loading, setLoading] = useState(true);
    // const [error, setError] = useState(null);

    const fetchProjects = async () => {
        try {
            //Obtener todos los proyectos
            const fetchedProjects = await getOpenProjects();
            setProjects(fetchedProjects);

            // Filtrar por tipo
            const personal = fetchedProjects.filter(project => project.type === 'Personal');
            const openSource = fetchedProjects.filter(project => project.type === 'Open-source');
            setPersonalProjects(personal);
            setOpenSourceProjects(openSource);

            setLoading(false);
        } catch (error) {
            console.error('Error al cargar proyectos:', error);
            // setError('Ocurrió un error al cargar los proyectos. Inténtalo de nuevo más tarde.');
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProjects();
    }, []);

    const tabs = [
        {
            label: 'Personales',
            content: (
                <section className="explore-page__container-user-cards explore-page__container-project-cards">
                    {personalProjects.map((project) => (
                        <ProjectCard key={project._id} project={project} />
                    ))}
                </section>
            )
        },
        {
            label: 'Open-source',
            content: (
                <section className="explore-page__container-user-cards explore-page__container-project-cards">
                    {openSourceProjects.map((project) => (
                        <ProjectCard key={project._id} project={project} />
                    ))}
                </section>
            )
        }
    ];

    if (loading) return <div>Cargando proyectos...</div>; //Componente de carga

    // if (error) return <div>{error}</div>; 

    return (
        <main>
            <div className="container explore-page-container">

                <section className="explore-page__header">

                    <div className="explore-page__header___toggle light-paragraph">
                        <Link to="/explorar/proyectos" className="toggle-active">Proyectos</Link>
                        <Link to="/explorar/colaboradores">Colaboradores</Link>
                    </div>

                    <div>
                        <h1 className="title-56">Descubre oportunidades de colaboración</h1>

                        {/* Componente de búsqueda */}
                    </div>

                </section>

                <Tabs tabs={tabs} />

            </div>
        </main>
    )
}

export default ExploreProjectsPage;