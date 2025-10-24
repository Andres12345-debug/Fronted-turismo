// src/app/.../ModalPublicacion.tsx
import { Modal } from "react-bootstrap";
import { Carousel } from "react-responsive-carousel";
import { Publicacion } from "../../../../models/Publicacion";
import { URLS } from "../../../../utilities/dominios/urls";
import { useEffect, useMemo } from "react";
import { useTheme } from "@mui/material/styles";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { toEmbeddableUrl } from "../../../../utilities/video/embed";
import { ImagenConHeader } from "../../../../utilities/funciones/imagenConHeader";

interface ModalPublicacionProps {
  show: boolean;
  handleClose: () => void;
  publicacion: Publicacion | null;
}

type MediaItem =
  | { kind: "video"; url: string; provider: "youtube" | "vimeo" | "file" }
  | { kind: "image"; url: string; alt: string };

export const ModalPublicacion: React.FC<ModalPublicacionProps> = ({
  show,
  handleClose,
  publicacion,
}) => {
  const theme = useTheme();

  // Construimos una galería combinada: video (si hay) + imágenes
  const gallery: MediaItem[] = useMemo(() => {
    const items: MediaItem[] = [];

    // 1) Video primero si existe y es reconocible
    const emb = toEmbeddableUrl(publicacion?.linkVideo);
    if (emb.type !== "unknown" && emb.url) {
      items.push({
        kind: "video",
        url: emb.url!,
        provider:
          emb.type === "youtube" || emb.type === "vimeo" ? emb.type : "file",
      });
    }

    // 2) Todas las imágenes (múltiples o única)
    if (publicacion?.imagenesUrls?.length) {
      for (const img of publicacion.imagenesUrls) {
        items.push({
          kind: "image",
          url: URLS.URL_BASE + img,
          alt: `Imagen de ${publicacion.tituloPublicacion}`,
        });
      }
    } else if (publicacion?.imagenUrl) {
      items.push({
        kind: "image",
        url: URLS.URL_BASE + publicacion.imagenUrl,
        alt: `Imagen principal de ${publicacion.tituloPublicacion}`,
      });
    }

    return items;
  }, [publicacion]);

  // SEO dinámico (mínimo indispensable)
  useEffect(() => {
    if (show && publicacion) {
      const metaTitle = `${publicacion.tituloPublicacion} - Detalles`;
      const metaDescription = publicacion.descripcionPublicacion || "";
      const imageUrl =
        (publicacion.imagenesUrls?.[0] && URLS.URL_BASE + publicacion.imagenesUrls[0]) ||
        (publicacion.imagenUrl && URLS.URL_BASE + publicacion.imagenUrl) ||
        "";

      document.title = metaTitle;

      const ensureMeta = (sel: string, create: () => HTMLMetaElement) => {
        let tag = document.querySelector(sel) as HTMLMetaElement | null;
        if (!tag) {
          tag = create();
          document.head.appendChild(tag);
        }
        return tag;
      };

      ensureMeta(`meta[name="description"]`, () => {
        const m = document.createElement("meta");
        m.name = "description";
        return m;
      }).content = metaDescription;

      ensureMeta(`meta[property="og:title"]`, () => {
        const m = document.createElement("meta");
        m.setAttribute("property", "og:title");
        return m;
      }).content = metaTitle;

      ensureMeta(`meta[property="og:description"]`, () => {
        const m = document.createElement("meta");
        m.setAttribute("property", "og:description");
        return m;
      }).content = metaDescription;

      if (imageUrl) {
        ensureMeta(`meta[property="og:image"]`, () => {
          const m = document.createElement("meta");
          m.setAttribute("property", "og:image");
          return m;
        }).content = imageUrl;
      }
    }

    return () => {
      document.title = "Tu título por defecto";
    };
  }, [show, publicacion]);

  return (
    <Modal
      show={show}
      onHide={handleClose}
      size="xl"
      centered
      aria-labelledby="property-modal-title"
      style={{ backgroundColor: "rgba(0, 0, 0, 0.64)" }}
    >
      <Modal.Header style={{ backgroundColor: "rgba(0, 0, 0, 0.08)" }} closeButton>
        <Modal.Title
          id="property-modal-title"
          itemProp="name"
          style={{ textTransform: "uppercase" }}
        >
          {publicacion?.tituloPublicacion}
        </Modal.Title>
      </Modal.Header>

      <Modal.Body itemScope itemType="https://schema.org/RealEstateListing">
        {/* Dos columnas: en mobile el carrusel arriba, info abajo */}
        <div className="row g-4">
          {/* Columna multimedia: carrusel unificado */}
          <div className="col-12 col-lg-7">
            {gallery.length > 0 ? (
              <Carousel
                infiniteLoop
                showArrows
                showThumbs
                showStatus={false}
                swipeable
                emulateTouch
                dynamicHeight={false}
                renderThumbs={() =>
                  gallery.map((item, idx) =>
                    item.kind === "image" ? (
                      <ImagenConHeader
                        key={`thumb-${idx}`}
                        src={item.url}
                        alt={item.alt}
                        style={{ objectFit: "cover" }}
                      />
                    ) : (
                      // Miniatura para video (ícono ▶︎ simple)
                      <div
                        key={`thumb-${idx}`}
                        style={{
                          width: "100%",
                          height: "100%",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontWeight: 700,
                          fontSize: 18,
                        }}
                        aria-label="Video"
                        title="Video"
                      >
                        ▶︎
                      </div>
                    )
                  )
                }
              >
                {gallery.map((item, i) =>
                  item.kind === "image" ? (
                    <div key={`slide-img-${i}`} className="d-flex justify-content-center">
                      <img
                        src={item.url}
                        alt={item.alt}
                        className="img-fluid"
                        style={{
                          maxHeight: "64vh",
                          width: "100%",
                          objectFit: "contain",
                          borderRadius: 8,
                        }}
                        loading="lazy"
                        decoding="async"
                        itemProp="contentUrl"
                      />
                    </div>
                  ) : item.provider === "file" ? (
                    <div key={`slide-vid-${i}`} className="d-flex justify-content-center">
                      <video
                        className="w-100"
                        controls
                        preload="metadata"
                        style={{ maxHeight: "64vh", borderRadius: 8, background: "#000" }}
                      >
                        <source src={item.url} />
                        Tu navegador no soporta el video.
                      </video>
                    </div>
                  ) : (
                    <div key={`slide-vid-${i}`} className="ratio ratio-16x9">
                      <iframe
                        src={item.url}
                        title="Video de la publicación"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        referrerPolicy="no-referrer-when-downgrade"
                        style={{ borderRadius: 8 }}
                      />
                    </div>
                  )
                )}
              </Carousel>
            ) : (
              <div
                className="bg-secondary text-white d-flex align-items-center justify-content-center"
                style={{ height: "320px", borderRadius: 8 }}
                aria-hidden="true"
              >
                Sin multimedia disponible
              </div>
            )}
          </div>

          {/* Columna de detalles */}
          <div className="col-12 col-lg-5">
            <div style={{ lineHeight: 1.6 }}>
              <p itemProp="description" style={{ whiteSpace: "pre-wrap" }}>
                {publicacion?.descripcionPublicacion}
              </p>

              {/* Metadatos útiles (si los tienes) */}
              <div className="text-muted small mt-3">
                {publicacion?.fechaCreacionPublicacion && (
                  <div>
                    Publicado el{" "}
                    {new Date(publicacion.fechaCreacionPublicacion).toLocaleDateString("es-ES", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </div>
                )}
                {publicacion?.ubicacionPublicacion && (
                  <div>Ubicación: {publicacion.ubicacionPublicacion}</div>
                )}
                {publicacion?.linkVideo && (
                  <div className="mt-1" aria-label="Esta publicación incluye video">
                    <span className="badge bg-dark-subtle text-dark">▶︎ Video incluido</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default ModalPublicacion;
