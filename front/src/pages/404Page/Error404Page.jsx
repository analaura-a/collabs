import GuestNavbar from "../../components/Navbar/GuestNavbar";
import GuestFooter from "../../components/Footer/GuestFooter";
import Button from "../../components/Button/Button";

const Error404Page = () => {
    return (
        <>
            <GuestNavbar />
            {/* <AuthNavbar /> */}

            <main className="container error-page">

                <div className="error-page__title">
                    <h1 className="title-40">¡Ups! Parece que esa página no existe</h1>
                    <p className="big-subtitle">Puede que la página que estés buscando no exista o fuese eliminada.</p>
                </div>

                <img src="assets/png/error-page.png" alt="Error 404: página no encontrada" />

                <Button size="large" width="full-then-fit">Volver al inicio</Button>

            </main>

            <GuestFooter />
            {/* <AuthFooter /> */}
        </>
    )
}

export default Error404Page;