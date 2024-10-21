import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { getProjectById, updateProjectDetails, uploadProjectImage } from "../../services/projectService";
import { editPersonalProjectSchema, editOpenSourceProjectSchema } from "../../validation/editProjectDetailsValidation";
import { useToast } from "../../context/ToastContext";
import Input from "../../components/Inputs/Input";
import Textarea from "../../components/Inputs/Textarea";
import Select from "../../components/Inputs/Select";
import FileInput from "../../components/Inputs/FileInput";
import Button from "../../components/Button/Button";
import Loader from "../../components/Loader/Loader";

const availabilities = [
    { value: 'De 1 a 2 horas / día', label: 'De 1 a 2 horas / día' },
    { value: 'De 3 a 4 horas / día', label: 'De 3 a 4 horas / día' },
    { value: 'De 5 a 6 horas / día', label: 'De 5 a 6 horas / día' },
    { value: '+7 horas / día', label: '+7 horas / día' },
];

const EditProjectDetailsPage = () => {

    const { id } = useParams();

    const [project, setProject] = useState('');
    const [projectName, setProjectName] = useState('');
    const [description, setDescription] = useState('');
    const [availability, setAvailability] = useState('');
    const [repositoryUrl, setRepositoryUrl] = useState('');
    const [projectImage, setProjectImage] = useState(null);
    const [imageButtonText, setImageButtonText] = useState('Selecciona un archivo');

    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(true);

    const { addToast } = useToast();

    const extractImageFileName = (path) => {
        return path.replace('uploads/projects/', '');
    };

    const fetchProjectDetails = async () => {
        try {
            const projectData = await getProjectById(id);
            setProject(projectData)
            setProjectName(projectData.name);
            setDescription(projectData.about);
            setAvailability(projectData.required_availability);
            setRepositoryUrl(projectData.url);

            if (projectData.cover) {
                setImageButtonText(extractImageFileName(projectData.cover));
            }

            setLoading(false);
        } catch (error) {
            addToast({
                type: 'error',
                title: 'Error al cargar los detalles del proyecto',
                message: 'Ocurrió un error desconocido al intentar cargar el proyecto. Inténtalo de nuevo más tarde.'
            });
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProjectDetails();
    }, [id]);

    const handleFileChange = (file) => {
        setProjectImage(file);
        setImageButtonText(file.name);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            if (project.type == "Personal") {
                const personalProjectData = {
                    name: projectName,
                    about: description,
                    required_availability: availability,
                };

                // Validar datos con yup
                await editPersonalProjectSchema.validate(personalProjectData, { abortEarly: false });

                // Actualizar los datos del proyecto
                await updateProjectDetails(id, personalProjectData);
            } else {
                const openSourceProjectData = {
                    name: projectName,
                    about: description,
                    url: repositoryUrl
                };

                // Validar datos con yup
                await editOpenSourceProjectSchema.validate(openSourceProjectData, { abortEarly: false });

                // Actualizar los datos del proyecto
                await updateProjectDetails(id, openSourceProjectData);
            }

            // Subir nueva imagen del proyecto (si el usuario seleccionó una)
            if (projectImage) {
                await uploadProjectImage(id, projectImage);
            }

            // Resetear los errores
            setErrors({});

            // Recargar la página con los nuevos datos
            fetchProjectDetails();

            //Mostrar al usuario
            addToast({
                type: 'success',
                title: 'Proyecto actualizado con éxito',
                message: 'Los cambios han sido guardados correctamente.'
            });

        } catch (error) {
            if (error.name === 'ValidationError') {
                const errorMessages = error.inner.reduce((acc, err) => {
                    return { ...acc, [err.path]: err.message };
                }, {});
                setErrors(errorMessages);
            } else {
                addToast({
                    type: 'error',
                    title: 'Error al actualizar el proyecto',
                    message: 'Ocurrió un error desconocido al intentar actualizar el proyecto. Inténtalo de nuevo más tarde.'
                });
            }
        }
    };

    if (loading) {
        return <Loader message="Cargando proyecto..." />;
    }

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
                        <form className="create-project__form-with-inputs" onSubmit={handleSubmit} noValidate>
                            <Input
                                label="Nombre del proyecto"
                                id="name"
                                name="name"
                                value={projectName}
                                onChange={(e) => setProjectName(e.target.value)}
                                placeholder="Proyecto de..."
                                helperText={'Si el proyecto aún no tiene nombre, intenta usar un nombre descriptivo (por ejemplo: “web para adoptar mascotas”).'}
                                errorText={errors.name}
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
                                errorText={errors.about}
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
                                    errorText={errors.required_availability}
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
                                    errorText={errors.url}
                                    required>
                                </Input>
                            )}

                            <FileInput
                                label="Imagen de portada"
                                name="cover"
                                id="cover"
                                helperText="Esta es la imagen que se mostrará en los resultados de búsqueda."
                                accept="image/*"
                                onFileSelect={handleFileChange}
                                buttonText={imageButtonText}

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