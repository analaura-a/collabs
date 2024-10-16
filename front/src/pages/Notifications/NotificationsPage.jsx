import { useEffect, useState, useContext } from "react";
import { getUserNotifications } from "../../services/notificationService";
import AuthContext from "../../context/AuthContext";
import Button from "../../components/Button/Button";
import NotificationCard from "../../components/Cards/NotificationCard";

const NotificationsPage = () => {

    const { authState } = useContext(AuthContext);
    const { user } = authState;

    const [notifications, setNotifications] = useState([]);

    const [loading, setLoading] = useState(true);

    const fetchNotifications = async () => {
        try {
            const userNotifications = await getUserNotifications(user._id);
            setNotifications(userNotifications);
        } catch (error) {
            console.error("Error al obtener las notificaciones:", error.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchNotifications();
    }, [user._id]);

    if (loading) {
        return <div>Cargando...</div>; //Reemplazar por componente de carga
    }

    return (
        <main>
            <div className="container notifications-page">

                <section className="notifications-page__container">
                    <div className="notifications-page__header">
                        <h1 className="title-40">Notificaciones</h1>
                        <Button color="secondary" size="small" width="full-then-fit">Marcar todo como leído</Button>
                    </div>

                    <div className="notifications-page__notifications">
                        {notifications.map(notification => (
                            <NotificationCard
                                key={notification._id}
                                notification={notification}
                            />
                        ))}
                    </div>
                </section>

            </div>
        </main>
    )
}

export default NotificationsPage;