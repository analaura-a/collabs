import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";

const EditOpenPositionsPage = () => {

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
                        <h1 className="title-40">Editar convocatoria para <span className="primary-color-text">Juguetear</span></h1>
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