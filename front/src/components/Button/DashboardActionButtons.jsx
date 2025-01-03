import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { updateProjectStatus } from '../../services/projectService';
import { leaveProject, getActiveProjectMembers } from '../../services/teamService';
import { declinePendingRequests } from "../../services/requestService";
import { createChat, leaveGroupChat } from '../../services/chatService';
import { useToast } from "../../context/ToastContext";
import Button from "./Button";
import Modal from '../Modal/Modal';

const DashboardActionButtons = ({ project, projectType, projectStatus, user, userRole, onStatusChange }) => {

    const navigate = useNavigate();

    const { addToast } = useToast();

    /* Modal */
    const [isLeaveModalOpen, setLeaveModalOpen] = useState(false);
    const handleOpenLeaveModal = () => setLeaveModalOpen(true);
    const handleCloseLeaveModal = () => setLeaveModalOpen(false);

    const [isStartProjectModalOpen, setStartProjectModalOpen] = useState(false);
    const handleOpenStartProjectModal = () => setStartProjectModalOpen(true);
    const handleCloseStartProjectModal = () => setStartProjectModalOpen(false);

    const [isReopenProjectModalOpen, setReopenProjectModalOpen] = useState(false);
    const handleOpenReopenProjectModal = () => setReopenProjectModalOpen(true);
    const handleCloseReopenProjectModal = () => setReopenProjectModalOpen(false);

    const [isFinishProjectModalOpen, setFinishProjectModalOpen] = useState(false);
    const handleOpenFinishProjectModal = () => setFinishProjectModalOpen(true);
    const handleCloseFinishProjectModal = () => setFinishProjectModalOpen(false);

    const [isUnarchiveProjectModalOpen, setUnarchiveProjectModalOpen] = useState(false);
    const handleOpenUnarchiveProjectModal = () => setUnarchiveProjectModalOpen(true);
    const handleCloseUnarchiveProjectModal = () => setUnarchiveProjectModalOpen(false);

    /* Funcionalidades de los botones */
    const handleStartProject = async () => {
        try {
            // Cambiar estado del proyecto
            await updateProjectStatus(project._id, 'En curso');

            addToast({
                type: 'success',
                title: '¡Proyecto iniciado con éxito!',
                message: 'El proyecto ahora está "en curso".'
            });

            onStatusChange('En curso');
            handleCloseStartProjectModal();

            // Declinar las postulaciones pendientes
            await declinePendingRequests(project._id);

            // Crear el chat grupal
            const activeMembers = await getActiveProjectMembers(project._id);
            const participantIds = activeMembers.map(member => member.user_id);

            await createChat({
                type: "group",
                participants: participantIds,
                project_id: project._id
            });

        } catch (error) {
            const errorMessage = error.response?.data?.message || error.message;

            if (errorMessage === 'El chat ya existe') {
                handleCloseStartProjectModal();
            } else {
                handleCloseStartProjectModal();

                addToast({
                    type: 'error',
                    title: 'Error al iniciar el proyecto',
                    message: 'Ocurrió un error desconocido al intentar cambiar el estado del proyecto. Inténtalo de nuevo más tarde.'
                });
            }
        }
    };

    const handleReopenProject = async () => {
        try {
            await updateProjectStatus(project._id, 'Abierto');

            addToast({
                type: 'success',
                title: '¡Proyecto reabierto con éxito!',
                message: 'La convocatoria del proyecto ahora está abierta nuevamente.'
            });

            onStatusChange('Abierto');

            handleCloseReopenProjectModal();
        } catch (error) {
            addToast({
                type: 'error',
                title: 'Error al reabrir el proyecto',
                message: 'Ocurrió un error desconocido al intentar cambiar el estado del proyecto. Inténtalo de nuevo más tarde.'
            });

            handleCloseReopenProjectModal();
        }
    };

    const handleFinishProject = async () => {
        try {
            await updateProjectStatus(project._id, 'Finalizado');

            addToast({
                type: 'success',
                title: '¡Proyecto finalizado con éxito!',
                message: 'El proyecto ahora está archivado.'
            });

            onStatusChange('Finalizado');

            handleCloseFinishProjectModal();
        } catch (error) {
            addToast({
                type: 'error',
                title: 'Error al finalizar el proyecto',
                message: 'Ocurrió un error desconocido al intentar cambiar el estado del proyecto. Inténtalo de nuevo más tarde.'
            });

            handleCloseFinishProjectModal();
        }
    };

    const handleUnarchiveProject = async () => {
        try {
            await updateProjectStatus(project._id, 'En curso');

            addToast({
                type: 'success',
                title: '¡Proyecto reabierto con éxito!',
                message: 'El proyecto ahora está "en curso" nuevamente.'
            });

            onStatusChange('En curso');

            handleCloseUnarchiveProjectModal();
        } catch (error) {
            addToast({
                type: 'error',
                title: 'Error al reabrir el proyecto',
                message: 'Ocurrió un error desconocido al intentar cambiar el estado del proyecto. Inténtalo de nuevo más tarde.'
            });

            handleCloseUnarchiveProjectModal();
        }
    };

    const handleLeaveProject = async () => {
        try {
            await leaveProject(project._id, user._id);

            await leaveGroupChat(project._id);

            navigate(`/mis-proyectos`);

            addToast({
                type: 'success',
                title: 'Has abandonado el proyecto con éxito',
                message: 'Ya no perteneces al equipo del proyecto ni puedes colaborar en él.'
            });

        } catch (error) {
            const errorMessage = error.response?.data?.message || error.message;

            if (errorMessage === 'Chat o usuario no encontrado') {
                navigate(`/mis-proyectos`);

                addToast({
                    type: 'success',
                    title: 'Has abandonado el proyecto con éxito',
                    message: 'Ya no perteneces al equipo del proyecto ni puedes colaborar en él.'
                });
            } else {
                addToast({
                    type: 'error',
                    title: 'Error al abandonar el proyecto',
                    message: 'Ocurrió un error desconocido al intentar abandonar el equipo del proyecto. Inténtalo de nuevo más tarde.'
                });
            }
        };
    }

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

                if (userRole === 'Organizador') {
                    return (
                        <>
                            <Button size="large" width="fullwidth" onClick={handleOpenFinishProjectModal}>Finalizar proyecto</Button>
                            <Button size="large" color="secondary" width="fullwidth" onClick={handleOpenReopenProjectModal}>Reabrir convocatoria</Button>
                        </>
                    );
                } else if (userRole === 'Colaborador') {
                    return (
                        <>
                            <Button size="large" color="secondary" width="fullwidth" onClick={handleOpenLeaveModal}>Abandonar el proyecto</Button>
                        </>
                    );
                }

            } else if (projectStatus === 'Finalizado') {

                if (userRole === 'Organizador') {
                    return (
                        <>
                            <Button size="large" color="secondary" width="fullwidth" onClick={handleOpenUnarchiveProjectModal}>Reabrir proyecto</Button>
                        </>
                    );
                } else if (userRole === 'Colaborador') {
                    return (
                        <>
                            <p className="paragraph-18">No puedes realizar cambios por ahora.</p>
                        </>
                    );
                }

            }


        //Proyectos open-source
        } else if (projectType === "Open-source") {

            if (projectStatus === 'Abierto') {

                return (
                    <>
                        <Button size="large" width="fullwidth" onClick={handleOpenFinishProjectModal}>Finalizar proyecto</Button>
                        <Button size="large" color="secondary" width="fullwidth" onClick={() => { navigate(`/mis-proyectos/${project._id}/editar-convocatoria`); }}>Editar convocatoria</Button>
                    </>
                );

            } else if (projectStatus === 'Finalizado') {
                return (
                    <Button size="large" color="secondary" width="fullwidth" onClick={handleOpenReopenProjectModal}>Reabrir proyecto</Button>
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

            <Modal
                isOpen={isFinishProjectModalOpen}
                onClose={handleCloseFinishProjectModal}
                title={'¿Quieres dar por terminado al proyecto y cambiar su estado a "finalizado"?'}
                subtitle="Una vez que el proyecto sea finalizado, será archivado y ni tú ni el resto del equipo podrán hacer cambios en él (a menos que decidas reabrirlo)."
                actions={[
                    { label: 'Cancelar', color: 'secondary', size: "large", width: "fullwidth", onClick: handleCloseFinishProjectModal },
                    { label: 'Finalizar proyecto', color: 'primary', size: "large", width: "fullwidth", onClick: handleFinishProject },
                ]}
            />

            {projectType === 'Personal' ? (
                <Modal
                    isOpen={isReopenProjectModalOpen}
                    onClose={handleCloseReopenProjectModal}
                    title={'¿Quieres reabrir la convocatoria de este proyecto?'}
                    subtitle='El proyecto cambiará su estado a "abierto" una vez más, y podrás añadir a nuevas personas al equipo del proyecto.'
                    actions={[
                        { label: 'Cancelar', color: 'secondary', size: "large", width: "fullwidth", onClick: handleCloseReopenProjectModal },
                        { label: 'Reabrir convocatoria', color: 'primary', size: "large", width: "fullwidth", onClick: handleReopenProject },
                    ]}
                />
            ) : (
                <Modal
                    isOpen={isReopenProjectModalOpen}
                    onClose={handleCloseReopenProjectModal}
                    title={`¿Quieres reabrir el proyecto ${project.name}?`}
                    subtitle='El proyecto cambiará su estado a "abierto", la convocatoria volverá a abrirse y tanto tú como el resto de los organizadores podrán volver a hacer cambios en él.'
                    actions={[
                        { label: 'Cancelar', color: 'secondary', size: "large", width: "fullwidth", onClick: handleCloseReopenProjectModal },
                        { label: 'Reabrir proyecto', color: 'primary', size: "large", width: "fullwidth", onClick: handleReopenProject },
                    ]}
                />
            )}

            <Modal
                isOpen={isUnarchiveProjectModalOpen}
                onClose={handleCloseUnarchiveProjectModal}
                title={`¿Quieres reabrir el proyecto ${project.name}?`}
                subtitle="El proyecto volverá a estar en curso. Además, los miembros del equipo (activos al momento de finalizar el proyecto) podrán volver a trabajar en él."
                actions={[
                    { label: 'Cancelar', color: 'secondary', size: "large", width: "fullwidth", onClick: handleCloseUnarchiveProjectModal },
                    { label: 'Reabrir proyecto', color: 'primary', size: "large", width: "fullwidth", onClick: handleUnarchiveProject },
                ]}
            />

        </div>
    )
}

export default DashboardActionButtons;