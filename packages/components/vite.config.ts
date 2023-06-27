import { resolve } from "node:path";
import { defineConfig } from "vite";
import Vue from "@vitejs/plugin-vue";
import VueJsx from "@vitejs/plugin-vue-jsx";
import dts from "vite-plugin-dts";
import Inspect from "vite-plugin-inspect";

const componentsDir = __dirname;

export default defineConfig(() => {
  return {
    plugins: [
      Vue(),
      VueJsx(),
      dts({
        // 声明文件输出目录
        outputDir: "es",
        // 入口文件的跟路径
        entryRoot: componentsDir,
        // exclude auto inferred from tsconfig
        cleanVueFileName: true,
      }),
      dts({
        outputDir: "lib",
        entryRoot: componentsDir,
        cleanVueFileName: true,
      }),
      Inspect({
        build: true,
        outputDir: ".vite-inspect",
      }),
    ],
    build: {
      minify: false,
      cssCodeSplit: true,
      lib: {
        name: "2000-ui",
        entry: resolve(componentsDir, "index.ts"),
      },
      rollupOptions: {
        external: ["vue"],
        output: [
          {
            format: "es",
            entryFileNames: chunkInfo => `${chunkInfo.name.replace(/.vue$/, "")}.mjs`,
            // 打包目录和文件目录对应
            preserveModules: true,
            // 入口文件的根路径
            preserveModulesRoot: componentsDir,
            // 打包输出目录
            dir: "es",
          },
          {
            format: "cjs",
            entryFileNames: chunkInfo => `${chunkInfo.name.replace(/.vue$/, "")}.cjs`,
            preserveModules: true,
            preserveModulesRoot: componentsDir,
            dir: "lib",
          },
          {
            format: "umd",
            globals: {
              vue: "Vue",
            },
            name: "2000-ui",
            dir: "dist",
          },
        ],
      },
    },
  };
});
