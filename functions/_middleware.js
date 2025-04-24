export async function onRequest({ next, env }) {
  try {
    return await next();
  } catch (err) {
    // Log the error (you might want to use a proper logging service)
    console.error("Server Error:", err);

    // In development, return detailed error
    if (env.NODE_ENV === "development") {
      return new Response(`Server Error: ${err.message}\n\n${err.stack}`, {
        status: 500,
        statusText: "Internal Server Error",
        headers: {
          "Content-Type": "text/plain",
        },
      });
    }

    // In production, return a user-friendly error
    return new Response(
      "Sorry, something went wrong on our end. Please try again later.",
      {
        status: 500,
        statusText: "Internal Server Error",
        headers: {
          "Content-Type": "text/plain",
        },
      }
    );
  }
}
