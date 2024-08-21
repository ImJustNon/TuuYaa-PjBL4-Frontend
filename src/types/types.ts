import { ReactNode } from "react";

export type PreferLanguage = "en" | "th" | "kh" | "skoy";

export type ResourceData = {
    en: {
        [key: string]: string;
    };
    th: {
        [key: string]: string;
    };
    kh: {
        [key: string]: string;
    };
    skoy: {
        [key: string]: string;
    };
}

export type ResoucesData = {
    en: {
        translation: {
            [key: string]: string;
        };
    };
    th: {
        translation: {
            [key: string]: string;
        };
    };
    kh: {
        translation: {
            [key: string]: string;
        };
    };
    skoy: {
        translation: {
            [key: string]: string;
        };
    };
}

export interface ChildrenProps {
    children: ReactNode;
}

export interface AppLayoutComponentProps extends ChildrenProps {
    isAuthLoaded: boolean;
}

export type MembersConfig = {
    firstName: string;
    lastName: string;
    prefix: string;
    image: string;
    roles: string[];
}

export type MapChannel = "A1" | "B1" | "C1" | "D1" | "A2" | "B2" | "C2" | "D2" |  "A3" | "B3" | "C3" | "D3" |  "A4" | "B4" | "C4" | "D4" |  "A5" | "B5" | "C5" | "D5" | "A6" | "B6" | "C6" | "D6" | "A7" | "B7" | "C7" | "D7";