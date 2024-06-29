import React from "react";
import { Link } from "react-router-dom";
import profileGif from "../assets/images/profile.gif";
import config from "../config/config";
import { MembersConfig } from "../types/types";


function AboutUs(): React.JSX.Element {
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
                <div className="font-semibold text-white">About Us</div>
            </div>
            <div className="p-4">
                <div className="mb-4">
                    <div className="text-lg font-semibold">
                        Project Members
                    </div>
                </div>
                <div className="flex flex-col w-full gap-5 mb-10">
                    {config.members.map((member: MembersConfig, i: number) => (
                        <div className="grid grid-cols-3 gap-16 items-center" key={i} >
                            <span className="col-span-1 w-32 h-32 flex items-center">
                                <img className="rounded-full border-white border-solid border-2 mx-auto w-full" src={member.image} alt="Profile" />
                            </span>
                            <div className="col-span-2 flex flex-col grow">
                                <div className="text-xl">{member.firstName} {member.lastName}</div>
                                <div className="text-md">{member.roles.join(", ")}</div>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="mb-4">
                    <div className="text-lg text-center font-semibold">
                        Made with ❤️ by us
                    </div>
                </div>
            </div>
            
        </>
    );
}


export default AboutUs;