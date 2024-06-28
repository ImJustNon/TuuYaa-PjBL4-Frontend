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