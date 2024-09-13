import { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../components/Button/Button';

const MyProjectsPage = () => {

    return (
        <main>
            <div className="container">

                <section className="my-projects-page">

                    <div className="my-projects-page__header">
                        <h1 className="title-48">Mis proyectos</h1>
                        <Button size="large" width="full-then-fit">Crear nueva convocatoria</Button>
                    </div>

                </section>

            </div >
        </main >
    )
}

export default MyProjectsPage;