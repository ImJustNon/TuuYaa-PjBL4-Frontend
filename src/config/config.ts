import tempProfile from "../assets/images/placeholderprofile.png";
import chompooProfile from "../assets/images/devmembers/chompoo.png";
import nonProfile from "../assets/images/devmembers/non.png";
import nopProfile from "../assets/images/devmembers/nop.png";
import chiProfile from "../assets/images/devmembers/chi.png";

const config = {
    googleClientId: import.meta.env.VITE_GOOGLE_CLIENT_ID ?? "SomeClientId",
    pages: {
        preventCheckTokenPaths: ["/signin", "/bypass", "/aboutus"],
    },
    backend: {
        api: {
            // baseurl: "https://tuuyaa-pjbl4-backend.vercel.app",
            baseurl: import.meta.env.VITE_BACKEND_API_BASEURL ?? "http://127.0.0.1:8484",
        }
    },
    members: [
        {
            firstName: "Laphatrada",
            lastName: "Chaiyajak",
            prefix: "Miss",
            image: chompooProfile,
            roles: [
                "Documenter",
                "Equipment Buyer",
                "Graphic Designer"
            ]
        },
        {
            firstName: "Thananop",
            lastName: "Yottasak",
            prefix: "Mr.",
            image: nopProfile,
            roles: [
                "UX/UI Designer",
                "Graphic Designer",
                "3D Designer"
            ]
        },
        {
            firstName: "Yossakorn",
            lastName: "Angkhanawin",
            prefix: "Mr.",
            image: chiProfile,
            roles: [
                "Work Piece Assembler",
                "Circuit Designer",
            ]
        },
        {
            firstName: "Kanakorn",
            lastName: "Thaiprakhon",
            prefix: "Mr.",
            image: nonProfile,
            roles: [
                "Web Frontend Developer",
                "Web Backend Developer",
                "Arduino Developer"
            ]
        }
    ]
}

export default config;