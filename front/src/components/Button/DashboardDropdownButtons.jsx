import { useNavigate } from 'react-router-dom';
import { updateProjectStatus } from '../../services/projectService';
import DropdownButton from './DropdownButton';

const DashboardDropdownButtons = ({ project, projectType, projectStatus, userRole, onStatusChange }) => {

    const navigate = useNavigate();

    const handleStartProject = async () => {
        console.log("Proyecto iniciado con éxito")
    }

    /* Mostrar opciones dinámicamente */
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
                            onClick: handleStartProject
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

    return (
        <>
            {renderDropdownOptions()}
        </>
    )
}

export default DashboardDropdownButtons;