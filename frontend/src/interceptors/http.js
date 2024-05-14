import axios from "axios";
import {API} from "../constants/app";

let token = localStorage.getItem('token');

const http = axios.create({
    baseURL: `${API}`,
    timeout: 10000,
    headers: {'Authorization': 'Bearer ' + token}
});

export default http;