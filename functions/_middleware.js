export async function onRequest({ next, env }) {
  try {
    return await next();
  } catch (err) {
    // Enhanced error logging
    console.error("Server Error Details:", {
      message: err.message,
      stack: err.stack,
      type: err.name,
      code: err.code,
    });

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
      JSON.stringify({
        error: "Internal Server Error",
        message:
          "Sorry, something went wrong on our end. Please try again later.",
      }),
      {
        status: 500,
        statusText: "Internal Server Error",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }
}
