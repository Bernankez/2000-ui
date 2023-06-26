import fs from "node:fs";
import { fileURLToPath } from "node:url";
import type { Load, Resolve } from "./utils";
import { compileVueCode } from "./compile";

export const resolve: Resolve = async (specifier, context, defaultResolve, recursiveCall) => {
  const resolved = await defaultResolve(specifier, context, defaultResolve, recursiveCall);
  if (specifier.endsWith(".vue")) {
    return {
      ...resolved,
      format: "vue",
    };
  }
  return resolved;
};

export const load: Load = async (url, context, defaultLoad) => {
  const content = await defaultLoad(url, context, defaultLoad);
  if (context.format === "vue") {
    const source = fs.readFileSync(fileURLToPath(url), "utf-8");
    const { content: code } = compileVueCode(source);

    return {
      format: "module",
      source: code!,
    };
  }
  return content;
};
