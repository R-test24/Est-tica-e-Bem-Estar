import type { NextConfig } from "next";

const isGitHubPages = process.env.GITHUB_PAGES === "true";
const config: NextConfig = {
  poweredByHeader: false,
  ...(isGitHubPages
    ? {
        output: "export",
        basePath: "/Est-tica-e-Bem-Estar",
        trailingSlash: true,
        images: { unoptimized: true },
      }
    : {}),
};
export default config;
