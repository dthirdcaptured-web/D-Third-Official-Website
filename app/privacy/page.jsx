import LegalPage from "../legal-page.jsx";
import { createPageMetadata, siteConfig } from "../../lib/site-config.js";

const description = "Learn what information D’THIRD does and does not collect through this website.";

export const metadata = createPageMetadata({
  title: "Privacy Policy",
  description,
  path: "/privacy",
});

export default function PrivacyPage() {
  return (
    <LegalPage
      eyebrow="Your privacy"
      title="Privacy policy"
      lastUpdated="2026-11-01"
      introduction="D’THIRD does not use this site to track visitors or collect inquiry form submissions. We receive personal information only when you choose to contact us."
      sections={[
        {
          title: "When you contact us",
          content: <p>The inquiry form runs in your browser and does not send or save its fields on this website. Choosing “Prepare an inquiry” opens your email app with a draft; you decide whether to send it. If you send an email, D’THIRD receives the information you include, such as your name, reply address, project details, and any files you attach. We use it to respond and discuss your inquiry.</p>,
        },
        {
          title: "Website and hosting data",
          content: <p>This site does not use analytics, advertising pixels, or visitor profiling. It is hosted by Vercel, which may process technical request information, such as IP address and request or device details, to deliver, maintain, and protect the website. This is hosting infrastructure data; D’THIRD does not use it to build visitor profiles. See <a href="https://vercel.com/legal/privacy-notice" target="_blank" rel="noopener noreferrer">Vercel’s Privacy Notice</a> for information about the provider’s processing.</p>,
        },
        {
          title: "How we handle inquiry messages",
          content: <p>We use messages to reply and, where relevant, to manage a potential or agreed project. We do not sell or rent inquiry information or use it for advertising. Messages are kept as needed to handle the inquiry and related business records, then deleted when no longer needed, subject to any legal obligations.</p>,
        },
        {
          title: "Your privacy rights",
          content: <p>Where applicable, you may ask whether your personal information is being processed, request access or correction, object to processing, request deletion or blocking when the law allows, request a portable copy, or lodge a complaint with the <a href="https://privacy.gov.ph" target="_blank" rel="noopener noreferrer">National Privacy Commission</a>. To make a request, contact D’Third Bautista using {siteConfig.contactEmail ? <a href={`mailto:${siteConfig.contactEmail}`}>{siteConfig.contactEmail}</a> : <a href="/#inquire">the project inquiry section</a>}.</p>,
        },
        {
          title: "External links",
          content: <p>If you follow a link to Instagram, Facebook, Messenger, WhatsApp, Viber, or another outside service, that provider may collect information under its own privacy policy. If you choose to play a portfolio film, its YouTube, Vimeo, or Google Drive player is loaded only after you press “Watch film”; that provider may then process technical information such as your IP address, device or browser details, and cookies under its own privacy policy. D’THIRD does not control the data practices of those services.</p>,
        },
        {
          title: "Questions or requests",
          content: <p>For a privacy question or a request about an inquiry you sent, use the <a href="/#inquire">project inquiry section</a> to contact D’THIRD.</p>,
        },
      ]}
    />
  );
}
