import { Link } from 'react-router-dom';

const ExploreProjectsPage = () => {

    return (
        <main>
            <div className="container explore-page-container">

                <section className="explore-page__header">

                    <div className="explore-page__header___toggle light-paragraph">
                        <Link to="/explorar/proyectos" className="toggle-active">Proyectos</Link>
                        <Link to="/explorar/colaboradores">Colaboradores</Link>
                    </div>

                    <div>
                        <h1 className="title-56">Descubre oportunidades de colaboración</h1>

                        {/* Componente de búsqueda */}
                    </div>

                </section>

            </div>
        </main>
    )
}

export default ExploreProjectsPage;