import React, { useEffect, useState } from "react";
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, Button, Input, Checkbox } from "@chakra-ui/react";
import axios, { AxiosResponse } from "axios";
import config from "../config/config";
import { useToast } from "@chakra-ui/react";
import { NavigateFunction, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

interface AlertTimeOption {
    day: number;
    month: number;
    year: number;
    hour: number;
    minute: number;
    ampm: string;
}   
type MealOption = "AFTER_MEAL" | "BEFORE_MEAL";

function AddAlertTimeModal({ isOpen, onOpen, onClose, boxUUID, refetch }: { isOpen: boolean; onOpen: () => void; onClose: () => void; boxUUID: string, refetch: (v: number) => void }): React.JSX.Element {
    const toast = useToast();
    const navigate: NavigateFunction = useNavigate();
    const { t, i18n } = useTranslation();

    const [selectedSlot, setSelectedSlot] = useState<string>("");
    const [selectedAlertTime, setSelectedAlertTime] = useState<AlertTimeOption>({
        day: 0,
        month: 0,
        year: 0,
        hour: 0,
        minute: 0,
        ampm: "AM"
    });
    const [alertName, setAlertName] = useState<string>("");
    const [selectedMeal, setSelectedMeal] = useState<MealOption[]>([]);

    function handleSelectedMeal(optionName: string, event: React.ChangeEvent<HTMLInputElement>){
        const name: string = optionName;
        const isChecked: boolean = event.target.checked;

        if(isChecked){
            setSelectedMeal((prev: MealOption[]) =>{
                return [...new Set([...prev, name])] as MealOption[];
            });
        }
        else {
            setSelectedMeal((prev: MealOption[]) =>{
                return prev.filter(p => p !== name);
            });
        }
    }
    function handleSelectAlertTime(value: string): void {
        const date: Date = new Date(value);
        const result: AlertTimeOption = {
            day: date.getDate(),
            month: date.getMonth() + 1, 
            year: date.getFullYear(),
            hour: date.getHours() % 12 || 12, 
            minute: date.getMinutes(),
            ampm: date.getHours() >= 12 ? "PM" : "AM"
        }
        setSelectedAlertTime(result);
    }
    async function handleSubmit(): Promise<void> {
        if(alertName.length === 0) return;
        if(selectedAlertTime.day === 0 || selectedAlertTime.month === 0 || selectedAlertTime.year === 0 || selectedAlertTime.hour === 0 || selectedAlertTime.minute === 0 || selectedAlertTime.ampm.length === 0) return;
        if(selectedMeal.length === 0) return;
        if(selectedSlot.length === 0) return;

        axios.defaults.withCredentials = true;
        const response: AxiosResponse = await axios.post(`${config.backend.api.baseurl}/api/v1/alert/create`, {
            alertTime: {
                day: selectedAlertTime.day,
                month: selectedAlertTime.month,
                year: selectedAlertTime.year,
                hour: selectedAlertTime.hour,
                minute: selectedAlertTime.minute,
                ampm: selectedAlertTime.ampm
            },
            boxUUID: boxUUID,
            alertSlot: [selectedSlot],
            alertName: alertName,
            meal: selectedMeal
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
                description: "Add Success",
                position: "top",
                duration: 1000,
                isClosable: true
            });
            refetch(Math.random());
        }
    }

    
    return (
        <>
            <Modal 
                // isOpen={isOpen} 
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
                                {t("Add Alert Time")}
                            </div>
                            <div className="flex flex-col gap-5">
                                <div className="grid grid-row-2 gap-4">
                                    <div className="pl-2">
                                        {t("Give a name")}
                                    </div>
                                    <Input 
                                        size={"md"}
                                        borderRadius={"5px"}
                                        textAlign={"start"}
                                        placeholder=". . ."
                                        borderColor={"#f76418"} 
                                        type="text"
                                        focusBorderColor={"#f76418"}
                                        required={true}
                                        _hover={{
                                            borderColor: "#f76418"
                                        }}
                                        onChange={(event: React.ChangeEvent<HTMLInputElement>) => setAlertName(event.target.value)}
                                    />
                                    <div className="pl-2">
                                        {t("Set The Time")}
                                    </div>
                                    <Input 
                                        size={"md"}
                                        borderRadius={"5px"}
                                        textAlign={"center"}
                                        placeholder=". . ."
                                        borderColor={"#f76418"} 
                                        type="datetime-local"
                                        focusBorderColor={"#f76418"}
                                        required={true}
                                        _hover={{
                                            borderColor: "#f76418"
                                        }}
                                        onChange={(event: React.ChangeEvent<HTMLInputElement>) => handleSelectAlertTime(event.target.value)}
                                    />
                                    <div className="flex flex-row justify-center">
                                        <div className="grow">
                                            <Checkbox colorScheme='orange' onChange={(event: React.ChangeEvent<HTMLInputElement>) => handleSelectedMeal("BEFORE_MEAL", event)} >
                                                {t("Before meal")}
                                            </Checkbox>
                                        </div>
                                        <div className="grow">
                                            <Checkbox colorScheme='orange' onChange={(event: React.ChangeEvent<HTMLInputElement>) => handleSelectedMeal("AFTER_MEAL", event)} >
                                                {t("After meal")}
                                            </Checkbox>
                                        </div>
                                    </div>
                                    <div className="pl-2">
                                        {t("Please Select Slot")}
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <div className="flex flex-row justify-center gap-2">
                                            <div className={`py-1 px-5 text-white text-center shadow-lg rounded-md w-full cursor-pointer hover:bg-[#f96519]/70 active:bg-[#f96519]/50 duration-300 ${selectedSlot.length !== 0 && selectedSlot !== "A1" ? "bg-[#cccc]" : "bg-[#f76418]"}`} onClick={() => setSelectedSlot("A1")}>A1</div>
                                            <div className={`py-1 px-5 text-white text-center shadow-lg rounded-md w-full cursor-pointer hover:bg-[#f96519]/70 active:bg-[#f96519]/50 duration-300 ${selectedSlot.length !== 0 && selectedSlot !== "B1" ? "bg-[#cccc]" : "bg-[#f76418]"}`} onClick={() => setSelectedSlot("B1")}>B1</div>
                                            <div className={`py-1 px-5 text-white text-center shadow-lg rounded-md w-full cursor-pointer hover:bg-[#f96519]/70 active:bg-[#f96519]/50 duration-300 ${selectedSlot.length !== 0 && selectedSlot !== "C1" ? "bg-[#cccc]" : "bg-[#f76418]"}`} onClick={() => setSelectedSlot("C1")}>C1</div>
                                            <div className={`py-1 px-5 text-white text-center shadow-lg rounded-md w-full cursor-pointer hover:bg-[#f96519]/70 active:bg-[#f96519]/50 duration-300 ${selectedSlot.length !== 0 && selectedSlot !== "D1" ? "bg-[#cccc]" : "bg-[#f76418]"}`} onClick={() => setSelectedSlot("D1")}>D1</div>
                                        </div>
                                        <div className="flex flex-row justify-center gap-2">
                                            <div className={`py-1 px-5 text-white text-center shadow-lg rounded-md w-full cursor-pointer hover:bg-[#f96519]/70 active:bg-[#f96519]/50 duration-300 ${selectedSlot.length !== 0 && selectedSlot !== "A2" ? "bg-[#cccc]" : "bg-[#f76418]"}`} onClick={() => setSelectedSlot("A2")}>A2</div>
                                            <div className={`py-1 px-5 text-white text-center shadow-lg rounded-md w-full cursor-pointer hover:bg-[#f96519]/70 active:bg-[#f96519]/50 duration-300 ${selectedSlot.length !== 0 && selectedSlot !== "B2" ? "bg-[#cccc]" : "bg-[#f76418]"}`} onClick={() => setSelectedSlot("B2")}>B2</div>
                                            <div className={`py-1 px-5 text-white text-center shadow-lg rounded-md w-full cursor-pointer hover:bg-[#f96519]/70 active:bg-[#f96519]/50 duration-300 ${selectedSlot.length !== 0 && selectedSlot !== "C2" ? "bg-[#cccc]" : "bg-[#f76418]"}`} onClick={() => setSelectedSlot("C2")}>C2</div>
                                            <div className={`py-1 px-5 text-white text-center shadow-lg rounded-md w-full cursor-pointer hover:bg-[#f96519]/70 active:bg-[#f96519]/50 duration-300 ${selectedSlot.length !== 0 && selectedSlot !== "D2" ? "bg-[#cccc]" : "bg-[#f76418]"}`} onClick={() => setSelectedSlot("D2")}>D2</div>
                                        </div>
                                        <div className="flex flex-row justify-center gap-2">
                                            <div className={`py-1 px-5 text-white text-center shadow-lg rounded-md w-full cursor-pointer hover:bg-[#f96519]/70 active:bg-[#f96519]/50 duration-300 ${selectedSlot.length !== 0 && selectedSlot !== "A3" ? "bg-[#cccc]" : "bg-[#f76418]"}`} onClick={() => setSelectedSlot("A3")}>A3</div>
                                            <div className={`py-1 px-5 text-white text-center shadow-lg rounded-md w-full cursor-pointer hover:bg-[#f96519]/70 active:bg-[#f96519]/50 duration-300 ${selectedSlot.length !== 0 && selectedSlot !== "B3" ? "bg-[#cccc]" : "bg-[#f76418]"}`} onClick={() => setSelectedSlot("B3")}>B3</div>
                                            <div className={`py-1 px-5 text-white text-center shadow-lg rounded-md w-full cursor-pointer hover:bg-[#f96519]/70 active:bg-[#f96519]/50 duration-300 ${selectedSlot.length !== 0 && selectedSlot !== "C3" ? "bg-[#cccc]" : "bg-[#f76418]"}`} onClick={() => setSelectedSlot("C3")}>C3</div>
                                            <div className={`py-1 px-5 text-white text-center shadow-lg rounded-md w-full cursor-pointer hover:bg-[#f96519]/70 active:bg-[#f96519]/50 duration-300 ${selectedSlot.length !== 0 && selectedSlot !== "D3" ? "bg-[#cccc]" : "bg-[#f76418]"}`} onClick={() => setSelectedSlot("D3")}>D3</div>
                                        </div>
                                        <div className="flex flex-row justify-center gap-2">
                                            <div className={`py-1 px-5 text-white text-center shadow-lg rounded-md w-full cursor-pointer hover:bg-[#f96519]/70 active:bg-[#f96519]/50 duration-300 ${selectedSlot.length !== 0 && selectedSlot !== "A4" ? "bg-[#cccc]" : "bg-[#f76418]"}`} onClick={() => setSelectedSlot("A4")}>A4</div>
                                            <div className={`py-1 px-5 text-white text-center shadow-lg rounded-md w-full cursor-pointer hover:bg-[#f96519]/70 active:bg-[#f96519]/50 duration-300 ${selectedSlot.length !== 0 && selectedSlot !== "B4" ? "bg-[#cccc]" : "bg-[#f76418]"}`} onClick={() => setSelectedSlot("B4")}>B4</div>
                                            <div className={`py-1 px-5 text-white text-center shadow-lg rounded-md w-full cursor-pointer hover:bg-[#f96519]/70 active:bg-[#f96519]/50 duration-300 ${selectedSlot.length !== 0 && selectedSlot !== "C4" ? "bg-[#cccc]" : "bg-[#f76418]"}`} onClick={() => setSelectedSlot("C4")}>C4</div>
                                            <div className={`py-1 px-5 text-white text-center shadow-lg rounded-md w-full cursor-pointer hover:bg-[#f96519]/70 active:bg-[#f96519]/50 duration-300 ${selectedSlot.length !== 0 && selectedSlot !== "D4" ? "bg-[#cccc]" : "bg-[#f76418]"}`} onClick={() => setSelectedSlot("D4")}>D4</div>
                                        </div>
                                        <div className="flex flex-row justify-center gap-2">
                                            <div className={`py-1 px-5 text-white text-center shadow-lg rounded-md w-full cursor-pointer hover:bg-[#f96519]/70 active:bg-[#f96519]/50 duration-300 ${selectedSlot.length !== 0 && selectedSlot !== "A5" ? "bg-[#cccc]" : "bg-[#f76418]"}`} onClick={() => setSelectedSlot("A5")}>A5</div>
                                            <div className={`py-1 px-5 text-white text-center shadow-lg rounded-md w-full cursor-pointer hover:bg-[#f96519]/70 active:bg-[#f96519]/50 duration-300 ${selectedSlot.length !== 0 && selectedSlot !== "B5" ? "bg-[#cccc]" : "bg-[#f76418]"}`} onClick={() => setSelectedSlot("B5")}>B5</div>
                                            <div className={`py-1 px-5 text-white text-center shadow-lg rounded-md w-full cursor-pointer hover:bg-[#f96519]/70 active:bg-[#f96519]/50 duration-300 ${selectedSlot.length !== 0 && selectedSlot !== "C5" ? "bg-[#cccc]" : "bg-[#f76418]"}`} onClick={() => setSelectedSlot("C5")}>C5</div>
                                            <div className={`py-1 px-5 text-white text-center shadow-lg rounded-md w-full cursor-pointer hover:bg-[#f96519]/70 active:bg-[#f96519]/50 duration-300 ${selectedSlot.length !== 0 && selectedSlot !== "D5" ? "bg-[#cccc]" : "bg-[#f76418]"}`} onClick={() => setSelectedSlot("D5")}>D5</div>
                                        </div>
                                        <div className="flex flex-row justify-center gap-2">
                                            <div className={`py-1 px-5 text-white text-center shadow-lg rounded-md w-full cursor-pointer hover:bg-[#f96519]/70 active:bg-[#f96519]/50 duration-300 ${selectedSlot.length !== 0 && selectedSlot !== "A6" ? "bg-[#cccc]" : "bg-[#f76418]"}`} onClick={() => setSelectedSlot("A6")}>A6</div>
                                            <div className={`py-1 px-5 text-white text-center shadow-lg rounded-md w-full cursor-pointer hover:bg-[#f96519]/70 active:bg-[#f96519]/50 duration-300 ${selectedSlot.length !== 0 && selectedSlot !== "B6" ? "bg-[#cccc]" : "bg-[#f76418]"}`} onClick={() => setSelectedSlot("B6")}>B6</div>
                                            <div className={`py-1 px-5 text-white text-center shadow-lg rounded-md w-full cursor-pointer hover:bg-[#f96519]/70 active:bg-[#f96519]/50 duration-300 ${selectedSlot.length !== 0 && selectedSlot !== "C6" ? "bg-[#cccc]" : "bg-[#f76418]"}`} onClick={() => setSelectedSlot("C6")}>C6</div>
                                            <div className={`py-1 px-5 text-white text-center shadow-lg rounded-md w-full cursor-pointer hover:bg-[#f96519]/70 active:bg-[#f96519]/50 duration-300 ${selectedSlot.length !== 0 && selectedSlot !== "D6" ? "bg-[#cccc]" : "bg-[#f76418]"}`} onClick={() => setSelectedSlot("D6")}>D6</div>
                                        </div>
                                        <div className="flex flex-row justify-center gap-2">
                                            <div className={`py-1 px-5 text-white text-center shadow-lg rounded-md w-full cursor-pointer hover:bg-[#f96519]/70 active:bg-[#f96519]/50 duration-300 ${selectedSlot.length !== 0 && selectedSlot !== "A7" ? "bg-[#cccc]" : "bg-[#f76418]"}`} onClick={() => setSelectedSlot("A7")}>A7</div>
                                            <div className={`py-1 px-5 text-white text-center shadow-lg rounded-md w-full cursor-pointer hover:bg-[#f96519]/70 active:bg-[#f96519]/50 duration-300 ${selectedSlot.length !== 0 && selectedSlot !== "B7" ? "bg-[#cccc]" : "bg-[#f76418]"}`} onClick={() => setSelectedSlot("B7")}>B7</div>
                                            <div className={`py-1 px-5 text-white text-center shadow-lg rounded-md w-full cursor-pointer hover:bg-[#f96519]/70 active:bg-[#f96519]/50 duration-300 ${selectedSlot.length !== 0 && selectedSlot !== "C7" ? "bg-[#cccc]" : "bg-[#f76418]"}`} onClick={() => setSelectedSlot("C7")}>C7</div>
                                            <div className={`py-1 px-5 text-white text-center shadow-lg rounded-md w-full cursor-pointer hover:bg-[#f96519]/70 active:bg-[#f96519]/50 duration-300 ${selectedSlot.length !== 0 && selectedSlot !== "D7" ? "bg-[#cccc]" : "bg-[#f76418]"}`} onClick={() => setSelectedSlot("D7")}>D7</div>
                                        </div>
                                    </div>
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


export default AddAlertTimeModal;