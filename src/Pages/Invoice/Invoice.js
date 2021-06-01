import React, { useContext, useEffect, useState } from "react"
import { NavLink, Redirect, useParams } from "react-router-dom"
import { UserContext } from "../../Context/UserContext"
import { LayoutContext } from "../../Context/LayoutContext"
import Layout from "../../panelLayout/Layout"
import Breadcrumb from "../../panelLayout/Breadcrumb"
import { dateWithFormatFromTime } from "../../Utilities/DateUtilities.js"

export default function Invoice() {
    const { invoiceID } = useParams()
    const { cancelPackageRequestFromUser } = useContext(UserContext)
    const { setLoadingVisible } = useContext(LayoutContext)

    const [invoice, setInvoice] = useState(undefined)
    const [redirect, setRedirect] = useState(false)
    const [packageName, setpackageName] = useState("")

    useEffect(() => {
        
    }, [])

    return (
        <Layout title="Factura">
            {redirect && <Redirect to="/" />}
            <div className="content-body">
                <div className="container-fluid">
                    <Breadcrumb pageTitles={["Inicio", "Factura", invoiceID]} />
                    <React.Fragment>
                        {invoice === undefined ? (
                            <div></div>
                        ) : (
                            <div className="row">
                                <div className="col-lg-12">
                                    {invoice.pending && <div className="alert alert-info alert-dismissible fade show">
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
                                        <strong>IMPORTANTE:</strong> <strong>Al terminar el pago, da clic en regresar al sitio web del comercio</strong> para que la factura se registro como pagada correctamente.
                                    </div>}
                                    <div className="card mt-3">
                                        <div className="card-header">
                                            {" "}
                                            Factura <strong>{dateWithFormatFromTime(invoice.createdAt)}</strong>{" "}
                                            <span className="float-right">
                                                <strong>Estado:</strong>{" "}
                                                <span
                                                    className={`text-${
                                                        invoice.cancelled
                                                            ? "danger"
                                                            : invoice.paid
                                                            ? "success"
                                                            : "primary"
                                                    }`}
                                                >
                                                    {invoice.status}
                                                </span>
                                            </span>{" "}
                                        </div>
                                        <div className="card-body">
                                            <div className="table-responsive">
                                                <table className="table table-striped">
                                                    <thead>
                                                        <tr>
                                                            <th>Paquete</th>
                                                            <th>Descripción</th>
                                                            <th className="right">Costo</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        <tr>
                                                            <td className="left strong">{invoice.packageID}</td>
                                                            <td className="left">{invoice.subject}</td>
                                                            <td className="right">${invoice.amount}</td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </div>
                                            <div className="row">
                                                <div className="col-lg-4 col-sm-5"> </div>
                                                <div className="col-lg-4 col-sm-5 ml-auto">
                                                    <table className="table table-clear">
                                                        <tbody>
                                                            <tr>
                                                                <td className="left">
                                                                    <strong>Total</strong>
                                                                </td>
                                                                <td className="right">
                                                                    <strong>${invoice.amount} USD</strong>
                                                                </td>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                </div>
                                            </div>
                                            {invoice.pending && (
                                                <div className="row">
                                                    <div className="col-lg-4 col-sm-5"> </div>
                                                    <div className="col-lg-4 col-sm-5 ml-auto d-flex align-items-center">
                                                        <form
                                                            action="https://www.coinpayments.net/index.php"
                                                            method="post"
                                                            className="mr-3 d-flex align-items-center"
                                                        >
                                                            <input type="hidden" name="cmd" value="_pay_simple" />
                                                            <input type="hidden" name="reset" value="1" />
                                                            <input
                                                                type="hidden"
                                                                name="merchant"
                                                                value="993161eb0f76ff4c4e4354292524561a"
                                                            />
                                                            <input
                                                                type="hidden"
                                                                name="item_name"
                                                                value={`Paquete ${packageName} - CriptoEstrategias`}
                                                            />
                                                            <input type="hidden" name="currency" value="USD" />
                                                            <input
                                                                type="hidden"
                                                                name="amountf"
                                                                value={invoice.amount}
                                                            />
                                                            <input
                                                                type="hidden"
                                                                name="success_url"
                                                                value={
                                                                    window.location.origin +
                                                                    "/gvDWrxqqrGjPZGtNAqGYsTLqYDGNhTzwdhEAcsJPWaGGmjLGGwGsBafJnqcDFySqWZfxvLgaPKVPGjZDtkvJfHELZkNWPWqxNXFbSsVSNFeuPksDbtZbThgfWndQxXKt/" +
                                                                    invoice.userID +
                                                                    "/" +
                                                                    invoiceID
                                                                }
                                                            />
                                                            <input
                                                                type="hidden"
                                                                name="cancel_url"
                                                                value={window.location.href}
                                                            />
                                                            <input
                                                                type="image"
                                                                src="https://www.coinpayments.net/images/pub/buynow-grey.png"
                                                                alt="Pagar ahora con CoinPayments.net"
                                                            />
                                                        </form>
                                                        {!invoice.generated && (
                                                            <React.Fragment>
                                                                <button
                                                                    type="button"
                                                                    className="btn light btn-danger btn-xs btn-rounded p-3"
                                                                    data-toggle="modal"
                                                                    data-target="#modalCancel"
                                                                >
                                                                    Cancelar factura
                                                                </button>
                                                                <div
                                                                    className="modal fade"
                                                                    id="modalCancel"
                                                                    style={{ display: "none" }}
                                                                    aria-hidden="true"
                                                                >
                                                                    <div
                                                                        className="modal-dialog modal-dialog-centered"
                                                                        role="document"
                                                                    >
                                                                        <div className="modal-content">
                                                                            <div className="modal-header">
                                                                                <h5 className="modal-title">
                                                                                    ¿Deseas cancelar la factura?
                                                                                </h5>
                                                                                <button
                                                                                    type="button"
                                                                                    className="close"
                                                                                    data-dismiss="modal"
                                                                                >
                                                                                    <span>×</span>
                                                                                </button>
                                                                            </div>
                                                                            <div className="modal-footer d-flex justify-content-center">
                                                                                <button
                                                                                    type="button"
                                                                                    className="btn btn-secondary light"
                                                                                    data-dismiss="modal"
                                                                                >
                                                                                    Regresar
                                                                                </button>
                                                                                <button
                                                                                    type="button"
                                                                                    className="btn btn-primary"
                                                                                    data-dismiss="modal"
                                                                                    onClick={async () => {
                                                                                        setLoadingVisible(true)
                                                                                        await cancelPackageRequestFromUser()
                                                                                        setLoadingVisible(false)
                                                                                    }}
                                                                                >
                                                                                    Confirmar cancelación
                                                                                </button>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </React.Fragment>
                                                        )}
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </React.Fragment>
                </div>
            </div>
        </Layout>
    )
}
