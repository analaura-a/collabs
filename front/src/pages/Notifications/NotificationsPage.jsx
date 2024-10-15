import Button from "../../components/Button/Button";

const NotificationsPage = () => {

    return (
        <main>
            <div className="container notifications-page">

                <section className="notifications-page__container">
                    <div className="notifications-page__header">
                        <h1 className="title-40">Notificaciones</h1>
                        <Button color="secondary" size="small" width="full-then-fit">Marcar todo como leído</Button>
                    </div>

                    <div className="notifications-page__notifications">

                    </div>
                </section>

            </div>
        </main>
    )
}

export default NotificationsPage;