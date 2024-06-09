
const config = {
    googleClientId: import.meta.env.VITE_GOOGLE_CLIENT_ID ?? "SomeClientId",
    pages: {
        preventCheckTokenPaths: ["/signin"],
    },
    backend: {
        api: {
            // baseurl: "https://tuuyaa-pjbl4-backend.vercel.app",
            baseurl: "http://127.0.0.1:8484"
        }
    }
}

export default config;