import { MapChannel } from "../types/types";

export function mapChannel(channelName: MapChannel){
    const map = {
        "A1": "M1",
        "B1": "M2",
        "C1": "M3",
        "D1": "M4",
        "A2": "M1",
        "B2": "M2",
        "C2": "M3",
        "D2": "M4",
        "A3": "M1",
        "B3": "M2",
        "C3": "M3",
        "D3": "M4",
        "A4": "M1",
        "B4": "M2",
        "C4": "M3",
        "D4": "M4",
        "A5": "M1",
        "B5": "M2",
        "C5": "M3",
        "D5": "M4",
        "A6": "M1",
        "B6": "M2",
        "C6": "M3",
        "D6": "M4",
        "A7": "M1",
        "B7": "M2",
        "C7": "M3",
        "D7": "M4",
    }
    return map[channelName];
}