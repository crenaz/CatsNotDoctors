import { defineConfig } from "vite";
import path from "path";

export default defineConfig({
  define: {
    global: "globalThis",
    "process.env": process.env,
  },
  build: {
    target: "esnext",
  },
  resolve: {
    alias: {
      react: path.resolve(__dirname, "./src/lib/react-esm.js"),
      "react-dom/server": path.resolve(
        __dirname,
        "./src/lib/react-dom-server-esm.js",
      ),
      "react-dom/server.node.js": path.resolve(
        __dirname,
        "./src/lib/react-dom-server-node.js",
      ),
      "react-dom/server.node": path.resolve(
        __dirname,
        "./src/lib/react-dom-server-node.js",
      ),
    },
  },
  ssr: {
    noExternal: true,
  },
  optimizeDeps: {
    include: ["cssesc", "react", "react-dom"],
  },
});
