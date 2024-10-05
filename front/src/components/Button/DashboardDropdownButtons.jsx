import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { updateProjectStatus } from '../../services/projectService';
import { leaveProject } from '../../services/teamService';
import DropdownButton from './DropdownButton';
import Modal from '../Modal/Modal';

const DashboardDropdownButtons = ({ project, projectType, projectStatus, user, userRole, onStatusChange }) => {

    const navigate = useNavigate();

    /* Modal */
    const [isLeaveModalOpen, setLeaveModalOpen] = useState(false);
    const handleOpenLeaveModal = () => setLeaveModalOpen(true);
    const handleCloseLeaveModal = () => setLeaveModalOpen(false);

    const [isStartProjectModalOpen, setStartProjectModalOpen] = useState(false);
    const handleOpenStartProjectModal = () => setStartProjectModalOpen(true);
    const handleCloseStartProjectModal = () => setStartProjectModalOpen(false);

    /* Funcionalidades de los botones */
    const handleStartProject = async () => {
        try {
            const updatedProject = await updateProjectStatus(project._id, 'En curso');

            console.log("Proyecto iniciado con éxito:", updatedProject); //Mostrar al usuario

            onStatusChange('En curso');

            handleCloseStartProjectModal();
        } catch (error) {
            console.error("Error al iniciar el proyecto:", error);

            handleCloseStartProjectModal();
        }
    };

    const handleLeaveProject = async () => {
        try {
            await leaveProject(project._id, user._id);

            console.log('Has abandonado el proyecto con éxito.'); //Mostrar al usuario

            navigate(`/mis-proyectos`);
        } catch (error) {
            console.error('Error al abandonar el proyecto:', error);
        }
    };

    /* Botones */
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
                            onClick: handleOpenStartProjectModal
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
                            onClick: handleOpenLeaveModal
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

    return (
        <>
            {renderDropdownOptions()}

            <Modal
                isOpen={isLeaveModalOpen}
                onClose={handleCloseLeaveModal}
                title={`¿Quieres abandonar el proyecto ${project.name}?`}
                subtitle="Dejarás de pertenecer al equipo de este proyecto y ya no podrás colaborar en él. Esta acción se reflejará en tu perfil."
                actions={[
                    { label: 'Cancelar', color: 'secondary', size: "large", width: "fullwidth", onClick: handleCloseLeaveModal },
                    { label: 'Abandonar', color: 'red', size: "large", width: "fullwidth", onClick: handleLeaveProject },
                ]}
            />

            <Modal
                isOpen={isStartProjectModalOpen}
                onClose={handleCloseStartProjectModal}
                title={'¿Quieres dar inicio al proyecto y cambiar su estado a "en curso"?'}
                subtitle="Una vez que el proyecto esté en curso, la convocatoria cerrará y no podrás añadir más colaboradores al equipo."
                actions={[
                    { label: 'Cancelar', color: 'secondary', size: "large", width: "fullwidth", onClick: handleCloseStartProjectModal },
                    { label: 'Comenzar proyecto', color: 'primary', size: "large", width: "fullwidth", onClick: handleStartProject },
                ]}
            />
        </>
    )
}

export default DashboardDropdownButtons;