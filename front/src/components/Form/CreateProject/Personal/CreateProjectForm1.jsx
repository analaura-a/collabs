import { useState, useEffect } from 'react';
import Input from '../../../Inputs/Input';
import Textarea from '../../../Inputs/Textarea';
import Select from '../../../Inputs/Select';
import FileInput from '../../../Inputs/FileInput';

const availabilities = [
    { value: 'De 1 a 2 horas / día', label: 'De 1 a 2 horas / día' },
    { value: 'De 3 a 4 horas / día', label: 'De 3 a 4 horas / día' },
    { value: 'De 5 a 6 horas / día', label: 'De 5 a 6 horas / día' },
    { value: '+7 horas / día', label: '+7 horas / día' },
];

const CreateProjectForm1 = ({ onChange, onValidate, initialData }) => {

    const [projectName, setProjectName] = useState(initialData?.name || '');
    const [description, setDescription] = useState(initialData?.about || '');
    const [availability, setAvailability] = useState(initialData?.required_availability || '');
    const [projectImage, setProjectImage] = useState(null); //¿Cambiar?

    useEffect(() => {
        onChange({
            name: projectName,
            about: description,
            required_availability: availability,
            cover: projectImage,
        });

        const isValid = projectName.trim().length > 0 && description.trim().length > 0 && availability.length > 0;
        onValidate(isValid);
    }, [projectName, description, availability, projectImage]);

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

            <Select
                label="Disponibilidad requerida"
                name="required_availability"
                id="required_availability"
                value={availability}
                defaultText="Selecciona la disponibilidad"
                options={availabilities}
                onChange={(e) => setAvailability(e.target.value)}
                required />

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