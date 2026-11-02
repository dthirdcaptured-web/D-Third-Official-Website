"use client";

import "./globals.css";
import ErrorView from "./error-view.jsx";

export default function GlobalErrorPage({ reset }) {
  return (
    <html lang="en">
      <body>
        <ErrorView reset={reset} />
      </body>
    </html>
  );
}
