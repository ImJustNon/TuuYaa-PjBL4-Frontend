import axios, { AxiosResponse } from "axios";
import React, { useEffect } from "react";
import config from "../config/config";
import { NavigateFunction, useNavigate } from "react-router-dom";

function Bypass(): React.JSX.Element {

    const navigate: NavigateFunction = useNavigate();

    useEffect(() =>{
        (async() =>{
            try {
                axios.defaults.withCredentials = true;
                const response: AxiosResponse = await axios.post(`${config.backend.api.baseurl}/api/v1/dev/user/settoken`, {
                    email: "kanakornthaiprakhon@gmail.com"
                }, {
                    headers: {
                        "Content-Type": "application/json",
                    }
                });
                const responseData: any = response.data;
                console.log(responseData);
                navigate("/");
            }
            catch(e){
                console.log("Bypass Login FAIL : ", e);
            }
        })();
    }, []);
    return (<></>);
}


export default Bypass;