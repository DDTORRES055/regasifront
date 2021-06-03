import React, { useState, useContext, useEffect } from "react";
import { UserContext } from "../../Context/UserContext";
import { LayoutContext } from "../../Context/LayoutContext";
import { NavLink, Redirect } from "react-router-dom";

export default function SignIn() {
    const { signInUser, isAnUserAuthenticated } = useContext(UserContext);

    const { setLoadingVisible } = useContext(LayoutContext);

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
            setLoadingVisible(false);
            return;
        } else if (result.message) {
            seterrorField(result.message);
            setLoadingVisible(false);
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
                    <img src="/images/logo.png" width="60px" alt="Logo" />
                    <h3 className="text-center mb-4">SISTEMA REGASI</h3>
                    <form onSubmit={OnSubmit}>
                        <div>
                            <input
                                type="text"
                                id="username"
                                className="mt-3"
                                placeholder="Usuario"
                                value={user.username}
                                onChange={OnChangeText}
                                required={true}
                            />
                        </div>
                        <div>
                            <input
                                type="password"
                                id="password"
                                className="mt-3"
                                placeholder="Contraseña"
                                value={user.password}
                                onChange={OnChangeText}
                                required={true}
                            />
                        </div>
                        <div className="mt-3">
                            <input type="checkbox" id="rememberme" value="0" />
                            <label htmlFor="remember" className="">
                                Recordar
                            </label>
                        </div>
                        <input
                            type="submit"
                            value="Ingresar"
                            onClick={() => {
                                setLoadingVisible(true);
                            }}
                        />
                    </form>
                    <div className="mt-3">
                        <p className="text-center">{errorField}</p>
                    </div>
                    <div className="mt-4">
                        <p className="text-center">© 2021</p>
                    </div>
                </React.Fragment>
            )}
        </React.Fragment>
    );
}
