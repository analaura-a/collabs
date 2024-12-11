import { useState, useEffect } from 'react';
import { getRequestsByProjectId } from '../../../services/requestService';
import ProjectApplicationsTable from '../../Table/ProjectApplicationsTable';
import { useToast } from '../../../context/ToastContext';
import Loader from '../../Loader/Loader';

const TabProjectApplications = ({ project, projectId }) => {

    const { addToast } = useToast();

    const [applications, setApplications] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchApplications = async () => {
        try {
            const projectApplications = await getRequestsByProjectId(projectId);
            setApplications(projectApplications);
            setLoading(false);
        } catch (error) {
            if (error.message !== "No hay postulaciones para este proyecto.") {
                addToast({
                    type: 'error',
                    title: 'Error al cargar las postulaciones',
                    message: 'Ocurrió un error desconocido al intentar cargar las postulaciones. Inténtalo de nuevo más tarde.'
                });
            }
            setApplications([]);
            setLoading(false);
        }
    };

    useEffect(() => {
        if (projectId) {
            fetchApplications();
        }
    }, [projectId]);

    if (loading) {
        return <Loader size="small" />;
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

            {applications.length > 0 ? (
                <ProjectApplicationsTable applications={applications} project={project} projectId={projectId} reloadApplications={fetchApplications} />
            ) : (
                <div className="my-projects-page__empty-state">
                    <div className="my-projects-page__empty-state__title">
                        <img src="../../assets/svg/requests-empty-state.svg" alt="Sin postulaciones" />

                        <div>
                            <h3 className="title-32-medium">La convocatoria no tiene postulaciones</h3>
                            <p className="subtitle-18">Ten paciencia. O también puedes compartir la convocatoria del proyecto para llegar a más personas interesadas.</p>
                        </div>
                    </div>
                </div>
            )}

        </section>
    );
};

export default TabProjectApplications;