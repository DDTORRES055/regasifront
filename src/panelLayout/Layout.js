import React, { useState, useContext, useEffect } from "react"
import { UserContext } from "../Context/UserContext"
import { LayoutContext } from "../Context/LayoutContext"
import Loading from "./Loading/Loading"
import { Redirect } from "react-router-dom"
import Header from "./Header"
import Sidebar from "./Sidebar"
import "./Layout.css"

export default function PanelLayout({ title, children }) {
    const { user, isAnUserAuthenticated } = useContext(UserContext)
    const { loadingVisible, toggledMenu } = useContext(LayoutContext)

    const [redirect, setRedirect] = useState(undefined)

    useEffect(() => {
        setRedirect(!isAnUserAuthenticated())
    }, [])

    return (
        <React.Fragment>
            <Loading visible={loadingVisible} />
            <div id="main-wrapper" className={`show ${toggledMenu ? "menu-toggle" : ""}`}>
                {redirect === undefined ? (
                    <div></div>
                ) : redirect ? (
                    <Redirect to="/signin" />
                ) : user.userID ? (
                    <React.Fragment>
                        <Header title={title} setRedirect={setRedirect} />
                        <Sidebar />
                        {children}
                    </React.Fragment>
                ) : (
                    <React.Fragment>
                        <Loading visible={true} />
                    </React.Fragment>
                )}
            </div>
        </React.Fragment>
    )
}
