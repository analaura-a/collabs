import { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { getProjectById, updateProjectOpenPositions } from "../../services/projectService";
import CreateProjectForm3 from "../../components/Form/CreateProject/Personal/CreateProjectForm3";
import Button from "../../components/Button/Button";

const EditOpenPositionsPage = () => {

    const { id } = useParams();
    const navigate = useNavigate();

    const [project, setProject] = useState({});
    const [openPositions, setOpenPositions] = useState([]);

    const [isFormValid, setIsFormValid] = useState(false);
    const [loading, setLoading] = useState(true);

    const fetchProjectDetails = async () => {
        try {
            const projectData = await getProjectById(id);
            setProject(projectData);

            if (projectData.status !== 'Abierto') {
                navigate(`/mis-proyectos/${id}`);
            }

            setOpenPositions(projectData.open_positions || []);

            setLoading(false);
        } catch (error) {
            console.error('Error al cargar los detalles del proyecto:', error);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProjectDetails();
    }, [id]);

    const validateOpenPositions = () => {

        if (openPositions.length === 0) {
            // setErrors({ open_positions: 'Debe haber al menos una posición abierta.' }); ¿Mostrar al usuario?
            console.log("Debe haber al menos una posición abierta")
            return false;
        }

        const invalidPositions = openPositions.filter(pos => !pos.profile || pos.required_skills.length === 0);

        if (invalidPositions.length > 0) {
            // setErrors({ open_positions: 'Cada posición debe tener un perfil seleccionado y al menos una skill requerida.' }); ¿Mostrar al usuario?
            console.log("Cada posición debe tener un perfil seleccionado y al menos una skill requerida")
            return false;
        }

        return true;
    };

    useEffect(() => {
        const isValid = validateOpenPositions();
        setIsFormValid(isValid);
    }, [openPositions]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateOpenPositions()) {
            return;
        }

        try {
            await updateProjectOpenPositions(id, openPositions);

            fetchProjectDetails();

            console.log('Convocatoria actualizada con éxito.'); //Mostrar al usuario
        } catch (error) {
            console.error('Error al actualizar la convocatoria:', error);
            //Avisarle al usuario
        }
    };


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
                        <form className="create-project__form-with-inputs" onSubmit={handleSubmit} noValidate>

                            <CreateProjectForm3
                                initialData={{ open_positions: openPositions }}
                                onChange={(data) => setOpenPositions(data.open_positions)}
                                onValidate={() => { }}
                            />

                            <Button type="submit" size="large" width="fullwidth" disabled={!isFormValid}>Actualizar convocatoria</Button>

                        </form>
                    </div>

                </section>

            </div>
        </main>
    )
}

export default EditOpenPositionsPage;