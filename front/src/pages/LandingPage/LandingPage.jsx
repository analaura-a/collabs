import ArrowIcon from '../../assets/svg/arrow-right.svg?react';

const LandingPage = () => {

    return (
        <main>

            <section className="container hero-section">

                <div className="hero-section__info">

                    <div className="hero-section__heading">
                        <div className="hero-section__title">
                            <h1>Crece profesionalmente</h1>
                            <h1 className="title-with-faces">junto a <span><img src="assets/svg/faces.svg" alt="" /></span> otros</h1>
                        </div>

                        <p>En Collabs podrás buscar proyectos, unirte a colaborar, ganar experiencia, hacer conexiones y avanzar en tu carrera.</p>
                    </div>

                    <div className="hero-section__buttons">
                        <button className="btn btn-secondary btn-medium btn-fitcontent">Cómo funciona</button>
                        <button className="btn btn-primary btn-medium btn-fitcontent">Empezar a colaborar <span><ArrowIcon /></span></button>
                    </div>

                </div>

                <div className="hero-section__photo">
                    <img src="assets/png/collabs-mockup.png" alt="" />
                </div>

            </section>

            {/* <h1>Landing Page</h1>

            <section id="que-es">
                <h1>Qué es</h1>
            </section>

            <section id="como-funciona">
                <h1>Cómo funciona</h1>
            </section>

            <section id="funcionalidades">
                <h1>Funcionalidades</h1>
            </section> */}

        </main>
    )
}

export default LandingPage;