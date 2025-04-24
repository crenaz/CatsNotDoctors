export async function onRequest({ next }) {
  try {
    return await next();
  } catch (err) {
    return new Response(`Server Error: ${err.message}`, {
      status: 500,
      statusText: 'Internal Server Error',
    });
  }
}