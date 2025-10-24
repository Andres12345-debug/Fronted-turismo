import { useEffect, useState, useRef, useCallback } from "react";
import { Carousel } from "react-responsive-carousel";
import { Publicacion } from "../../../../models/Publicacion";
import { URLS } from "../../../../utilities/dominios/urls";
import { ServicioGet } from "../../../../services/ServicioGet";
import { ModalPublicacion } from "../../../shared/components/modalPublicacion";
import { Box, Typography } from "@mui/material";
import { ImagenConHeader } from "../../../../utilities/funciones/imagenConHeader";

export const CarrucelViajes = () => {
    // Estado para almacenar las publicaciones
    const [arrPubli, setArrPubli] = useState<Publicacion[]>([]);
    // Estado para mostrar el modal
    const [showModal, setShowModal] = useState(false);
    const [selectedPublicacion, setSelectedPublicacion] = useState<Publicacion | null>(null);

    // Consultar publicaciones
    const consultarPublicaciones = async () => {
        const urlServicio = URLS.URL_BASE + URLS.LISTAR_PUBLICACION_PUBLICA;
        try {
            const resultado = await ServicioGet.peticionGet(urlServicio);
            setArrPubli(Array.isArray(resultado) ? resultado : []);
        } catch (error) {
            console.error("Error al obtener publicaciones:", error);
        }
    };

    useEffect(() => {
        consultarPublicaciones();
    }, []);
    // Función para abrir el modal con los detalles de la publicación seleccionada
    const handleShowModal = (publicacion: Publicacion) => {
        setSelectedPublicacion(publicacion);
        setShowModal(true);
    };
    // Función para cerrar el modal
    const handleCloseModal = () => {
        setShowModal(false);
        setSelectedPublicacion(null);
    };
    return (
        <div className="container mt-5">
            <Box sx={{ display: 'flex', justifyContent: 'center', flex: 1 }}>
                <Typography
                    variant="h6"
                    component="h1"
                    color="text.primary"
                    padding={2}
                    sx={{ fontWeight: 600, textAlign: 'center' }}
                >
                    Todos los viajes de las personas !
                </Typography>
            </Box>
            <div className="row gy-4">                
                {arrPubli.length > 0 ? (
                    arrPubli.map((publicacion, index) => (
                        <div className="col-md-4" key={index}>
                            <div
                                className="card shadow-sm bg-dark-subtle"
                                style={{ cursor: "pointer" }}
                                onClick={() => handleShowModal(publicacion)}
                            >
                                <div className="card-img-top p-3" style={{ height: "200px", overflow: "hidden" }}>
                                    {publicacion.imagenesUrls && publicacion.imagenesUrls.length > 0 ? (
                                        <>
                                            <ImagenConHeader
                                                src={URLS.URL_BASE + publicacion.imagenesUrls[0]}
                                                alt="Publicación"
                                                className="img-fluid w-100 h-100 rounded-3"
                                                style={{ objectFit: "cover" }}
                                            />
                                            {publicacion.imagenesUrls.length > 1 && (
                                                <div
                                                    className="position-absolute top-0 end-0 bg-dark text-white px-2 py-1 rounded-2 m-2"
                                                    style={{ fontSize: "0.8rem", zIndex: 2 }}
                                                >
                                                    +{publicacion.imagenesUrls.length - 1}
                                                </div>
                                            )}
                                        </>
                                    ) : publicacion.imagenUrl ? (
                                        <ImagenConHeader
                                            src={URLS.URL_BASE + publicacion.imagenUrl}
                                            alt="Publicación"
                                            className="img-fluid w-100 h-100 rounded-3"
                                            style={{ objectFit: "cover" }}
                                        />
                                    ) : (
                                        <div className="d-flex justify-content-center align-items-center h-100 bg-secondary text-white">
                                            Sin Imagen
                                        </div>
                                    )}
                                </div>
                                <div className="card-body">
                                    <h5 className="card-title text-truncate">{publicacion.tituloPublicacion}</h5>
                                    <p className="card-text">{publicacion.descripcionPublicacion}</p>
                                    <small className="text-muted">
                                        Publicado el{" "}
                                        {new Date(publicacion.fechaCreacionPublicacion).toLocaleDateString("es-ES", {
                                            year: "numeric",
                                            month: "long",
                                            day: "numeric",
                                        })}
                                    </small>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="col-12 text-center">
                        <p className="text-muted">No hay publicaciones disponibles en este momento.</p>
                    </div>
                )}
            </div>

            {/* Modal reutilizable */}
            <ModalPublicacion
                show={showModal}
                handleClose={handleCloseModal}
                publicacion={selectedPublicacion}
            />
        </div>
    );
};

export default CarrucelViajes;
