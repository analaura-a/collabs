import { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { getProjectById } from "../../services/projectService";

const EditOpenPositionsPage = () => {

    const { id } = useParams();
    const navigate = useNavigate();

    const [project, setProject] = useState({});

    const [loading, setLoading] = useState(true);

    const fetchProjectDetails = async () => {
        try {
            const projectData = await getProjectById(id);
            setProject(projectData);

            if (projectData.status !== 'Abierto') {
                navigate(`/mis-proyectos/${id}`);
            }

            setLoading(false);
        } catch (error) {
            console.error('Error al cargar los detalles del proyecto:', error);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProjectDetails();
    }, [id]);

    if (loading) return <div>Cargando...</div>; // Componente de carga

    return (
        <main>
            <div className="container edit-project-page">

                <Link to={`/mis-proyectos/${id}`} className="small-button-with-icon arrow-left"></Link>

                <section className="edit-project-page__content">

                    <div className="edit-project-page__title">
                        <div className="project-dashboard__header__top__type">
                            <img src="../../assets/svg/purple-dot-status.svg" alt="Estatus del proyecto" />
                            <p className="subtitle medium-text primary-color-text">Proyecto {project.type.toLowerCase()}</p>
                        </div>
                        <h1 className="title-40">Editar convocatoria para <span className="primary-color-text">{project.name}</span></h1>
                    </div>

                    <div className="edit-project-page__form">
                        <form className="create-project__form-with-inputs" noValidate>
                        </form>
                    </div>

                </section>

            </div>
        </main>
    )
}

export default EditOpenPositionsPage;