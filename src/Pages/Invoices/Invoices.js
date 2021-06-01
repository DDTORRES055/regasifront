import React, { useContext, useEffect, useState } from "react"
import { NavLink } from "react-router-dom"
import { UserContext } from "../../Context/UserContext"
import Layout from "../../panelLayout/Layout"
import Breadcrumb from "../../panelLayout/Breadcrumb"
import { dateWithFormatFromTime } from "../../Utilities/DateUtilities.js"

export default function Invoices() {
    const { user } = useContext(UserContext)

    const [invoices, setInvoices] = useState(undefined)

    useEffect(() => {
        
    }, [])

    return (
        <Layout title="Mis Facturas">
            <div className="content-body">
                <div className="container-fluid">
                    <Breadcrumb pageTitles={["Inicio", "Mis Facturas"]} />
                    <React.Fragment>
                        {invoices === undefined ? (
                            <div></div>
                        ) : (
                            <div className="row">
                                {invoices === null ? (
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
                                                    <p className="mb-0">Aún no tienes ninguna factura.</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="col-xl-12">
                                        <div className="table-responsive table-hover fs-14">
                                            <table className="table display mb-4 dataTablesCard  card-table" id="example5">
                                                <thead>
                                                    <tr>
                                                        <th></th>
                                                        <th>Fecha</th>
                                                        {/* <th>Moneda</th> */}
                                                        <th>Monto</th>
                                                        <th>Asunto</th>
                                                        <th>Status</th>
                                                        <th></th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {Object.keys(invoices).map((index, i) => {
                                                        let invoice = invoices[index]
                                                        return (
                                                            <tr key={i}>
                                                                <td className="pr-0">
                                                                    {invoice.cancelled ? (
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
                                                                    ) : invoice.paid ? (
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
                                                                    {dateWithFormatFromTime(invoice.createdAt)}
                                                                </td>
                                                                {/* <td className="wspace-no">
                                                                    <svg
                                                                        className="mr-1"
                                                                        width="24"
                                                                        height="24"
                                                                        viewBox="0 0 24 24"
                                                                        fill="none"
                                                                        xmlns="http://www.w3.org/2000/svg"
                                                                    >
                                                                        <path
                                                                            d="M16 9.50011C15.9993 8.67201 15.328 8.00092 14.5001 8H10V11H14.5001C15.328 10.9993 15.9993 10.328 16 9.50011Z"
                                                                            fill="#FFAB2D"
                                                                        />
                                                                        <path
                                                                            d="M10 16H14.5001C15.3285 16 16 15.3285 16 14.5001C16 13.6715 15.3285 13 14.5001 13H10V16Z"
                                                                            fill="#FFAB2D"
                                                                        />
                                                                        <path
                                                                            d="M12 0C5.3726 0 0 5.3726 0 12C0 18.6274 5.3726 24 12 24C18.6274 24 24 18.6274 24 12C23.9924 5.37574 18.6243 0.00758581 12 0ZM18.0001 14.5713C17.9978 16.4641 16.4641 17.9978 14.5716 17.9999V18.8571C14.5716 19.3305 14.1876 19.7143 13.7144 19.7143C13.2409 19.7143 12.8572 19.3305 12.8572 18.8571V17.9999H11.1431V18.8571C11.1431 19.3305 10.7591 19.7143 10.2859 19.7143C9.8124 19.7143 9.42866 19.3305 9.42866 18.8571V17.9999H6.85733C6.38387 17.9999 6.00013 17.6161 6.00013 17.1429C6.00013 16.6695 6.38387 16.2857 6.85733 16.2857H7.71427V7.71427H6.85733C6.38387 7.71427 6.00013 7.33053 6.00013 6.85707C6.00013 6.38361 6.38387 5.99987 6.85733 5.99987H9.42866V5.14293C9.42866 4.66947 9.8124 4.28573 10.2859 4.28573C10.7593 4.28573 11.1431 4.66947 11.1431 5.14293V5.99987H12.8572V5.14293C12.8572 4.66947 13.2409 4.28573 13.7144 4.28573C14.1879 4.28573 14.5716 4.66947 14.5716 5.14293V5.99987C16.4571 5.99202 17.992 7.5139 18.0001 9.39937C18.0043 10.3978 17.5714 11.3481 16.8152 12C17.5643 12.6445 17.9967 13.5828 18.0001 14.5713Z"
                                                                            fill="#FFAB2D"
                                                                        />
                                                                    </svg>
                                                                    Bitcoin
                                                                </td> */}
                                                                <td>
                                                                    <span className="text-success font-w700">
                                                                        ${invoice.amount}
                                                                    </span>
                                                                </td>
                                                                <td>
                                                                    <p className="mb-0 wspace-no">{invoice.subject}</p>
                                                                </td>
                                                                <td>
                                                                    <span
                                                                        className={`text-${
                                                                            invoice.cancelled
                                                                                ? "danger"
                                                                                : invoice.paid
                                                                                ? "success"
                                                                                : "primary"
                                                                        } float-right`}
                                                                    >
                                                                        {invoice.status}
                                                                    </span>
                                                                </td>
                                                                <td>
                                                                    <NavLink to={`/invoice/${index}`} className="btn btn-info btn-xs btn-rounded">Ver detalles</NavLink>
                                                                </td>
                                                            </tr>
                                                        )
                                                    })}
                                                </tbody>
                                            </table>
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
