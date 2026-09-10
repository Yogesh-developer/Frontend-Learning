import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import federation from "@originjs/vite-plugin-federation";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    federation({
      name: "cart",
      filename: "remoteEntry.js",
      exposes: {
        "./Cart": "./src/Cart.jsx",
      },
      shared: ["react", "react-dom"],
    }),
  ],
  server: {
    port: 5176,
    strictPort: true,
    cors: true,
  },
  preview: {
    port: 5176,
    strictPort: true,
    cors: true,
  },
  build: {
    target: "esnext",
    minify: false,
  },
});

