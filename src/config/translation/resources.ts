import signinTranslationData from "./Signin/data";
import homeTranslationData from "./Home/data";
import loadingTranslationData from "./Loading/data";
import scanTranslationData from "./Scan/data";
import { ResoucesData } from "../../types/types";

const resources: ResoucesData = {
    en: {
        translation: {
            ...signinTranslationData.en,
            ...homeTranslationData.en,
            ...loadingTranslationData.en,
            ...scanTranslationData.en,
        }
    },
    th: {
        translation: {
            ...signinTranslationData.th,
            ...homeTranslationData.th,
            ...loadingTranslationData.th,
            ...scanTranslationData.th,
        }
    },
    kh: {
        translation: {
            ...signinTranslationData.kh,
            ...homeTranslationData.kh,
            ...loadingTranslationData.kh,
            ...scanTranslationData.kh,
        }
    },
    skoy: {
        translation: {
            ...homeTranslationData.skoy,
            ...signinTranslationData.skoy,
            ...loadingTranslationData.skoy,
            ...scanTranslationData.skoy
        }
    }
};


export default resources;