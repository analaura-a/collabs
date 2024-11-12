import ProjectChatView from '../../Chat/ProjectChatView';

const TabGroupChat = ({ project }) => {

    return (
        <section className="dashboard-tab-container">

            <div className="title-with-icon-and-paragraph">
                <div className="title-with-icon">
                    <img src="../assets/svg/chat.svg" alt="Chat grupal" />
                    <h2 className="title-20 medium-text">Chat grupal</h2>
                </div>

                <p className="light-paragraph">Ponte en contacto con el resto del equipo para comenzar el proyecto.</p>
            </div>

            <ProjectChatView projectId={project._id} />

        </section>
    );
};

export default TabGroupChat;