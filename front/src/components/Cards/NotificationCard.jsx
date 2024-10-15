const NotificationCard = ({ notification }) => {

    return (
        <div className="notification-card notification-unread"> {/* Read/unread dinámico */}

            <div className="notification-card__profile-pic">
                <img src="../assets/jpg/no-profile-picture.jpg" alt="Sin foto de perfil" />
            </div>

            <div className="notification-card__info">
                <p className="subtitle"><span className="medium-text">Salvador Reynoso</span> te invitó a colaborar en el proyecto <span className="medium-text">Web de cuentos para niños</span>, ¡revisa su convocatoria! </p>
                <p className="smaller-paragraph-light">hace 24 minutos</p>
            </div>

        </div>
    );
};

export default NotificationCard;