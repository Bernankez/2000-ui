import { resolve } from "node:path";
import fs from "fs-extra";
import { build } from "vite";
import { getDirname } from "../../utils";

const { copySync, existsSync, removeSync } = fs;

const __dirname = getDirname(import.meta.url);
const root = resolve(__dirname, "../../../packages/components");

const stylePath = resolve(root, "./.temp-style/style.css");
const distPath = resolve(root, "./dist/style.css");
const vitePath = resolve(root, "./vite.style.ts");

async function buildStyle() {
  await build({
    root,
    configFile: vitePath,
  });
  if (existsSync(stylePath)) {
    copySync(stylePath, distPath);
  }
  removeSync(resolve(stylePath, ".."));
}

buildStyle();
