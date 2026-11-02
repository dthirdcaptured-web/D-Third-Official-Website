"use client";

export default function ErrorView({ reset }) {
  return (
    <main className="not-found-page section-wrap app-error-page" id="main">
      <p className="eyebrow"><span className="eyebrow-mark" /> 500 / A pause in the story</p>
      <h1>This frame<br /><em>didn’t load.</em></h1>
      <p>Something went wrong while opening this page. Please try again.</p>
      <div className="error-actions">
        <button className="text-link error-retry" type="button" onClick={reset}>Try again <span aria-hidden="true">↻</span></button>
        <a className="text-link" href="/">Return home <span aria-hidden="true">↗</span></a>
      </div>
    </main>
  );
}
