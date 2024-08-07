import React, { useEffect, useState } from "react";
import { OnResultFunction, QrReader } from "react-qr-reader";
import { useDisclosure, useEditable, useToast } from "@chakra-ui/react";
import { Link, useLocation } from "react-router-dom";
import AddNewModal from "../components/AddNewModal";
import { useTranslation } from "react-i18next";

function Scan(): React.JSX.Element {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const [qrResultData, setQrResultData] = useState<string>("");
    const { isOpen, onOpen, onClose } = useDisclosure();

    const key = queryParams.get("key");

    const { t, i18n } = useTranslation();

    useEffect(() =>{
        if(key){
            setQrResultData(key);
            onOpen();
        }
    }, [key]);

    function onResult(result: any){
        const text: string = result.text ?? "";
        setQrResultData(text);
        onOpen();
    }

    return (
      <>
        <div className="bg-[#f76418] p-4 flex items-center gap-3">
            <Link className="flex items-center duration-300 hover:scale-110" to={"/"}>
                <div className="text-white text-xl">
                    <span>
                        <i className="fa-solid fa-angle-left"></i>
                    </span>
                </div>
            </Link>
            <div className="font-semibold text-white">{t("Add")}</div>
        </div>
        <div className="grow flex flex-col h-full relative bg-black">
            <div className="absolute inset-0 z-10 grid place-items-center">
                <div className="w-1/2 aspect-square border-2 border-dashed border-red-500 rounded-xl"></div>
            </div>
            <QrReader
                videoStyle={{
                    top: "0px",
                    left: "0px",
                    width: "100%",
                    height: "100%",
                    display: "block",
                    overflow: "hidden",
                    position: "absolute",
                    objectFit: "cover",
                    objectPosition: "center center",
                }}
                videoContainerStyle={{
                    width: "100%",
                    paddingTop: "100%",
                    overflow: "hidden",
                    position: "relative",
                    display: "flex",
                    flexGrow: "1",
                    height: "100%",
                }}
                videoId="video"
                className="bg-black relative grow flex flex-col"
                scanDelay={500}
                constraints={{ facingMode: "environment" }}
                onResult={(result: any, error: any): void =>{
                    if (!!result) {
                        onResult(result);
                    }
                    if (!!error) {
                        // console.info("QrReader Error Info : ", error);
                    }
                }}
            />
            <AddNewModal isOpen={isOpen} onOpen={onOpen} onClose={onClose} id={qrResultData} />
        </div>
      </>
    );
}

export default Scan;