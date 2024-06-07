import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react';
import dotenv from "dotenv";
dotenv.config();

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
  ],
  server: {
    host: "127.0.0.1",
    port: 2567,
    open: false,
    hmr: {
      overlay: true
    }
  }
});