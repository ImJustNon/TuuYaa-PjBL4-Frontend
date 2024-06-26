import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import resources from "./config/translation/resources";
import { getLanguage } from "./utils/preferLanguage";


i18n.use(initReactI18next).init({
    resources: resources,
    lng: getLanguage() ? getLanguage() as string : (navigator.language).slice(0, 2), // will get lang from ssytem by default but if it can find config data will use it instead
    interpolation: {
        escapeValue: false // react already safes from xss
    }
});

export default i18n;