import { colord } from "colord";
import { colors, variables } from "./theme";
import type { ColorName } from "./theme-names";
import { colorNames } from "./theme-names";

export function createThemeColors() {
  const themeColors = {} as Record<ColorName, string>;
  (Object.keys(colorNames) as ColorName[]).forEach((colorName) => {
    const colorVar = colorNames[colorName];
    themeColors[colorName] = `hsl(var(${colorVar}) / <alpha-value>)`;
  });
  return themeColors;
}

export function createCssVariables() {
  const colorVariables = {} as Record<string, string>;
  (Object.keys(colors) as ColorName[]).forEach((colorName) => {
    const cssName = colorNames[colorName];
    colorVariables[cssName] = hexToHsl(colors[colorName]);
  });
  return Object.assign({}, variables, colorVariables);
}

function hexToHsl(hex: string) {
  const str = colord(hex).toHslString();
  const [h, s, l] = str.match(/\d+(\.\d+)?%|\d+(\.\d+)?/g)?.map(parseFloat) || [0, 0, 0];
  return `${h}, ${s}%, ${l}%`;
}

