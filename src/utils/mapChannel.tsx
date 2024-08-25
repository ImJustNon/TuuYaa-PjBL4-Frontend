import { MapChannel } from "../types/types";

export function mapChannel(channelName: MapChannel){
    const map = {
        "A1": "T1",
        "B1": "T2",
        "C1": "T3",
        "D1": "T4",
        "A2": "T1",
        "B2": "T2",
        "C2": "T3",
        "D2": "T4",
        "A3": "T1",
        "B3": "T2",
        "C3": "T3",
        "D3": "T4",
        "A4": "T1",
        "B4": "T2",
        "C4": "T3",
        "D4": "T4",
        "A5": "T1",
        "B5": "T2",
        "C5": "T3",
        "D5": "T4",
        "A6": "T1",
        "B6": "T2",
        "C6": "T3",
        "D6": "T4",
        "A7": "T1",
        "B7": "T2",
        "C7": "T3",
        "D7": "T4",
    }
    return map[channelName]
}