import React, { useState } from "react";
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, Button, Input } from "@chakra-ui/react";
import axios, { AxiosResponse } from "axios";
import config from "../config/config";
import { useToast } from "@chakra-ui/react";
import { NavigateFunction, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

function UpdateLineNotifyModal({ isOpen, onOpen, onClose, boxUUID, refetch }: { isOpen: boolean, onOpen: () => void, onClose: () => void, boxUUID: string, refetch: (v: number) => void }): React.JSX.Element {
    const toast = useToast();
    const navigate: NavigateFunction = useNavigate();
    const { t, i18n } = useTranslation();

    const [ lineNotifyToken, setLineNotifyToken ] = useState<string>("");

    async function handleSubmit(){
        if(lineNotifyToken.length === 0) return;

        try {
            axios.defaults.withCredentials = true;
            const response: AxiosResponse = await axios.post(`${config.backend.api.baseurl}/api/v1/box/updatelinenotify`, {
                lineToken: lineNotifyToken,
                boxUUID: boxUUID
            }, {
                headers: {
                    "Content-Type": "application/json"
                }
            });
            const responseData: any = response.data;
            if(responseData.status === "FAIL"){
                console.log(responseData);
                onClose();
                toast({
                    status: "error",
                    description: responseData.message,
                    position: "top",
                    duration: 1000,
                    isClosable: true
                });
                return;
            }
            if(responseData.status === "OK"){
                onClose();
                toast({
                    status: "success",
                    description: "Update Success",
                    position: "top",
                    duration: 1000,
                    isClosable: true
                });
                refetch(Math.random());
                return;
            }
        }
        catch(e){
            onClose();
            toast({
                status: "error",
                description: "Internal Server Error",
                position: "top",
                duration: 1000,
                isClosable: true
            });
            return;
        }
    }

    async function handleDeactivated(){
        try {
            axios.defaults.withCredentials = true;
            const response: AxiosResponse = await axios.post(`${config.backend.api.baseurl}/api/v1/box/deactivatelinenotify`, {
                boxUUID: boxUUID
            }, {
                headers: {
                    "Content-Type": "application/json"
                }
            });
            const responseData: any = response.data;
            if(responseData.status === "FAIL"){
                console.log(responseData);
                onClose();
                toast({
                    status: "error",
                    description: responseData.message,
                    position: "top",
                    duration: 1000,
                    isClosable: true
                });
                return;
            }
            if(responseData.status === "OK"){
                onClose();
                toast({
                    status: "success",
                    description: "Update Success",
                    position: "top",
                    duration: 1000,
                    isClosable: true
                });
                refetch(Math.random());
                return;
            }
        }
        catch(e){
            onClose();
            toast({
                status: "error",
                description: "Internal Server Error",
                position: "top",
                duration: 1000,
                isClosable: true
            });
            return;
        }
    }
    
    return (
        <>
            <Modal 
                isOpen={isOpen} 
                onClose={onClose}
                isCentered={true}
                size={"xs"}
                motionPreset={"slideInBottom"}
                closeOnOverlayClick={false}
            >
                <ModalOverlay />
                <ModalContent bgColor={"white"} borderRadius={"8px"}>
                    <ModalCloseButton 
                        color={"rgb(199, 204, 216)"} 
                        _hover={{
                            color: "#f76418"
                        }} 
                    />
                    <ModalBody paddingY={"1.5rem"} paddingX={"1.5rem"}>
                        <div className="flex flex-col w-full text-black gap-2">
                            <div className="flex flex-col gap-5">
                                <div className="grid grid-row-2 gap-2">
                                    <div className="mx-auto">
                                        {t("Update LINE Notify")}
                                    </div>
                                    <Input 
                                        size={"sm"}
                                        borderRadius={"5px"}
                                        textAlign={"center"}
                                        placeholder={"LINE Notify Token"}
                                        borderColor={"#f76418"} 
                                        type="text"
                                        focusBorderColor={"#f76418"}
                                        required={true}
                                        _hover={{
                                            borderColor: "#f76418"
                                        }}
                                        onChange={(event: React.ChangeEvent<HTMLInputElement>) => setLineNotifyToken(event.target.value)}
                                    />
                                </div>
                                <div className="flex flex-row gap-2">
                                    <Button 
                                        borderRadius={"5px"}
                                        color={"white"} 
                                        bgColor={"#f96519"}
                                        _hover={{
                                            bgColor: "#fc8447"
                                        }}
                                        fontSize={"20px"}
                                        fontWeight={200}
                                        size='sm'
                                        className="font-fchome grow"
                                        onClick={async() => await handleSubmit()}
                                    >
                                        {t("Update")}
                                    </Button>
                                    <Button 
                                        borderRadius={"5px"}
                                        color={"white"} 
                                        bgColor={"#f93319"}
                                        _hover={{
                                            bgColor: "#fc6153"
                                        }}
                                        fontSize={"20px"}
                                        fontWeight={200}
                                        size='sm'
                                        className="font-fchome"
                                        onClick={async() => await handleDeactivated()}
                                    >
                                        <i className="fa fa-trash fa-xs"></i>
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </ModalBody>
                </ModalContent>
            </Modal>
        </>
    );
}


export default UpdateLineNotifyModal;