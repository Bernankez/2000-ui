import { dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { createConsola } from "consola";

/**
 * __dirname
 * @param url import.meta.url
 */
export function getDirname(url: string) {
  const dir = typeof __dirname === "string" ? __dirname : dirname(fileURLToPath(url));
  return dir;
}

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
