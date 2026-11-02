const nextConfig = {
  poweredByHeader: false,
  trailingSlash: false,
  productionBrowserSourceMaps: false,
  images: {
    unoptimized: true,
  },
  async headers() {
    const securityHeaders = [
      { key: "X-Content-Type-Options", value: "nosniff" },
      { key: "X-Frame-Options", value: "DENY" },
      { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
      { key: "Permissions-Policy", value: "camera=(), geolocation=(), microphone=()" },
      { key: "Cross-Origin-Opener-Policy", value: "same-origin" },
    ];

    const contentSecurityPolicy = process.env.NODE_ENV === "production"
      ? [
          "default-src 'self'",
          "base-uri 'self'",
          "object-src 'none'",
          "frame-src https://www.youtube-nocookie.com https://player.vimeo.com https://drive.google.com",
          "frame-ancestors 'none'",
          "form-action 'self' mailto:",
          "img-src 'self' data: blob:",
          "font-src 'self' data:",
          "script-src 'self' 'unsafe-inline'",
          "style-src 'self' 'unsafe-inline'",
          "connect-src 'self'",
          "manifest-src 'self'",
          "worker-src 'self' blob:",
          "upgrade-insecure-requests",
        ].join("; ")
      : "frame-ancestors 'none'";
    securityHeaders.push({ key: "Content-Security-Policy", value: contentSecurityPolicy });

    if (process.env.VERCEL_ENV === "production") {
      securityHeaders.push({
        key: "Strict-Transport-Security",
        value: "max-age=31536000",
      });
    }

    const publicAssetCache = {
      key: "Cache-Control",
      value: "public, max-age=86400, s-maxage=86400, stale-while-revalidate=86400",
    };

    return [
      { source: "/:path*", headers: securityHeaders },
      { source: "/images/:path*", headers: [publicAssetCache] },
      { source: "/third-logo.svg", headers: [publicAssetCache] },
    ];
  },
};

export default nextConfig;
