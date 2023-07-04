import { resolve } from "node:path";
import { copyFileSync } from "fs";
import { getDirname } from "./utils";

const root = resolve(getDirname(import.meta.url), "..");
const rootReadme = resolve(root, "README.md");
const componentReadme = resolve(root, "./packages/components/README.md");

copyFileSync(rootReadme, componentReadme);
