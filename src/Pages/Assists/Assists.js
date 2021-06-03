import React, { useContext, useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { UserContext } from "../../Context/UserContext";
import { LayoutContext } from "../../Context/LayoutContext";
import Layout from "../../panelLayout/Layout";
import Breadcrumb from "../../panelLayout/Breadcrumb";
import { dateWithFormatFromTime } from "../../Utilities/DateUtilities.js";
import Requests from "../../Utilities/Requests";

export default function Assists() {
    const { user } = useContext(UserContext);
    const { setLoadingVisible } = useContext(LayoutContext);

    const [assists, setAssists] = useState(undefined);

    const [total, setTotal] = useState("Calculando...");

    const [file, setFile] = useState(undefined);

    const openFile = (event) => {
        setLoadingVisible(true);
        const input = event.target;

        const reader = new FileReader();
        reader.onload = () => {
            const text = reader.result;
            setFile(text);
            console.log(text);
            let registers = text.split("\r\n");
            console.log(registers);
            const registersFormatted = formatRegisters(registers);
            const registersFitered = inoutFilter(registersFormatted);
            setAssists(registersFitered);
            setLoadingVisible(false);
        };
        reader.readAsText(input.files[0]);
        input.value = "";
    };

    const formatRegisters = (registers) => {
        const registersOrdered = registers.sort().filter(function (item, pos, ary) {
            return !pos || item != ary[pos - 1];
        });
        console.log(registers);
        const registersFormatted = registersOrdered.map((assist) => {
            return {
                CCVEEMP: assist.substring(0, 6),
                DFECREG:
                    assist.substring(10, 14) +
                    "-" +
                    assist.substring(8, 10) +
                    "-" +
                    assist.substring(6, 8) +
                    " " +
                    assist.substring(14, 16) +
                    ":" +
                    assist.substring(16, 18) +
                    ":" +
                    assist.substring(18, 20),
                CNUMBIO: assist.substring(20),
                CSTATUS: "A",
            };
        });
        console.log(registersFormatted);
        return registersFormatted;
    };

    const inoutFilter = (registersFormatted) => {
        const ccveeps = registersFormatted
            .map((register) => {
                return register.CCVEEMP;
            })
            .sort()
            .filter(function (item, pos, ary) {
                return !pos || item != ary[pos - 1];
            });
        console.log(ccveeps);
        const registersPreFiltered = ccveeps.map((ccveemp) => {
            const myRegisters = registersFormatted.filter((register) => {
                return register.CCVEEMP == ccveemp;
            });
            console.log(myRegisters);
            if (myRegisters.length > 2) {
                const outRegister = myRegisters.filter((register) => {
                    return new Date(myRegisters[0].DFECREG).setSeconds(60 * 15) < new Date(register.DFECREG);
                })[0];
                if (!outRegister) {
                    return myRegisters[0];
                } else {
                    return [myRegisters[0], outRegister];
                }
            } else {
                return myRegisters;
            }
        });
        console.log(registersPreFiltered);
        const registersFiltered = [].concat(...registersPreFiltered);
        console.log(registersFiltered);
        return registersFiltered;
    };

    const clean = () => {
        setAssists(undefined);
        setFile(undefined);
    };

    useEffect(() => {
        setAssists(undefined);
        setFile(undefined);
    }, []);

    const saveRegisters = () => {
        const getInfo = async () => {
            Requests.post("registrar_asistencias", assists);
        };
        getInfo();
        setAssists(undefined);
        setFile(undefined);
    };

    return (
        <Layout title="Asistencias">
            <div className="content-body">
                <div className="container-fluid">
                    <Breadcrumb pageTitles={["Inicio", "Asistencias"]} />
                    <React.Fragment>
                        <div className="row">
                            <div className="col-xl-6">
                                <label for="file" type="button" class="btn btn-rounded btn-outline-primary mb-5">
                                    Cargar archivo
                                </label>
                                <span>
                                    <input
                                        id="file"
                                        type="file"
                                        accept="text/plain"
                                        style={{
                                            width: "0.1px",
                                            height: "0.1px",
                                            opacity: 0,
                                            overflow: "hidden",
                                            position: "absolute",
                                            zIndex: -1,
                                        }}
                                        onChange={openFile}
                                    />
                                </span>
                            </div>
                            {assists != undefined && file != undefined && file != "" && (
                                <React.Fragment>
                                    <div className="col-xl-6 text-right">
                                        <button
                                            type="button"
                                            class="btn btn-rounded btn-outline-primary mb-5"
                                            data-toggle="modal"
                                            data-target="#exampleModalCenter"
                                        >
                                            Guardar
                                        </button>
                                        <div
                                            class="modal fade"
                                            id="exampleModalCenter"
                                            style={{ display: "none" }}
                                            aria-hidden="true"
                                        >
                                            <div class="modal-dialog modal-dialog-centered" role="document">
                                                <div class="modal-content">
                                                    <div class="modal-header">
                                                        <h5 class="modal-title">Confirmación</h5>
                                                        <button type="button" class="close" data-dismiss="modal">
                                                            <span>×</span>
                                                        </button>
                                                    </div>
                                                    <div class="modal-body">
                                                        <p>
                                                            ¿Estas seguro de guardar los registros que se muestran en la tabla?
                                                        </p>
                                                    </div>
                                                    <div class="modal-footer">
                                                        <button
                                                            type="button"
                                                            class="btn btn-danger light"
                                                            data-dismiss="modal"
                                                        >
                                                            Regresar
                                                        </button>
                                                        <button type="button" class="btn btn-primary" data-dismiss="modal" onClick={saveRegisters}>
                                                            Guardar asistencias
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <button
                                            type="button"
                                            class="btn btn-rounded btn-outline-primary mb-5 ml-3"
                                            onClick={clean}
                                        >
                                            Limpiar
                                        </button>
                                    </div>
                                </React.Fragment>
                            )}
                        </div>
                        {assists === undefined ? (
                            <div className="row">
                                <div className="col-xl-12">
                                    <div className="alert alert-warning left-icon-big alert-dismissible fade show">
                                        <div className="media">
                                            <div className="alert-left-icon-big">
                                                <span>
                                                    <i className="mdi mdi-help-circle-outline"></i>
                                                </span>
                                            </div>
                                            <div className="media-body">
                                                <h5 className="mt-1 mb-2">Archivo no cargado</h5>
                                                <p className="mb-0">Aún no se ha cargado un archivo de asistencias.</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div className="row">
                                {file === "" ? (
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
                                                    <p className="mb-0">
                                                        El <strong>archivo</strong> que cargaste esta{" "}
                                                        <strong>vacio</strong>.
                                                    </p>
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
                                                        <th>Fecha y hora</th>
                                                        <th>Numero de dispositivo biometrico</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {Object.keys(assists).map((index, i) => {
                                                        let assist = assists[index];
                                                        return (
                                                            <tr key={i}>
                                                                <td className="pr-0">
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
                                                                </td>
                                                                <td>
                                                                    <span>{assist.CCVEEMP}</span>
                                                                </td>
                                                                <td className="wspace-no">
                                                                    {dateWithFormatFromTime(assist.DFECREG)}
                                                                </td>
                                                                <td>
                                                                    <span>{assist.CNUMBIO}</span>
                                                                </td>
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
