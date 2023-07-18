import type { Preset } from "unocss";
import { createCssVariables, createThemeColors } from "./utils";

export const colors = createThemeColors();

export const preflights = getCSS();

function getCSS() {
  const cssVariables = createCssVariables();
  const props = Object.entries(cssVariables).map((theme) => {
    const [prop, value] = theme;
    return `  ${prop}: ${value};`;
  });

  const codes = `/* stylelint-disable */

:root {
${props.join("\n")}
}`;

  return codes;
}

export const preset2000 = (): Preset => {
  return {
    name: "preset2000",
    theme: {
      colors: createThemeColors(),
    },
  };
};

