import { defineConfig, presetUno, transformerDirectives } from "unocss";

export default defineConfig({
  presets: [presetUno({
    prefix: "z-",
  })],
  transformers: [transformerDirectives()],
});
