import { useNavigate } from 'react-router-dom';
import Button from "../../components/Button/Button";

const OnboardingCompletePage = () => {

    const navigate = useNavigate();

    return (
        <main className='faded-pattern-container'>

            <div className="faded-pattern faded-pattern-top-left"></div>
            <div className="faded-pattern faded-pattern-bottom-right"></div>

            <section className="onboarding-page-container onboarding-complete-container">

                <img src='../assets/svg/collabs-logo.svg' alt="Collabs" />

                <div className="onboarding-complete-content">

                    <div className="onboarding-page-container__title">
                        <h1 className="title-40">¡Todo listo! Ya puedes empezar a colaborar</h1>
                        <p className="subtitle">En Collabs podrás trabajar junto a otros, adquirir habilidades, hacer conexiones y dar el próximo paso en tu carrera profesional.</p>
                    </div>

                    <Button size="large" width="full-then-fit" onClick={() => { navigate('/inicio'); }}>Comenzar</Button>

                </div>

                <img src="../../assets/svg/collaborators-in-line-facing-right.svg" alt="Grupo de personas colaborando" className="onboarding-complete__image" />

            </section>

        </main>
    )

}

export default OnboardingCompletePage;