import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import * as dotenv from "dotenv";

dotenv.config({ path: "../../.env" });

export default defineConfig({
  server: {
    port: Number(process.env.FRONT_MAIN_PORT), // или FRONT_ADMIN_PORT
  },
  plugins: [react()],
});
