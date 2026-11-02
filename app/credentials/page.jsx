import Image from "next/image";
import Link from "next/link";
import WorkVideoSection from "../work-video-section.jsx";
import { createPageMetadata, siteConfig } from "../../lib/site-config.js";
import { SiteFooter, SiteHeader } from "../site-chrome.jsx";

function safeExternalUrl(value) {
  try {
    const url = new URL(value);
    if (url.protocol !== "https:" || url.username || url.password) return "";
    return url.href;
  } catch {
    return "";
  }
}

const description = "Award-winning visual storytelling by D'Third Captured, with selected work and tourism video recognition.";

export const metadata = createPageMetadata({
  title: "Why Choose D'Third Captured?",
  description,
  path: "/credentials",
});

export default function CredentialsPage() {
  return (
    <>
      <a className="skip-link" href="#main">Skip to content</a>
      <SiteHeader currentPage="credentials" />
      <main className="credentials-page" id="main">
        <section className="credentials-intro section-wrap" aria-labelledby="credentials-title">
          <p className="eyebrow"><span className="eyebrow-mark" /> D'Third Captured / Recognition</p>
          <h1 id="credentials-title">Why Choose<br />D'Third <em>Captured?</em></h1>
          <p className="credentials-lede">Thoughtful visual storytelling, backed by award-winning tourism video work.</p>
        </section>

        <section className="credentials-section credentials-certificates section-wrap" aria-labelledby="certificate-title">
          <div className="credentials-section-heading">
            <p className="eyebrow"><span className="eyebrow-mark" /> 01 / Awards &amp; recognition</p>
            <h2 id="certificate-title">Award-winning storytelling.</h2>
          </div>
          {siteConfig.credentials.length ? (
            <ul className="certificate-list">
              {siteConfig.credentials.map((credential) => (
                <li className="certificate-item" key={`${credential.title}-${credential.issuer}`}>
                  <div>
                    <h3>{credential.title}</h3>
                    <p>{[credential.issuer, credential.year].filter(Boolean).join(" · ")}</p>
                  </div>
                  {safeExternalUrl(credential.href) && <a href={safeExternalUrl(credential.href)} target="_blank" rel="noopener noreferrer">View credential ↗</a>}
                </li>
              ))}
            </ul>
          ) : (
            <p className="credentials-empty">No credentials have been published yet.</p>
          )}
        </section>

        <section className="credentials-section section-wrap" aria-labelledby="portfolio-credentials-title">
          <div className="credentials-section-heading">
            <p className="eyebrow"><span className="eyebrow-mark" /> 02 / Selected portfolio</p>
            <h2 id="portfolio-credentials-title">Stories made to stay.</h2>
          </div>
          {siteConfig.portfolioItems.length ? (
            <div className="credential-work-list">
              {siteConfig.portfolioItems.map((item, index) => (
                <article className="credential-work-card" key={item.title + index}>
                  <div className="credential-work-image">
                    <Image src={item.image} alt={item.alt || item.title} fill sizes="(max-width: 760px) 86vw, 64vw" />
                  </div>
                  <div className="credential-work-copy">
                    <span className="credential-work-category">{item.recognition || item.category || "Selected work"}</span>
                    <span className="credential-work-title">{item.title}</span>
                    <div className="credential-work-actions">
                      <Link className="credential-work-link" href="/#work">View project <span aria-hidden="true">&#8599;</span></Link>
                      <WorkVideoSection url={item.videoUrl} title={item.title} category={item.category} />
                    </div>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <p className="credentials-empty">Portfolio projects will appear here as they are added.</p>
          )}
        </section>

        <section className="credentials-contact section-wrap" aria-label="Project inquiries">
          <p>Have a story in mind?</p>
          <Link href="/#inquire" className="text-link">Start a project <span aria-hidden="true">↗</span></Link>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
