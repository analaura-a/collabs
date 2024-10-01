import { useState, useEffect } from 'react';
import { getRequestsByProjectId } from '../../../services/requestService';
import ProjectApplicationsTable from '../../Table/ProjectApplicationsTable';

const TabProjectApplications = ({ projectId }) => {

    const [applications, setApplications] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchApplications = async () => {
        try {
            const projectApplications = await getRequestsByProjectId(projectId);
            setApplications(projectApplications);
            setLoading(false);
        } catch (error) {
            console.error(error.message);
            setLoading(false);
        }
    };

    useEffect(() => {
        if (projectId) {
            fetchApplications();
        }
    }, [projectId]);

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

            <ProjectApplicationsTable applications={applications} />

        </section>
    );
};

export default TabProjectApplications;