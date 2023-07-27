import fs from "node:fs";
import { fileURLToPath } from "node:url";
import { type Load, type Resolve } from "./utils";
import { compileTsCode, compileVueCode } from "./compile";

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
    const path = fileURLToPath(url);
    const source = fs.readFileSync(path, "utf-8");
    // upgrade vue when https://github.com/vuejs/core/issues/8775 this issue is released
    let { content: code, ext } = compileVueCode(source, path);

    if (ext === "ts") {
      code = await compileTsCode(code, url);
    }

    return {
      ...content,
      format: "module",
      source: code,
    };
  }
  return content;
};

export { compileTsCode, compileVueCode };
