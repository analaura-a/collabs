import EditIcon from '../../assets/svg/edit.svg?react';
import Button from "../../components/Button/Button";

const MyProfilePage = () => {

    return (
        <main>
            <div className="container profile-page-container">{/* contenedor general */}

                <section className="profile-page__header">

                    <div className="profile-page__header__profile-info">

                        <div className="profile-page__header__profile-info__photo-and-name-container">
                            <div className="profile-page__header__profile-info__photo-container">
                                <img src="https://st2.depositphotos.com/1006318/5909/v/950/depositphotos_59095205-stock-illustration-businessman-profile-icon.jpg" alt="" />
                            </div>

                            <div className="profile-page__header__profile-info__name-container">
                                <h1 className="title-32">Salvador Reynoso</h1>
                                <p className="profile-username">@salvadoreynoso</p>
                            </div>
                        </div>

                        <div className="profile-page__header__profile-info__bio-container">
                            <p className="profile-bio">Quiero unirme a colaborar en proyectos como <span className="bolder-text">UX/UI Designer</span>, <span className="bolder-text">Web Designer</span> o <span className="bolder-text">No-code Developer.</span></p>

                            <div>
                                <div className="profile-page__header__profile-info__bio-details-container">
                                    <img src="../assets/svg/location.svg" alt="" />
                                    <p className="profile-bio__details">Buenos Aires, Argentina</p>
                                </div>

                                <div className="profile-page__header__profile-info__bio-details-container">
                                    <img src="../assets/svg/calendar.svg" alt="" />
                                    <p className="profile-bio__details">Se unió en abril de 2024</p>
                                </div>
                            </div>
                        </div>

                    </div>

                    <div className="profile-page__header__actions">

                        <Button color="secondary" width="btn-full-then-fit" size="large">Editar perfil</Button>

                        <div className="profile-page__header__actions__portfolio-container">

                            <div className="title-with-icon">
                                <img src="../assets/svg/notes-with-background.svg" alt="" />
                                <h2 className="title-18">Portfolio</h2>
                            </div>

                            <a href="#" className="profile-page__header__actions__portfolio-container__portfolio-link">www.salvadorreynoso.com <img src="../assets/svg/export.svg" alt="" /></a>

                            <Button width="fullwidth" size="large" icon={<EditIcon />}>Editar portfolio</Button>

                        </div>

                    </div>

                </section>

            </div>
        </main>
    )
}

export default MyProfilePage;