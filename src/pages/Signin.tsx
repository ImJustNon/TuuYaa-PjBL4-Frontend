import React from "react";
import sbtvc from "../assets/images/sbtvcwithname.jpg";
import googleIconSVG from "../assets/images/google-icon.svg";
import axios, { AxiosResponse } from "axios";
import { TokenResponse, useGoogleLogin } from "@react-oauth/google";
import { useToast } from "@chakra-ui/react";
import config from "../config/config";
import { NavigateFunction, useNavigate } from "react-router-dom";

function SignIn(): React.JSX.Element {
    const toast = useToast();
    const navigate: NavigateFunction = useNavigate();

    const googleLogin = useGoogleLogin({
        onSuccess: googleLoginOnSuccess,
        onError: googleLoginOnError
    });
    function googleLoginOnError(errorResponse: Pick<TokenResponse, "error" | "error_description" | "error_uri">): void {
        toast({
            status: "error",
            description: "Signin Error",
            position: "top",
        });
        console.info(errorResponse);
    }
    async function googleLoginOnSuccess(successResponse: Omit<TokenResponse, "error" | "error_description" | "error_uri">): Promise<void> {
        try {
            axios.defaults.withCredentials = true;
            const response: AxiosResponse = await axios.post(`${config.backend.api.baseurl}/api/v1/user/auth/google/auth/callback`, {
                accessToken: successResponse.access_token,
            }, {
                headers: {
                  'Content-Type': 'application/json'
                }
            });
            console.info(response.data?.message);
            if(response.data?.status === "OK"){
                toast({
                    status: "success",
                    description: "Signin Success",
                    position: "top",
                });
                navigate("/");
            }
            else {
                toast({
                    status: "error",
                    description: "Signin Error",
                    position: "top",
                });
                console.info(response.data);
            }
        }
        catch(e){
            toast({
                status: "error",
                description: "Signin Error",
                position: "top",
            });
            console.info(e);
        }
    }


    return (
        <>
            <div className="flex flex-col grow">
                <div className="flex flex-col grow items-center justify-center gap-5">
                    <img className="max-w-[60%] animate__animated animate__fadeIn animate__slow" src={sbtvc} alt="sbtvc" />
                    <div className="text-center font-normal text-2xl text-[#f9682f] px-16 font-fchome animate__animated animate__fadeIn animate__slower">
                        Alerting Medicine Cabinet by Using IoT and Web Application
                    </div>
                </div>
                <div className="bg-gradient-to-b from-[#f76418] to-[#c74605] p-8 py-10 rounded-t-3xl">
                    <div className="text-center text-white text-lg font-semibold mb-6">Sign-in Options</div>
                    <div onClick={() => googleLogin()}> {/*Google Login Button*/}
                        <div className="flex flex-row justify-center items-center gap-2 bg-white text-black py-4 rounded-xl hover:bg-[#e6e6e6] active:bg-[#cfcfcf] hover:text-[#f76418] duration-300 cursor-pointer">
                            <span>
                                <img className="h-7" src={googleIconSVG} alt="google_signin" />
                            </span>
                            <span>
                                Continue with Google
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}


export default SignIn;