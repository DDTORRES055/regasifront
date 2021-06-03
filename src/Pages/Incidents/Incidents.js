import React, { useContext, useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { UserContext } from "../../Context/UserContext";
import { LayoutContext } from "../../Context/LayoutContext";
import Layout from "../../panelLayout/Layout";
import Breadcrumb from "../../panelLayout/Breadcrumb";
import { dateWithNumberFormatFromTime } from "../../Utilities/DateUtilities.js";
import Constants from "../../Utilities/Constants";
import Requests from "../../Utilities/Requests";

export default function Incidents() {
    const { user } = useContext(UserContext);
    const { setLoadingVisible } = useContext(LayoutContext);

    const [incidents, setIncidents] = useState(undefined);

    const { incidentsValues } = Constants;

    useEffect(() => {
        setLoadingVisible(true);
        const getInfo = async () => {
            const response = await Requests.get("incidencias");
            if (response.data) {
                setIncidents(response.data);
                console.log(response.data);
            }
            setLoadingVisible(false);
        };
        getInfo();
    }, []);

    return (
        <Layout title="Incidencias">
            <div className="content-body">
                <div className="container-fluid">
                    <Breadcrumb pageTitles={["Inicio", "Incidencias"]} />
                    <React.Fragment>
                        {incidents === undefined ? (
                            <div></div>
                        ) : (
                            <div className="row">
                                {incidents === [] ? (
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
                                                    <p className="mb-0">Aún no hay incidencias del dia de ayer..</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="col-xl-12">
                                        <div className="table-responsive table-hover fs-14">
                                            <table
                                                className="table display mb-4 dataTablesCard  card-table"
                                                id="example5"
                                            >
                                                <thead>
                                                    <tr>
                                                        <th></th>
                                                        <th>Clave de empleado</th>
                                                        <th>Fecha de registro de incidencia</th>
                                                        <th>Tipo de incidencia</th>
                                                        <th>Status</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {Object.keys(incidents).map((index, i) => {
                                                        let incident = incidents[index];
                                                        return (
                                                            <tr key={i}>
                                                                <td className="pr-0">
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
                                                                </td>
                                                                <td>{incident.CCVEEMP}</td>
                                                                <td className="wspace-no">
                                                                    {dateWithNumberFormatFromTime(incident.DFECINC)}
                                                                </td>
                                                                <td>{incidentsValues[incident.CTIPINC]}</td>
                                                                <td>{incident.CSTATUS}</td>
                                                            </tr>
                                                        );
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
    );
}
