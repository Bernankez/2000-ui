import { withInstall } from "@2000-ui/utils";
import type { DefineComponent } from "vue";
import * as components from "./components";

export * from "./components";

export default withInstall(components as unknown as Record<string, DefineComponent>);
