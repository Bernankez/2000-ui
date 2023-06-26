import { resolve } from "node:path";
import { createConsole, root } from "./utils";
import { generateVolarTypes } from "./generate-volar-types";
import { generateWebstormTypes } from "./generate-webstorm-types";

const OUTPUT_DIR = "./packages/components";

const console = createConsole("build-types");

const volarType = resolve(root, `${OUTPUT_DIR}/volar.d.ts`);
const webstormType = resolve(root, `${OUTPUT_DIR}/web-types.json`);

async function generate() {
  console.start("Start generating types...");
  try {
    await Promise.all([generateVolarTypes([volarType]), generateWebstormTypes([webstormType])]);
    console.success(`Types generated to ${resolve(root, OUTPUT_DIR)}`);
  } catch (e) {
    console.error(`Types generate failed. 【Error: ${(e as any)?.message}】`);
  }
}

generate();
