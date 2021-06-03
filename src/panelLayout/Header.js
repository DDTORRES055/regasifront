import React, { useContext } from "react"
import { NavLink } from "react-router-dom"
import { UserContext } from "../Context/UserContext"
import { LayoutContext } from "../Context/LayoutContext"

export default function Header({ title = "Pagina", setRedirect }) {
    const { user, signOutUser } = useContext(UserContext)
    const { toggledMenu, setToggledMenu } = useContext(LayoutContext)

    return (
        <React.Fragment>
            <div className="nav-header">
                <NavLink to="/" className="brand-logo d-flex justify-content-center">
                    {toggledMenu ? 
                        <img width="30px" className="logo-abbr" src="/images/logo.png" alt="" />
                        :
                        <React.Fragment>
                        <img width="30px" style={{display: "none"}} className="logo-abbr" src="/images/logo.png" alt="" />
                        <img className="brand-title" style={{ maxWidth: "90%", height: "auto", margin: "5px 0" }} src="/images/horizontal.png" alt="" />
                        </React.Fragment>
                    }
                    {/* <img className="logo-compact" src="./images/logo.png" alt="" />
                    <img className="brand-title" src="./images/horizontal.png" alt="" /> */}
                </NavLink>

                <div className="nav-control" onClick={() => {setToggledMenu(!toggledMenu)}}>
                    <div className={`hamburger ${toggledMenu ? "is-active" : ""}`}>
                        <span className="line"></span>
                        <span className="line"></span>
                        <span className="line"></span>
                    </div>
                </div>
            </div>

            <div className="header">
                <div className="header-content">
                    <nav className="navbar navbar-expand">
                        <div className="collapse navbar-collapse justify-content-between">
                            <div className="header-left">
                                <div className="dashboard_bar">{title}</div>
                            </div>

                            <ul className="navbar-nav header-right">
                                <li className="nav-item dropdown header-profile">
                                    <a className="nav-link" href="#" role="button" data-toggle="dropdown">
                                        <div className="header-info">
                                            <span className="text-black">
                                                Hola, <strong>{user.CNOMBRE}</strong>
                                            </span>
                                            <p className="fs-12 mb-0">{user.CCVEEMP}</p>
                                        </div>
                                        <img src="/images/profile/pic1.jpg" width="20" alt="" />
                                    </a>
                                    <div className="dropdown-menu dropdown-menu-right">
                                        <NavLink to="/updateUser" className="dropdown-item ai-icon">
                                            <svg
                                                id="icon-user1"
                                                xmlns="http://www.w3.org/2000/svg"
                                                className="text-primary"
                                                width="18"
                                                height="18"
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                stroke="currentColor"
                                                strokeWidth="2"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            >
                                                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                                                <circle cx="12" cy="7" r="4"></circle>
                                            </svg>
                                            <span className="ml-2">Perfil</span>
                                        </NavLink>
                                        <a href="#" className="dropdown-item ai-icon" onClick={signOutUser}>
                                            <svg
                                                id="icon-logout"
                                                xmlns="http://www.w3.org/2000/svg"
                                                className="text-danger"
                                                width="18"
                                                height="18"
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                stroke="currentColor"
                                                strokeWidth="2"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            >
                                                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
                                                <polyline points="16 17 21 12 16 7"></polyline>
                                                <line x1="21" y1="12" x2="9" y2="12"></line>
                                            </svg>
                                            <span className="ml-2" onClick={() => {setRedirect(true)}}>Logout </span>
                                        </a>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </nav>
                </div>
            </div>
        </React.Fragment>
    )
}
