const Constants = {
    production: false,
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
};

export default Constants;
