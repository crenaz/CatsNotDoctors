// ESM-compatible React DOM Server entry point
export const renderToString = () => "";
export const renderToStaticMarkup = () => "";
export const renderToPipeableStream = () => ({ pipe: () => {}, abort: () => {} });
export const renderToReadableStream = async () => new ReadableStream();
export const version = "19.0.0";

export default {
  renderToString,
  renderToStaticMarkup,
  renderToPipeableStream,
  renderToReadableStream,
  version
};