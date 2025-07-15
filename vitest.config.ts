import { defineConfig } from "vitest/config"
import react from "@vitejs/plugin-react"

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: ["src/test/setup.ts"],
    coverage: {
      provider: "istanbul",
      reporter: ["text", "json", "html", "lcov"],
      include: ["src/**/*", "!src/test/**/*", "!src/**/*.stories.*"],
      reportsDirectory: "src/test/coverage",
      extension: [".js", ".jsx", ".ts", ".tsx"]
    }
  }
})