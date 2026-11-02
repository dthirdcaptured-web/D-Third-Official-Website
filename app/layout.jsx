import "./globals.css";
import { createPageMetadata, siteConfig } from "../lib/site-config.js";

const pageMetadata = createPageMetadata({
  title: {
    default: "D’THIRD — Every frame tells a story",
    template: "%s | D’THIRD",
  },
  description: "D’THIRD is an independent videographer and visual storyteller creating thoughtful wedding films and stories made to stay with you.",
});

const personId = siteConfig.siteUrl ? `${siteConfig.siteUrl}/#person` : undefined;
const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    ...(siteConfig.siteUrl ? [{
      "@type": "WebSite",
      "@id": `${siteConfig.siteUrl}/#website`,
      name: "D’THIRD",
      url: siteConfig.siteUrl,
      ...(personId ? { publisher: { "@id": personId } } : {}),
    }] : []),
    {
      "@type": "Person",
      ...(personId ? { "@id": personId } : {}),
      name: siteConfig.personName,
      alternateName: "D’THIRD",
      jobTitle: "Videographer and visual storyteller",
      description: pageMetadata.description,
      ...(siteConfig.siteUrl ? {
        url: siteConfig.siteUrl,
        image: `${siteConfig.siteUrl}/images/dthird-profile.webp`,
      } : {}),
      sameAs: [siteConfig.footerLinks.instagram, siteConfig.footerLinks.facebook].filter(Boolean),
    },
  ],
};

const safeStructuredData = JSON.stringify(structuredData).replace(/</g, "\\u003c");

export const metadata = {
  ...pageMetadata,
  applicationName: "D’THIRD",
  manifest: "/manifest.webmanifest",
  robots: {
    index: !siteConfig.isPreviewDeployment,
    follow: !siteConfig.isPreviewDeployment,
    googleBot: {
      index: !siteConfig.isPreviewDeployment,
      follow: !siteConfig.isPreviewDeployment,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

export const viewport = {
  themeColor: "#171715",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: safeStructuredData }}
        />
      </body>
    </html>
  );
}
