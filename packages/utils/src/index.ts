import { camelCase, kebabCase, upperCase } from "lodash-es";
import type { App, DefineComponent } from "vue";

export function withInstall(components: Record<string, DefineComponent>) {
  return function install(app: App) {
    Object.keys(components).forEach((name) => {
      const component = components[name];
      app.component(upperCase(camelCase(name)), component); // ButtonGroup
      app.component(kebabCase(name), component); // button-group
    });
  };
}
