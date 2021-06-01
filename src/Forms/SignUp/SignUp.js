import React, { useState, useContext, useEffect } from "react"
import { UserContext } from "../../Context/UserContext"
import { LayoutContext } from "../../Context/LayoutContext"
import { NavLink, Redirect } from "react-router-dom"
import EmailInput from "../../Components/EmailInput/EmailInput"
import TextInput from "../../Components/TextInput/TextInput"
import PasswordInput from "../../Components/PasswordInput/PasswordInput"
import SubmitInput from "../../Components/SubmitButton/SubmitButton"

export default function SignUp() {
    const { signUpUser, isAnUserAuthenticated } = useContext(UserContext)
    const { setLoadingVisible } = useContext(LayoutContext)

    const [errorField, seterrorField] = useState("")

    const [redirect, setRedirect] = useState(undefined)

    const [user, setUser] = useState({
        name: "",
        email: "",
        password: "",
        passwordConfirmation: "",
    })

    useEffect(() => {
        if (isAnUserAuthenticated !== undefined) setRedirect(isAnUserAuthenticated ? "/" : false)
    }, [isAnUserAuthenticated])

    const OnSubmit = async (event) => {
        event.preventDefault()

        setLoadingVisible(true)

        const { name, email, password, passwordConfirmation } = user

        if (!name.trim() || !email.trim() || !password.trim() || !passwordConfirmation.trim()) {
            seterrorField("Todos los campos son obligatorios")
            setLoadingVisible(false)
            return
        }

        if (password.trim().length < 6) {
            seterrorField("La contraseña debe tener al menos 6 caracteres")
            setLoadingVisible(false)
            return
        }

        if (!(password.trim() === passwordConfirmation.trim())) {
            seterrorField("Las contraseñas tienen que ser iguales")
            setLoadingVisible(false)
            return
        }

        const result = await signUpUser(email, password, name)

        console.log(result)

        if (!result) {
            seterrorField("Ocurrio un error, intente mas tarde")
            setLoadingVisible(false)
            return
        }
        setLoadingVisible(false)
        setRedirect("/signin")
    }

    const OnChangeText = (event) => {
        const { id, value } = event.target
        seterrorField("")
        setUser({
            ...user,
            ...{
                [id]: value,
            },
        })
    }

    return (
        <React.Fragment>
            {redirect === undefined ? (
                <div></div>
            ) : redirect ? (
                <Redirect to={redirect} />
            ) : (
                <React.Fragment>
                    <h3 className="text-center mb-4">Registrarse</h3>
                    <form onSubmit={OnSubmit}>
                        <TextInput
                            id="name"
                            label="Nombre completo"
                            placeholder="Nombre"
                            value={user.name}
                            onChange={OnChangeText}
                            required={true}
                        />
                        <EmailInput id="email" value={user.email} onChange={OnChangeText} required={true} />
                        <PasswordInput id="password" value={user.password} onChange={OnChangeText} required={true} />
                        <PasswordInput
                            id="passwordConfirmation"
                            confirmation={true}
                            value={user.passwordConfirmation}
                            onChange={OnChangeText}
                            required={true}
                        />
                        <SubmitInput value="Registrarse" />
                    </form>
                    <div className="mt-3">
                        <p className="text-center">{errorField}</p>
                    </div>
                    <div className="new-account mt-3">
                        <p>
                            ¿Ya tienes una cuenta?{" "}
                            <NavLink to="/signin" className="text-primary">
                                Acceder
                            </NavLink>
                        </p>
                    </div>
                </React.Fragment>
            )}
        </React.Fragment>
    )
}
