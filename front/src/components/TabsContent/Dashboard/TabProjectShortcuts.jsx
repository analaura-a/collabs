import { useState, useEffect } from 'react';
import { getRequestsByProjectId } from '../../../services/requestService';
import ProjectApplicationsTable from '../../Table/ProjectApplicationsTable';

const TabProjectShortcuts = ({ projectId, projectType, projectStatus, userRole }) => {

    // const [applications, setApplications] = useState([]);
    // const [loading, setLoading] = useState(true);

    // const fetchApplications = async () => {
    //     try {
    //         const projectApplications = await getRequestsByProjectId(projectId);
    //         setApplications(projectApplications);
    //         setLoading(false);
    //     } catch (error) {
    //         console.error(error.message);
    //         setApplications([]);
    //         setLoading(false);
    //     }
    // };

    // useEffect(() => {
    //     if (projectId) {
    //         fetchApplications();
    //     }
    // }, [projectId]);

    // if (loading) {
    //     return <div>Cargando...</div>; //Reemplazar por componente de carga
    // }

    return (
        <section className="dashboard-tab-container">

            <div className="title-with-icon-and-paragraph">
                <div className="title-with-icon">
                    <img src="../assets/svg/shortcuts.svg" alt="Atajos rápidos" />
                    <h2 className="title-20 medium-text">Atajos rápidos</h2>
                </div>

                <p className="light-paragraph">Links útiles para que todo el equipo esté en una misma sintonía.</p>
            </div>

        </section>
    );
};

export default TabProjectShortcuts;