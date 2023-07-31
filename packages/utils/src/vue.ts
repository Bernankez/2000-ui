import { camelCase, kebabCase, upperFirst } from "lodash-es";
import type { App, DefineComponent } from "vue";

export function withInstall(components: Record<string, DefineComponent>) {
  return function install(app: App) {
    Object.keys(components).forEach((name) => {
      const component = components[name];
      app.component(upperFirst(camelCase(name)), component); // ButtonGroup
      app.component(kebabCase(name), component); // button-group
    });
  };
}

// see https://github.com/vuejs/language-tools/issues/3206#issuecomment-1624541884
export type ComponentInstance<T> = T extends new (...args: any[]) => infer R
  ? R
  : T extends (...args: any[]) => infer R
    ? R extends { __ctx?: infer K }
      ? Exclude<K, void> extends { expose: (...args: infer K) => void }
        ? K[0] & InstanceType<DefineComponent>
        : any
      : any
    : any;
