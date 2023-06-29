import { resolve } from "node:path";
import fs from "fs-extra";
import { getDirname } from "../../utils";

const { copySync, existsSync, removeSync } = fs;

const __dirname = getDirname(import.meta.url);
const root = resolve(__dirname, "../../../packages/components");

const stylePath = resolve(root, "./.temp-style/style.css");
const distPath = resolve(root, "./dist/style.css");

async function buildStyle() {
  if (existsSync(stylePath)) {
    copySync(stylePath, distPath);
  }
  removeSync(resolve(stylePath, ".."));
}

buildStyle();
