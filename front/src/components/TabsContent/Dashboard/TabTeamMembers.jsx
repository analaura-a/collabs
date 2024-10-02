import { useState, useEffect } from 'react';
import { getActiveProjectMembers } from '../../../services/teamService';
import TeamMemberCard from '../../Cards/TeamMemberCard';

const TabTeamMembers = ({ projectId, projectType, projectStatus, userRole }) => {

    const [teamMembers, setTeamMembers] = useState([]);

    const [loading, setLoading] = useState(true);

    const fetchTeamMembers = async () => {
        try {
            const members = await getActiveProjectMembers(projectId);
            setTeamMembers(members);
            setLoading(false);
        } catch (err) {
            console.error('Error al obtener los miembros activos:', err);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchTeamMembers();
    }, [projectId]);

    if (loading) {
        return <div>Cargando...</div>; //Reemplazar por componente de carga
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
                    <p className="light-paragraph">Las personas que conforman el equipo del proyecto en la actualidad.</p>
                ) : (
                    <p className="light-paragraph">Las personas que se encargan de administrar y mantener el proyecto en la actualidad.</p>
                )}
            </div>

            <div className="dashboard-tab__user-cards-container">
                {teamMembers.map((member) => (
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
            </div>

        </section>
    );
};

export default TabTeamMembers;