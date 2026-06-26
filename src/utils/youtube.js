const YOUTUBE_ID_PATTERN = /^[a-zA-Z0-9_-]{11}$/;

export function getYouTubeVideoId(url) {
  if (!url) return "";

  try {
    const parsedUrl = new URL(url.trim());
    const host = parsedUrl.hostname.replace(/^www\./, "");

    if (host === "youtu.be") {
      const id = parsedUrl.pathname.split("/").filter(Boolean)[0];
      return YOUTUBE_ID_PATTERN.test(id) ? id : "";
    }

    if (
      host === "youtube.com" ||
      host === "m.youtube.com" ||
      host === "music.youtube.com"
    ) {
      if (parsedUrl.pathname === "/watch") {
        const id = parsedUrl.searchParams.get("v");
        return YOUTUBE_ID_PATTERN.test(id) ? id : "";
      }

      const parts = parsedUrl.pathname.split("/").filter(Boolean);

      if (["embed", "shorts", "live"].includes(parts[0])) {
        const id = parts[1];
        return YOUTUBE_ID_PATTERN.test(id) ? id : "";
      }
    }
  } catch {
    return "";
  }

  return "";
}

export function getYouTubeThumbnailUrl(videoId) {
  return videoId ? `https://img.youtube.com/vi/${videoId}/0.jpg` : "";
}

export function getYouTubeEmbedUrl(videoId) {
  return videoId ? `https://www.youtube.com/embed/${videoId}` : "";
}

export function isVideoAttack(ataque) {
  return ataque?.media_type === "video" || Boolean(ataque?.youtube_url);
}