import React from 'react';
import { renderToReadableStream } from 'react-dom/server';

export async function renderReactComponent(Component, props) {
  try {
    const stream = await renderToReadableStream(
      <Component {...props} />,
      {
        onError: (error) => {
          console.error("React rendering error:", error);
        }
      }
    );
    
    return new Response(stream, {
      headers: { 'content-type': 'text/html' },
    });
  } catch (error) {
    console.error("Failed to render React component:", error);
    return new Response("Error rendering component", { status: 500 });
  }
}