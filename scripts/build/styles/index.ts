import { resolve } from "node:path";
import fs from "fs-extra";
import { getDirname } from "../../utils";

const { existsSync, readdirSync, readFileSync, appendFileSync, removeSync } = fs;

const __dirname = getDirname(import.meta.url);
const root = resolve(__dirname, "../../../packages/components");

const es = resolve(root, "./es");
const cjs = resolve(root, "./lib");

async function appendCSS() {
  [es, cjs].forEach((dir) => {
    if (existsSync(dir)) {
      const componentDirs = readdirSync(dir, { withFileTypes: true });
      // component
      componentDirs.forEach((file) => {
        if (file.isDirectory()) {
          const componentDir = resolve(dir, file.name);
          let appendFiles = "";

          const cssFiles = readdirSync(componentDir, { withFileTypes: true });
          // component files
          cssFiles.forEach((cssFile) => {
            if (cssFile.name !== "style.css" && cssFile.name.endsWith(".css") && cssFile.isFile()) {
              const css = readFileSync(resolve(componentDir, cssFile.name), { encoding: "utf-8" });
              appendFiles += `\n${css}`;
              removeSync(resolve(componentDir, cssFile.name));
            }
          });
          // output to style.css
          appendFileSync(resolve(componentDir, "style.css"), appendFiles);
        }
      });
    }
  });
}

appendCSS();

