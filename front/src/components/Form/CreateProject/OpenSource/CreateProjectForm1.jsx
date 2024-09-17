import { useState, useEffect } from 'react';
import Input from '../../../Inputs/Input';
import Textarea from '../../../Inputs/Textarea';
import FileInput from '../../../Inputs/FileInput';

const urlRegex = /^(https?:\/\/[^\s$.?#].[^\s]*)$/;

const CreateProjectForm1 = ({ onChange, onValidate, initialData }) => {

    const [projectName, setProjectName] = useState(initialData?.name || '');
    const [description, setDescription] = useState(initialData?.about || '');
    const [repositoryUrl, setRepositoryUrl] = useState(initialData?.url || '');
    const [projectImage, setProjectImage] = useState(null); //¿Cambiar?

    const [urlError, setUrlError] = useState('');

    const validateUrl = (url) => {
        if (!urlRegex.test(url)) {
            setUrlError('Por favor, ingresa una URL válida.');
            return false;
        } else {
            setUrlError('');
            return true;
        }
    };

    useEffect(() => {
        const isUrlValid = validateUrl(repositoryUrl);

        const isValid = projectName.trim().length > 0 && description.trim().length > 0 && isUrlValid;

        onChange({
            name: projectName,
            about: description,
            url: repositoryUrl,
            cover: projectImage,
        });

        onValidate(isValid);
    }, [projectName, description, repositoryUrl, projectImage]);

    return (
        <form className="create-project__form-with-inputs">
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

            <FileInput
                label="Imagen de portada"
                name="cover"
                id="cover"
                helperText="Esta es la imagen que se mostrará en los resultados de búsqueda."
                accept="image/*"
                onFileSelect={(file) => setProjectImage(file)}
            />
        </form>
    );

};

export default CreateProjectForm1;