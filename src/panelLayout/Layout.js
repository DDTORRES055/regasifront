import React, { useState, useContext, useEffect } from "react";
import { UserContext } from "../Context/UserContext";
import { LayoutContext } from "../Context/LayoutContext";
import Requests from "../Utilities/Requests";
import Loading from "./Loading/Loading";
import { Redirect } from "react-router-dom";
import Header from "./Header";
import Sidebar from "./Sidebar";
import "./Layout.css";

export default function PanelLayout({ title, children }) {
    const { user, setUser, isAnUserAuthenticated } = useContext(UserContext);
    const { loadingVisible, setLoadingVisible, toggledMenu } = useContext(LayoutContext);

    const [redirect, setRedirect] = useState(undefined);

    useEffect(() => {
        setRedirect(!isAnUserAuthenticated());
        const getInfo = async () => {
            const response = await Requests.get("myuser");
            if (response.data) {
                console.log(response.data);
                setUser(response.data);
            }
        };
        getInfo();
        setLoadingVisible(false);
    }, []);

    return (
        <React.Fragment>
            <Loading visible={loadingVisible} />
            <div id="main-wrapper" className={`show ${toggledMenu ? "menu-toggle" : ""}`}>
                {redirect === undefined ? (
                    <div></div>
                ) : redirect ? (
                    <Redirect to="/signin" />
                ) : user.CCVEEMP ? (
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
    );
}
