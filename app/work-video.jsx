"use client";

import { useEffect, useId, useRef, useState } from "react";

function getEmbedUrl(value) {
  try {
    const url = new URL(value);
    if (url.protocol !== "https:" || url.username || url.password) return "";

    const host = url.hostname.toLowerCase().replace(/^www\./, "");
    if (["youtu.be", "youtube.com", "m.youtube.com", "youtube-nocookie.com"].includes(host)) {
      const pathParts = url.pathname.split("/").filter(Boolean);
      let videoId = "";
      if (host === "youtu.be") videoId = pathParts[0] || "";
      else if (pathParts[0] === "watch") videoId = url.searchParams.get("v") || "";
      else if (["embed", "shorts", "live"].includes(pathParts[0])) videoId = pathParts[1] || "";
      if (!videoId || !/^[a-zA-Z0-9_-]{6,20}$/.test(videoId)) return "";
      return `https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&rel=0`;
    }

    if (host === "vimeo.com" || host === "player.vimeo.com") {
      const videoId = url.pathname.split("/").filter(Boolean).find((part) => /^\d+$/.test(part));
      if (!videoId) return "";
      const params = new URLSearchParams({ autoplay: "1", title: "0", byline: "0", portrait: "0", dnt: "1" });
      const unlistedHash = url.searchParams.get("h");
      if (unlistedHash) params.set("h", unlistedHash);
      return `https://player.vimeo.com/video/${videoId}?${params.toString()}`;
    }

    if (host === "drive.google.com") {
      const fileId = url.pathname.match(/\/file\/d\/([^/]+)/)?.[1] || url.searchParams.get("id");
      if (!fileId || !/^[a-zA-Z0-9_-]+$/.test(fileId)) return "";
      return `https://drive.google.com/file/d/${fileId}/preview`;
    }
  } catch {
    return "";
  }

  return "";
}

export default function WorkVideo({ url, title, category = "Film" }) {
  const [isOpen, setIsOpen] = useState(false);
  const dialogRef = useRef(null);
  const titleId = useId();
  const embedUrl = getEmbedUrl(url);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (isOpen && !dialog.open) dialog.showModal();
    if (!isOpen && dialog.open) dialog.close();
  }, [isOpen]);

  if (!embedUrl) return null;

  return (
    <>
      <button className="work-video-trigger" type="button" onClick={() => setIsOpen(true)} aria-haspopup="dialog" aria-label={`Watch ${title} video`}>
        <span className="work-video-play" aria-hidden="true">▶</span>
        <span>Watch film</span>
      </button>
      <dialog
        className="work-video-dialog"
        ref={dialogRef}
        aria-labelledby={titleId}
        onClose={() => setIsOpen(false)}
        onClick={(event) => {
          if (event.target === dialogRef.current) setIsOpen(false);
        }}
      >
        <div className="work-video-dialog-topline">
          <div>
            <p className="work-video-kicker">D'THIRD / {category.toUpperCase()}</p>
            <h2 id={titleId}>{title}</h2>
          </div>
          <button className="work-video-close" type="button" onClick={() => setIsOpen(false)} aria-label="Close video">
            <span aria-hidden="true">×</span>
          </button>
        </div>
        <p className="work-video-note">
          If the embedded player stays blank, <a href={url} target="_blank" rel="noopener noreferrer">open the source video in a new tab</a>.
        </p>
        <div className="work-video-frame">
          {isOpen && (
            <iframe
              src={embedUrl}
              title={`${title} video`}
              allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
              allowFullScreen
              loading="eager"
              referrerPolicy="strict-origin-when-cross-origin"
            />
          )}
        </div>
      </dialog>
    </>
  );
}
