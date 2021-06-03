const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);

    return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
};

const meses = [
    "Enero",
    "Febrero",
    "Marzo",
    "Abril",
    "Mayo",
    "Junio",
    "Julio",
    "Agosto",
    "Septiembre",
    "Octubre",
    "Noviembre",
    "Diciembre",
];
const dias = ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];
const dateWithFormat = (param) => {
    //let fecha = new Date(param)
    var fecha = new Date(0); // The 0 there is the key, which sets the date to the epoch
    fecha.setUTCSeconds(param);
    //console.warn("fecha", fecha, fecha.getDay())
    return (
        dias[fecha.getDay()] + " " + fecha.getDate() + " de " + meses[fecha.getMonth()] + " del " + fecha.getFullYear()
    );
};
const dateWithFormatFromTime = (param) => {
    let fecha = new Date(param);
    //console.warn("fecha", fecha, fecha.getDay())
    return (
        dias[fecha.getDay()] +
        " " +
        fecha.getDate() +
        "/" +
        meses[fecha.getMonth()] +
        "/" +
        fecha.getFullYear() +
        " a las " +
        fecha.toTimeString().substring(0,8)
    );
};
const dateWithNumberFormatFromTime = (param) => {
    let fecha = new Date(param);
    //console.warn("fecha", fecha, fecha.getDay())
    return dias[fecha.getDay()] + ", " + fecha.getDate() + "/" + (fecha.getMonth() + 1) + "/" + fecha.getFullYear();
};

export { formatTimestamp, dateWithFormat, dateWithFormatFromTime, dateWithNumberFormatFromTime };
