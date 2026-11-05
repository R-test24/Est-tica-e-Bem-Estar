import { defineConfig, devices } from "@playwright/test";
const firebaseMode = process.env.FIREBASE_E2E === "true";
const port = firebaseMode ? 3101 : 3100;
export default defineConfig({
  testDir: "./tests",
  testMatch: "**/*.spec.ts",
  testIgnore: firebaseMode ? [] : ["**/firebase.spec.ts"],
  fullyParallel: false,
  use: {
    baseURL: `http://localhost:${port}`,
    ...devices["Desktop Chrome"],
    launchOptions: process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH
      ? { executablePath: process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH }
      : {},
  },
  webServer: {
    command: `npm run dev -- --port ${port}`,
    url: `http://localhost:${port}`,
    reuseExistingServer: !process.env.CI,
    timeout: 120000,
    env: firebaseMode
      ? {
          NEXT_PUBLIC_FIREBASE_API_KEY: "demo-api-key",
          NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN: "demo-estetica.firebaseapp.com",
          NEXT_PUBLIC_FIREBASE_PROJECT_ID: "demo-estetica",
          NEXT_PUBLIC_FIREBASE_APP_ID: "demo-app",
          NEXT_PUBLIC_FIREBASE_USE_EMULATORS: "true",
        }
      : {},
  },
});
