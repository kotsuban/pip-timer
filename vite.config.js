import { defineConfig } from "vite";
import path from "path";

export default defineConfig({
  base: "pip-timer",
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
