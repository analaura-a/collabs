import { Link, useParams, useNavigate } from "react-router-dom";
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

    return (
        <main>
            <div className="container edit-project-page">

                <Link to={`/mis-proyectos/${id}`} className="small-button-with-icon arrow-left"></Link>

                <section className="edit-project-page__content">

                    <div className="edit-project-page__title">
                        <div className="project-dashboard__header__top__type">
                            <img src="../../assets/svg/purple-dot-status.svg" alt="Estatus del proyecto" />
                            <p className="subtitle medium-text primary-color-text">Personal</p>
                        </div>
                        <h1 className="title-40">Editar detalles del proyecto <span className="primary-color-text">Web de cuentos</span></h1>
                    </div>

                    <div className="edit-project-page__form">
                        <form className="create-project__form-with-inputs">
                            <Input
                                label="Nombre del proyecto"
                                id="name"
                                name="name"

                                placeholder="Proyecto de..."
                                helperText={'Si el proyecto aún no tiene nombre, intenta usar un nombre descriptivo (por ejemplo: “web para adoptar mascotas”).'}
                                required>
                            </Input>

                            <Textarea
                                label="Descripción del proyecto"
                                id="about"
                                name="about"

                                rows={"10"}
                                placeholder="El proyecto consistiría en... y estoy buscando personas que quieran sumarse a colaborar haciendo tareas como..."
                                required />

                            <Select
                                label="Disponibilidad requerida"
                                name="required_availability"
                                id="required_availability"

                                defaultText="Selecciona la disponibilidad"
                                options={availabilities}

                                required />

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