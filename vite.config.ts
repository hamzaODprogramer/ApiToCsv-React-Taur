import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import ReactCompiler from "babel-plugin-react-compiler";
// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react({
      babel: { plugins: [ReactCompiler] },
    }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
