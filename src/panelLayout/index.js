import React, { useContext } from "react"
import { UserContext } from "../Context/UserContext"
import Layout from "./Layout"
import Breadcrumb from "./Breadcrumb"

export default function PanelLayout() {
    const { user } = useContext(UserContext)

    return (
        <Layout title="Inicio">
            <div className="content-body">
                <div className="container-fluid">
                    <Breadcrumb pageTitles={["Inicio"]} />
                    <div className="row">
                        <div className="col-xl-12">
                            
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    )
}
