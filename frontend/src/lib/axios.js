import axios from "axios";

export const axoisInstance = axios.create({
    baseURL: "http://localhost:5001/api",
    withCredentials: true,
});
