import { transferSetupPosition } from "./transform";

const exportDefaultRE = /export\s+default/;
const exportDefaultClassRE = /(?:(?:^|\n|;)\s*)export\s+default\s+class\s+([\w$]+)/;

let index = 1;
let compileRoot: string | null = null;
let compiler: typeof import("vue/compiler-sfc") | null;

function requireCompiler() {
  if (!compiler) {
    if (compileRoot) {
      try {
        compiler = require(require.resolve("vue/compiler-sfc", { paths: [compileRoot] }));
      } catch (e) {}
    }

    if (!compiler) {
      try {
        compiler = require("vue/compiler-sfc");
      } catch (e) {
        try {
          compiler = require("@vue/compiler-sfc");
        } catch (e) {
          throw new Error("@vue/compiler-sfc is not present in the dependency tree.\n");
        }
      }
    }
  }

  return compiler!;
}

export function setCompileRoot(root: string) {
  if (root && root !== compileRoot) {
    compileRoot = root;
    compiler = null;
  }
}

export function compileVueCode(code: string) {
  const { parse, compileScript, rewriteDefault } = requireCompiler();
  const { descriptor } = parse(code);
  const { script, scriptSetup } = descriptor;

  let content: string | null = null;
  let ext: string | null = null;

  if (script || scriptSetup) {
    if (scriptSetup) {
      const compiled = compileScript(descriptor, {
        id: `${index++}`,
      });

      const classMatch = compiled.content.match(exportDefaultClassRE);

      if (classMatch) {
        content
          = `${compiled.content.replace(exportDefaultClassRE, "\nclass $1")
          }\nconst _sfc_main = ${classMatch[1]}`;

        if (exportDefaultRE.test(content)) {
          content = rewriteDefault(compiled.content, "_sfc_main");
        }
      } else {
        content = rewriteDefault(compiled.content, "_sfc_main");
      }

      content = transferSetupPosition(content);
      content += "\nexport default _sfc_main\n";

      ext = scriptSetup.lang || "js";
    } else if (script && script.content) {
      content = rewriteDefault(script.content, "_sfc_main");
      content += "\nexport default _sfc_main\n";

      ext = script.lang || "js";
    }
  }

  return { content, ext };
}
