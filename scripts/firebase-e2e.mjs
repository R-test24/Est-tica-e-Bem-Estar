import { spawnSync } from "node:child_process";
const result = spawnSync(
  process.execPath,
  [
    "node_modules/@playwright/test/cli.js",
    "test",
    "tests/firebase.spec.ts",
    ...process.argv.slice(2),
  ],
  { stdio: "inherit", env: { ...process.env, FIREBASE_E2E: "true" } },
);
process.exit(result.status ?? 1);
