import axios, { AxiosResponse } from "axios";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link, Params, useParams } from "react-router-dom";
import config from "../config/config";
import moment from "moment";

function Manage(): React.JSX.Element {
    const { t, i18n } = useTranslation();
    const params: Params<string> = useParams();
    const boxUUID: string = params.boxUUID ?? "";

    const [isShowKey, setIsShowKey] = useState<boolean>(false);

    const [cabinetName, setCabinetName] = useState<string>("Loading...");
    const [cabinetOwner, setCabinetOwner] = useState<string>("Loading...");
    const [cabinetSlotCount, setCabinetSlotCount] = useState<string>("Loading...");
    const [cabinetCreateAt, setCabinetCreateAt] = useState<string>("Loading...");
    const [cabinetKey, setCabinetKey] = useState<string>("Loading...");

    const [cabinetAlertList, setCabinetAlertList] = useState<[]>([]);

    useEffect(() =>{
        (async(): Promise<void> =>{
            axios.defaults.withCredentials = true;
            const responseCabinetInfo: AxiosResponse = await axios.post(`${config.backend.api.baseurl}/api/v1/box/info`, {
                boxUUID: boxUUID,
            }, {
                headers: {
                    "Content-Type": "application/json",
                },
            });
            const responseCabinetInfoData: any = responseCabinetInfo.data;
            if(responseCabinetInfoData.status === "OK"){
                setCabinetName(responseCabinetInfoData.data?.box_name);
                setCabinetCreateAt(moment(responseCabinetInfoData.data?.create_at).format("MMM Do YYYY"));
            }
            const responseUserInfo: AxiosResponse = await axios.get(`${config.backend.api.baseurl}/api/v1/user/info`, {
                headers: {
                    "Content-Type": "application/json",
                },
            });
            const responseUserInfoData: any = responseUserInfo.data;
            if(responseUserInfoData.status === "OK"){
                setCabinetOwner(responseUserInfoData.data?.user_name);
            }
            const responseCabinetSlotInfo: AxiosResponse = await axios.post(`${config.backend.api.baseurl}/api/v1/box/deepinfo`, {
                boxUUID: boxUUID,
            }, {
                headers: {
                    "Content-Type": "application/json"
                }
            });
            const responseCabinetSlotInfoData: any = responseCabinetSlotInfo.data;
            if(responseCabinetSlotInfoData.status === "OK"){
                setCabinetSlotCount(responseCabinetSlotInfoData.data?.box_slot_count);
            }
            const responseCabinetAlertList: AxiosResponse = await axios.post(`${config.backend.api.baseurl}/api/v1/alert/list`, {
                boxUUID: boxUUID
            }, {
                headers: {
                    "Content-Type": "application/json",
                }
            });
            const responseCabinetAlertListData: any = responseCabinetAlertList.data;
            if(responseCabinetAlertListData.status === "OK"){
                setCabinetAlertList(responseCabinetAlertListData.data);
            }
        })();
    }, []);

    async function getCabinetKey(): Promise<void> {
        setIsShowKey(prev => !prev);
        if(isShowKey === true) return;

        axios.defaults.withCredentials = true;
        const responseCabinetKey: AxiosResponse = await axios.post(`${config.backend.api.baseurl}/api/v1/box/deepinfo`, {
            boxUUID: boxUUID,
        }, {
            headers: {
                "Content-Type": "application/json"
            }
        });
        const responseCabinetKeyData: any = responseCabinetKey.data;
        if(responseCabinetKeyData.status === "OK"){
            setCabinetKey(responseCabinetKeyData.data?.box_key);
        }
    }
    
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
                <div className="font-semibold text-white">{t("Manage")} - {cabinetName}</div>
            </div>
            <div className="flex flex-col">
                <div className="p-4">
                    <img className="rounded-lg" src="https://placehold.co/600x400" alt="img" />
                </div>
                <div className="flex flex-col mt-3 gap-1 px-4">    
                    <div className="mb-4">
                        <div className="text-lg font-semibold">
                            {t("Information")} 
                        </div>
                    </div>    
                    <div className="grid grid-cols-4 mb-4 text-md">
                        <div className="w-full col-span-2">
                            <span className="font-medium">Name : </span>{cabinetName}
                        </div>
                        <div className="w-full col-span-2">
                            <span className="font-medium">Owner : </span>{cabinetOwner}
                        </div>
                        <div className="w-full col-span-2">
                            <span className="font-medium">Slot Count : </span>{cabinetSlotCount}
                        </div>
                        <div className="w-full col-span-2">
                            <span className="font-medium">Added At : </span>{cabinetCreateAt}
                        </div>
                        <div className="w-full flex flex-row col-span-4">
                            <span className="font-medium mr-2">Key : </span>
                            <div className="bg-neutral-200 rounded-lg px-2 cursor-pointer hover:bg-neutral-300 active:bg-neutral-400 duration-300 text-md font-normal" onClick={() => getCabinetKey()}>{isShowKey ? (<span className="text-xs">{cabinetKey}</span>) : "Show"}</div>
                        </div>
                    </div>
                    <div className="mb-4">
                        <div className="text-lg font-semibold">
                            {t("Menu")} 
                        </div>
                    </div>
                    <div className="grid grid-cols-3 gap-3 mb-4">
                        <div className="w-full aspect-square bg-neutral-200 grid place-items-center rounded-xl hover:bg-neutral-300 active:bg-neutral-400 duration-300">
                            <div className="flex flex-col items-center w-full gap-2 cursor-pointer">
                                <span className="text-2xl">
                                    <i className="fa-solid fa-clock"></i>
                                </span>
                                <div className="font-semibold">
                                    Add Time
                                </div>
                            </div>
                        </div>
                        <div className="w-full aspect-square bg-neutral-200 grid place-items-center rounded-xl hover:bg-neutral-300 active:bg-neutral-400 duration-300">
                            <div className="flex flex-col items-center w-full gap-2 cursor-pointer">
                                <span className="text-2xl">
                                    <i className="fa-solid fa-tools"></i>
                                </span>
                                <div className="font-semibold">
                                    Rename
                                </div>
                            </div>
                        </div>
                        <div className="w-full aspect-square bg-neutral-200 grid place-items-center rounded-xl hover:bg-neutral-300 active:bg-neutral-400 duration-300">
                            <div className="flex flex-col items-center w-full gap-2 cursor-pointer">
                                <span className="text-2xl">
                                    <i className="fa-solid fa-trash"></i>
                                </span>
                                <div className="font-semibold">
                                    Delete
                                </div>
                            </div>
                        </div>
                    </div> 
                    <div className="mb-4">
                        <div className="text-lg font-semibold">
                            {t("Alert List")} 
                        </div>
                        <div className="text-sm">
                            Total ({cabinetAlertList.length}) Items
                        </div>
                    </div>
                    {cabinetAlertList.length > 0 ? (
                        <div className="overflow-x-auto noselect mb-16"> {/* ถ้าพบรายการเเจ้งเตือน */}
                            <table className="table table-sm">
                                <thead>
                                    <tr className="text-center">
                                        <th>{t("Alert ID")}</th> 
                                        <th>{t("Alert Name")}</th> 
                                        <th>{t("Alert Date")}</th> 
                                        <th>{t("Alert Time")}</th> 
                                        <th>{t("Alert Slot")}</th> 
                                    </tr>
                                </thead> 
                                <tbody>
                                    {cabinetAlertList?.map((alert: any, i: number) => (
                                        <tr className="text-center" key={i} >
                                            <td>{alert.id}</td> 
                                            <td>{alert.alert_name}</td> 
                                            <td>{(alert.alert_time).split("T")[0]}</td> 
                                            <td>{(alert.alert_time).split("T")[1].split(".")[0]}</td> 
                                            <td>{(alert.alert_slot).join(", ")}</td> 
                                        </tr>
                                    ))}
                                </tbody> 
                            </table>
                        </div> 
                    ) : (
                        <div className="flex flex-col gap-4 mb-4">
                            <div className="text-center py-8">
                                <div className="text-lg">{t("No Item Found")}</div>
                                <p className="text-sm">{t("Go into Add Time to set the alert time")}</p>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}


export default Manage;