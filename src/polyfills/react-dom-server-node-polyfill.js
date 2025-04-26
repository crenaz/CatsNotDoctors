// Direct polyfill for react-dom/server.node.js

// Ensure exports is defined globally
if (typeof globalThis.exports === "undefined") {
  globalThis.exports = {};
}

// Ensure module is defined globally
if (typeof globalThis.module === "undefined") {
  globalThis.module = { exports: globalThis.exports };
}

// Mock the specific modules that react-dom/server.node.js requires
if (typeof globalThis.require === "function") {
  const originalRequire = globalThis.require;

  globalThis.require = function (modulePath) {
    if (modulePath === "./cjs/react-dom-server-legacy.node.production.min.js") {
      return {
        renderToString: () => "",
        renderToStaticMarkup: () => "",
        version: "18.2.0",
      };
    }

    if (modulePath === "./cjs/react-dom-server.node.production.min.js") {
      return {
        renderToPipeableStream: () => ({ pipe: () => {}, abort: () => {} }),
        renderToReadableStream: async () => new ReadableStream(),
        version: "18.2.0",
      };
    }

    if (modulePath === "./cjs/react-dom-server-legacy.node.development.js") {
      return {
        renderToString: () => "",
        renderToStaticMarkup: () => "",
        version: "18.2.0",
      };
    }

    if (modulePath === "./cjs/react-dom-server.node.development.js") {
      return {
        renderToPipeableStream: () => ({ pipe: () => {}, abort: () => {} }),
        renderToReadableStream: async () => new ReadableStream(),
        version: "18.2.0",
      };
    }

    return originalRequire(modulePath);
  };
}
