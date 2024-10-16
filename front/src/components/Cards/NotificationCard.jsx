import { useState, useEffect } from "react";
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import 'dayjs/locale/es';
import { markNotificationAsRead } from "../../services/notificationService";

dayjs.extend(relativeTime);
dayjs.locale('es');

const NotificationCard = ({ notification, isAllRead }) => {

    const [isRead, setIsRead] = useState(notification.is_read);

    useEffect(() => {
        if (isAllRead) {
            setIsRead(true);
        }
    }, [isAllRead]);

    const handleNotificationClick = async () => {

        // Marcar como leída
        if (!isRead) {
            try {
                await markNotificationAsRead(notification._id);
                setIsRead(true);
            } catch (error) {
                console.error("Error al marcar la notificación como leída:", error.message);
            }
        }

        // Realizar acción dependiendo el tipo de notificación
        switch (notification.type) {
            case 'project-invitation':
                console.log("Un usuario te invita a colaborar en un proyecto de él -> Redirigir a la convocatoria abierta");
                break;
            case 'application-received':
                console.log("Un usuario quiere unirse a colaborar en tu proyecto -> Redirigir al dashboard del proyecto");
                break;
            case 'application-accepted':
                console.log("Tu postulación para colaborar en un proyecto fue aceptada -> Redirigir al dashboard del proyecto");
                break;
            case 'application-denied':
                console.log("Tu postulación para colaborar en un proyecto fue denegada -> Redirigir a la convocatoria del proyecto");
                break;
            case 'review-received':
                console.log("Un usuario te dejó una reseña -> Redirigir a tu perfil");
                break;
            default:
                console.log("Notificación sin tipo (sin acción definida)");
                break;
        }
    };

    return (
        <div className={`notification-card ${!isRead ? 'notification-unread' : ''}`} onClick={handleNotificationClick}>

            <div className="notification-card__profile-pic">
                <img src="../assets/jpg/no-profile-picture.jpg" alt="Sin foto de perfil" />
            </div>

            <div className="notification-card__info">
                <p className="subtitle"><span className="medium-text">Salvador Reynoso</span> te invitó a colaborar en el proyecto <span className="medium-text">Web de cuentos para niños</span>, ¡revisa su convocatoria! </p>
                <p className="smaller-paragraph-light">{dayjs(notification.created_at).fromNow()}</p>
            </div>

        </div>
    );
};

export default NotificationCard;