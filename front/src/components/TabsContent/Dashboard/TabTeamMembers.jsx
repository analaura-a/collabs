import { useState, useEffect } from 'react';
import { getActiveProjectMembers, getAllProjectMembers } from '../../../services/teamService';
import TeamMemberCard from '../../Cards/TeamMemberCard';
import { useToast } from '../../../context/ToastContext';
import Loader from '../../Loader/Loader';

const TabTeamMembers = ({ projectId, projectType, projectStatus, userRole }) => {

    const [activeTeamMembers, setActiveTeamMembers] = useState([]);
    const [allTeamMembers, setAllTeamMembers] = useState([]);

    const [loading, setLoading] = useState(true);

    const { addToast } = useToast();

    const fetchTeamMembers = async () => {
        try {
            const activeMembers = await getActiveProjectMembers(projectId);
            setActiveTeamMembers(activeMembers);

            const allMembers = await getAllProjectMembers(projectId);
            setAllTeamMembers(allMembers);

            setLoading(false);
        } catch (err) {
            addToast({
                type: 'error',
                title: 'Error al cargar los miembros del equipo',
                message: 'Ocurrió un error desconocido al intentar obtener los miembros del equipo. Inténtalo de nuevo más tarde.'
            });
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchTeamMembers();
    }, [projectId]);

    if (loading) {
        return <Loader size="small" />;
    }

    return (
        <section className="dashboard-tab-container">

            <div className="title-with-icon-and-paragraph">
                <div className="title-with-icon">
                    <img src="../assets/svg/team.svg" alt="Equipo del proyecto" />
                    {projectType === "Personal" ? (
                        <h2 className="title-20 medium-text">Equipo</h2>
                    ) : (
                        <h2 className="title-20 medium-text">Organizadores</h2>
                    )}
                </div>

                {projectType === "Personal" ? (
                    <>
                        {projectStatus === "Finalizado" ? (
                            <p className="light-paragraph">Todas las personas que alguna vez formaron parte del equipo del proyecto.</p>
                        ) : (
                            <p className="light-paragraph">Las personas que conforman el equipo del proyecto en la actualidad.</p>
                        )}
                    </>
                ) : (
                    <>
                        {projectStatus === "Finalizado" ? (
                            <p className="light-paragraph">Todas las personas que alguna vez formaron parte del equipo organizador del proyecto.</p>
                        ) : (
                            <p className="light-paragraph">Las personas que se encargan de administrar y mantener el proyecto en la actualidad.</p>
                        )}
                    </>
                )}
            </div>

            <div className="dashboard-tab__user-cards-container">

                {projectStatus === "Finalizado" ? (
                    <>
                        {allTeamMembers.map((member) => (
                            <TeamMemberCard
                                key={member._id}
                                member={member}
                                projectType={projectType}
                                projectStatus={projectStatus}
                                userRole={userRole}
                                projectId={projectId}
                                onMemberRemoved={fetchTeamMembers}
                            />
                        ))}
                    </>
                ) : (
                    <>
                        {activeTeamMembers.map((member) => (
                            <TeamMemberCard
                                key={member._id}
                                member={member}
                                projectType={projectType}
                                projectStatus={projectStatus}
                                userRole={userRole}
                                projectId={projectId}
                                onMemberRemoved={fetchTeamMembers}
                            />
                        ))}</>
                )}

            </div>

        </section>
    );
};

export default TabTeamMembers;