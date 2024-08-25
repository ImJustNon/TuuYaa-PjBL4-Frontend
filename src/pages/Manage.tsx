import axios, { AxiosResponse } from "axios";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link, Params, useParams } from "react-router-dom";
import config from "../config/config";
import moment from "moment";
import { IconButton, useDisclosure } from "@chakra-ui/react";
import DeleteCabinetModal from "../components/DeleteCabinetModal";
import RenameCabinetModal from "../components/RenameCabinetModal";
import AddAlertTimeModal from "../components/AddAlertTimeModal";
import { Popover, PopoverTrigger, PopoverContent, PopoverHeader, PopoverBody, PopoverFooter, PopoverArrow, PopoverCloseButton, PopoverAnchor } from '@chakra-ui/react';
import { Menu, MenuButton, MenuList, MenuItem, MenuItemOption, MenuGroup, MenuOptionGroup, MenuDivider } from '@chakra-ui/react';
import { mapChannel } from "../utils/mapChannel";
import { MapChannel } from "../types/types";
import UpdateLineNotifyModal from "../components/UpdateLineNotifyModal";

function Manage(): React.JSX.Element {
    const { t, i18n } = useTranslation();
    const params: Params<string> = useParams();
    const boxUUID: string = params.boxUUID ?? "";

    const [refetch, setRefetch] = useState<number>(0);

    const [isShowKey, setIsShowKey] = useState<boolean>(false);

    const [cabinetName, setCabinetName] = useState<string>("Loading...");
    const [cabinetOwner, setCabinetOwner] = useState<string>("Loading...");
    const [cabinetSlotCount, setCabinetSlotCount] = useState<string>("Loading...");
    const [cabinetCreateAt, setCabinetCreateAt] = useState<string>("Loading...");
    const [cabinetLineNotifyStatus, setCabinetLineNotifyStatus] = useState<string>("Loading...");
    const [cabinetKey, setCabinetKey] = useState<string>("Loading...");

    const [cabinetAlertList, setCabinetAlertList] = useState<[]>([]);

    const deleteCabinetModalDisclosure = useDisclosure();
    const deleteCabinetModalIsOpen = deleteCabinetModalDisclosure.isOpen;
    const deleteCabinetModalOnOpen = deleteCabinetModalDisclosure.onOpen;
    const deleteCabinetModalOnClose = deleteCabinetModalDisclosure.onClose;

    const renameCabinetModalDisclosure = useDisclosure();
    const renameCabinetModalIsOpen = renameCabinetModalDisclosure.isOpen;
    const renameCabinetModalOnOpen = renameCabinetModalDisclosure.onOpen;
    const renameCabinetModalOnClose = renameCabinetModalDisclosure.onClose;

    const addAlertTimeModalDisclosure = useDisclosure();
    const addAlertTimeModalIsOpen = addAlertTimeModalDisclosure.isOpen;
    const addAlertTimeModalOnOpen = addAlertTimeModalDisclosure.onOpen;
    const addAlertTimeModalOnClose = addAlertTimeModalDisclosure.onClose;

    const updateLineNotifyModalDisclosure = useDisclosure();
    const updateLineNotifyModalIsOpen = updateLineNotifyModalDisclosure.isOpen;
    const updateLineNotifyModalOnOpen = updateLineNotifyModalDisclosure.onOpen;
    const updateLineNotifyModalOnClose = updateLineNotifyModalDisclosure.onClose;

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
                setCabinetLineNotifyStatus(responseCabinetInfoData.data?.line_notify_token ? "Activated" : "Not Activated");
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
    }, [refetch]);

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
                <Link className="flex items-center hover:scale-125 duration-300" to={"/"}>
                    <div className="text-white text-xl">
                        <span>
                            <i className="fa-solid fa-angle-left"></i>
                        </span>
                    </div>
                </Link>
                <div className="font-semibold text-white">{t("Manage")} - {cabinetName.charAt(0).toUpperCase() + cabinetName.slice(1)}</div>
            </div>
            <div className="flex flex-col pb-10">
                {/* <div className="p-4 mx-auto">
                    <img className="rounded-lg" src="https://placehold.co/600x400" alt="img" />
                </div> */}
                <div className="flex flex-col mt-3 gap-1 px-4">    
                    <div className="mb-4">
                        <div className="text-lg font-semibold">
                            {t("Information")} 
                        </div>
                    </div>    
                    <div className="grid grid-cols-4 mb-4 text-md gap-y-3">
                        <div className="w-full col-span-2">
                            <span className="font-medium">Name : </span>{cabinetName}
                        </div>
                        <div className="w-full flex flex-row col-span-2">
                            <span className="font-medium mr-2">Key : </span>
                            <div className="bg-neutral-200 rounded-lg px-2 cursor-pointer hover:bg-neutral-300 active:bg-neutral-400 duration-300 text-md font-normal" onClick={() => getCabinetKey()}>{isShowKey ? (<span className="text-xs">{cabinetKey}</span>) : "Show"}</div>
                        </div>
                        <div className="w-full col-span-4">
                            <span className="font-medium">Added At : </span>{cabinetCreateAt}
                        </div>
                        <div className="w-full col-span-2">
                            <span className={`font-medium`}>LINE Notify : </span><span className={`${cabinetLineNotifyStatus === "Activated" ? "text-green-500" : "text-yellow-500"}`}>{cabinetLineNotifyStatus}</span>
                        </div>
                    </div>
                    <div className="mb-4">
                        <div className="text-lg font-semibold">
                            {t("Menu")} 
                        </div>
                    </div>
                    <div className="grid grid-cols-3 gap-3 gap-y-5 mb-4">
                        <div className="w-full aspect-square bg-neutral-200 grid place-items-center rounded-xl shadow-xl hover:bg-neutral-300 active:bg-neutral-400 hover:scale-105 duration-300" onClick={() => addAlertTimeModalOnOpen()}>
                            <div className="flex flex-col items-center w-full gap-2 cursor-pointer">
                                <span className="text-2xl">
                                    <i className="fa-solid fa-clock"></i>
                                </span>
                                <div className="font-semibold">
                                    Add Time
                                </div>
                            </div>
                        </div>
                        <div className="w-full aspect-square bg-neutral-200 grid place-items-center rounded-xl shadow-xl hover:bg-neutral-300 active:bg-neutral-400 hover:scale-105 duration-300" onClick={() => renameCabinetModalOnOpen()} >
                            <div className="flex flex-col items-center w-full gap-2 cursor-pointer">
                                <span className="text-2xl">
                                    <i className="fa-solid fa-tools"></i>
                                </span>
                                <div className="font-semibold">
                                    Rename
                                </div>
                            </div>
                        </div>
                        <div className="w-full aspect-square bg-neutral-200 grid place-items-center rounded-xl shadow-xl hover:bg-neutral-300 active:bg-neutral-400 hover:scale-105 duration-300" onClick={() => deleteCabinetModalOnOpen()} >
                            <div className="flex flex-col items-center w-full gap-2 cursor-pointer">
                                <span className="text-2xl">
                                    <i className="fa-solid fa-trash"></i>
                                </span>
                                <div className="font-semibold">
                                    Delete
                                </div>
                            </div>
                        </div>
                        <div className="w-full aspect-square bg-neutral-200 grid place-items-center rounded-xl shadow-xl hover:bg-neutral-300 active:bg-neutral-400 hover:scale-105 duration-300" onClick={() => updateLineNotifyModalOnOpen()} >
                            <div className={`flex flex-col items-center w-full gap-2 cursor-pointer ${cabinetLineNotifyStatus === "Activated" ? "text-green-500" : ""}`}>
                                <span className="text-3xl">
                                    <i className="fa-brands fa-line"></i>
                                </span>
                                <div className="font-semibold text-center">
                                    LINE Notify
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
                    {cabinetAlertList.length > 0 ? ( // alert list
                        <div className="flex flex-col gap-3"> 
                        {cabinetAlertList?.map((alert: any, i: number) => (
                            <Link to={`a/${alert.alert_uuid}`} className={`${(i % 2 === 0) ? "bg-[#f96519]" : "bg-[#fa8d55]"} text-white group rounded-xl px-5 py-2 shadow-xl flex flex-col gap-5 items-center hover:scale-105 justify-between hover:bg-[#f96519]/90 active:bg-[#f96519]/50 duration-300 cursor-pointer`} key={i} >
                                <div className="flex flex-row items-center w-full gap-5">
                                    <div className="font-normal text-md">
                                        {i + 1}.
                                    </div>
                                    <div className="flex flex-col gap-1 grow"> 
                                        <div className="font-normal text-lg">
                                            {(alert.alert_name)}
                                        </div>
                                        <div className="font-sm">
                                            {String(moment(alert.alert_time))}
                                        </div>
                                        <div className="w-fit flex flex-row gap-2">
                                            {(alert.alert_slot).map((slot: string, i: number) => (
                                                <div key={i} className="py-[2px] px-4 bg-[#ebdb2c] shadow-xl rounded-md text-center">{mapChannel(slot as MapChannel)}</div>
                                            ))}
                                            {(alert.meal).map((slot: string, i: number) => (
                                                <div key={i} className="py-[2px] px-2 bg-[#eba82c] shadow-xl rounded-md text-center">{slot.split("_").map(str => str.charAt(0).toUpperCase() + str.slice(1).toLowerCase()).join(" ")}</div>
                                            ))}
                                        </div>
                                    </div>
                                    <div className="w-fit pr-3">
                                        <i className="fa-solid fa-chevron-right group-hover:scale-150 duration-300"></i>
                                    </div>
                                </div>
                            </Link>
                            
                        ))}
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
            <DeleteCabinetModal isOpen={deleteCabinetModalIsOpen} onOpen={deleteCabinetModalOnOpen} onClose={deleteCabinetModalOnClose} boxUUID={boxUUID} />
            <RenameCabinetModal isOpen={renameCabinetModalIsOpen} onOpen={renameCabinetModalOnOpen} onClose={renameCabinetModalOnClose} boxUUID={boxUUID} refetch={setRefetch} />
            <AddAlertTimeModal isOpen={addAlertTimeModalIsOpen} onOpen={addAlertTimeModalOnOpen} onClose={addAlertTimeModalOnClose} boxUUID={boxUUID} refetch={setRefetch} />
            <UpdateLineNotifyModal isOpen={updateLineNotifyModalIsOpen} onOpen={updateLineNotifyModalOnOpen} onClose={updateLineNotifyModalOnClose} boxUUID={boxUUID} refetch={setRefetch} />
        </>
    );
}


export default Manage;