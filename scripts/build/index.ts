import { $ } from "./excute";
import { defineBuild } from "./excute/define-build";

defineBuild(async () => {
  await $("pnpm cleanup", { successMessage: "previous build cleaned" });
  await $("pnpm build:components", { successMessage: "components built" });
  await $("pnpm build:types", { successMessage: "volar & web-types built" });
  await $("pnpm build:styles", { successMessage: "styles appended" });
});
