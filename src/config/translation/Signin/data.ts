import { ResourceData } from "../../../types/types";
import skoy from "../../../utils/convertToSkoyLang";

const data: ResourceData = {
    en: {
        "Continue with Google": "Continue with Google",
        "Sign-in Options": "Sign-in Options",
        "Alerting Medicine Cabinet by Using IoT and Web Application": "Alerting Medicine Cabinet by Using IoT and Web Application"
    },
    th: {
        "Continue with Google": "เข้าสู่ระบบด้วย Google",
        "Sign-in Options": "ตัวเลือกเข้าสู่ระบบ",
        "Alerting Medicine Cabinet by Using IoT and Web Application": "ตู้ยาเเจ้งเตือนโดยใช้ไอโอทีเเละเว็ปเเอพพริเคชัน"
    },
    kh: {
        "Continue with Google": "បន្តជាមួយ Google",
        "Sign-in Options": "ជម្រើសចូល",
        "Alerting Medicine Cabinet by Using IoT and Web Application": "ការជូនដំណឹងអំពីគណៈរដ្ឋមន្ត្រីវេជ្ជសាស្ត្រដោយប្រើ IoT និងកម្មវិធីគេហទំព័រ"
    },
    skoy: {
        "Continue with Google": skoy.convert("เข้าสู่ระบบด้วย Google"),
        "Sign-in Options": skoy.convert("ตัวเลือกเข้าสู่ระบบ"),
        "Alerting Medicine Cabinet by Using IoT and Web Application": skoy.convert("ตู้ยาเเจ้งเตือนโดยใช้ไอโอทีเเละเว็ปเเอพพริเคชัน")
    }
}

export default data;