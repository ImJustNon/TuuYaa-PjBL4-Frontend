import React from "react";
import { Link } from "react-router-dom";


function Footer(): React.JSX.Element {
    return (
        <>
            <div className="flex flex-row items-end grow pb-2">
                <div className="mx-auto flex flex-col items-center gap-1">
                    <Link to={"/aboutus"} className="text-sm font-semibold cursor-pointer px-5 py-3">
                        About Us
                    </Link>
                </div>
            </div>
        </>
    );
}


export default Footer;