import { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../../context/AuthContext';
import { getRequestsByUserId } from '../../services/requestService';
import { getProjectById } from '../../services/projectService';
import { getUserById } from '../../services/userService';
import { useToast } from '../../context/ToastContext';
import ApplicationsTable from "../../components/Table/ApplicationsTable";
import Button from "../../components/Button/Button";

const ProjectApplicationsPage = () => {

    const { authState } = useContext(AuthContext);
    const { user } = authState;

    const navigate = useNavigate();

    const [applications, setApplications] = useState([]);
    const [loading, setLoading] = useState(true);

    const { addToast } = useToast();

    const fetchApplications = async () => {
        try {
            const userRequests = await getRequestsByUserId(user._id);

            // Para cada postulación, hacemos peticiones adicionales para obtener los datos del proyecto y organizador
            const enrichedRequests = await Promise.all(userRequests.map(async (application) => {

                const projectDetails = await getProjectById(application.project_id);
                const organizerDetails = await getUserById(projectDetails.founder_id);

                return {
                    ...application,
                    project_name: projectDetails.name,
                    organizer_name: organizerDetails.name + " " + organizerDetails.last_name,
                    organizer_username: organizerDetails.username,
                    organizer_photo: organizerDetails.profile_pic
                };
            }));

            setApplications(enrichedRequests);
            setLoading(false);
        } catch (error) {
            addToast({
                type: 'error',
                title: 'Error al cargar las postulaciones',
                message: 'Ocurrió un error desconocido al intentar cargar las postulaciones. Inténtalo de nuevo más tarde.'
            });
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchApplications();
    }, [user]);


    if (loading) {
        return <div>Cargando...</div>; //Reemplazar por componente de carga
    }

    return (
        <main>
            <div className="container">

                <section className="applications-page">

                    <div className="applications-page__header">
                        <h1 className="title-48">Mis postulaciones</h1>
                        <p className="subtitle-18">Sigue el estado de los proyectos a los que apliques para unirte a colaborar.</p>
                    </div>

                    {applications.length > 0 ? (

                        <ApplicationsTable applications={applications} setApplications={setApplications} />

                    ) : (
                        <div className="applications-page__empty-state">
                            <img src="../../assets/svg/requests-empty-state.svg" alt="Sin postulaciones" />

                            <div>
                                <h2 className="title-32-medium">Aún no te has postulado a colaborar en ningún proyecto</h2>
                                <p className="subtitle-18">Cuando hayas solicitado unirte a colaborar en algún proyecto, podrás seguir el estado de tu postulación aquí.</p>
                            </div>

                            <Button size="large" width="full-then-fit" onClick={() => navigate('/explorar/proyectos')}>Explorar proyectos</Button>
                        </div>
                    )}

                </section>

            </div >
        </main >
    )
}

export default ProjectApplicationsPage;