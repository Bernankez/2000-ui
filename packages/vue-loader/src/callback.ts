import type { Load, Resolve } from "./utils";

const KNOWN_ASSET_TYPES = [
  // images
  "apng",
  "png",
  "jpe?g",
  "jfif",
  "pjpeg",
  "pjp",
  "gif",
  "svg",
  "ico",
  "webp",
  "avif",

  // media
  "mp4",
  "webm",
  "ogg",
  "mp3",
  "wav",
  "flac",
  "aac",
  "opus",

  // fonts
  "woff2?",
  "eot",
  "ttf",
  "otf",

  // other
  "webmanifest",
  "pdf",
  "txt",

  // css
  "css",
  "scss",
  "sass",
  "less",
];

const DEFAULT_ASSETS_RE = new RegExp(
  `\\.(${KNOWN_ASSET_TYPES.join("|")})(\\?.*)?$`,
);

export const resolve: Resolve = async (specifier, context, defaultResolve, recursiveCall) => {
  const resolved = await defaultResolve(specifier, context, defaultResolve, recursiveCall);
  if (specifier.match(DEFAULT_ASSETS_RE)) {
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
