import { resolve } from "node:path";
import { defineConfig } from "vite";
import Vue from "@vitejs/plugin-vue";
import VueJsx from "@vitejs/plugin-vue-jsx";

const componentsDir = __dirname;

export default defineConfig(() => {
  return {
    plugins: [
      Vue(),
      VueJsx(),
    ],
    build: {
      minify: false,
      lib: {
        name: "2000-ui",
        entry: resolve(componentsDir, "index.ts"),
      },
      rollupOptions: {
        external: ["vue"],
        output: [
          {
            format: "es",
            // 打包输出目录
            dir: resolve(componentsDir, ".temp-style"),
          },
        ],
      },
    },
  };
});
