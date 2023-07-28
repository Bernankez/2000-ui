import { defineBuild } from "./build/excute/define-build";
import { $ } from "./build/excute";

defineBuild(async () => {
  await $("pnpm copy", { successMessage: "README copied" });
  await $("git commit --all -m \"docs: update README\"", { successMessage: "committed" });
});
