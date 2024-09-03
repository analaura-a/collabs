import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getOpenProjects } from '../../services/projectService';
import Tabs from '../../components/Tabs/Tabs';
import ProjectCard from '../../components/Cards/ProjectCard';
import SearchAndFilters from '../../components/Inputs/SearchAndFilters';

const ExploreProjectsPage = () => {

    const [projects, setProjects] = useState([]);
    const [personalProjects, setPersonalProjects] = useState([]);
    const [openSourceProjects, setOpenSourceProjects] = useState([]);

    const [filteredPersonalProjects, setFilteredPersonalProjects] = useState([]);
    const [filteredOpenSourceProjects, setFilteredOpenSourceProjects] = useState([]);

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
            setFilteredPersonalProjects(personal);
            setOpenSourceProjects(openSource);
            setFilteredOpenSourceProjects(openSource);

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

    const handleSearch = (searchTerm) => {
        if (searchTerm.trim() === "") {
            setFilteredPersonalProjects(personalProjects);
            setFilteredOpenSourceProjects(openSourceProjects);
        } else {
            const filteredPersonal = personalProjects.filter(project =>
                project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                project.about.toLowerCase().includes(searchTerm.toLowerCase())
            );
            const filteredOpenSource = openSourceProjects.filter(project =>
                project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                project.about.toLowerCase().includes(searchTerm.toLowerCase())
            );
            setFilteredPersonalProjects(filteredPersonal);
            setFilteredOpenSourceProjects(filteredOpenSource);
        }
    };

    const tabs = [
        {
            label: 'Personales',
            content: (
                <section className="explore-page__container-user-cards explore-page__container-project-cards">
                    {filteredPersonalProjects.length > 0 ? (
                        filteredPersonalProjects.map((project) => (
                            <ProjectCard key={project._id} project={project} />
                        ))
                    ) : (
                        <div>
                            No se encontraron proyectos personales con esos términos. {/* Maquetar */}
                        </div>
                    )}
                </section>
            )
        },
        {
            label: 'Open-source',
            content: (
                <section className="explore-page__container-user-cards explore-page__container-project-cards">
                    {filteredOpenSourceProjects.length > 0 ? (
                        filteredOpenSourceProjects.map((project) => (
                            <ProjectCard key={project._id} project={project} />
                        ))
                    ) : (
                        <div>
                            No se encontraron proyectos open-source con esos términos. {/* Maquetar */}
                        </div>
                    )}
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

                    <div className="explore-page__header__title-and-filters">
                        <h1 className="title-56">Descubre oportunidades de colaboración</h1>

                        <SearchAndFilters
                            placeholder="Buscar proyectos de..."
                            onSearch={handleSearch} />
                    </div>

                </section>

                <Tabs tabs={tabs} />

            </div>
        </main>
    )
}

export default ExploreProjectsPage;