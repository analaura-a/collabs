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

    const [filters, setFilters] = useState({
        roles: [],
        availability: [],
        skills: []
    });
    const [searchTerm, setSearchTerm] = useState('');

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

    const filterAndSearchProjects = (term, activeFilters) => {

        const applyFilters = (projectArray) => {

            let filtered = projectArray;

            // Buscar por 'name' o 'about'
            if (term.trim() !== "") {
                filtered = filtered.filter(project =>
                    project.name.toLowerCase().includes(term.toLowerCase()) ||
                    project.about.toLowerCase().includes(term.toLowerCase())
                );
            }

            // Filtros
            if (activeFilters.roles.length > 0) {
                filtered = filtered.filter(project =>
                    project.open_positions.some(position =>
                        activeFilters.roles.includes(position.profile)
                    )
                );
            }

            if (activeFilters.availability.length > 0) {
                filtered = filtered.filter(project =>
                    activeFilters.availability.includes(project.required_availability)
                );
            }

            if (activeFilters.skills.length > 0) {
                filtered = filtered.filter(project =>
                    project.open_positions.some(position =>
                        position.required_skills.some(skill =>
                            activeFilters.skills.includes(skill)
                        ) ||
                        position.desired_skills.some(skill =>
                            activeFilters.skills.includes(skill)
                        )
                    )
                );
            }

            return filtered;
        };

        setFilteredPersonalProjects(applyFilters(personalProjects));
        setFilteredOpenSourceProjects(applyFilters(openSourceProjects));
    };

    const handleSearch = (term) => {
        setSearchTerm(term);
        filterAndSearchProjects(term, filters);
    };

    const handleFilterChange = (newFilters) => {
        setFilters(newFilters);
        filterAndSearchProjects(searchTerm, newFilters);
    };

    const tabs = [
        {
            label: 'Personales',
            content: (
                <>
                    {filteredPersonalProjects.length > 0 ? (
                        <section className="explore-page__container-user-cards explore-page__container-project-cards">
                            {filteredPersonalProjects.map((project) => (
                                <ProjectCard key={project._id} project={project} />
                            ))}
                        </section>
                    ) : (
                        <section className="explore-page__empty-state-container-projects">
                            <h2 className="title-18">No se encontraron proyectos personales que coincidan con esa búsqueda.</h2>
                        </section>
                    )}
                </>
            )
        },
        {
            label: 'Open-source',
            content: (
                <>
                    {filteredOpenSourceProjects.length > 0 ? (
                        <section className="explore-page__container-user-cards explore-page__container-project-cards">
                            {filteredOpenSourceProjects.map((project) => (
                                <ProjectCard key={project._id} project={project} />
                            ))}
                        </section>
                    ) : (
                        <section className="explore-page__empty-state-container-projects">
                            <h2 className="title-18">No se encontraron proyectos open-source que coincidan con esa búsqueda.</h2>
                        </section>
                    )}
                </>
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
                            onSearch={handleSearch}
                            onFilterChange={handleFilterChange} />
                    </div>

                </section>

                <Tabs tabs={tabs} />

            </div>
        </main>
    )
}

export default ExploreProjectsPage;