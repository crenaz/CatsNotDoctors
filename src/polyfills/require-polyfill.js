// Comprehensive require polyfill for ESM
if (typeof require === "undefined") {
  // Define exports in the global scope
  globalThis.exports = {};

  // Define module in the global scope
  globalThis.module = { exports: globalThis.exports };

  // Create mock implementations for React modules
  const reactModules = {
    "./cjs/react.production.min.js": () => {
      return {
        createElement: (type, props, ...children) => ({
          type,
          props,
          children,
        }),
        Fragment: Symbol("Fragment"),
        useState: (initial) => [initial, (v) => v],
        useEffect: () => {},
        useContext: () => ({}),
        createContext: () => ({
          Provider: () => ({}),
          Consumer: () => ({}),
        }),
        memo: (component) => component,
        forwardRef: (component) => component,
        version: "19.0.0",
      };
    },
    "./cjs/react.development.js": () => {
      return {
        createElement: (type, props, ...children) => ({
          type,
          props,
          children,
        }),
        Fragment: Symbol("Fragment"),
        useState: (initial) => [initial, (v) => v],
        useEffect: () => {},
        useContext: () => ({}),
        createContext: () => ({
          Provider: () => ({}),
          Consumer: () => ({}),
        }),
        memo: (component) => component,
        forwardRef: (component) => component,
        version: "19.0.0",
      };
    },
    "./cjs/react-dom-server-legacy.node.production.min.js": () => {
      return {
        renderToString: () => "",
        renderToStaticMarkup: () => "",
        version: "19.0.0",
      };
    },
    "./cjs/react-dom-server-legacy.node.development.js": () => {
      return {
        renderToString: () => "",
        renderToStaticMarkup: () => "",
        version: "19.0.0",
      };
    },
    "./cjs/react-dom-server.node.production.min.js": () => {
      return {
        renderToPipeableStream: () => ({ pipe: () => {}, abort: () => {} }),
        renderToReadableStream: async () => new ReadableStream(),
        version: "19.0.0",
      };
    },
    "./cjs/react-dom-server.node.development.js": () => {
      return {
        renderToPipeableStream: () => ({ pipe: () => {}, abort: () => {} }),
        renderToReadableStream: async () => new ReadableStream(),
        version: "19.0.0",
      };
    },
  };

  globalThis.require = function (modulePath) {
    if (reactModules[modulePath]) {
      return reactModules[modulePath]();
    }

    console.warn(
      `Module "${modulePath}" was requested but not found in the polyfill.`,
    );
    // Return a minimal implementation to prevent crashes
    return {};
  };
}
