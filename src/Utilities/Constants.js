const Constants = {
    production: true,
    developerMode: false,
    appURL: () => {
        if (Constants.production) {
            return "https://regasi.herokuapp.com";
        } else {
            return "http://localhost:3000";
        }
    },
    configServerURL: () => {
        if (Constants.production) {
            return Constants.developerMode ? "https://regasi.herokuapp.com" : "https://regasi.herokuapp.com";
        } else {
            return "http://localhost:5000";
        }
    },
    incidentsValues: {
        "N" : "Retardo Menor",
        "Y" : "Retardo Mayor",
        "T" : "Falta por llegar tarde",
        "A" : "Falta por salida anticipada",
        "O" : "Falta por omisión de salida",
        "D" : "Falta todo el día",
    }
};

export default Constants;
