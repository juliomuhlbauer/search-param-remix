import { defineConfig } from "@pandacss/dev";

export default defineConfig({
  outExtension: "js",
  preflight: true,
  presets: ["@pandacss/preset-base", "@park-ui/panda-preset"],
  include: [
    "./app/routes/**/*.{ts,tsx,js,jsx}",
    "./app/components/**/*.{ts,tsx,js,jsx}",
  ],
  exclude: [],
  jsxFramework: "react",
  outdir: "styled-system",
});
