import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  base: "/prac25/",
  test: {
    globals: true,
    environment: "jsdom",
  },
});
