import { useState, useEffect } from 'react';

const TabProjectApplications = ({ projectId }) => {

    const [loading, setLoading] = useState(true);

    if (loading) {
        return <div>Cargando...</div>; //Reemplazar por componente de carga
    }

    return (
        <section className="dashboard-tab-container">

            <div className="title-with-icon-and-paragraph">
                <div className="title-with-icon">
                    <img src="../assets/svg/inbox.svg" alt="Postulaciones" />
                    <h2 className="title-20 medium-text">Revisión de postulaciones</h2>
                </div>

                <p className="light-paragraph">Revisa las postulaciones de las personas interesadas en unirse a colaborar en el proyecto.</p>
            </div>

            <div className="dashboard-tab__user-cards-container">

            </div>

        </section>
    );
};

export default TabProjectApplications;