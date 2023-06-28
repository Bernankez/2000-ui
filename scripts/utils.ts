import { dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { createConsola } from "consola";

const dir = typeof __dirname === "string" ? __dirname : dirname(fileURLToPath(import.meta.url));
export const root = dirname(dir);

export function createConsole(title?: string) {
  const consola = createConsola({
    formatOptions: {
      fancy: true,
      columns: 80,
      colors: true,
      compact: true,
      date: true,
    },
  });
  return consola.withTag(title || "script");
}
