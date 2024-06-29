import React from "react";
import { Link } from "react-router-dom";

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
        </>
    );
}


export default AboutUs;