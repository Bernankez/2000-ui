// fake vue-loader

const noScriptContent = "import { defineComponent } from 'vue'\nexport default defineComponent({})";

export const resolve = async (specifier, context, defaultResolve, recursiveCall) => {
  const resolved = await defaultResolve(specifier, context, defaultResolve, recursiveCall);
  if (specifier.endsWith(".vue")) {
    return {
      ...resolved,
      format: "vue",
    };
  }
  return resolved;
};

export const load = async (url, context, defaultLoad) => {
  if (context.format === "vue") {
    return {
      format: "module",
      source: noScriptContent,
      shortCircuit: true,
    };
  }
  return await defaultLoad(url, context, defaultLoad);
};
