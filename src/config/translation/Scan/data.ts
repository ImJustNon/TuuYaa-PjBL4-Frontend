import { ResourceData } from "../../../types/types";
import skoy from "../../../utils/convertToSkoyLang";

const data: ResourceData = {
    en: {
        "Add": "Add",
        "Add Cabinet": "Add Cabinet",
        "ID": "ID",
        "Give a name": "Give a name",
    },
    th: {
        "Add": "เพิ่ม",
        "Add Cabinet": "เพิ่มตู้",
        "ID": "ไอดี",
        "Give a name": "ตั้งชื่อ",
    },
    kh: {
        "Add": "បន្ថែម",
        "Add Cabinet": "បន្ថែមគណៈរដ្ឋមន្ត្រី",
        "ID": "លេខសម្គាល់",
        "Give a name": "ផ្តល់ឈ្មោះ",
    },
    skoy: {
        "Add": skoy.convert("เพิ่ม"),
        "Add Cabinet": skoy.convert("เพิ่มตู้"),
        "ID": skoy.convert("ไอดี"),
        "Give a name": skoy.convert("ตั้งชื่อ"),
    }
}

export default data;