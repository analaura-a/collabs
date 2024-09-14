import { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../components/Button/Button';
import Tabs from '../../components/Tabs/Tabs';
import MyProjectCard from '../../components/Cards/MyProjectCard';

const MyProjectsPage = () => {

    const navigate = useNavigate();

    const tabs = [
        { label: 'Abiertos',
          content:
                <div className="my-projects-page__cards">
                    <MyProjectCard />
                </div>
        },
        { label: 'En curso', content: <div>En curso</div> },
        { label: 'Finalizados', content: <div>Finalizados</div> },
    ];

    return (
        <main>
            <div className="container">

                <section className="my-projects-page">

                    <div className="my-projects-page__header">
                        <h1 className="title-48">Mis proyectos</h1>
                        <Button size="large" width="full-then-fit" onClick={() => navigate('/nueva-convocatoria')}>Crear nueva convocatoria</Button>
                    </div>

                    <Tabs tabs={tabs} />

                </section>

                {/* <section className="my-projects-page">

                    <div className="my-projects-page__header">
                        <h1 className="title-48">Mis proyectos</h1>
                    </div>


                    <div className="my-projects-page__empty-state">
                        <div className="my-projects-page__empty-state__title">
                            <img src="../../assets/svg/projects-empty-state.svg" alt="Sin postulaciones" />

                            <div>
                                <h2 className="title-32-medium">Aún no tienes proyectos</h2>
                                <p className="subtitle-18">Únete a colaborar en proyectos de otras personas o crea tu propia convocatoria y forma un equipo para tu próximo proyecto.</p>
                            </div>
                        </div>

                        <div className="my-projects-page__empty-state__actions">
                            <Button color="secondary" size="large" width="full-then-fit" onClick={() => navigate('/explorar/proyectos')}>Explorar proyectos</Button>
                            <Button size="large" width="full-then-fit">Crear nueva convocatoria</Button>
                        </div>

                    </div>

                </section> */}

            </div >
        </main >
    )
}

export default MyProjectsPage;