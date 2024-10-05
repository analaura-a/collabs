import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { updateProjectStatus } from '../../services/projectService';
import { leaveProject } from '../../services/teamService';
import Button from "./Button";
import Modal from '../Modal/Modal';

const DashboardActionButtons = ({ project, projectType, projectStatus, user, userRole, onStatusChange }) => {

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
    const renderActionButtons = () => {

        //Proyectos personales
        if (projectType === "Personal") {

            if (projectStatus === 'Abierto') {

                if (userRole === 'Organizador') {
                    return (
                        <>
                            <Button size="large" width="fullwidth" onClick={handleOpenStartProjectModal}>Dar inicio al proyecto</Button>
                            <Button size="large" color="secondary" width="fullwidth" onClick={() => { navigate(`/mis-proyectos/${project._id}/editar-convocatoria`); }}>Editar convocatoria</Button>
                        </>
                    );
                } else if (userRole === 'Colaborador') {
                    return (
                        <>
                            <Button size="large" color="secondary" width="fullwidth" onClick={handleOpenLeaveModal}>Abandonar el proyecto</Button>
                        </>
                    );
                }

            } else if (projectStatus === "En curso") {
                return (
                    <Button size="large" width="fullwidth">Funcionalidad aquí</Button>
                );
            } else if (projectStatus === 'Finalizado') {
                return (
                    <Button size="large" width="fullwidth">Funcionalidad aquí</Button>
                );
            }


        //Proyectos open-source
        } else if (projectType === "Open-source") {

            if (projectStatus === 'Abierto') {

                return (
                    <>
                        <Button size="large" width="fullwidth">Finalizar proyecto</Button>
                        <Button size="large" color="secondary" width="fullwidth" onClick={() => { navigate(`/mis-proyectos/${project._id}/editar-convocatoria`); }}>Editar convocatoria</Button>
                    </>
                );

            } else if (projectStatus === 'En curso') {
                return (
                    <Button size="large" width="fullwidth">Funcionalidad aquí</Button>
                );
            } else if (projectStatus === 'Finalizado') {
                return (
                    <Button size="large" width="fullwidth">Funcionalidad aquí</Button>
                );
            }

        }

        return null;
    };

    return (
        <div className="project-dashboard__header__actions">
            <div className="title-with-icon">
                <img src="../assets/svg/magic-wand.svg" alt="Destacado" />
                <h2 className="title-20 medium-text">Acciones importantes</h2>
            </div>

            <div className="project-dashboard__header__actions__buttons">
                {renderActionButtons()}
            </div>

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
        </div>
    )
}

export default DashboardActionButtons;