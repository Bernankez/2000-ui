import fs from "fs-extra";
import * as globalComponents from "../../../packages/components/components";

export async function generateVolarTypes(outputs: string[] = []) {
  if (outputs.length === 0) { return; }
  const components: Record<string, string> = {};
  const excludeComponents: string[] = [];
  Object.keys(globalComponents).forEach((key) => {
    if (key === "default") { return; }
    const entry = `typeof import('2000-ui')['${key}']`;
    if (!excludeComponents.includes(key)) {
      components[key] = entry;
    }
  });

  const originDTS = fs.existsSync(outputs[0])
    ? await fs.readFile(outputs[0], "utf-8")
    : "";
  const originImports = parseComponentsDeclaration(originDTS);
  const lines = Object.entries({
    ...originImports,
    ...components,
  })
    .filter(([name]) => components[name])
    .map(([name, v]) => {
      if (!/^\w+$/.test(name)) {
        name = `'${name}'`;
      }
      return `${name}: ${v}`;
    });
  const code = `// Auto generated component declarations
declare module 'vue' {
  export interface GlobalComponents {
    ${lines.join("\n    ")}
  }
}
export {}
`;
  if (code !== originDTS) {
    await Promise.allSettled(outputs.map(output => fs.writeFile(output, code, "utf-8")));
  }
}

function parseComponentsDeclaration(code: string) {
  if (!code) {
    return {};
  }
  return Object.fromEntries(
    Array.from(code.matchAll(/(?<!\/\/)\s+\s+['"]?(.+?)['"]?:\s(.+?)\n/g)).map(
      i => [i[1], i[2]],
    ),
  );
}
