const deploymentHost = process.env.VERCEL_PROJECT_PRODUCTION_URL || process.env.VERCEL_URL;
const configuredSiteUrl = process.env.NEXT_PUBLIC_SITE_URL || (deploymentHost ? `https://${deploymentHost}` : "");

function normalizeSiteUrl(value) {
  if (!value) return "";

  try {
    const url = new URL(value);
    if (url.username || url.password) return "";
    if (url.protocol === "https:") return url.origin;
    return process.env.NODE_ENV !== "production" && url.protocol === "http:" ? url.origin : "";
  } catch {
    return "";
  }
}

export const siteConfig = {
  siteUrl: normalizeSiteUrl(configuredSiteUrl),
  isPreviewDeployment: process.env.VERCEL_ENV === "preview",
  name: "D’Third Bautista Captured",
  personName: "D’Third Bautista",
  description: "D’Third Bautista Captured is the videography brand of D’Third Bautista, creating thoughtful wedding films and visual stories.",
  // Use .webp assets under public/images. The cover never falls back to the portrait.
  coverImage: {
    desktop: "",
    mobile: "",
  },
  contactEmail: process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? "",
  // Add profile URLs here. Unset links take visitors to the inquiry section.
  footerLinks: {
    instagram: "https://www.instagram.com/d__third/",
    facebook: "https://www.facebook.com/thirdori",
    viber: "",
    whatsapp: "",
    messenger: "https://www.facebook.com/messages/t/103434998607469",
  },
  portfolioItems: [
    {
      title: "A day in full bloom",
      category: "Wedding story",
      image: "/images/wedding/wedding-09912.webp",
      alt: "The couple sharing a quiet moment beneath a flower-covered wedding arch.",
      // Keep originals in Drive; add a public Vimeo, YouTube, or Drive preview URL for click-to-play viewing.
      videoUrl: "",
      gallery: [
        { image: "/images/wedding/wedding-09885.webp", alt: "Wedding guests seated before the ceremony." },
        { image: "/images/wedding/wedding-09892.webp", alt: "The couple at the floral ceremony arch with their officiant." },
        { image: "/images/wedding/wedding-09894.webp", alt: "The bride and groom beneath the flower-covered arch." },
        { image: "/images/wedding/wedding-09913.webp", alt: "A close view of the couple's hands during the ring exchange." },
        { image: "/images/wedding/wedding-09931.webp", alt: "Guests seated together during the ceremony." },
        { image: "/images/wedding/wedding-09945.webp", alt: "Friends and family celebrating together." },
        { image: "/images/wedding/wedding-09947.webp", alt: "The wedding gathering beneath the garden canopy." },
        { image: "/images/wedding/wedding-09985.webp", alt: "The couple with their officiant at the ceremony arch." },
        { image: "/images/wedding/wedding-09999.webp", alt: "A portrait of the couple beneath the floral arch." },
      ],
    },
    {
      title: "Mutya USU Tourism Video",
      category: "Tourism video",
      recognition: "2026 Baragatan Champion Tourism Video",
      image: "/images/mutya-usu-tourism-video.webp",
      alt: "Mutya ng Palawan 2026 thumbnail with an underwater swimmer.",
      videoUrl: "https://drive.google.com/file/d/1PQ7nl_hbOSJerIUpLZZkK0HJ-owT_v4L/view",
    },
  ],
  credentials: [
    {
      title: "Champion — Tourism Video",
      issuer: "Busuanga",
      year: "2025",
    },
    {
      title: "Champion — Tourism Video",
      issuer: "Baragatan",
      year: "2026",
    },
    {
      title: "Best in Production / Tourism Video",
      issuer: "Miss Multicultural International",
      year: "2026",
    },
    {
      title: "Best in Tourism Video",
      issuer: "Malagnang Festival",
      year: "2026",
    },
  ],
};

export function createPageMetadata({ title, description, path = "/" }) {
  const pageTitle = typeof title === "string" ? `${title} | D’THIRD` : title.default;
  const pageUrl = siteConfig.siteUrl ? `${siteConfig.siteUrl}${path}` : "";
  const socialImage = siteConfig.siteUrl ? `${siteConfig.siteUrl}/images/dthird-social.webp` : "";

  return {
    ...(siteConfig.siteUrl ? { metadataBase: new URL(siteConfig.siteUrl) } : {}),
    title,
    description,
    ...(siteConfig.siteUrl ? { alternates: { canonical: path } } : {}),
    openGraph: {
      type: "website",
      siteName: "D’THIRD",
      title: pageTitle,
      description,
      ...(pageUrl ? { url: pageUrl } : {}),
      ...(socialImage ? {
        images: [{
          url: socialImage,
          width: 1200,
          height: 630,
          alt: "D’Third Bautista, videographer and visual storyteller",
        }],
      } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title: pageTitle,
      description,
      ...(socialImage ? { images: [socialImage] } : {}),
    },
  };
}
