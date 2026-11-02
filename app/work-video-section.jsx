import WorkVideo from "./work-video.jsx";

export default function WorkVideoSection({ url, title, category }) {
  if (typeof url !== "string" || !url.trim()) return null;
  return <WorkVideo url={url} title={title} category={category} />;
}
