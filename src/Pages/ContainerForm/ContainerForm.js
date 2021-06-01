import React, { useContext } from "react"
import { LayoutContext } from "../../Context/LayoutContext"
import Loading from "../../panelLayout/Loading/Loading"
import "./ContainerForm.css"

export default function ContainerForm({ children }) {
    const { loadingVisible } = useContext(LayoutContext)
    return (
        <div className="authincation h-100">
        <Loading visible={loadingVisible} />
            <div className="container h-100">
                <div className="row justify-content-center h-100 align-items-center">
                    <div className="col-md-6">
                        <div className="authincation-content">
                            <div className="row no-gutters">
                                <div className="col-xl-12">
                                    <div className="auth-form">{children}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
