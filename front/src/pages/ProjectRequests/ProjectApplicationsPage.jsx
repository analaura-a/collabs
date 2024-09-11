import { useNavigate } from 'react-router-dom';
import ApplicationsTable from "../../components/Table/ApplicationsTable";
import Button from "../../components/Button/Button";

const ProjectApplicationsPage = () => {

    const navigate = useNavigate();

    return (
        <main>
            <div className="container">

                <section className="applications-page">

                    <div className="applications-page__header">
                        <h1 className="title-48">Mis postulaciones</h1>
                        <p className="subtitle-18">Sigue el estado de los proyectos a los que apliques para unirte a colaborar.</p>
                    </div>

                    <ApplicationsTable />

                    {/* Empty state */}
                    {/* <div className="applications-page__empty-state">
                        <img src="../../assets/svg/requests-empty-state.svg" alt="Sin postulaciones" />

                        <div>
                            <h2 className="title-32-medium">Aún no te has postulado a colaborar en ningún proyecto</h2>
                            <p className="subtitle-18">Cuando hayas solicitado unirte a colaborar en algún proyecto, podrás seguir el estado de tu postulación aquí.</p>
                        </div>

                        <Button size="large" width="full-then-fit" onClick={() => navigate('/explorar/proyectos')}>Explorar proyectos</Button>
                    </div> */}

                </section>

            </div >
        </main >
    )
}

export default ProjectApplicationsPage;