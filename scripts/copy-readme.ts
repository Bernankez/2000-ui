import { resolve } from "node:path";
import { copyFileSync, readFileSync } from "fs";
import { execSync } from "node:child_process";
import chalk from "chalk";
import { getDirname } from "./utils";

const root = resolve(getDirname(import.meta.url), "..");
const rootReadmePath = resolve(root, "README.md");
const componentReadmePath = resolve(root, "./packages/components/README.md");

export function copyReadme() {
  const rootReadme = readFileSync(rootReadmePath, "utf-8");
  const componentReadme = readFileSync(componentReadmePath, "utf-8");
  if (rootReadme !== componentReadme) {
    copyFileSync(rootReadme, componentReadme);
    console.info(`${chalk.bgGreen(" Success ")} README copied`);
    execSync(`git commit ${componentReadmePath} -m "docs: update README"`);
    console.info(`${chalk.bgGreen(" Success ")} git committed`);
    execSync("git push");
    console.info(`${chalk.bgGreen(" Success ")} git pushed`);
  } else {
    console.info(`${chalk.bgGreen(" Success ")} Nothing to change`);
  }
}

