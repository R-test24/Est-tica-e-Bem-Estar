import type { NextConfig } from "next";
const isGitHubPages = process.env.GITHUB_PAGES === "true";
const isFirebaseHosting = process.env.FIREBASE_HOSTING === "true";
const config: NextConfig = {
  poweredByHeader: false,
  ...(isGitHubPages || isFirebaseHosting
    ? {
        output: "export",
        ...(isGitHubPages ? { basePath: "/Est-tica-e-Bem-Estar" } : {}),
        trailingSlash: true,
        images: { unoptimized: true },
      }
    : {}),
};
export default config;
