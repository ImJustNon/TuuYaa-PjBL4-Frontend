import { PreferLanguage } from "../types/types";
const storageName = "preferLanguage";

function setLanguage(lang: PreferLanguage): void {
    localStorage.setItem(storageName, lang);
}

function getLanguage(): void {
    localStorage.getItem(storageName);
}

function removeLanguage(): void {
    localStorage.removeItem(storageName);
}

export {
    setLanguage,
    getLanguage,
    removeLanguage
}