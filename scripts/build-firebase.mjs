import { spawnSync } from "node:child_process";
import nextEnv from "@next/env";
const { loadEnvConfig } = nextEnv;
loadEnvConfig(process.cwd());
if (process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID?.startsWith("demo-")) {
  console.error("Não publique a configuração de emuladores. Remova as variáveis demo- ou use a configuração pública do seu projeto real.");
  process.exit(1);
}
const result = spawnSync(process.execPath, ["node_modules/next/dist/bin/next", "build"], {
  stdio: "inherit",
  env: { ...process.env, FIREBASE_HOSTING: "true", GITHUB_PAGES: "false", NEXT_PUBLIC_FIREBASE_USE_EMULATORS: "false" },
});
process.exit(result.status ?? 1);
