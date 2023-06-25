import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { execa } from "execa";
import { consola } from "consola";

const dir = typeof __dirname === "string" ? __dirname : dirname(fileURLToPath(import.meta.url));
const root = dirname(dir);
function success(message: string) {
  consola.success(`build:types: ${message}`);
}

function error(message: string) {
  consola.error(`build:types: ${message}`);
}

async function generate() {
  await Promise.all([
    // generate types to packages/components
    execa("node", ["--experimental-loader", resolve(root, "./scripts/vue-loader.mjs"), "--experimental-loader", "@esbuild-kit/esm-loader", "./scripts/generate-volar-types.ts"], { cwd: root, stdio: "inherit" }),
    execa("node", ["--experimental-loader", resolve(root, "./scripts/vue-loader.mjs"), "--experimental-loader", "@esbuild-kit/esm-loader", "./scripts/generate-webstorm-types.ts"], { cwd: root, stdio: "inherit" }),
  ]).then(() => {
    success(
      `types generated in \n${resolve(
        root,
        "./packages/components",
      )}`,
    );
    return true;
  }).catch((e) => {
    error(`types generate failed. ${e?.message}`);
    return false;
  });
}

generate();
