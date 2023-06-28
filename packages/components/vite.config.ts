import { resolve } from "node:path";
import { defineConfig } from "vite";
import type { PreRenderedAsset } from "rollup";
import Vue from "@vitejs/plugin-vue";
import VueJsx from "@vitejs/plugin-vue-jsx";
import dts from "vite-plugin-dts";
import Inspect from "vite-plugin-inspect";

const INTERNAL_SOURCE = "/* vite internal call, ignore */";

const componentsDir = __dirname;

export default defineConfig(() => {
  // Map<relativePathName, fileName>
  let assetMap = new Map<string, string>();

  function assetFileNames(assetInfo: PreRenderedAsset): string {
    if (assetInfo.source === INTERNAL_SOURCE && assetInfo.name) {
      assetMap.set(assetInfo.name, assetInfo.name.split("/").pop() || assetInfo.name);
    } else {
      for (const [relativePathName, fileName] of assetMap) {
        if (fileName === assetInfo.name) {
          const path = relativePathName.split("/");
          path.pop();
          assetMap.delete(relativePathName);
          const name = fileName.replace(/(.*)(?=\.vue).*/, "$1.css");
          return `${path.join("/")}/${name}`;
        }
      }
    }
    return assetInfo.name!;
  }

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
      {
        name: "vite:cleanup",
        buildStart() {
          assetMap = new Map();
        },
      },
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
            // 按目录结构输出css文件
            assetFileNames,
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
            assetFileNames,
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
