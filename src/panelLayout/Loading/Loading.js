import React from "react"
import "./Loading.css"

export default function Loading(props) {
    return (
        <div id="loading" className={`${props.visible ? "visible" : ""}`}>
            <div className="sk-three-bounce">
                <div className="sk-child sk-bounce1"></div>
                <div className="sk-child sk-bounce2"></div>
                <div className="sk-child sk-bounce3"></div>
            </div>
        </div>
    )
}
