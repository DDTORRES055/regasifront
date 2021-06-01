import React, { useState, useContext, useEffect } from "react"
import { Redirect } from "react-router-dom"
import { UserContext } from "../../Context/UserContext"
import { LayoutContext } from "../../Context/LayoutContext"
import Layout from "../../panelLayout/Layout"
import TextInput from "../../Components/TextInput/TextInput"
import SubmitInput from "../../Components/SubmitButton/SubmitButton"

export default function UpdateUser() {
    const { user, updateUserInfo } = useContext(UserContext)
    const { setLoadingVisible } = useContext(LayoutContext)

    const [errorField, seterrorField] = useState("")

    const [redirect, setRedirect] = useState(undefined)

    const [userInfo, setUserInfo] = useState({
        name: "",
        telegramID: "",
    })

    useEffect(() => {
        setUserInfo({ name: user.name, telegramID: user.telegramID })
    }, [user])

    const OnSubmit = async (event) => {
        event.preventDefault()
        setLoadingVisible(true)

        const { name, telegramID } = userInfo

        if (!name.trim() || !telegramID.trim()) {
            seterrorField("Todos los campos son obligatorios")
            return
        }

        const result = await updateUserInfo(name, telegramID)

        console.log(result)

        setLoadingVisible(false)
        if (!result) {
            seterrorField("Ocurrio un error, intente mas tarde")
            return
        }
        setRedirect(true)
    }

    const OnChangeText = (event) => {
        const { id, value } = event.target
        seterrorField("")
        setUserInfo({
            ...userInfo,
            ...{
                [id]: value,
            },
        })
    }

    return (
        <Layout title="Actualizar información">
            <div className="content-body">
                {redirect && <Redirect to="/" />}
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-12">
                            <div className="card">
                                <div className="card-header">
                                    <h4 className="card-title">
                                        Actualizar información
                                    </h4>
                                </div>
                                <div className="card-body">
                                    <div className="basic-form">
                                        <form onSubmit={OnSubmit}>
                                            <TextInput
                                                id="name"
                                                label="Nombre completo"
                                                value={userInfo.name}
                                                onChange={OnChangeText}
                                                required={true}
                                            />
                                            <TextInput
                                                id="telegramID"
                                                label="ID de Telegram"
                                                value={userInfo.telegramID}
                                                onChange={OnChangeText}
                                                required={true}
                                                pattern="[0-9]+"
                                            />
                                            <SubmitInput value="Guardar" />
                                        </form>
                                        <div className="mt-3">
                                            <p className="text-center">{errorField}</p>
                                        </div>
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
