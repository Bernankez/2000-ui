import { resolve } from "node:path";
import { createFilesMatcher, getTsconfig, parseTsconfig } from "get-tsconfig";
import { installSourceMapSupport } from "@esbuild-kit/core-utils";

export type MaybePromise<T> = T | Promise<T>;

export type ModuleFormat =
  | "builtin"
  | "dynamic"
  | "commonjs"
  | "json"
  | "module"
  | "wasm"
  | "vue"
  | "callback";

interface Resolved {
  url: string;
  format: ModuleFormat | undefined;
}

interface Context {
  conditions: string[];
  parentURL: string | undefined;
}

export type Resolve = (
  specifier: string,
  context: Context,
  defaultResolve: Resolve,
  recursiveCall?: boolean
) => MaybePromise<Resolved>;

export type Load = (
  url: string,
  context: {
    format: string;
    importAssertions: Record<string, string>;
  },
  defaultLoad: Load
) => MaybePromise<{
  format: string;
  source: string | ArrayBuffer | SharedArrayBuffer | Uint8Array;
}>;

const tsconfig = process.env.ESBK_TSCONFIG_PATH
  ? {
      path: resolve(process.env.ESBK_TSCONFIG_PATH),
      config: parseTsconfig(process.env.ESBK_TSCONFIG_PATH),
    }
  : getTsconfig();

export const fileMatcher = tsconfig && createFilesMatcher(tsconfig);

export const applySourceMap = installSourceMapSupport();
