// Polyfill for react-dom/server in ESM
if (typeof window !== 'undefined') {
  // Browser environment
  window.ReactDOMServer = {
    renderToString: () => "",
    renderToStaticMarkup: () => "",
    renderToPipeableStream: () => ({ pipe: () => {}, abort: () => {} }),
    renderToReadableStream: async () => new ReadableStream(),
    version: "19.0.0"
  };
} else {
  // Server environment
  globalThis.ReactDOMServer = {
    renderToString: () => "",
    renderToStaticMarkup: () => "",
    renderToPipeableStream: () => ({ pipe: () => {}, abort: () => {} }),
    renderToReadableStream: async () => new ReadableStream(),
    version: "19.0.0"
  };
}

export const renderToString = () => "";
export const renderToStaticMarkup = () => "";
export const renderToPipeableStream = () => ({ pipe: () => {}, abort: () => {} });
export const renderToReadableStream = async () => new ReadableStream();
export const version = "19.0.0";