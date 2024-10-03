import { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import AuthContext from '../../context/AuthContext';
import { getProjectById } from '../../services/projectService';
import { getUserRoleInProject } from '../../services/teamService';
import DropdownButton from "../../components/Button/DropdownButton";
import DashboardActionButtons from '../../components/Button/DashboardActionButtons';
import Tabs from "../../components/Tabs/Tabs";
import TabTeamMembers from '../../components/TabsContent/Dashboard/TabTeamMembers';
import TabProjectApplications from '../../components/TabsContent/Dashboard/TabProjectApplications';

const ProjectDashboardPage = () => {

    const { id } = useParams();
    const navigate = useNavigate();

    const { authState } = useContext(AuthContext);
    const { user } = authState;

    const [project, setProject] = useState(null);
    const [projectType, setProjectType] = useState('');
    const [projectStatus, setProjectStatus] = useState('');
    const [userRole, setUserRole] = useState(null);

    const [loading, setLoading] = useState(true);

    const fetchProjectData = async () => {
        try {
            // Obtener los detalles del proyecto
            const projectData = await getProjectById(id);
            setProject(projectData);
            setProjectType(projectData.type);
            setProjectStatus(projectData.status);

            // Verificar el rol del usuario en el proyecto
            const roleData = await getUserRoleInProject(id, user._id);
            setUserRole(roleData.role);

            setLoading(false);
        } catch (error) {
            console.error('Error al cargar el proyecto:', error);
            setLoading(false);
        }
    };

    const handleStatusChange = (newStatus) => {
        setProject(prevProject => ({
            ...prevProject,
            status: newStatus
        }));

        setProjectStatus(newStatus);
    };

    useEffect(() => {
        fetchProjectData();
    }, [id]);

    const renderDropdownOptions = () => {

        let options = [];

        //Proyectos personales
        if (projectType === 'Personal') {

            if (projectStatus === 'Abierto') {

                if (userRole === 'Organizador') {
                    options = [
                        {
                            title: 'Ver convocatoria',
                            onClick: () => navigate(`/proyectos/${project._id}`)
                        },
                        {
                            title: 'Editar convocatoria',
                            onClick: () => navigate(`/mis-proyectos/${project._id}/editar-convocatoria`)
                        },
                        {
                            title: 'Editar detalles del proyecto',
                            onClick: () => navigate(`/mis-proyectos/${project._id}/editar-detalles`)
                        },
                        {
                            title: 'Dar inicio al proyecto',
                            onClick: () => console.log("Funcionalidad")
                        },
                        {
                            title: 'Cancelar proyecto',
                            onClick: () => console.log("Funcionalidad")
                        }
                    ];
                } else if (userRole === 'Colaborador') {
                    options = [
                        {
                            title: 'Ver convocatoria',
                            onClick: () => navigate(`/proyectos/${project._id}`)
                        },
                        {
                            title: 'Abandonar proyecto',
                            onClick: () => console.log("Funcionalidad")
                        },
                    ];
                }

            } else if (projectStatus === 'En curso') {
                options = [
                    {
                        title: 'Funcionalidad aquí',
                        onClick: () => console.log("Funcionalidad")
                    }
                ]
            } else if (projectStatus === 'Finalizado') {
                options = [
                    {
                        title: 'Funcionalidad aquí',
                        onClick: () => console.log("Funcionalidad")
                    }
                ];
            }

        //Proyectos open-source
        } else if (projectType === 'Open-source') {

            if (projectStatus === 'Abierto') {

                options = [
                    {
                        title: 'Ver convocatoria',
                        onClick: () => navigate(`/proyectos/${project._id}`)
                    },
                    {
                        title: 'Editar convocatoria',
                        onClick: () => navigate(`/mis-proyectos/${project._id}/editar-convocatoria`)
                    },
                    {
                        title: 'Editar detalles del proyecto',
                        onClick: () => navigate(`/mis-proyectos/${project._id}/editar-detalles`)
                    },
                    {
                        title: 'Finalizar proyecto',
                        onClick: () => console.log("Funcionalidad")
                    },
                    {
                        title: 'Cancelar proyecto',
                        onClick: () => console.log("Funcionalidad")
                    }
                ];

            } else if (projectStatus === 'En curso') {
                options = [
                    {
                        title: 'Funcionalidad aquí',
                        onClick: () => console.log("Funcionalidad")
                    }
                ];
            } else if (projectStatus === 'Finalizado') {
                options = [
                    {
                        title: 'Funcionalidad aquí',
                        onClick: () => console.log("Funcionalidad")
                    }
                ];
            }

        }

        return <DropdownButton options={options} />;
    };

    const renderDescription = () => {
        if (projectType === "Personal") {

            if (userRole == "Organizador") {
                switch (projectStatus) {
                    case 'Abierto':
                        return <p className="paragraph-18">El proyecto está <span className="medium-text">buscando colaboradores</span>, revisa las postulaciones de las personas interesadas en él y define tu equipo ideal.</p>;
                    case 'En curso':
                        return <p className="paragraph-18">El proyecto está <span className="medium-text">en curso</span>, coordina con el resto de tus compañeros de equipo para llevar adelante el proyecto de la manera más efectiva posible.</p>;
                    case 'Finalizado':
                        return <p className="paragraph-18">El proyecto está <span className="medium-text">archivado</span>, porque ha finalizado. Si quieres volver a trabajar en él, deberás reabrirlo. También es un buen momento para dejarles una reseña a tus compañeros de equipo.</p>;
                }
            } else if (userRole == "Colaborador") {
                switch (projectStatus) {
                    case 'Abierto':
                        return <p className="paragraph-18">El proyecto está <span className="medium-text">buscando colaboradores</span>, el organizador revisará las postulaciones de las personas interesadas en unirse y definirá el equipo para comenzar a trabajar en el proyecto.</p>;
                    case 'En curso':
                        return <p className="paragraph-18">El proyecto está <span className="medium-text">en curso</span>, coordina con el resto de tus compañeros de equipo para llevar adelante el proyecto de la manera más efectiva posible.</p>;
                    case 'Finalizado':
                        return <p className="paragraph-18">El proyecto está <span className="medium-text">archivado</span>, porque ha finalizado. Para volver a trabajar en él, el organizador deberá reabrirlo. Es un buen momento para dejarles una reseña a tus compañeros de equipo.</p>;
                }
            }

        } else if (projectType === "Open-source") {
            switch (projectStatus) {
                case 'Abierto':
                    return <p className="paragraph-18">El proyecto está <span className="medium-text">buscando colaboradores</span>, guía a las personas interesadas en contribuir hacia el repositorio del proyecto.</p>;
                case 'Finalizado':
                    return <p className="paragraph-18">El proyecto está <span className="medium-text">archivado</span>, porque ha finalizado. Si quieres reabrir la convocatoria, deberás reabrir el proyecto. También es un buen momento para dejarle una reseña al resto del equipo.</p>;
            }
        }
    };

    const renderTabs = () => {
        let tabs = [];

        if (!project || !projectType || !projectStatus || !userRole) {
            return <div>Cargando...</div>; //Reemplazar por componente de carga
        }

        //Proyectos personales
        if (projectType === 'Personal') {

            if (projectStatus === 'Abierto') {

                if (userRole === 'Organizador') {
                    tabs = [
                        { label: 'Postulaciones', content: <TabProjectApplications projectId={project._id} projectType={projectType} projectStatus={projectStatus} userRole={userRole} /> },
                        { label: 'Equipo', content: <TabTeamMembers projectId={project._id} projectType={projectType} projectStatus={projectStatus} userRole={userRole} /> }
                    ];
                } else if (userRole === 'Colaborador') {
                    tabs = [
                        { label: 'Equipo', content: <TabTeamMembers projectId={project._id} projectType={projectType} projectStatus={projectStatus} userRole={userRole} /> }
                    ];
                }

            } else if (projectStatus === 'En curso') {
                tabs = [
                    { label: 'Equipo', content: <div>Equipo aquí...</div> }
                ];
            } else if (projectStatus === 'Finalizado') {
                tabs = [
                    { label: 'Equipo', content: <div>Equipo aquí...</div> }
                ];
            }

        //Proyectos open-source
        } else if (projectType === 'Open-source') {

            if (projectStatus === 'Abierto') {

                tabs = [
                    { label: 'Personas interesadas', content: <div>Lista de interesados aquí...</div> },
                    { label: 'Organizadores', content: <TabTeamMembers projectId={project._id} projectType={projectType} projectStatus={projectStatus} userRole={userRole} /> }
                ];

            } else if (projectStatus === 'En curso') {
                tabs = [
                    { label: 'Organizadores', content: <div>Organizadores aquí...</div> }
                ];
            } else if (projectStatus === 'Finalizado') {
                tabs = [
                    { label: 'Organizadores', content: <div>Organizadores aquí...</div> }
                ];
            }

        }

        if (tabs.length > 0) {
            return <Tabs tabs={tabs} />;
        }
    };

    if (loading) {
        return <div>Cargando...</div>; //Reemplazar por componente de carga
    }

    return (
        <main>
            <div className="container project-dashboard-page">

                <section className="project-dashboard__header">
                    <div className="project-dashboard__header__top">
                        <div className="project-dashboard__header__top__type">
                            <img src="../../assets/svg/purple-dot-status.svg" alt="Estatus del proyecto" />
                            <p className="subtitle medium-text primary-color-text">Proyecto {project.status.toLowerCase()}</p>
                        </div>

                        {renderDropdownOptions()}
                    </div>

                    <div className="project-dashboard__info-and-actions">

                        <div className="project-dashboard__header__info">

                            <div className="project-dashboard__header__info__title">
                                <h1 className="title-40">{project.name}</h1>

                                <ul className="project-dashboard__header__info__title__list">
                                    <li>
                                        <img src="../assets/svg/category.svg" alt="Categoría" />
                                        <p className="light-paragraph">{project.type}</p>
                                    </li>

                                    <li>
                                        <img src="../assets/svg/clock.svg" alt="Reloj" />
                                        <p className="light-paragraph">{new Date(project.created_at).toLocaleDateString('en-GB')}</p>
                                    </li>
                                </ul>
                            </div>

                            {renderDescription()}

                        </div>

                        <DashboardActionButtons
                            projectId={project._id}
                            projectType={projectType}
                            projectStatus={projectStatus}
                            userRole={userRole}
                            onStatusChange={handleStatusChange}
                        />
                    </div>
                </section>

                {renderTabs()}

            </div>
        </main>
    )
}

export default ProjectDashboardPage;