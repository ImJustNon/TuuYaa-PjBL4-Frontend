import React, { useState } from "react";
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, Button, Input, CreateToastFnReturn } from "@chakra-ui/react";
import axios, { AxiosResponse } from "axios";
import config from "../config/config";
import { useToast } from "@chakra-ui/react";
import { NavigateFunction, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

function DeleteCabinetModal({ isOpen, onOpen, onClose, boxUUID }: { isOpen: boolean, onOpen: () => void, onClose: () => void, boxUUID: string }): React.JSX.Element {
    const toast: CreateToastFnReturn = useToast();
    const navigate: NavigateFunction = useNavigate();
    const { t, i18n } = useTranslation();

    const [typeYes, setTypeYes] = useState<string>("");

    async function handleSubmit(): Promise<void> {
        if(typeYes.length === 0) return;
        if(typeYes.toLowerCase() !== "yes") return;

        axios.defaults.withCredentials = true;
        const response: AxiosResponse = await axios.post(`${config.backend.api.baseurl}/api/v1/box/delete`, {
            boxUUID: boxUUID,
        }, {
            headers: {
                "Content-Type": "application/json"
            }
        });
        const responseData: any = response.data;
        if(responseData.status === "OK"){
            onClose();
            toast({
                status: "success",
                description: "Deleted Cabinet",
                position: "top",
                duration: 1000,
                isClosable: true
            });
            navigate("/");
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
                                        {t("Delete")}
                                    </div>
                                    <Input 
                                        size={"sm"}
                                        borderRadius={"5px"}
                                        textAlign={"center"}
                                        placeholder={"Type 'YES' to confirm delete"}
                                        borderColor={"#f93319"} 
                                        type="text"
                                        focusBorderColor={"#f93319"}
                                        required={true}
                                        _hover={{
                                            borderColor: "#f93319"
                                        }}
                                        onChange={(event: React.ChangeEvent<HTMLInputElement>) => setTypeYes(event.target.value)}
                                    />
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


export default DeleteCabinetModal;