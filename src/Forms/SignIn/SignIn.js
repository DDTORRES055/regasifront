import React, { useState, useContext, useEffect } from "react";
import { UserContext } from "../../Context/UserContext";
import { NavLink, Redirect } from "react-router-dom";
import UsernameInput from "../../Components/UsernameInput/UsernameInput";
import PasswordInput from "../../Components/PasswordInput/PasswordInput";
import SubmitInput from "../../Components/SubmitButton/SubmitButton";

export default function SignIn() {
    const { signInUser, isAnUserAuthenticated } = useContext(UserContext);

    const [errorField, seterrorField] = useState("");

    const [redirect, setRedirect] = useState(undefined);

    const [user, setUser] = useState({
        username: "",
        password: "",
    });

    useEffect(() => {
        setRedirect(isAnUserAuthenticated() ? "/" : false);
    }, []);

    const OnSubmit = async (event) => {
        event.preventDefault();

        const { username, password } = user;

        if (!username.trim() || !password.trim()) {
            seterrorField("Todos los campos son obligatorios");
            return;
        }

        const result = await signInUser(username, password);

        if (!result) {
            seterrorField("Ocurrio un error, intente mas tarde");
            return;
        } else if (result.message) {
            seterrorField(result.message);
            return;
        }
        setRedirect("/");
    };

    const OnChangeText = (event) => {
        const { id, value } = event.target;
        seterrorField("");
        setUser({
            ...user,
            ...{
                [id]: value,
            },
        });
    };

    return (
        <React.Fragment>
            {redirect === undefined ? (
                <div></div>
            ) : redirect ? (
                <Redirect to={redirect} />
            ) : (
                <React.Fragment>
                    <h3 className="text-center mb-4">Acceder</h3>
                    <form onSubmit={OnSubmit}>
                        <UsernameInput id="username" value={user.username} onChange={OnChangeText} required={true} />
                        <PasswordInput id="password" value={user.password} onChange={OnChangeText} required={true} />
                        <SubmitInput value="Acceder" />
                    </form>
                    <div className="mt-3">
                        <p className="text-center">{errorField}</p>
                    </div>
                </React.Fragment>
            )}
        </React.Fragment>
    );
}
