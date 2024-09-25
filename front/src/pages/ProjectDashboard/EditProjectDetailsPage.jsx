import { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { getProjectById, updateProjectDetails } from "../../services/projectService";
import Input from "../../components/Inputs/Input";
import Textarea from "../../components/Inputs/Textarea";
import Select from "../../components/Inputs/Select";
import FileInput from "../../components/Inputs/FileInput";
import Button from "../../components/Button/Button";

const availabilities = [
    { value: 'De 1 a 2 horas / día', label: 'De 1 a 2 horas / día' },
    { value: 'De 3 a 4 horas / día', label: 'De 3 a 4 horas / día' },
    { value: 'De 5 a 6 horas / día', label: 'De 5 a 6 horas / día' },
    { value: '+7 horas / día', label: '+7 horas / día' },
];

const EditProjectDetailsPage = () => {

    const { id } = useParams();
    const navigate = useNavigate();

    const [project, setProject] = useState('');
    const [projectName, setProjectName] = useState('');
    const [description, setDescription] = useState('');
    const [availability, setAvailability] = useState('');
    const [repositoryUrl, setRepositoryUrl] = useState('');
    const [urlError, setUrlError] = useState('');
    const [projectImage, setProjectImage] = useState(null);

    const [loading, setLoading] = useState(true);

    const fetchProjectDetails = async () => {
        try {
            const projectData = await getProjectById(id);
            setProject(projectData)
            setProjectName(projectData.name);
            setDescription(projectData.about);
            setAvailability(projectData.required_availability);
            setRepositoryUrl(projectData.url);
            setLoading(false);
        } catch (error) {
            console.error('Error al cargar los detalles del proyecto:', error);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProjectDetails();
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            // Actualizar detalles del proyecto
            const projectData = {
                name: projectName,
                about: description,
                required_availability: availability,
                url: repositoryUrl
            };

            await updateProjectDetails(id, projectData);

            console.log("Proyecto actualizado con éxito."); //Mostrar al usuario

        } catch (error) {
            console.error('Error al actualizar el proyecto:', error);
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
                            <p className="subtitle medium-text primary-color-text">{project.type}</p>
                        </div>
                        <h1 className="title-40">Editar detalles del proyecto <span className="primary-color-text">{project.name}</span></h1>
                    </div>

                    <div className="edit-project-page__form">
                        <form className="create-project__form-with-inputs" onSubmit={handleSubmit}>
                            <Input
                                label="Nombre del proyecto"
                                id="name"
                                name="name"
                                value={projectName}
                                onChange={(e) => setProjectName(e.target.value)}
                                placeholder="Proyecto de..."
                                helperText={'Si el proyecto aún no tiene nombre, intenta usar un nombre descriptivo (por ejemplo: “web para adoptar mascotas”).'}
                                required>
                            </Input>

                            <Textarea
                                label="Descripción del proyecto"
                                id="about"
                                name="about"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                rows={"10"}
                                placeholder="El proyecto consistiría en... y estoy buscando personas que quieran sumarse a colaborar haciendo tareas como..."
                                required />

                            {project.type == "Personal" ? (
                                <Select
                                    label="Disponibilidad requerida"
                                    name="required_availability"
                                    id="required_availability"
                                    value={availability}
                                    defaultText="Selecciona la disponibilidad"
                                    options={availabilities}
                                    onChange={(e) => setAvailability(e.target.value)}
                                    required />
                            ) : (
                                <Input
                                    label="Link al repositorio"
                                    id="url"
                                    name="url"
                                    type="url"
                                    value={repositoryUrl}
                                    onChange={(e) => setRepositoryUrl(e.target.value)}
                                    placeholder="Ej: github.com/user/repo"
                                    helperText={'Las personas interesadas en contribuir serán redirigidas a este link.'}
                                    errorText={repositoryUrl && urlError ? urlError : ''}
                                    required>
                                </Input>
                            )}

                            <FileInput
                                label="Imagen de portada"
                                name="cover"
                                id="cover"
                                helperText="Esta es la imagen que se mostrará en los resultados de búsqueda."
                                accept="image/*"

                            />

                            <Button type="submit" size="large" width="fullwidth">Actualizar</Button>
                        </form>
                    </div>

                </section>

            </div>
        </main>
    )
}

export default EditProjectDetailsPage;