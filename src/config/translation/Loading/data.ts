import { ResourceData } from "../../../types/types";
import skoy from "../../../utils/convertToSkoyLang";

const data: ResourceData = {
    en: {
        "Authenticating . . .": "Authenticating . . .",
        "If the page is stuck, please try reloading it": "If the page is stuck, please try reloading it",
    },
    th: {
        "Authenticating . . .": "กำลังยืนยันตัวตน . . .",
        "If the page is stuck, please try reloading it": "หากพบว่าค้างอยู่ที่หน้านี้ โปรดลองรีโหลดหน้านี้ใหม่",
    },
    kh: {
        "Authenticating . . .": "ការផ្ទៀងផ្ទាត់ភាពត្រឹមត្រូវ។ . . .",
        "If the page is stuck, please try reloading it": "ប្រសិនបើទំព័រជាប់គាំង សូមព្យាយាមផ្ទុកវាឡើងវិញ",
    },
    skoy: {
        "Authenticating . . .": skoy.convert("กำลังยืนยันตัวตน . . ."),
        "If the page is stuck, please try reloading it": skoy.convert("หากพบว่าค้างอยู่ที่หน้านี้ โปรดลองรีโหลดหน้านี้ใหม่"),
    }
}

export default data;