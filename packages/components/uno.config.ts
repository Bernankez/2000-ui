import { defineConfig, presetUno, transformerDirectives } from "unocss";
import { preset2000 } from "./_preset";

export default defineConfig({
  presets: [presetUno({
    prefix: "z-",
  }), preset2000()],
  transformers: [transformerDirectives()],
});
