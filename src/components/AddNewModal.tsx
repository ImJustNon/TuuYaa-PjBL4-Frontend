import React, { useState } from "react";
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, Button, Input } from "@chakra-ui/react";
import axios, { AxiosResponse } from "axios";
import config from "../config/config";
import { useToast } from "@chakra-ui/react";
import { NavigateFunction, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

function AddNewModal({ isOpen, onOpen, onClose, id }: { isOpen: boolean, onOpen: () => void, onClose: () => void, id: string }): React.JSX.Element {
    const toast = useToast();
    const navigate: NavigateFunction = useNavigate();
    const [name, setName] = useState<string>("");
    const { t, i18n } = useTranslation();

    async function handleSubmit(): Promise<void> {
        if(!name || name.length === 0) return;
        axios.defaults.withCredentials = true;
        const response: AxiosResponse = await axios.post(`${config.backend.api.baseurl}/api/v1/box/register`, {
            boxKey: id,
            boxName: name
        }, {
            headers: {
                'Content-Type': 'application/json',
            }
        });
        const responseData: any = response.data;
        if(responseData.status === "OK"){
            onClose();
            toast({
                status: "success",
                description: "Add new Success",
                position: "top"
            });
            navigate("/");
        }
        else {
            onClose();
            toast({
                status: "error",
                description: responseData.message,
                position: "top"
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
                        <div className="flex flex-col w-full text-black gap-5">
                            <div className="text-black text-center font-normal text-md">
                                {t("Add Cabinet")}
                            </div>
                            <div className="flex flex-col gap-5">
                                <div className="text-black pl-2">
                                    {t("ID")} : <span className="text-[#f76418]">{id}</span>
                                </div>
                                <div className="grid grid-row-2 gap-2">
                                    <div className="pl-2">
                                        {t("Give a name")}
                                    </div>
                                    <Input 
                                        size={"md"}
                                        borderRadius={"5px"}
                                        textAlign={"center"}
                                        placeholder=". . ."
                                        borderColor={"#f76418"} 
                                        type="text"
                                        focusBorderColor={"#f76418"}
                                        required={true}
                                        _hover={{
                                            borderColor: "#f76418"
                                        }}
                                        onChange={(event: React.ChangeEvent<HTMLInputElement>) => setName(event.target.value)}
                                    />
                                </div>
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
                                    className="font-fchome"
                                    onClick={async() => await handleSubmit()}
                                >
                                    {t("Add")}
                                </Button>
                            </div>
                        </div>
                    </ModalBody>
                </ModalContent>
            </Modal>
        </>
    );
}


export default AddNewModal;