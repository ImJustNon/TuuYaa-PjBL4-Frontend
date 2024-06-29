import tempProfile from "../assets/images/placeholderprofile.png";

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
            image: tempProfile,
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
            image: tempProfile,
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
            image: tempProfile,
            roles: [
                "Work Piece Assembler",
                "Circuit Designer",
            ]
        },
        {
            firstName: "Kanakorn",
            lastName: "Thaiprakhon",
            prefix: "Mr.",
            image: tempProfile,
            roles: [
                "Frontend Developer",
                "Backend Developer",
                "Arduino Developer"
            ]
        }
    ]
}

export default config;