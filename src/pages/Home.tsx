import React, { useEffect, useState } from "react";
import { GiftIcon } from "../utils/Icon";
import dummyProfile from "../assets/images/jarnnok.jpg";
import { Link, NavigateFunction } from "react-router-dom";
import axios, { AxiosResponse } from "axios";
import config from "../config/config";
import { useNavigate } from "react-router-dom";
import { CreateToastFnReturn, useToast } from "@chakra-ui/react";
import moment from "moment";
import defaultUserProfile from "../assets/images/default_profile.png";
import lang_th from "../assets/images/th.jpg";
import lang_en from "../assets/images/en.jpg";
import lang_kh from "../assets/images/kh.jpg";
import lang_jp from "../assets/images/jp.jpg";
import lang_cn from "../assets/images/cn.jpg";
import lang_lo from "../assets/images/lo.jpg";
import lang_skoy from "../assets/images/skoy.jpg";
import { PreferLanguage } from "../types/types";
import { setLanguage } from "../utils/preferLanguage";
import { useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Footer from "../components/Footer";

function Home(): React.JSX.Element {
    const navigate: NavigateFunction = useNavigate();
    const toast: CreateToastFnReturn = useToast();

    const [showLanguageSelector, setShowLanguageSelector] = useState<boolean>(false);

    const [userProfileUrl, setUserProfileUrl] = useState<string>(defaultUserProfile);
    const [userName, setUserName] = useState<string>("HI! 👋");

    const [cabinetList, setCabinetList] = useState<any[]>([]);

    const [todayAlert, setTodayAlert] = useState<any[]>([]);

    const { t, i18n } = useTranslation();

    useEffect(() =>{
        (async(): Promise<void> =>{ // user info
            axios.defaults.withCredentials = true;
            const response: AxiosResponse = await axios.get(`${config.backend.api.baseurl}/api/v1/user/info`);
            const responseData: any = response.data;
            setUserProfileUrl(responseData.data?.user_profile_url);
            setUserName(responseData.data?.user_name);
        })();
        (async(): Promise<void> =>{ // box list
            axios.defaults.withCredentials = true;
            const response: AxiosResponse = await axios.post(`${config.backend.api.baseurl}/api/v1/box/list`);
            const responseData: any = response.data;
            setCabinetList(responseData?.data);
        })();
        (async(): Promise<void> =>{ // today alert
            const todayAlertTotal: any[] = [];
            const listResponse: AxiosResponse = await axios.post(`${config.backend.api.baseurl}/api/v1/box/list`);
            const listResponseData: any = listResponse.data;
            for(const list of listResponseData?.data ?? []){
                axios.defaults.withCredentials = true;
                const response: AxiosResponse = await axios.post(`${config.backend.api.baseurl}/api/v1/box/todayalert`, {
                    boxUUID: list.box_uuid,
                    date: {
                        day: String(new Date().getDate()).length === 1 ? `0${String(new Date().getDate())}` : String(new Date().getDate()),
                        month: String(new Date().getMonth()).length === 1 ? `0${String(new Date().getMonth() + 1)}` : String(new Date().getMonth() + 1),
                        year: String(new Date().getFullYear()),
                    }
                }, {
                    headers: {
                      'Content-Type': 'application/json'
                    }
                });
                const responseData: any = response.data;
                todayAlertTotal.push(responseData?.data);
            }
            setTodayAlert([].concat(...todayAlertTotal));
        })();
    }, []);

    async function signout(){
        axios.defaults.withCredentials = true;
        await axios.post(`${config.backend.api.baseurl}/api/v1/user/auth/google/signout`);
        navigate("/signin");
        toast({
            status: "success",
            description: "Signed out",
            position: "top",
            isClosable: true,
            duration: 1000
        });
    }

    function switchLanguage(lang: PreferLanguage): void{
        if(lang === "th"){
            setLanguage("th");
            i18n.changeLanguage("th");
        }
        else if(lang === "kh"){
            setLanguage("kh");
            i18n.changeLanguage("kh");
        }
        else if(lang === "skoy"){
            setLanguage("skoy");
            i18n.changeLanguage("skoy");
        }
        else { // en
            setLanguage("en");
            i18n.changeLanguage("en");
        }
    }

    
    return (
        <>
            <div className="grid gap-4 p-4 bg-gradient-to-b from-[#f76418] to-[#c74605] pb-16">
                {/* Top menu btn */}
                <div className="flex justify-between items-center">
                    <div className="relative">
                        <div className="flex flex-row items-center bg-white rounded-full p-2 !px-4 gap-2 cursor-pointer hover:text-[#f76418] duration-300" onClick={() => setShowLanguageSelector(prev => !prev)}>
                            <i className="fa-solid fa-earth-asia fa-1x"></i>
                            <span className="text-sm">{t("Languages")}</span> 
                        </div>
                        <div className="absolute flex flex-col items-center bg-white rounded-2xl left-0 top-[45px] p-3 !px-3 gap-3 w-44 cursor-pointer animate__animated animate__fadeIn animate__faster" hidden={!showLanguageSelector}>
                            <div className="flex flex-row gap-2 items-center self-start w-full hover:text-[#f76418] duration-300" onClick={() => switchLanguage("th")}>
                                <img className="w-5 h-5 rounded-full" src={lang_th} alt="th-lang" />
                                <span className="text-sm font-medium">ภาษาไทย (TH)</span> 
                            </div>
                            <div className="flex flex-row gap-2 items-center self-start w-full hover:text-[#f76418] duration-300" onClick={() => switchLanguage("en")}>
                                <img className="w-5 h-5 rounded-full" src={lang_en} alt="en-lang" />
                                <span className="text-sm font-medium">English (US-EN)</span> 
                            </div>
                            <div className="flex flex-row gap-2 items-center self-start w-full hover:text-[#f76418] duration-300" onClick={() => switchLanguage("kh")}>
                                <img className="w-5 h-5 rounded-full" src={lang_kh} alt="kh-lang" />
                                <span className="text-sm font-medium">ខ្មែរ (KH)</span> 
                            </div>
                            <div className="flex flex-row gap-2 items-center self-start w-full hover:text-[#f76418] duration-300" onClick={() => switchLanguage("skoy")}>
                                <img className="w-5 h-5 rounded-full" src={lang_skoy} alt="skoy-lang" />
                                <span className="text-sm font-medium">ภ๊ษ๊สก๊อษ์ย (SKOY)</span> 
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-row bg-white rounded-full p-2 gap-2 cursor-pointer hover:text-[#f76418] duration-300" onClick={() => signout()}>
                        <i className="fa-solid fa-right-from-bracket fa-1x"></i>
                    </div>
                </div>
                {/* Profile zone */}
                <div className="flex justify-center">
                    <span className="w-[124px] h-[124px] font-[18px]">
                        <img className="rounded-full border-white border-solid border-2 mx-auto w-full" src={userProfileUrl} alt="Profile" />
                    </span>
                </div>
                <div className="text-center text-white">
                    <p className="font-light">{t("Welcome to")}</p>
                    <p className="font-light mb-3">{t("Alerting Medicine Cabinet by Using IoT and Web Application's setting page")}</p>
                    <p className="text-lg font-normal">
                        {userName}
                    </p>
                    {/* <p className="mt-3 font-light">
                        <span className="bg-white text-black !px-4 p-1 rounded-full">
                            0 คะเเนน
                        </span>
                    </p> */}
                </div>
            </div>
            {/* Scan btn zone */}
            <div className="flex justify-center -mt-7 mb-4">
                <Link to="/scan">
                    <div className="flex items-center bg-[#add33f] p-1 rounded-full hover:bg-[#90b035] active:bg-[#809c2f] duration-300">
                        <div className="bg-white h-12 w-12 rounded-full grid place-items-center">
                            <span>
                                <i className="fa-solid fa-qrcode fa-xl"></i>
                            </span>
                        </div>
                        <p className="px-4 font-semibold">{t("Add Cabinet")}</p>
                    </div>
                </Link>
            </div>
            {/* Menu zone */}
            <div className="p-4">
                <div className="mb-4">
                    <div className="text-lg font-semibold">
                        {t("Added Cabinate")} {`(${cabinetList?.length})`}
                    </div>
                </div>
                <div className="grid grid-cols-3 gap-3"> {/* ถ้า User ได้เพิ่มกล่องในระบบอยู่เเล้วให้เเสดงรายการ */}
                    {cabinetList?.map((cabinet: any, i: number) => (
                        <Link to={`/manage/b/${cabinet.box_uuid}`} key={i}>
                            <div className="w-full aspect-square bg-neutral-200 grid place-items-center rounded-xl hover:bg-neutral-300 active:bg-neutral-400 duration-300">
                                <div className="flex flex-col items-center w-full gap-2">
                                    <span className="text-2xl">
                                        <i className="fa-solid fa-pills"></i>
                                    </span>
                                    <div className="font-medium text-center">
                                        {cabinet.box_name}
                                    </div>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div> {/* ถ้า User ไม่เคยเพิ่มให้เเสดงข้อความ */}
                {cabinetList?.length === 0 ? ( 
                    <div className="flex flex-col gap-4 mb-4">
                        <div className="text-center py-8">
                            <div className="text-lg">{t("There are no cabinet items")}</div>
                            <p className="text-sm">{t("Scan to add cabinets to the list")}</p>
                        </div>
                    </div>
                ):(<></>)}
            </div>
            {/* Today alert zone */}
            <div className="p-4">
                <div className="mb-4">
                    <div className="text-lg font-semibold">
                        {t("Today's Alert")}
                    </div>
                    <div className="text-sm">{t("Total")} {todayAlert?.length} {t("Alerting")}</div>
                </div>
                {/* ถ้าไม่พบรายการเเจ้งเตือนของวันนี้ */}
                {todayAlert?.length > 0 ? ( 
                    <div className="overflow-x-auto noselect"> {/* ถ้าพบรายการเเจ้งเตือนของวันนี้ */}
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
                                {todayAlert?.map((alert, i: number) =>(
                                    <tr className="text-center" key={i}>
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
                            <div className="text-lg">{t("No alert today")}</div>
                            <p className="text-sm">{t("Go into settings to set the alert time")}</p>
                        </div>
                    </div>
                )}
            </div>
            
            <Footer />
        </>
    );
}

export default Home;