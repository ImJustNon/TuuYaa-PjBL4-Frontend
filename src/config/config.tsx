
const config = {
    googleClientId: import.meta.env.VITE_GOOGLE_CLIENT_ID ?? "SomeClientId",
    pages: {
        preventCheckTokenPaths: ["/signin"],
    }
}

export default config;