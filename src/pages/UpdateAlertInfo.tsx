import axios, { AxiosResponse } from "axios";
import React, { useEffect, useState } from "react"
import { useTranslation } from "react-i18next";
import { Link, Params, useParams } from "react-router-dom";
import config from "../config/config";
import { Checkbox, CreateToastFnReturn, Input, useToast } from "@chakra-ui/react";
import moment from "moment";

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

type MealOptions = "BEFORE_MEAL" | "AFTER_MEAL";
interface UpdatedAlertInfoOption {
    name: string;
    alertTime: string;
    meal: MealOptions[];
    slot: string;
}

function UpdateAlertInfo(): React.JSX.Element {
    const { t, i18n } = useTranslation();
    const params: Params<string> = useParams();
    const boxUUID: string = params.boxUUID ?? "";
    const alertUUID: string = params.alertUUID ?? "";
    const toast: CreateToastFnReturn = useToast();

    const [refreshData, setRefreshData] = useState<number>(0);
    const [selectedSlot, setSelectedSlot] = useState<string>("");
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
    const [updatedAlertInfo, setUpdatedAlertInfo] = useState<UpdatedAlertInfoOption>({
        name: "",
        alertTime: "",
        meal: [],
        slot: ""
    });

    useEffect(() =>{
        setUpdatedAlertInfo(prev =>{ return {
            ...prev,
            slot: selectedSlot
        }})
    }, [selectedSlot]);

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
    }, [refreshData]);

    function handleSelectedMeal(optionName: string, event: React.ChangeEvent<HTMLInputElement>){
        const name: string = optionName;
        const isChecked: boolean = event.target.checked;

        if(isChecked){
            setUpdatedAlertInfo((prev: UpdatedAlertInfoOption) =>{
                return {
                    ...prev,
                    meal: [...new Set([...prev.meal, name])] as MealOptions[],
                }
            });
        }
        else {
            setUpdatedAlertInfo((prev: UpdatedAlertInfoOption) =>{
                return {
                    ...prev,
                    meal: prev.meal.filter(p => p !== name),
                }
            });
        }
    }

    function handleSubmit(){
        (async() =>{
            try {
                axios.defaults.withCredentials = true;
                if(updatedAlertInfo.alertTime.length !== 0){
                    const response: AxiosResponse = await axios.post(`${config.backend.api.baseurl}/api/v1/alert/update`, {
                        boxUUID: boxUUID,
                        alertUUID: alertUUID,
                        update: "alerttime",
                        data: updatedAlertInfo.alertTime
                    }, {
                        headers: {
                            "Content-Type": "application/json"
                        }
                    });
                    const responseData = response.data;
                    if(responseData.status === "OK"){
                        toast({
                            status: "success",
                            description: "Updated Time Success",
                            position: "top",
                            isClosable: true,
                            duration: 1000
                        });
                    }
                }
                if(updatedAlertInfo.meal.length !== 0){
                    const response: AxiosResponse = await axios.post(`${config.backend.api.baseurl}/api/v1/alert/update`, {
                        boxUUID: boxUUID,
                        alertUUID: alertUUID,
                        update: "alertmeal",
                        data: updatedAlertInfo.meal
                    }, {
                        headers: {
                            "Content-Type": "application/json"
                        }
                    });
                    const responseData = response.data;
                    if(responseData.status === "OK"){
                        toast({
                            status: "success",
                            description: "Updated Meal Success",
                            position: "top",
                            isClosable: true,
                            duration: 1000
                        });
                    }
                }
                if(updatedAlertInfo.name.length !== 0){
                    const response: AxiosResponse = await axios.post(`${config.backend.api.baseurl}/api/v1/alert/update`, {
                        boxUUID: boxUUID,
                        alertUUID: alertUUID,
                        update: "alertname",
                        data: updatedAlertInfo.name
                    }, {
                        headers: {
                            "Content-Type": "application/json"
                        }
                    });
                    const responseData = response.data;
                    if(responseData.status === "OK"){
                        toast({
                            status: "success",
                            description: "Updated Name Success",
                            position: "top",
                            isClosable: true,
                            duration: 1000
                        });
                    }
                }
                if(updatedAlertInfo.slot.length !== 0){
                    const response: AxiosResponse = await axios.post(`${config.backend.api.baseurl}/api/v1/alert/update`, {
                        boxUUID: boxUUID,
                        alertUUID: alertUUID,
                        update: "alertslot",
                        data: [updatedAlertInfo.slot]
                    }, {
                        headers: {
                            "Content-Type": "application/json"
                        }
                    });
                    const responseData = response.data;
                    if(responseData.status === "OK"){
                        toast({
                            status: "success",
                            description: "Updated Channel Success",
                            position: "top",
                            isClosable: true,
                            duration: 1000
                        });
                    }
                }
            }
            catch(e){
                console.log(e);
                toast({
                    status: "error",
                    description: `${e}`,
                    position: "top",
                    isClosable: true,
                    duration: 1000
                });
            }
            finally{
                setRefreshData(Math.random());
            }
        })();
    }

    return (
        <>
            <div className="bg-[#f76418] p-4 flex items-center gap-3">
                <Link className="flex items-center hover:scale-110 duration-300" to={`/manage/b/${boxUUID}`}>
                    <div className="text-white text-xl">
                        <span>
                            <i className="fa-solid fa-angle-left"></i>
                        </span>
                    </div>
                </Link>
                <div className="font-semibold text-white">{t("Update")} - {(alertInfoData.alert_name).charAt(0).toUpperCase() + (alertInfoData.alert_name).slice(1)}</div>
            </div>
            <div className="flex flex-col pb-10">
                <div className="flex flex-col mt-3 gap-1 px-4">  
                    <div className="grid grid-cols-4 mb-4 text-md gap-y-5 mt-3">
                        <div className="w-full col-span-4 text-center text-2xl font-itim font-black">
                            {(alertInfoData.alert_name).charAt(0).toUpperCase() + (alertInfoData.alert_name).slice(1)}
                        </div>
                        <div className="w-full col-span-4 text-center text-xl">
                            <span className="mr-3 font-semibold">{String(new Date(alertInfoData.alert_time).toLocaleDateString())}</span>
                            <span>|</span>
                            <span className="ml-3 font-semibold">{String(new Date(alertInfoData.alert_time).toLocaleTimeString())}</span>
                        </div>
                        <div className="flex flex-col gap-2 col-span-4 w-full">
                            <div className="col-span-4 text-center font-semibold text-xl bg-yellow-300 w-fit px-5 py-2 rounded-lg mx-auto">
                                {alertInfoData.alert_slot.join(",")}
                            </div>
                            <div className="col-span-4 flex flex-row justify-center gap-2">
                                {alertInfoData.meal.map((m: string, i: number) =>(
                                    <div className="text-center font-light text-md bg-orange-500 w-fit text-white px-5 py-1 rounded-lg " key={i}>
                                        {String(m).charAt(0)}{String(m).split("_")[0].slice(1).toLowerCase()} {String(m).split("_")[1].charAt(0)}{String(m).split("_")[1].slice(1).toLowerCase()}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                    <div className="my-4">
                        <div className="text-xl font-semibold">
                            {t("Change Config")} 
                        </div>
                    </div> 
                    <div className="flex flex-col gap-5">
                        <div className="grid grid-cols-6 items-center gap-4">
                            <div className="col-span-2 font-medium text-md">Name</div>
                            <Input
                                size={"md"}
                                borderRadius={"5px"}
                                textAlign={"start"}
                                placeholder={alertInfoData.alert_name}
                                borderColor={"#f76418"} 
                                type="text"
                                focusBorderColor={"#f76418"}
                                required={true}
                                _hover={{
                                    borderColor: "#f76418"
                                }}
                                value={updatedAlertInfo.name}
                                onChange={(event: React.ChangeEvent<HTMLInputElement>) =>{
                                    setUpdatedAlertInfo(prev =>{ return {
                                        ...prev,
                                        name: event.target.value
                                    }})
                                }}
                                className="col-span-4"
                            />
                        </div>
                        <div className="grid grid-cols-6 items-center gap-4">
                            <div className="col-span-2 font-medium text-md ">Alert Time</div>
                            <Input
                                size={"md"}
                                borderRadius={"5px"}
                                textAlign={"start"}
                                borderColor={"#f76418"} 
                                type="datetime-local"
                                focusBorderColor={"#f76418"}
                                required={true}
                                _hover={{
                                    borderColor: "#f76418"
                                }}
                                onChange={(event: React.ChangeEvent<HTMLInputElement>) =>{
                                    setUpdatedAlertInfo(prev =>{ return {
                                        ...prev,
                                        alertTime: String(new Date(event.target.value).toISOString())
                                    }});
                                }}
                                className="col-span-4"
                            />
                        </div>
                        <div className="grid grid-cols-6 items-center gap-4">
                            <div className="col-span-2 font-medium text-md ">Meal</div>
                            <div className="col-span-4 flex flex-row">
                                <div className="grow">
                                    <Checkbox colorScheme='orange' onChange={(event: React.ChangeEvent<HTMLInputElement>) => handleSelectedMeal("BEFORE_MEAL", event)} >
                                        {t("Before Meal")}
                                    </Checkbox>
                                </div>
                                <div className="grow">
                                    <Checkbox colorScheme='orange' onChange={(event: React.ChangeEvent<HTMLInputElement>) => handleSelectedMeal("AFTER_MEAL", event)} >
                                        {t("After Meal")}
                                    </Checkbox>
                                </div>
                            </div>
                        </div>
                        <div className="grid grid-cols-6 items-start gap-4">
                            <div className="col-span-2 font-medium text-md ">Slot</div>
                            <div className="col-span-4 flex flex-col gap-2">
                                <div className="flex flex-row justify-center gap-2">
                                    <div className={`py-1 px-5 text-white text-center shadow-lg rounded-md w-full cursor-pointer hover:bg-[#f96519]/70 active:bg-[#f96519]/50 duration-300 ${selectedSlot.length !== 0 && selectedSlot !== "A1" ? "bg-[#cccc]" : "bg-[#f76418]"}`} onClick={() => setSelectedSlot("A1")}>A1</div>
                                    <div className={`py-1 px-5 text-white text-center shadow-lg rounded-md w-full cursor-pointer hover:bg-[#f96519]/70 active:bg-[#f96519]/50 duration-300 ${selectedSlot.length !== 0 && selectedSlot !== "B1" ? "bg-[#cccc]" : "bg-[#f76418]"}`} onClick={() => setSelectedSlot("B1")}>B1</div>
                                    <div className={`py-1 px-5 text-white text-center shadow-lg rounded-md w-full cursor-pointer hover:bg-[#f96519]/70 active:bg-[#f96519]/50 duration-300 ${selectedSlot.length !== 0 && selectedSlot !== "C1" ? "bg-[#cccc]" : "bg-[#f76418]"}`} onClick={() => setSelectedSlot("C1")}>C1</div>
                                    <div className={`py-1 px-5 text-white text-center shadow-lg rounded-md w-full cursor-pointer hover:bg-[#f96519]/70 active:bg-[#f96519]/50 duration-300 ${selectedSlot.length !== 0 && selectedSlot !== "D1" ? "bg-[#cccc]" : "bg-[#f76418]"}`} onClick={() => setSelectedSlot("D1")}>D1</div>
                                </div>
                                <div className="flex flex-row justify-center gap-2">
                                    <div className={`py-1 px-5 text-white text-center shadow-lg rounded-md w-full cursor-pointer hover:bg-[#f96519]/70 active:bg-[#f96519]/50 duration-300 ${selectedSlot.length !== 0 && selectedSlot !== "A2" ? "bg-[#cccc]" : "bg-[#f76418]"}`} onClick={() => setSelectedSlot("A2")}>A2</div>
                                    <div className={`py-1 px-5 text-white text-center shadow-lg rounded-md w-full cursor-pointer hover:bg-[#f96519]/70 active:bg-[#f96519]/50 duration-300 ${selectedSlot.length !== 0 && selectedSlot !== "B2" ? "bg-[#cccc]" : "bg-[#f76418]"}`} onClick={() => setSelectedSlot("B2")}>B2</div>
                                    <div className={`py-1 px-5 text-white text-center shadow-lg rounded-md w-full cursor-pointer hover:bg-[#f96519]/70 active:bg-[#f96519]/50 duration-300 ${selectedSlot.length !== 0 && selectedSlot !== "C2" ? "bg-[#cccc]" : "bg-[#f76418]"}`} onClick={() => setSelectedSlot("C2")}>C2</div>
                                    <div className={`py-1 px-5 text-white text-center shadow-lg rounded-md w-full cursor-pointer hover:bg-[#f96519]/70 active:bg-[#f96519]/50 duration-300 ${selectedSlot.length !== 0 && selectedSlot !== "D2" ? "bg-[#cccc]" : "bg-[#f76418]"}`} onClick={() => setSelectedSlot("D2")}>D2</div>
                                </div>
                                <div className="flex flex-row justify-center gap-2">
                                    <div className={`py-1 px-5 text-white text-center shadow-lg rounded-md w-full cursor-pointer hover:bg-[#f96519]/70 active:bg-[#f96519]/50 duration-300 ${selectedSlot.length !== 0 && selectedSlot !== "A3" ? "bg-[#cccc]" : "bg-[#f76418]"}`} onClick={() => setSelectedSlot("A3")}>A3</div>
                                    <div className={`py-1 px-5 text-white text-center shadow-lg rounded-md w-full cursor-pointer hover:bg-[#f96519]/70 active:bg-[#f96519]/50 duration-300 ${selectedSlot.length !== 0 && selectedSlot !== "B3" ? "bg-[#cccc]" : "bg-[#f76418]"}`} onClick={() => setSelectedSlot("B3")}>B3</div>
                                    <div className={`py-1 px-5 text-white text-center shadow-lg rounded-md w-full cursor-pointer hover:bg-[#f96519]/70 active:bg-[#f96519]/50 duration-300 ${selectedSlot.length !== 0 && selectedSlot !== "C3" ? "bg-[#cccc]" : "bg-[#f76418]"}`} onClick={() => setSelectedSlot("C3")}>C3</div>
                                    <div className={`py-1 px-5 text-white text-center shadow-lg rounded-md w-full cursor-pointer hover:bg-[#f96519]/70 active:bg-[#f96519]/50 duration-300 ${selectedSlot.length !== 0 && selectedSlot !== "D3" ? "bg-[#cccc]" : "bg-[#f76418]"}`} onClick={() => setSelectedSlot("D3")}>D3</div>
                                </div>
                                <div className="flex flex-row justify-center gap-2">
                                    <div className={`py-1 px-5 text-white text-center shadow-lg rounded-md w-full cursor-pointer hover:bg-[#f96519]/70 active:bg-[#f96519]/50 duration-300 ${selectedSlot.length !== 0 && selectedSlot !== "A4" ? "bg-[#cccc]" : "bg-[#f76418]"}`} onClick={() => setSelectedSlot("A4")}>A4</div>
                                    <div className={`py-1 px-5 text-white text-center shadow-lg rounded-md w-full cursor-pointer hover:bg-[#f96519]/70 active:bg-[#f96519]/50 duration-300 ${selectedSlot.length !== 0 && selectedSlot !== "B4" ? "bg-[#cccc]" : "bg-[#f76418]"}`} onClick={() => setSelectedSlot("B4")}>B4</div>
                                    <div className={`py-1 px-5 text-white text-center shadow-lg rounded-md w-full cursor-pointer hover:bg-[#f96519]/70 active:bg-[#f96519]/50 duration-300 ${selectedSlot.length !== 0 && selectedSlot !== "C4" ? "bg-[#cccc]" : "bg-[#f76418]"}`} onClick={() => setSelectedSlot("C4")}>C4</div>
                                    <div className={`py-1 px-5 text-white text-center shadow-lg rounded-md w-full cursor-pointer hover:bg-[#f96519]/70 active:bg-[#f96519]/50 duration-300 ${selectedSlot.length !== 0 && selectedSlot !== "D4" ? "bg-[#cccc]" : "bg-[#f76418]"}`} onClick={() => setSelectedSlot("D4")}>D4</div>
                                </div>
                                <div className="flex flex-row justify-center gap-2">
                                    <div className={`py-1 px-5 text-white text-center shadow-lg rounded-md w-full cursor-pointer hover:bg-[#f96519]/70 active:bg-[#f96519]/50 duration-300 ${selectedSlot.length !== 0 && selectedSlot !== "A5" ? "bg-[#cccc]" : "bg-[#f76418]"}`} onClick={() => setSelectedSlot("A5")}>A5</div>
                                    <div className={`py-1 px-5 text-white text-center shadow-lg rounded-md w-full cursor-pointer hover:bg-[#f96519]/70 active:bg-[#f96519]/50 duration-300 ${selectedSlot.length !== 0 && selectedSlot !== "B5" ? "bg-[#cccc]" : "bg-[#f76418]"}`} onClick={() => setSelectedSlot("B5")}>B5</div>
                                    <div className={`py-1 px-5 text-white text-center shadow-lg rounded-md w-full cursor-pointer hover:bg-[#f96519]/70 active:bg-[#f96519]/50 duration-300 ${selectedSlot.length !== 0 && selectedSlot !== "C5" ? "bg-[#cccc]" : "bg-[#f76418]"}`} onClick={() => setSelectedSlot("C5")}>C5</div>
                                    <div className={`py-1 px-5 text-white text-center shadow-lg rounded-md w-full cursor-pointer hover:bg-[#f96519]/70 active:bg-[#f96519]/50 duration-300 ${selectedSlot.length !== 0 && selectedSlot !== "D5" ? "bg-[#cccc]" : "bg-[#f76418]"}`} onClick={() => setSelectedSlot("D5")}>D5</div>
                                </div>
                                <div className="flex flex-row justify-center gap-2">
                                    <div className={`py-1 px-5 text-white text-center shadow-lg rounded-md w-full cursor-pointer hover:bg-[#f96519]/70 active:bg-[#f96519]/50 duration-300 ${selectedSlot.length !== 0 && selectedSlot !== "A6" ? "bg-[#cccc]" : "bg-[#f76418]"}`} onClick={() => setSelectedSlot("A6")}>A6</div>
                                    <div className={`py-1 px-5 text-white text-center shadow-lg rounded-md w-full cursor-pointer hover:bg-[#f96519]/70 active:bg-[#f96519]/50 duration-300 ${selectedSlot.length !== 0 && selectedSlot !== "B6" ? "bg-[#cccc]" : "bg-[#f76418]"}`} onClick={() => setSelectedSlot("B6")}>B6</div>
                                    <div className={`py-1 px-5 text-white text-center shadow-lg rounded-md w-full cursor-pointer hover:bg-[#f96519]/70 active:bg-[#f96519]/50 duration-300 ${selectedSlot.length !== 0 && selectedSlot !== "C6" ? "bg-[#cccc]" : "bg-[#f76418]"}`} onClick={() => setSelectedSlot("C6")}>C6</div>
                                    <div className={`py-1 px-5 text-white text-center shadow-lg rounded-md w-full cursor-pointer hover:bg-[#f96519]/70 active:bg-[#f96519]/50 duration-300 ${selectedSlot.length !== 0 && selectedSlot !== "D6" ? "bg-[#cccc]" : "bg-[#f76418]"}`} onClick={() => setSelectedSlot("D6")}>D6</div>
                                </div>
                                <div className="flex flex-row justify-center gap-2">
                                    <div className={`py-1 px-5 text-white text-center shadow-lg rounded-md w-full cursor-pointer hover:bg-[#f96519]/70 active:bg-[#f96519]/50 duration-300 ${selectedSlot.length !== 0 && selectedSlot !== "A7" ? "bg-[#cccc]" : "bg-[#f76418]"}`} onClick={() => setSelectedSlot("A7")}>A7</div>
                                    <div className={`py-1 px-5 text-white text-center shadow-lg rounded-md w-full cursor-pointer hover:bg-[#f96519]/70 active:bg-[#f96519]/50 duration-300 ${selectedSlot.length !== 0 && selectedSlot !== "B7" ? "bg-[#cccc]" : "bg-[#f76418]"}`} onClick={() => setSelectedSlot("B7")}>B7</div>
                                    <div className={`py-1 px-5 text-white text-center shadow-lg rounded-md w-full cursor-pointer hover:bg-[#f96519]/70 active:bg-[#f96519]/50 duration-300 ${selectedSlot.length !== 0 && selectedSlot !== "C7" ? "bg-[#cccc]" : "bg-[#f76418]"}`} onClick={() => setSelectedSlot("C7")}>C7</div>
                                    <div className={`py-1 px-5 text-white text-center shadow-lg rounded-md w-full cursor-pointer hover:bg-[#f96519]/70 active:bg-[#f96519]/50 duration-300 ${selectedSlot.length !== 0 && selectedSlot !== "D7" ? "bg-[#cccc]" : "bg-[#f76418]"}`} onClick={() => setSelectedSlot("D7")}>D7</div>
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-row justify-center mt-3">
                            <div className="px-32 py-3 bg-[#f76418] hover:bg-[#f96519]/70 active:bg-[#f96519]/50 rounded-xl shadow-xl text-white font-medium text-md cursor-pointer duration-300 hover:scale-105" onClick={() => handleSubmit()}>  
                                Submit
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default UpdateAlertInfo;