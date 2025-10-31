import React, { useEffect, useState } from "react";
import "./Publicaciones.css";

// ✅ Definimos el tipo aquí para evitar errores de compilación
interface Publicacion {
  idPublicacion?: number;
  tituloPublicacion: string;
  descripcionPublicacion: string;
  fechaCreacionPublicacion: string;
  imagenUrl?: string;
  imagenesUrls?: string[];
  videoUrl?: string;
  tipo?: "short" | "normal";
}

const Publicaciones: React.FC = () => {
  const [arrPubli, setArrPubli] = useState<Publicacion[]>([]);

  useEffect(() => {
    // Ejemplo de carga de datos
    const publicaciones: Publicacion[] = [
      {
        idPublicacion: 1,
        tituloPublicacion: "Video horizontal",
        descripcionPublicacion: "Este es un video normal",
        fechaCreacionPublicacion: "2025-10-30",
        videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
        tipo: "normal",
      },
      {
        idPublicacion: 2,
        tituloPublicacion: "Short vertical",
        descripcionPublicacion: "Este es un short vertical",
        fechaCreacionPublicacion: "2025-10-30",
        videoUrl: "https://www.w3schools.com/html/movie.mp4",
        tipo: "short",
      },
      {
        idPublicacion: 3,
        tituloPublicacion: "Imagen horizontal",
        descripcionPublicacion: "Una imagen horizontal adaptada al formato",
        fechaCreacionPublicacion: "2025-10-30",
        imagenUrl:
          "https://images.unsplash.com/photo-1519125323398-675f0ddb6308",
        tipo: "normal",
      },
      {
        idPublicacion: 4,
        tituloPublicacion: "Imagen vertical",
        descripcionPublicacion: "Una imagen vertical tipo short",
        fechaCreacionPublicacion: "2025-10-30",
        imagenUrl:
          "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e",
        tipo: "short",
      },
    ];

    setArrPubli(publicaciones);
  }, []);

  return (
    <div className="publicaciones-container">
      {arrPubli.map((publi) => (
        <div
          key={publi.idPublicacion}
          className={`publicacion-card ${
            publi.tipo === "short" ? "short" : "normal"
          }`}
        >
          {publi.videoUrl ? (
            <video
              src={publi.videoUrl}
              controls
              className={`publicacion-video ${
                publi.tipo === "short" ? "video-short" : "video-normal"
              }`}
            />
          ) : (
            <img
              src={publi.imagenUrl}
              alt={publi.tituloPublicacion}
              className={`publicacion-imagen ${
                publi.tipo === "short" ? "img-short" : "img-normal"
              }`}
            />
          )}
          <div className="publicacion-info">
            <h3>{publi.tituloPublicacion}</h3>
            <p>{publi.descripcionPublicacion}</p>
            <span>{publi.fechaCreacionPublicacion}</span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Publicaciones;
