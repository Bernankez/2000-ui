/// <reference types="vitest" />
import { defineConfig } from "vite";

export default defineConfig(() => {
  return {
    test: {
      environment: "happy-dom",
    },
  };
});
