import axios, { AxiosResponse } from "axios";
import React, { useEffect, useState } from "react"
import { useTranslation } from "react-i18next";
import { Link, Params, useParams } from "react-router-dom";
import config from "../config/config";

interface AlertInfoData {
    id: number;
    alert_uuid: string;
    alert_name: string;
    alert_time: string;
    alert_slot: string[];
    box_uuid: string;
    meal: string[];
    create_at: string;
}

function UpdateAlertInfo(): React.JSX.Element {
    const { t, i18n } = useTranslation();
    const params: Params<string> = useParams();
    const boxUUID: string = params.boxUUID ?? "";
    const alertUUID: string = params.alertUUID ?? "";

    const [alertInfoData, setAlertInfoData] = useState<AlertInfoData>({
        id: 0,
        alert_uuid: "",
        alert_name: "",
        alert_time: "",
        alert_slot: [],
        box_uuid: "",
        meal: [],
        create_at: ""
    });
    

    useEffect(() =>{
        (async(): Promise<void> =>{
            axios.defaults.withCredentials = true;
            const alertInfoResponse: AxiosResponse = await axios.post(`${config.backend.api.baseurl}/api/v1/alert/info`, {
                boxUUID: boxUUID,
                alertUUID: alertUUID
            }, {
                headers: {
                    "Content-Type": "application/json",
                }
            });
            const alertInfoResponseData: any = alertInfoResponse.data;
            if(alertInfoResponseData.status === "OK"){
                setAlertInfoData(alertInfoResponseData.data);
            }
        })();
    }, []);

    return (
        <>
            <div className="bg-[#f76418] p-4 flex items-center gap-3">
                <Link className="flex items-center" to={"/"}>
                    <div className="text-white text-xl">
                        <span>
                            <i className="fa-solid fa-angle-left"></i>
                        </span>
                    </div>
                </Link>
                <div className="font-semibold text-white">{t("Update")} - {(alertInfoData.alert_name).charAt(0).toUpperCase() + (alertInfoData.alert_name).slice(1)}</div>
            </div>
            <div className="flex flex-col pb-10">
                
            </div>
        </>
    );
}

export default UpdateAlertInfo;