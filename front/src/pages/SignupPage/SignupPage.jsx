import { Link } from "react-router-dom";
import Button from "../../components/Button/Button";
import Input from "../../components/Inputs/Input";

const SignupPage = () => {

    return (

        <section className="signup-container">

            <div className="signup-form">

                <div className="signup-form__content-container">

                    <Link to="/">
                        <img src='../assets/svg/collabs-logo.svg' alt="Collabs" />
                    </Link>

                    <div className="signup-form__content-container__form">

                        <div className="signup-form__content-container__form__title">
                            <h1 className="title-40">Crea tu cuenta</h1>
                            <p className="subtitle">¿Ya tienes una cuenta? <Link to="/auth/iniciar-sesion" className="link">Inicia sesión</Link></p>
                        </div>

                        <form action="">

                            <div className="form__fullname">
                                <Input label="Nombre" type="text" placeholder="Nombre" required></Input>
                                <Input label="Apellido" type="text" placeholder="Apellido" required></Input>
                            </div>

                            <Input label="Correo electrónico" type="email" placeholder="ejemplo@email.com" required></Input>

                            <Input label="Contraseña" type="password" placeholder="***************" helperText="Debe contener mínimo 8 caracteres." required></Input>

                            <Button type="submit" size="large" width="fullwidth">Crear cuenta</Button>

                            {/* <div className="input-group">
                                    <label htmlFor="name" className="form-label">Nombre<span className="primary-color-text">*</span></label>
                                    <input type="text" id="name" placeholder="Nombre"></input>
                                </div>

                                <div className="input-group">
                                    <label htmlFor="lastname" className="form-label">Apellido<span className="primary-color-text">*</span></label>
                                    <input type="text" id="lastname" placeholder="Apellido"></input>
                                </div>
                            
                            <div className="input-group">
                                <label htmlFor="email" className="form-label">Correo electrónico<span className="primary-color-text">*</span></label>
                                <input type="email" id="email" placeholder="ejemplo@email.com" ></input>
                            </div>

                            <div className="input-group-with-text">
                                <div className="input-group">
                                    <label htmlFor="password" className="form-label">Contraseña<span className="primary-color-text">*</span></label>
                                    <input type="password" id="password" aria-describedby="passwordHelpBlock" placeholder="***************" ></input>
                                </div>
                                <p className="helper-text">Debe contener mínimo 8 caracteres.</p>
                            </div> */}

                        </form>

                    </div>

                </div>

            </div >

            <div className="signup-image">
                <img src="../assets/png/collaborators-in-circle-facing-left.png" alt="Crea tu cuenta en Collabs" />
            </div>

        </section >

    )
}

export default SignupPage;