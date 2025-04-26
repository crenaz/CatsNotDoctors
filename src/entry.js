// Polyfill for module before anything else runs
if (typeof globalThis.module === 'undefined') {
  globalThis.module = { exports: {} };
}
if (typeof globalThis.exports === 'undefined') {
  globalThis.exports = globalThis.module.exports;
}

// Export a dummy function to ensure this file is processed
export function setupPolyfills() {
  return true;
}