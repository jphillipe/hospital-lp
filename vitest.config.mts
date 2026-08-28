import { createRequire } from "node:module";
import { fileURLToPath } from "node:url";
import { defineConfig } from "vitest/config";

/*
 * `server-only` resolves to a module that throws under every export condition
 * except `react-server`, which Next sets and Vitest does not. `conditions`
 * alone does not fix it — the package is externalised, so Node's own resolver
 * runs and ignores Vite's. Pointing the specifier at the package's own empty
 * build is the same thing Next does, spelled explicitly.
 */
const require = createRequire(import.meta.url);
const serverOnlyStub = require
  .resolve("server-only")
  .replace(/index\.js$/, "empty.js");

export default defineConfig({
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
      "server-only": serverOnlyStub,
    },
  },
  test: {
    environment: "node",
    include: ["src/**/*.test.ts", "src/**/*.test.tsx"],
  },
});
