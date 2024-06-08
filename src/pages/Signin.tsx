import React from "react";
import sbtvc from "../assets/images/sbtvcwithname.jpg";
import googleIconSVG from "../assets/images/google-icon.svg";

function SignIn(): React.JSX.Element {
    return (
        <>
            <div className="min-h-screen flex flex-col items-center">
                <div className="w-full flex flex-col grow bg-white md:max-w-md">
                    <div className="flex flex-col grow">
                        <div className="flex flex-col grow items-center justify-center gap-5">
                            <img className="max-w-[60%]" src={sbtvc} alt="sbtvc" />
                            <div className="text-center font-normal text-xl text-[#f9682f] px-16">
                                Alerting Medicine Box by Using IoT and Web Application
                            </div>
                        </div>
                        <div className="bg-gradient-to-b from-[#f76418] to-[#c74605] p-8 py-12 rounded-t-3xl">
                            <div className="text-center text-white font-semibold mb-6">Sign-in Options</div>
                            <a href="#">
                                <div className="flex flex-row justify-center items-center gap-2 bg-white text-black py-4 rounded-xl hover:bg-gray-300 active:bg-gray-400 duration-300">
                                    <span>
                                        <img className="h-7" src={googleIconSVG} alt="google_signin" />
                                    </span>
                                    <span>
                                        Continue with Google
                                    </span>
                                </div>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}


export default SignIn;