// src/utilities/video/embed.ts
export function toEmbeddableUrl(raw?: string): { type: 'youtube' | 'vimeo' | 'file' | 'unknown', url?: string } {
  if (!raw) return { type: 'unknown' };

  const url = raw.trim();

  // YouTube: https://youtu.be/ID o https://www.youtube.com/watch?v=ID
  const ytMatch =
    url.match(/^https?:\/\/(?:www\.)?youtu\.be\/([A-Za-z0-9_-]{6,})/) ||
    url.match(/[?&]v=([A-Za-z0-9_-]{6,})/);
  if (ytMatch?.[1]) {
    return { type: 'youtube', url: `https://www.youtube.com/embed/${ytMatch[1]}` };
  }

  // Vimeo: https://vimeo.com/ID
  const vimeoMatch = url.match(/^https?:\/\/(?:www\.)?vimeo\.com\/(\d+)/);
  if (vimeoMatch?.[1]) {
    return { type: 'vimeo', url: `https://player.vimeo.com/video/${vimeoMatch[1]}` };
  }

  // Archivo directo (mp4, webm, ogg)
  if (/\.(mp4|webm|ogg)(\?.*)?$/.test(url)) {
    return { type: 'file', url };
  }

  return { type: 'unknown' };
}
