// src/utilities/video/embed.ts
export function toEmbeddableUrl(raw?: string): { 
  type: 'youtube' | 'vimeo' | 'file' | 'unknown', 
  url?: string 
} {
  if (!raw) return { type: 'unknown' };

  const url = raw.trim();

  // 🎥 YouTube (cubre watch?v=ID, youtu.be/ID, shorts/ID con o sin parámetros)
  const ytMatch =
    url.match(/^https?:\/\/(?:www\.)?youtu\.be\/([A-Za-z0-9_-]{6,})/) ||
    url.match(/[?&]v=([A-Za-z0-9_-]{6,})/) ||
    url.match(/^https?:\/\/(?:www\.)?youtube\.com\/shorts\/([A-Za-z0-9_-]{6,})/);

  if (ytMatch?.[1]) {
    const videoId = ytMatch[1];

    // 👇 Modo horizontal forzado (para Shorts, opcional)
    const embedUrl = `https://www.youtube.com/embed/${videoId}?rel=0&modestbranding=1`;

    return { type: 'youtube', url: embedUrl };
  }

  // 🎞️ Vimeo
  const vimeoMatch = url.match(/^https?:\/\/(?:www\.)?vimeo\.com\/(\d+)/);
  if (vimeoMatch?.[1]) {
    return { type: 'vimeo', url: `https://player.vimeo.com/video/${vimeoMatch[1]}` };
  }

  // 📁 Archivo directo (mp4, webm, ogg)
  if (/\.(mp4|webm|ogg)(\?.*)?$/.test(url)) {
    return { type: 'file', url };
  }

  return { type: 'unknown' };
}
