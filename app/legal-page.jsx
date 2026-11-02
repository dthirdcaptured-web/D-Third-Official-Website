import Link from "next/link";
import { SiteFooter, SiteHeader } from "./site-chrome.jsx";

export default function LegalPage({ eyebrow, title, introduction, sections, lastUpdated = "2026-10-31" }) {
  const lastUpdatedLabel = new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  }).format(new Date(`${lastUpdated}T00:00:00Z`));

  return (
    <>
      <a className="skip-link" href="#main">Skip to content</a>
      <SiteHeader />
      <main className="legal-page section-wrap" id="main">
        <header className="legal-intro">
          <p className="eyebrow"><span className="eyebrow-mark" /> {eyebrow}</p>
          <h1>{title}</h1>
          <p className="legal-lede">{introduction}</p>
          <p className="legal-updated">Last updated <time dateTime={lastUpdated}>{lastUpdatedLabel}</time></p>
        </header>

        <div className="legal-copy">
          {sections.map((section, index) => (
            <section className="legal-section" key={section.title} aria-labelledby={`legal-section-${index}`}>
              <h2 id={`legal-section-${index}`}>{section.title}</h2>
              {section.content}
            </section>
          ))}
          <p className="legal-back"><Link href="/#inquire">Questions? Get in touch <span aria-hidden="true">↗</span></Link></p>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
