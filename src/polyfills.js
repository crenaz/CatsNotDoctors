// Polyfill for global objects
if (typeof globalThis.global === "undefined") {
  globalThis.global = globalThis;
}

// Polyfill for module
if (typeof globalThis.module === "undefined") {
  globalThis.module = {
    exports: {},
    id: "",
    filename: "",
    loaded: false,
    parent: null,
    children: [],
    paths: [],
  };
}

// Polyfill for exports
if (typeof globalThis.exports === "undefined") {
  globalThis.exports = module.exports;
}

// Polyfill for process
if (typeof globalThis.process === "undefined") {
  globalThis.process = {
    env: {},
    platform: "browser",
    version: "",
    nextTick: (fn) => setTimeout(fn, 0),
  };
}

// Minimal os module polyfill
if (typeof globalThis.os === "undefined") {
  globalThis.os = {
    platform: () => "browser",
    type: () => "Browser",
    release: () => "Unknown",
    homedir: () => "/",
    userInfo: () => ({ username: "user" }),
    cpus: () => [{ model: "Browser CPU" }],
    hostname: () => "browser",
    networkInterfaces: () => ({}),
  };
}

// Minimal fs module polyfill
if (typeof globalThis.fs === "undefined") {
  globalThis.fs = {
    readFileSync: () => {
      throw new Error("fs.readFileSync is not supported in the browser");
    },
    writeFileSync: () => {
      throw new Error("fs.writeFileSync is not supported in the browser");
    },
    existsSync: () => false,
    promises: {
      readFile: () =>
        Promise.reject(
          new Error("fs.promises.readFile is not supported in the browser")
        ),
      writeFile: () =>
        Promise.reject(
          new Error("fs.promises.writeFile is not supported in the browser")
        ),
    },
  };
}

// Minimal path module polyfill
if (typeof globalThis.path === "undefined") {
  globalThis.path = {
    join: (...parts) => parts.join("/").replace(/\/+/g, "/"),
    resolve: (...parts) => parts.join("/").replace(/\/+/g, "/"),
    dirname: (path) => path.split("/").slice(0, -1).join("/") || ".",
    basename: (path) => path.split("/").pop(),
    extname: (path) => {
      const base = path.split("/").pop();
      return base.includes(".") ? "." + base.split(".").pop() : "";
    },
  };
}
