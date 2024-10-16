import { useEffect, useState, useContext } from "react";
import { getUserNotifications, markAllNotificationsAsRead } from "../../services/notificationService";
import AuthContext from "../../context/AuthContext";
import { useToast } from "../../context/ToastContext";
import Button from "../../components/Button/Button";
import NotificationCard from "../../components/Cards/NotificationCard";

const NotificationsPage = () => {

    const { authState } = useContext(AuthContext);
    const { user } = authState;

    const [notifications, setNotifications] = useState([]);

    const [loading, setLoading] = useState(true);

    const { addToast } = useToast();

    const fetchNotifications = async () => {
        try {
            const userNotifications = await getUserNotifications(user._id);
            setNotifications(userNotifications);
        } catch (error) {
            addToast({
                type: 'error',
                title: 'Error al obtener las notificaciones',
                message: 'Ocurrió un error desconocido al intentar obtener las notificaciones. Inténtalo de nuevo más tarde.'
            });
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchNotifications();
    }, [user._id]);

    const handleMarkAllAsRead = async () => {
        try {
            await markAllNotificationsAsRead(user._id);

            setNotifications(prevNotifications =>
                prevNotifications.map(n => ({ ...n, is_read: true }))
            );

            addToast({
                type: 'success',
                title: 'Notificaciones leídas con éxito',
                message: 'Se marcaron todas las notificaciones como leídas.'
            });
        } catch (error) {
            addToast({
                type: 'error',
                title: 'Error al marcar todas como leídas',
                message: 'Ocurrió un error desconocido al intentar marcar todas las notificaciones como leídas. Inténtalo de nuevo más tarde.'
            });
        }
    };

    if (loading) {
        return <div>Cargando...</div>; //Reemplazar por componente de carga
    }

    return (
        <main>
            <div className="container notifications-page">

                <section className="notifications-page__container">
                    <div className="notifications-page__header">
                        <h1 className="title-40">Notificaciones</h1>
                        <Button color="secondary" size="small" width="full-then-fit" onClick={handleMarkAllAsRead}>Marcar todo como leído</Button>
                    </div>

                    {notifications.length > 0 ? (

                        <div className="notifications-page__notifications">
                            {notifications.map(notification => (
                                <NotificationCard
                                    key={notification._id}
                                    notification={notification}
                                    isAllRead={notifications.every(n => n.is_read)}
                                />
                            ))}
                        </div>

                    ) : (
                        <div className="applications-page__empty-state">
                            <img src="../../assets/svg/notifications-empty-state.svg" alt="Sin postulaciones" />

                            <div>
                                <h2 className="title-32-medium placeholder-color-text">Aún no tienes notificaciones</h2>
                            </div>
                        </div>
                    )}
                </section>

            </div>
        </main>
    )
}

export default NotificationsPage;