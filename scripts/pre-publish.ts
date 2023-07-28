import { execSync } from "node:child_process";
import { defineBuild } from "./build/excute/define-build";
import { $ } from "./build/excute";

defineBuild(async () => {
  await $("pnpm copy", { successMessage: "README copied" });
  const diff = execSync("git diff --exit-code").toString();
  if (diff) {
    await $("git commit --all -m \"docs: update README\"", { successMessage: "committed" });
    await $("git push", { successMessage: "pushed" });
  }
});
