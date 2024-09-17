import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../../context/AuthContext';

import Button from '../../components/Button/Button';
import Input from '../../components/Inputs/Input';
import Textarea from '../../components/Inputs/Textarea';
import Stepper from '../../components/Stepper/Stepper';

const CreatePersonalProjectPage = () => {

    return (
        <main>
            <div className="container">

                <section className="create-project-page">

                    <h1 className="title-40 new-project-page__title">Crear convocatoria para un proyecto <span className="primary-color-text">personal</span></h1>

                    <Stepper currentStep={1} totalSteps={5} />

                    <div className="create-project__step">
                        <div className="create-project__header">
                            <div className="create-project__header__title">
                                <p className="create-project__header__step subtitle primary-color-text medium-text">Paso 1</p>
                                <h2 className="title-20 medium-text">Información del proyecto</h2>
                            </div>

                            <p className="paragraph-18">Añade toda la información del proyecto necesaria para que aquellas personas interesadas en colaborar puedan conocerlo y decidir si participar en él.</p>
                        </div>

                        <form className="create-project__form-with-inputs">
                            <Input label="Nombre del proyecto" id="username" name="username" placeholder="Proyecto de..." helperText={'Si el proyecto aún no tiene nombre, intenta usar un nombre descriptivo (por ejemplo: “web para adoptar mascotas”).'} required></Input>

                            <Textarea label="Descripción del proyecto" rows={"10"} placeholder="El proyecto consistiría en... y estoy buscando personas que quieran sumarse a colaborar haciendo tareas como..." name="bio" required />

                        </form>
                    </div>

                    <div className="new-project-page__actions">
                        <Button size="large" width="full-then-fit">Siguiente</Button>
                    </div>

                </section>

            </div>
        </main>
    )
}

export default CreatePersonalProjectPage;