import React from "react";
import { GiftIcon } from "../utils/Icon";
import dummyProfile from "../assets/images/jarnnok.jpg";
import { Link } from "react-router-dom";

function Home(): React.JSX.Element {
    return (
        <>
            <div className="min-h-screen flex flex-col items-center">
                <div className="w-full flex flex-col grow bg-white md:max-w-md">
                    <div className="grid gap-4 p-4 bg-gradient-to-b from-[#f76418] to-[#c74605] pb-16">
                        {/* Top menu btn */}
                        <div className="flex justify-between items-center">
                            <div className="flex flex-row bg-white rounded-full p-2 !px-4 gap-2 cursor-pointer hover:text-[#f76418] duration-300">
                                <i className="fa-solid fa-info fa-1x"></i>
                                <span className="text-sm">Informations</span> 
                            </div>
                            <Link to={"/signin"} className="flex flex-row bg-white rounded-full p-2 gap-2 cursor-pointer hover:text-[#f76418] duration-300">
                                <i className="fa-solid fa-right-from-bracket fa-1x"></i>
                            </Link>
                        </div>
                        {/* Profile zone */}
                        <div className="flex justify-center">
                            <span style={{width: "124px", height: "124px", fontSize: "18px"}}>
                                <img className="rounded-full border-white border-solid border-2" src={dummyProfile} alt="Profile" />
                            </span>
                        </div>
                        <div className="text-center text-white">
                            <p className="font-light">Welcome to</p>
                            <p className="font-light mb-3">Alerting Medicine Box by Using IoT and Web Application's setting page</p>
                            <p className="text-lg font-normal">
                                [USERNAME here]
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
                                        <i className="fa-solid fa-plus"></i>
                                    </span>
                                </div>
                                <p className="px-4">Add Cabinet</p>
                            </div>
                        </Link>
                    </div>
                    {/* Menu zone */}
                    <div className="p-4">
                        <div className="mb-4">
                            <div className="text-lg font-semibold">
                                Added Cabinate
                            </div>
                        </div>
                        <div className="grid grid-cols-3">
                            <Link to={"#"}>
                                <div className="w-full aspect-square bg-neutral-200 grid place-items-center rounded-xl hover:bg-neutral-300 active:bg-neutral-400 duration-300">
                                    <div className="flex flex-col items-center w-full gap-2">
                                        <span className="text-2xl">
                                            <i className="fa-solid fa-pills"></i>
                                        </span>
                                        <div className="font-semibold">
                                            [NAME]
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        </div>
                    </div>
                    {/* Today alert zone */}
                    <div className="p-4">
                        <div className="mb-4">
                            <div className="text-lg font-semibold">
                                Today's Alert
                            </div>
                            <div className="text-sm">0 ไปเเล้วจากทั้งหมด 0 การเเจ้งเตือน</div>
                        </div>
                        <div className="grid gap-4 mb-4">
                            <div className="text-center py-8">
                                <div className="text-lg">ไม่มีการเเจ้งเตือนวันนี้</div>
                                <p className="text-sm">เข้าตั้งค่าเพื่อตั้งค่าเวลาเเจ้งเตือน</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Home;