import * as axios from "axios";
import Constants from "./Constants";

const Requests = {
    post: async (url, payload) => {
        const headers =
            localStorage.getItem("Authorization") && localStorage.getItem("Authorization") !== "null"
                ? { "Authorization": localStorage.getItem("Authorization") }
                : {};
        const response = await axios.post(Constants.configServerURL() + "/" + url, payload, { headers });
        return response;
    },
    get: async (url) => {
        const headers =
            localStorage.getItem("Authorization") && localStorage.getItem("Authorization") !== "null"
                ? { "Authorization": localStorage.getItem("Authorization") }
                : {};
        const response = await axios.get(Constants.configServerURL() + "/" + url, { headers });
        return response;
    },
    put: async (url, payload) => {
        const headers =
            localStorage.getItem("Authorization") && localStorage.getItem("Authorization") !== "null"
                ? { "Authorization": localStorage.getItem("Authorization") }
                : {};
        const response = await axios.put(Constants.configServerURL() + "/" + url, payload, { headers });
        return response;
    },
    delete: async (url) => {
        const headers = localStorage.getItem("Authorization")
            ? { "Authorization": localStorage.getItem("Authorization") }
            : {};
        const response = await axios.delete(Constants.configServerURL() + "/" + url, { headers });
        return response;
    },
    deleteWPayload: async (url, payload) => {
        const headers =
            localStorage.getItem("Authorization") && localStorage.getItem("Authorization") !== "null"
                ? { "Authorization": localStorage.getItem("Authorization") }
                : {};
        const response = await axios.delete(Constants.configServerURL() + "/" + url, payload, { headers });
        return response;
    },
};
export default Requests;
