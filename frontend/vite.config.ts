import { defineConfig } from "vite";

export default defineConfig({
  build: {
    outDir: "../custom_components/household_kanban/frontend",
    emptyOutDir: true,
    lib: { entry: "src/card.ts", formats: ["es"], fileName: () => "household-kanban-card.js" },
    minify: "esbuild",
  },
  test: { include: ["test/**/*.test.ts"] },
});
