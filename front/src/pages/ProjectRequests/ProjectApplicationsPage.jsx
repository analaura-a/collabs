import ApplicationsTable from "../../components/Table/ApplicationsTable";

const ProjectApplicationsPage = () => {

    return (
        <main>
            <div className="container">

                <section className="applications-page">

                    <div className="applications-page__header">
                        <h1 className="title-48">Mis postulaciones</h1>
                        <p className="subtitle-18">Sigue el estado de los proyectos a los que apliques para unirte a colaborar.</p>
                    </div>

                    {/* Tabla */}
                    <ApplicationsTable />

                </section>

            </div >
        </main >
    )
}

export default ProjectApplicationsPage;