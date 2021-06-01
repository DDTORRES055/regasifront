import React, { useContext, useEffect, useState } from "react"
import { NavLink } from "react-router-dom"
import { UserContext } from "../../Context/UserContext"
import Layout from "../../panelLayout/Layout"
import Breadcrumb from "../../panelLayout/Breadcrumb"
import { dateWithFormatFromTime } from "../../Utilities/DateUtilities.js"

export default function Payments() {
    const { user } = useContext(UserContext)

    const [payments, setPayments] = useState(undefined)

    const [total, setTotal] = useState("Calculando...")

    useEffect(() => {
        
    }, [])

    useEffect(() => {
        if (payments) {
            let totalPayments = 0
            for (const index in payments) {
                const payment = payments[index]
                if (payment.pending) totalPayments += payment.amount
            }
            setTotal(totalPayments)
        }
    }, [payments])

    return (
        <Layout title="Mis pagos">
            <div className="content-body">
                <div className="container-fluid">
                    <Breadcrumb pageTitles={["Inicio", "Mis pagos"]} />
                    <React.Fragment>
                        {payments === undefined ? (
                            <div></div>
                        ) : (
                            <div className="row">
                                {payments === null ? (
                                    <div className="col-xl-12">
                                        <div className="alert alert-warning left-icon-big alert-dismissible fade show">
                                            <div className="media">
                                                <div className="alert-left-icon-big">
                                                    <span>
                                                        <i className="mdi mdi-help-circle-outline"></i>
                                                    </span>
                                                </div>
                                                <div className="media-body">
                                                    <h5 className="mt-1 mb-2">Vacío</h5>
                                                    <p className="mb-0">Aún no tienes nungun pago.</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="col-xl-12">
                                        <div className="alert alert-info alert-dismissible fade show">
                                            <svg
                                                viewBox="0 0 24 24"
                                                width="24"
                                                height="24"
                                                stroke="currentColor"
                                                stroke-width="2"
                                                fill="none"
                                                stroke-linecap="round"
                                                stroke-linejoin="round"
                                                className="mr-2"
                                            >
                                                <circle cx="12" cy="12" r="10"></circle>
                                                <line x1="12" y1="16" x2="12" y2="12"></line>
                                                <line x1="12" y1="8" x2="12.01" y2="8"></line>
                                            </svg>
                                            Tienes la posibilidad de retirar el saldo que gustes. Pero ten en cuenta que
                                            se te cobrara el fee de transacción.
                                            <br />
                                            <strong>Tip:</strong> Acumula varios pagos para no pagar demasiado de fee.
                                        </div>
                                        <div className="table-responsive table-hover fs-14">
                                            <table
                                                className="table display mb-4 dataTablesCard  card-table"
                                                id="example5"
                                            >
                                                <thead>
                                                    <tr>
                                                        <th></th>
                                                        <th>Fecha</th>
                                                        <th>Monto</th>
                                                        <th>Asunto</th>
                                                        <th>Status</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {Object.keys(payments).map((index, i) => {
                                                        let payment = payments[index]
                                                        return (
                                                            <tr key={i}>
                                                                <td className="pr-0">
                                                                    {payment.cancelled ? (
                                                                        <span className="bgl-danger p-3 d-inline-block">
                                                                            <svg
                                                                                viewBox="0 0 24 24"
                                                                                width="24"
                                                                                height="24"
                                                                                stroke="currentColor"
                                                                                strokeWidth="2"
                                                                                fill="none"
                                                                                strokeLinecap="round"
                                                                                strokeLinejoin="round"
                                                                                className="mr-2"
                                                                            >
                                                                                <polygon
                                                                                    points="7.86 2 16.14 2 22 7.86 22 16.14 16.14 22 7.86 22 2 16.14 2 7.86 7.86 2"
                                                                                    stroke="#FF2E2E"
                                                                                ></polygon>
                                                                                <line
                                                                                    x1="15"
                                                                                    y1="9"
                                                                                    x2="9"
                                                                                    y2="15"
                                                                                    stroke="#FF2E2E"
                                                                                ></line>
                                                                                <line
                                                                                    x1="9"
                                                                                    y1="9"
                                                                                    x2="15"
                                                                                    y2="15"
                                                                                    stroke="#FF2E2E"
                                                                                ></line>
                                                                            </svg>
                                                                        </span>
                                                                    ) : payment.paid ? (
                                                                        <span className="bgl-success p-3 d-inline-block">
                                                                            <svg
                                                                                viewBox="0 0 24 24"
                                                                                width="24"
                                                                                height="24"
                                                                                stroke="currentColor"
                                                                                strokeWidth="2"
                                                                                fill="none"
                                                                                strokeLinecap="round"
                                                                                strokeLinejoin="round"
                                                                                className="mr-2"
                                                                            >
                                                                                <polyline
                                                                                    points="9 11 12 14 22 4"
                                                                                    stroke="#22AA22"
                                                                                ></polyline>
                                                                                <path
                                                                                    d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"
                                                                                    stroke="#22AA22"
                                                                                ></path>
                                                                            </svg>
                                                                        </span>
                                                                    ) : (
                                                                        <span className="bgl-danger p-3 d-inline-block">
                                                                            <svg
                                                                                viewBox="0 0 24 24"
                                                                                width="24"
                                                                                height="24"
                                                                                stroke="currentColor"
                                                                                strokeWidth="2"
                                                                                fill="none"
                                                                                strokeLinecap="round"
                                                                                strokeLinejoin="round"
                                                                                className="mr-2"
                                                                            >
                                                                                <circle
                                                                                    cx="12"
                                                                                    cy="12"
                                                                                    r="10"
                                                                                    stroke="#2B98D6"
                                                                                ></circle>
                                                                                <line
                                                                                    x1="12"
                                                                                    y1="16"
                                                                                    x2="12"
                                                                                    y2="12"
                                                                                    stroke="#2B98D6"
                                                                                ></line>
                                                                                <line
                                                                                    x1="12"
                                                                                    y1="8"
                                                                                    x2="12.01"
                                                                                    y2="8"
                                                                                    stroke="#2B98D6"
                                                                                ></line>
                                                                            </svg>
                                                                        </span>
                                                                    )}
                                                                </td>
                                                                <td className="wspace-no">
                                                                    {dateWithFormatFromTime(payment.createdAt)}
                                                                </td>
                                                                <td>
                                                                    <span className="text-success font-w700">
                                                                        ${payment.amount}
                                                                    </span>
                                                                </td>
                                                                <td style={{maxWidth:"500px"}}>
                                                                    <p className="mb-0">{payment.subject}</p>
                                                                </td>
                                                                <td>
                                                                    <span
                                                                        className={`text-${
                                                                            payment.cancelled
                                                                                ? "danger"
                                                                                : payment.paid
                                                                                ? "success"
                                                                                : "primary"
                                                                        } float-right`}
                                                                    >
                                                                        {payment.status}
                                                                    </span>
                                                                </td>
                                                            </tr>
                                                        )
                                                    })}
                                                </tbody>
                                            </table>
                                        </div>
                                        <div className="pt-3 d-flex justify-content-end">
                                            <div className="text-right">Total disponible:</div>
                                            <div className="text-success font-w700">$ {total}</div>
                                        </div>
                                        <div className="pt-2 d-flex justify-content-end">
                                            {" "}
                                            Comunicate al chat de telegram mediante <a href="#">este link</a>
                                        </div>
                                    </div>
                                )}
                            </div>
                        )}
                    </React.Fragment>
                </div>
            </div>
        </Layout>
    )
}
