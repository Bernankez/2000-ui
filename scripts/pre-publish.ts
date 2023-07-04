import { defineBuild } from "./build/excute/define-build";
import { $ } from "./build/excute";

defineBuild(async () => {
  await $("copy", { successMessage: "README copied" });
});
