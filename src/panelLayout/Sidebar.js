import React, { useContext } from "react";
import { UserContext } from "../Context/UserContext";
import { NavLink, useLocation } from "react-router-dom";

export default function Sidebar() {
    const location = useLocation();
    const { user } = useContext(UserContext);
    return (
        <div className="deznav">
            <div className="deznav-scroll">
                <ul className="metismenu" id="menu">
                    <React.Fragment>
                        <li className={location.pathname === "/" ? "mm-active active-no-child" : ""}>
                            <NavLink to="/" className="ai-icon">
                                <i className="flaticon-381-home-2"></i>
                                <span className="nav-text">Inicio</span>
                            </NavLink>
                        </li>
                        <li className={location.pathname === "/schedules" ? "mm-active active-no-child" : ""}>
                            <NavLink to="/schedules" className="ai-icon">
                                <i className="flaticon-381-list-1"></i>
                                <span className="nav-text">Horarios</span>
                            </NavLink>
                        </li>
                        <li className={location.pathname === "/incidents" ? "mm-active active-no-child" : ""}>
                            <NavLink to="/incidents" className="ai-icon">
                                <i className="flaticon-381-box-2"></i>
                                <span className="nav-text">Incidencias</span>
                            </NavLink>
                        </li>
                        <li className={location.pathname === "/assists" ? "mm-active active-no-child" : ""}>
                            <NavLink to="/assists" className="ai-icon">
                                <i className="flaticon-381-notepad-1"></i>
                                <span className="nav-text">Asistencias</span>
                            </NavLink>
                        </li>
                        <li className={location.pathname === "/users" ? "mm-active active-no-child" : ""}>
                            <NavLink to="/users" className="ai-icon">
                                <i className="flaticon-381-user-9"></i>
                                <span className="nav-text">Usuarios</span>
                            </NavLink>
                        </li>
                        {user.admin && (
                            <li
                                className={
                                    location.pathname ===
                                    "/hwaefiuwevniawuebiwuefhnvawnecnwieihaefnwevnrbviuhwaefiuhwilencbvbwehfiwwejfjnivejn"
                                        ? "mm-active active-no-child"
                                        : ""
                                }
                            >
                                <NavLink
                                    to="/hwaefiuwevniawuebiwuefhnvawnecnwieihaefnwevnrbviuhwaefiuhwilencbvbwehfiwwejfjnivejn"
                                    className="ai-icon"
                                >
                                    <i className="flaticon-381-notepad"></i>
                                    <span className="nav-text">Administrar pagos</span>
                                </NavLink>
                            </li>
                        )}
                    </React.Fragment>
                </ul>
            </div>
        </div>
    );
}
