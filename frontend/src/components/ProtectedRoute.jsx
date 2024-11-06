import { useState, useEffect } from "react";
import {Navigate} from 'react-router-dom'
import {jwtDecode} from 'jwt-decode'
import { REFRESH_TOKEN, ACCESS_TOKEN } from "../constants";
import api from '../api'

const ProtectedRoute = () => {

    const [isAuthorizated, setIsAuthorizated] = useState(null)

    useEffect(() => {
        auth().catch(() => setIsAuthorizated(false))
    },[])

    const refreshToken = async () => {

        const refreshToken = localStorage.getItem(REFRESH_TOKEN)
        try {

            const res = await api.post("api/v1/user/token/refresh/",{
                refresh: refreshToken,
            });
            if(res.status === 200){
                localStorage.setItem(ACCESS_TOKEN, res.data.access);
                setIsAuthorizated(true)
            }else{
                setIsAuthorizated(false)
            }

        }catch(e){
            console.log(error);
            setIsAuthorizated(false);
        }
    }

    const auth = async () => {
        const token = localStorage.getItem(ACCESS_TOKEN);
        if (!token) {
            setIsAuthorizated(false);
            return;
        }

        const decoded = jwtDecode(token);
        const tokenExpiration = decoded.exp;
        const now = Date.now() / 1000;

        if (tokenExpiration < now) {
            await refreshToken();
        } else {
            setIsAuthorizated(true);
        }
    }

    if (isAuthorizated === null) {
        return <div>Loading...</div>;
    }


    return isAuthorizated ? children : <Navigate to="/login" />;
}

export default ProtectedRoute