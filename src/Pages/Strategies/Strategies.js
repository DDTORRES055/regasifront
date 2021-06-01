import React, { useState, useContext, useEffect } from "react"
import { NavLink } from "react-router-dom"
import firebase from "firebase"
import { UserContext } from "../../Context/UserContext"
import { LayoutContext } from "../../Context/LayoutContext"
import Layout from "../../panelLayout/Layout"
import Breadcrumb from "../../panelLayout/Breadcrumb"
import "./Strategies.css"

export default function Strategies() {
    const { user, toggleStrategy } = useContext(UserContext)
    const { setLoadingVisible } = useContext(LayoutContext)
    const [strategies, setStrategies] = useState([])
    const [showModal, setShowModal] = useState(false)

    useEffect(() => {
        const getInfo = async () => {
            const snapshot = await firebase.database().ref("strategies").once("value")
            const strategiesFiltered = snapshot.val()
            for (let i = 0; user.strategies && i < user.strategies.length; i++) {
                const selectedStrategy = user.strategies[i]
                strategiesFiltered[selectedStrategy].selected = true
            }
            setStrategies(strategiesFiltered)
        }
        getInfo()
    }, [])

    useEffect(() => {
        for (let i = 0; strategies && user.strategies && i < user.strategies.length; i++) {
            const selectedStrategy = user.strategies[i]
            if (strategies[selectedStrategy])
                strategies[selectedStrategy].selected = true
        }
    }, [user])

    const toggleSelected = (strategy) =>{
        if (user.strategies && !strategies[strategy].selected && user.strategies.length + 1 > user.package.limit) {
            setShowModal(true)
            setLoadingVisible(false)
        } else {
            strategies[strategy].selected = !strategies[strategy].selected 
            toggleStrategy(strategy).then(() => {
                setLoadingVisible(false)
            })
        }
    }

    return (
        <Layout title="Estratégias">
            <div className="content-body">
                <div className="container-fluid">
                    <Breadcrumb pageTitles={["Inicio", "Estratégias"]} />
                    <div className="row">
                        {Object.keys(strategies).map((index, i) => {
                            let strategy = strategies[index]
                            return (
                                <div className="col-xl-3 col-xxl-6 col-lg-6 col-sm-6" key={i}>
                                    <a
                                        className={`strategy card overflow-hidden ${strategy.selected ? "selected" : ""}`}
                                        onClick={() => {
                                            setLoadingVisible(true)
                                            toggleSelected(index)
                                        }}
                                    >
                                        <div className="card-header border-0 pb-0">
                                            <div className="mr-auto">
                                                <h2 className="text-black mb-2 font-w600">{strategy.currency}</h2>
                                            </div>
                                            <img src={`/images/svg/${strategy.currency}.svg`} alt="" />
                                        </div>
                                        <div className="card-body p-4 m-3">
                                            <span className="d-flex justify-content-between">
                                                {strategy.market}
                                                {strategy.selected && (
                                                    <span className="badge badge-info">Seleccionada</span>
                                                )}
                                            </span>
                                            <span className="d-flex justify-content-between">
                                                {strategy.strategyName}
                                                <span className="text-right">{strategy.timeframe} min</span>
                                            </span>
                                        </div>
                                    </a>
                                </div>
                            )
                        })}

                        <div
                            className={`modal fade ${showModal ? "show" : ""}`}
                            id="exampleModalCenter"
                            style={
                                showModal
                                    ? {
                                          display: "block",
                                          transition: "all ease 0.3s",
                                          paddingRight: "17px",
                                          backgroundColor: "#000000bf",
                                          visibility: "visible",
                                          opacity: 1,
                                      }
                                    : {
                                          display: "block",
                                          transition: "all ease 0.5s",
                                          visibility: "hidden",
                                          opacity: 0,
                                      }
                            }
                        >
                            <div className="modal-dialog modal-dialog-centered" role="document">
                                <div className="modal-content">
                                    <div className="modal-header">
                                        <h4 className="modal-title">¡Ooops!</h4>
                                        <button
                                            type="button"
                                            className="close"
                                            onClick={async () => {
                                                setShowModal(false)
                                            }}
                                        >
                                            <span>&times;</span>
                                        </button>
                                    </div>
                                    <div className="modal-body">
                                        <p>
                                            Has alcanzado el límite permitido por tu paquete, puedes mejorar tu cuenta
                                            dando clic al siguiente botón:
                                        </p>
                                    </div>
                                    <div className="d-flex modal-footer justify-content-center">
                                        <NavLink to="/prices" type="button" className="btn btn-primary">
                                            Mejorar mi paquete
                                        </NavLink>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    )
}
