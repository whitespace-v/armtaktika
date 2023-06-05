import axios from "axios";
import {API} from "./consts";

const $host = axios.create({                    //for not auth queries
    baseURL: API
})

const $authHost = axios.create({                    //for auth required will proceed header-auth
    baseURL: API
})

const authInterceptor = (config: any) => {   //get token for auth
    config.headers.authorization = `Bearer ${localStorage.getItem('token')}`
    return config
}

$authHost.interceptors.request.use(authInterceptor)     //proceed token

export {
    $host,
    $authHost
}