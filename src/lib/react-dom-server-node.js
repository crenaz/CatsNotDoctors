// Direct replacement for react-dom/server.node.js
"use strict";

// Create mock implementations
const serverLegacy = {
  renderToString: () => "",
  renderToStaticMarkup: () => "",
  version: "18.2.0",
};

const server = {
  renderToPipeableStream: () => ({ pipe: () => {}, abort: () => {} }),
  renderToReadableStream: async () => new ReadableStream(),
  version: "18.2.0",
};

// Export all the methods
exports.version = serverLegacy.version;
exports.renderToString = serverLegacy.renderToString;
exports.renderToStaticMarkup = serverLegacy.renderToStaticMarkup;
exports.renderToPipeableStream = server.renderToPipeableStream;
exports.renderToReadableStream = server.renderToReadableStream;

// Also export as module.exports for CommonJS compatibility
module.exports = exports;
