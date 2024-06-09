import React, { useEffect, useState } from "react";
import { GiftIcon } from "../utils/Icon";
import dummyProfile from "../assets/images/jarnnok.jpg";
import { Link, NavigateFunction } from "react-router-dom";
import axios, { AxiosResponse } from "axios";
import config from "../config/config";
import { useNavigate } from "react-router-dom";
import { useToast } from "@chakra-ui/react";
import { getUserToken } from "../utils/userToken";
import moment from "moment";

function Home(): React.JSX.Element {
    const navigate: NavigateFunction = useNavigate();
    const toast = useToast();

    const [userProfileUrl, setUserProfileUrl] = useState<string>("");
    const [userName, setUserName] = useState<string>("");

    const [cabinetList, setCabinetList] = useState<any[]>([]);

    const [todayAlert, setTodayAlert] = useState<any[]>([]);

    useEffect(() =>{
        (async(): Promise<void> =>{ // user info
            const userToken: string | undefined = getUserToken();
            axios.defaults.withCredentials = true;
            const response: AxiosResponse = await axios.get(`${config.backend.api.baseurl}/api/v1/user/info`, {
                headers: {
                  'Authorization': `Bearer ${userToken ?? ""}`
                }
            });
            const responseData: any = response.data;
            setUserProfileUrl(responseData?.data.user_profile_url);
            setUserName(responseData?.data.user_name);
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
            position: "top"
        });
    }


    return (
        <>
            <div className="min-h-screen flex flex-col items-center">
                <div className="w-full flex flex-col grow bg-white md:max-w-md">
                    <div className="grid gap-4 p-4 bg-gradient-to-b from-[#f76418] to-[#c74605] pb-16">
                        {/* Top menu btn */}
                        <div className="flex justify-between items-center">
                            <div className="flex flex-row bg-white rounded-full p-2 !px-4 gap-2 cursor-pointer hover:text-[#f76418] duration-300">
                                <i className="fa-solid fa-earth-asia fa-1x"></i>
                                <span className="text-sm">Languages</span> 
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
                            <p className="font-light">Welcome to</p>
                            <p className="font-light mb-3">Alerting Medicine Cabinet by Using IoT and Web Application's setting page</p>
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
                                <p className="px-4 font-semibold">Add Cabinet</p>
                            </div>
                        </Link>
                    </div>
                    {/* Menu zone */}
                    <div className="p-4">
                        <div className="mb-4">
                            <div className="text-lg font-semibold">
                                Added Cabinate {`(${cabinetList.length})`}
                            </div>
                        </div>
                        <div className="grid grid-cols-3 gap-3"> {/* ถ้า User ได้เพิ่มกล่องในระบบอยู่เเล้วให้เเสดงรายการ */}
                            {cabinetList.map((cabinet: any, i: number) => (
                                <Link to={`/b/${cabinet.box_uuid}`} key={i}>
                                    <div className="w-full aspect-square bg-neutral-200 grid place-items-center rounded-xl hover:bg-neutral-300 active:bg-neutral-400 duration-300">
                                        <div className="flex flex-col items-center w-full gap-2">
                                            <span className="text-2xl">
                                                <i className="fa-solid fa-pills"></i>
                                            </span>
                                            <div className="font-semibold">
                                                {cabinet.box_name}
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div> {/* ถ้า User ไม่เคยเพิ่มให้เเสดงข้อความ */}
                        {cabinetList.length === 0 ? ( 
                            <div className="flex flex-col gap-4 mb-4">
                                <div className="text-center py-8">
                                    <div className="text-lg">ไม่มีรายการตู้</div>
                                    <p className="text-sm">เเสกนเพื่อเพิ่มตู้เข้ารายการ</p>
                                </div>
                            </div>
                        ):(<></>)}
                    </div>
                    {/* Today alert zone */}
                    <div className="p-4">
                        <div className="mb-4">
                            <div className="text-lg font-semibold">
                                Today's Alert
                            </div>
                            <div className="text-sm">ทั้งหมด {todayAlert.length} การเเจ้งเตือน</div>
                        </div>
                        <div className="overflow-x-auto noselect"> {/* ถ้าพบรายการเเจ้งเตือนของวันนี้ */}
                            <table className="table table-sm">
                                <thead>
                                    <tr className="text-center">
                                        <th>Alert ID</th> 
                                        <th>Alert Name</th> 
                                        <th>Alert Date</th> 
                                        <th>Alert Time</th> 
                                        <th>Alert Slot</th> 
                                    </tr>
                                </thead> 
                                <tbody>
                                    {todayAlert.map((alert, i: number) =>(
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
                        </div> {/* ถ้าไม่พบรายการเเจ้งเตือนของวันนี้ */}
                        {todayAlert.length === 0 ? ( 
                            <div className="flex flex-col gap-4 mb-4">
                                <div className="text-center py-8">
                                    <div className="text-lg">ไม่มีการเเจ้งเตือนวันนี้</div>
                                    <p className="text-sm">เข้าตั้งค่าเพื่อตั้งค่าเวลาเเจ้งเตือน</p>
                                </div>
                            </div>
                        ) : (<></>)}
                    </div>
                </div>
            </div>
        </>
    );
}

export default Home;