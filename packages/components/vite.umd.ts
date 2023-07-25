import { resolve } from "node:path";
import { defineConfig } from "vite";
import Vue from "@vitejs/plugin-vue";
import VueJsx from "@vitejs/plugin-vue-jsx";
import UnoCSS from "unocss/vite";

const componentsDir = __dirname;

export default defineConfig(() => {
  return {
    plugins: [
      Vue(),
      VueJsx(),
      UnoCSS({
        mode: "vue-scoped",
      }),
    ],
    resolve: {
      alias: {
        "@": resolve(__dirname, "./"),
      },
    },
    build: {
      minify: false,
      lib: {
        name: "2000-ui",
        entry: resolve(componentsDir, "index.umd.ts"),
      },
      rollupOptions: {
        external: ["vue"],
        output: [
          {
            format: "umd",
            globals: {
              vue: "Vue",
            },
            entryFileNames: "2000-ui.js",
            name: "Z000",
            dir: "dist",
          },
        ],
      },
    },
  };
});
