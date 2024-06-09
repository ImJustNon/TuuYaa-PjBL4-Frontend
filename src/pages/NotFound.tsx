import React from "react";
import { Link } from "react-router-dom";
import notfound404 from "../assets/images/404.png";

function NotFound(): React.JSX.Element {
    return (
        <>
            <div className="min-h-screen flex flex-col items-center">
                <div className="w-full flex flex-col grow bg-white md:max-w-md">
                    <div className="bg-[#f76418] p-4 flex items-center gap-3">
                        <Link className="flex items-center" to={"/"}>
                            <div className="text-white text-xl">
                                <span>
                                    <i className="fa-solid fa-angle-left"></i>
                                </span>
                            </div>
                        </Link>
                        <div className="font-semibold text-white">Not Found</div>
                    </div>
                    <div className="flex flex-col justify-center items-center grow gap-5">
                        <div className="max-w-96">
                            <img src={notfound404} alt="404" />
                        </div>
                        <div className="text-3xl font-medium">Whoops, not found!</div>
                    </div>
                </div>  
            </div>
        </>
    );
}

export default NotFound;