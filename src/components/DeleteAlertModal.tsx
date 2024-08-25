import React, { useState } from "react";
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, Button, Input } from "@chakra-ui/react";
import axios, { AxiosResponse } from "axios";
import config from "../config/config";
import { useToast } from "@chakra-ui/react";
import { NavigateFunction, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

function DeleteAlertModal({ isOpen, onOpen, onClose, boxUUID, alertUUID }: { isOpen: boolean, onOpen: () => void, onClose: () => void, boxUUID: string, alertUUID: string }): React.JSX.Element {
    const toast = useToast();
    const navigate: NavigateFunction = useNavigate();
    const { t, i18n } = useTranslation();

    async function handleSubmit(): Promise<void>{
        try {
            axios.defaults.withCredentials = true;
            const response: AxiosResponse = await axios.post(`${config.backend.api.baseurl}/api/v1/alert/remove`, {
                alertUUID: alertUUID,
                boxUUID: boxUUID
            }, {
                headers: {
                    "Content-Type": "application/json"
                }
            });

            const responseData: any = response.data;
            if(responseData.status === "FAIL"){
                console.log(responseData.message);
                toast({
                    status: "error",
                    description: "Internal Server Error",
                    position: "top",
                    isClosable: true,
                    duration: 1000
                });
                return;
            }
            if(responseData.status === "OK"){
                navigate(`/manage/b/${boxUUID}`);
                toast({
                    status: "success",
                    description: "Remove Success",
                    position: "top",
                    isClosable: true,
                    duration: 1000
                });
            }
        }
        catch(e){
            onClose();
            toast({
                status: "error",
                description: "Internal Server Error",
                position: "top",
                isClosable: true,
                duration: 1000
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
                motionPreset={'slideInBottom'}
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
                                        {t("Confirm Delete")}
                                    </div>
                                </div>
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
                                    onClick={async() => await handleSubmit()}
                                >
                                    {t("Delete")}
                                </Button>
                            </div>
                        </div>
                    </ModalBody>
                </ModalContent>
            </Modal>
        </>
    );
}


export default DeleteAlertModal;