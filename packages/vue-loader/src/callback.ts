import type { Load, Resolve } from "./utils";

const regExt = /(\.css|\.png|\.jpg)$/;

export const resolve: Resolve = async (specifier, context, defaultResolve, recursiveCall) => {
  const resolved = await defaultResolve(specifier, context, defaultResolve, recursiveCall);
  if (specifier.match(regExt)) {
    return {
      ...resolved,
      format: "callback",
    };
  }
  return resolved;
};

export const load: Load = async (url, context, defaultLoad) => {
  const content = await defaultLoad(url, context, defaultLoad);
  if (context.format === "callback") {
    return {
      ...content,
      format: "module",
      source: "",
    };
  }
  return content;
};
