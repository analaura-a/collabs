import { useState, useEffect } from 'react';
import { useToast } from '../../../context/ToastContext';
import Loader from '../../Loader/Loader';

const TabGroupChat = ({ project }) => {

    return (
        <section className="dashboard-tab-container">

            <div className="title-with-icon-and-paragraph">
                <div className="title-with-icon">
                    <img src="../assets/svg/chat.svg" alt="Chat grupal" />
                    <h2 className="title-20 medium-text">Chat grupal</h2>
                </div>

                <p className="light-paragraph">Ponte en contacto con el resto del equipo para comenzar el proyecto.</p>
            </div>

            {/* {applications ? (
                <ProjectApplicationsTable applications={applications} project={project} projectId={projectId} reloadApplications={fetchApplications} />
            ) : (
                <div className="my-projects-page__empty-state">
                    <div className="my-projects-page__empty-state__title">
                        <img src="../../assets/svg/requests-empty-state.svg" alt="Sin postulaciones" />

                        <div>
                            <h3 className="title-32-medium">Aún no has recibido postulaciones</h3>
                            <p className="subtitle-18">Ten paciencia. O también puedes compartir la convocatoria del proyecto para llegar a más personas interesadas.</p>
                        </div>
                    </div>
                </div>
            )} */}

        </section>
    );
};

export default TabGroupChat;