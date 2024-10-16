import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import 'dayjs/locale/es';
import { markNotificationAsRead } from "../../services/notificationService";
const SERVER_BASE_URL = import.meta.env.VITE_SERVER_BASE_URL;
dayjs.extend(relativeTime);
dayjs.locale('es');

const NotificationCard = ({ notification, isAllRead }) => {

    const navigate = useNavigate();

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
                navigate(`/mis-proyectos/${notification.related_resource_id}`);
                break;
            case 'application-accepted':
                console.log("Tu postulación para colaborar en un proyecto fue aceptada -> Redirigir al dashboard del proyecto");
                navigate(`/mis-proyectos/${notification.related_resource_id}`);
                break;
            case 'application-denied':
                console.log("Tu postulación para colaborar en un proyecto fue denegada -> Redirigir a la convocatoria del proyecto");
                navigate(`/proyectos/${notification.related_resource_id}`);
                break;
            case 'review-received':
                console.log("Un usuario te dejó una reseña -> Redirigir a tu perfil");
                navigate(`/mi-perfil`);
                break;
            default:
                console.log("Notificación sin tipo (sin acción definida)");
                break;
        }
    };

    return (
        <div className={`notification-card ${!isRead ? 'notification-unread' : ''}`} onClick={handleNotificationClick}>

            <div className="notification-card__profile-pic">
                <img src={notification.profile_pic ? `${SERVER_BASE_URL}${notification.profile_pic}` : "../assets/jpg/no-profile-picture.jpg"} />
            </div>

            <div className="notification-card__info">
                <p className="subtitle">{notification.message}</p>
                <p className="smaller-paragraph-light">{dayjs(notification.created_at).fromNow()}</p>
            </div>

        </div>
    );
};

export default NotificationCard;