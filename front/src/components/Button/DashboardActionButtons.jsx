import { useNavigate } from 'react-router-dom';
import Button from "./Button";

const DashboardActionButtons = ({ projectId, projectType, projectStatus, userRole }) => {

    const navigate = useNavigate();

    const renderActionButtons = () => {
        //Proyectos personales
        if (projectType === "Personal") {

            if (projectStatus === 'Abierto') {

                if (userRole === 'Organizador') {
                    return (
                        <>
                            <Button size="large" width="fullwidth">Dar inicio al proyecto</Button>
                            <Button size="large" color="secondary" width="fullwidth" onClick={() => { navigate(`/mis-proyectos/${projectId}/editar-convocatoria`); }}>Editar convocatoria</Button>
                        </>
                    );
                } else if (userRole === 'Colaborador') {
                    return (
                        <>
                            <Button size="large" color="secondary" width="fullwidth">Abandonar el proyecto</Button>
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
                        <Button size="large" color="secondary" width="fullwidth" onClick={() => { navigate(`/mis-proyectos/${projectId}/editar-convocatoria`); }}>Editar convocatoria</Button>
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
        </div>
    )
}

export default DashboardActionButtons;