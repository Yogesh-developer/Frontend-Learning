import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig(({ isSsrBuild }) => {
  if (isSsrBuild) {
    return {
      plugins: [react()],
      build: {
        ssr: "./server-entry.jsx",
        rollupOptions: {
          input: "./server-entry.jsx",
        },
      },
    };
  }

  return {
    plugins: [react()],
    define: {
      "process.env.NODE_ENV": JSON.stringify("production"),
    },
    build: {
      outDir: "dist/client",
      emptyOutDir: true,
      lib: {
        entry: "client-entry.jsx",
        name: "ProductsClient",
        fileName: () => "client.js",
        formats: ["es"],
      },
    },
  };
});
