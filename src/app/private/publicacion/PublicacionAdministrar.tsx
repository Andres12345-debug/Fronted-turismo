import { useEffect, useState } from "react";
import { URLS } from "../../../utilities/dominios/urls";
import { ServicioGet } from "../../../services/ServicioGet";
import { ServicioDelete } from "../../../services/ServicioDelete";
import { crearMensaje } from "../../../utilities/funciones/mensaje";
import { ServicioPut } from "../../../services/ServicioPut";
import { Link } from "react-router-dom";
import { Button, Form, Modal } from "react-bootstrap";
import {
    Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper
} from "@mui/material";
import { Publicacion } from "../../../models/Publicacion";
import { toEmbeddableUrl } from "../../../utilities/video/embed"; // ✅ NUEVO (preview video)

export const PublicacionAdministrar = () => {
    const [arrPublicacion, setArrPublicacion] = useState<Publicacion[]>([]);

    // Seleccionada para editar/eliminar
    const [rolSeleccionado, setRolSeleccionado] = useState<Publicacion>(
        // Ajusta a tu constructor real. Si seguiste mi sugerencia: new Publicacion(0,0,"","","","",new Date(), [], undefined)
        new Publicacion(0, 0, "", "", "", "", new Date(), "")
    );

    const [show, setShow] = useState(false);
    const [showActualizar, setShowActualizar] = useState(false);
    const [showCrear, setShowCrear] = useState(false);

    // Reutilizamos selectedFiles y previewImages para crear y actualizar
    const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
    const [previewImages, setPreviewImages] = useState<string[]>([]);

    // Para crear (si luego lo usas)
    const [nuevaPublicacion, setNuevaPublicacion] = useState<Publicacion>(
        new Publicacion(0, 0, "", "", "", "", new Date(), "")
    );

    const handleCloser = () => setShow(false);

    const handleCloseActualizar = () => {
        setShowActualizar(false);
        setSelectedFiles([]);
        setPreviewImages([]);
    };

    const handleCloseCrear = () => {
        setShowCrear(false);
        setSelectedFiles([]);
        setPreviewImages([]);
        setNuevaPublicacion(new Publicacion(0, 0, "", "", "", "", new Date(), ""));
    };

    const consultarPublicacion = async () => {
        try {
            const urlServicio = URLS.URL_BASE + URLS.LISTAR_PUBLICACION_PRIVADA;
            const resultado = await ServicioGet.peticionGet(urlServicio);

            if (Array.isArray(resultado)) {
                setArrPublicacion(resultado);
            } else if (resultado && Array.isArray(resultado.objeto)) {
                setArrPublicacion(resultado.objeto);
            } else {
                console.error("Formato inesperado del backend:", resultado);
                setArrPublicacion([]);
            }
        } catch (error) {
            console.error("Error al consultar publicaciones:", error);
            setArrPublicacion([]);
        }
    };

    const eliminarRoles = async (codigo: number) => {
        const urlServicio = URLS.URL_BASE + URLS.ELIMINAR_PUBLICACION + "/" + codigo;
        const resultado = await ServicioDelete.peticionDelete(urlServicio);
        crearMensaje(
            resultado.affected ? "success" : "error",
            resultado.affected ? "Publicación eliminada satisfactoriamente" : "Fallo al eliminar la publicación"
        );
        consultarPublicacion();
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const archivosSeleccionados = Array.from(e.target.files);
            setSelectedFiles(archivosSeleccionados);

            // Generar previews
            archivosSeleccionados.forEach((archivo) => {
                const reader = new FileReader();
                reader.onload = (event) => {
                    if (event.target?.result) {
                        setPreviewImages((prev) => [...prev, event.target!.result as string]);
                    }
                };
                reader.readAsDataURL(archivo);
            });
        }
    };

    // Método para eliminar una imagen específica del preview
    const eliminarImagenPreview = (index: number) => {
        const nuevasImagenes = selectedFiles.filter((_, i) => i !== index);
        const nuevasPreviews = previewImages.filter((_, i) => i !== index);
        setSelectedFiles(nuevasImagenes);
        setPreviewImages(nuevasPreviews);
    };

    // ✅ Actualizar publicación (agregamos linkVideo)
    const actualizarPublicacion = async () => {
        const objActualizar: any = {
            tituloPublicacion: rolSeleccionado.tituloPublicacion,
            descripcionPublicacion: rolSeleccionado.descripcionPublicacion,
            linkVideo: (rolSeleccionado.linkVideo ?? "").trim() || null,
            imagenesFiles: selectedFiles
        };

        const resultado = await ServicioPut.putPublicacion(
            rolSeleccionado.codPublicacion,
            objActualizar
        );

        if (resultado?.mensaje === "Publicación actualizada" || resultado?.success) {
            crearMensaje("success", "Publicación actualizada satisfactoriamente");
            consultarPublicacion();
            setShowActualizar(false);
            setSelectedFiles([]);
            setPreviewImages([]);
        } else {
            crearMensaje("error", resultado?.mensaje || "Fallo al actualizar la publicación");
        }
    };

    useEffect(() => {
        consultarPublicacion();
    }, []);

    // ✅ Preview video para el modal de actualizar
    const emb = toEmbeddableUrl(rolSeleccionado?.linkVideo);

    return (
        <div className="m-4">
            <div className="row">
                <div className="col-4">
                    <h4 className="fst-italic fw-bold display-4">Administrar Publicaciones</h4>
                </div>
                <div className="col-8 d-flex justify-content-end align-items-center">
                    <ol className="breadcrumb breadcrumb-info breadcrumb-transparent fs-3 mb-0">
                        <li className="breadcrumb-item">
                            <Link to="/dash">
                                <i className="fa fa-home"></i>
                            </Link>
                        </li>
                        <li className="breadcrumb-item">
                            <a href="#"> Publicacion</a>
                        </li>
                        <li className="breadcrumb-item text-warning">Administrar</li>
                    </ol>
                </div>
            </div>

            <div className="d-flex justify-content-center mt-3">
                <div className="col-md-10">
                    <TableContainer component={Paper} sx={{ maxHeight: 500 }}>
                        <Table stickyHeader size="small" aria-label="tabla publicaciones">
                            <TableHead>
                                <TableRow>
                                    <TableCell align="center" sx={{ fontWeight: "bold", width: "20%" }}>
                                        Título
                                    </TableCell>
                                    <TableCell align="center" sx={{ fontWeight: "bold", width: "20%" }}>
                                        Imagen
                                    </TableCell>
                                    <TableCell align="center" sx={{ fontWeight: "bold", width: "15%" }}>
                                        Video
                                    </TableCell>
                                    <TableCell align="center" sx={{ fontWeight: "bold", width: "20%" }}>
                                        Acciones
                                    </TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {arrPublicacion.map((objRol, indice) => (
                                    <TableRow key={indice} hover>
                                        <TableCell align="center">{objRol.tituloPublicacion}</TableCell>
                                        <TableCell align="center">
                                            {objRol.imagenUrl ? (
                                                <img
                                                    src={URLS.URL_BASE + objRol.imagenUrl}
                                                    alt="Publicación"
                                                    style={{ width: "80px", height: "80px", objectFit: "cover", borderRadius: "8px" }}
                                                />
                                            ) : "Sin imagen"}
                                        </TableCell>

                                        {/* ✅ Indicador simple si hay video */}
                                        <TableCell align="center">
                                            {objRol.linkVideo ? (
                                                <span className="badge bg-dark">▶︎</span>
                                            ) : (
                                                <span className="text-muted">—</span>
                                            )}
                                        </TableCell>

                                        <TableCell align="center">
                                            <Button
                                                className="btn btn-warning btn-sm mx-1"
                                                onClick={() => {
                                                    setRolSeleccionado(objRol);
                                                    setShowActualizar(true);
                                                }}
                                            >
                                                <i className="fa fa-edit"></i>
                                            </Button>
                                            <Button
                                                className="btn btn-danger btn-sm mx-1"
                                                onClick={() => {
                                                    setRolSeleccionado(objRol);
                                                    setShow(true);
                                                }}
                                            >
                                                <i className="fa fa-trash"></i>
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </div>
            </div>

            {/* Modal Eliminar */}
            <Modal show={show} onHide={handleCloser} backdrop="static" keyboard={false}>
                <Modal.Header closeButton className="bg-primary text-warning">
                    <Modal.Title>Eliminar Publicación</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    ¿Está seguro de eliminar <strong>{rolSeleccionado.tituloPublicacion}</strong>?
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloser}>
                        Cancelar
                    </Button>
                    <Button
                        variant="danger"
                        onClick={() => {
                            eliminarRoles(rolSeleccionado.codPublicacion);
                            setShow(false);
                        }}
                    >
                        Eliminar
                    </Button>
                </Modal.Footer>
            </Modal>

            {/* ✅ Modal Actualizar (con campo y preview de video) */}
            <Modal show={showActualizar} onHide={handleCloseActualizar} backdrop="static" keyboard={false}>
                <Modal.Header closeButton className="bg-primary text-warning">
                    <Modal.Title>Actualizar Publicación</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group controlId="formTitulo">
                            <Form.Label>Título</Form.Label>
                            <Form.Control
                                type="text"
                                value={rolSeleccionado.tituloPublicacion}
                                onChange={(e) =>
                                    setRolSeleccionado({ ...rolSeleccionado, tituloPublicacion: e.target.value })
                                }
                            />
                        </Form.Group>

                        <Form.Group controlId="formContenido" className="mt-2">
                            <Form.Label>Contenido</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={3}
                                value={rolSeleccionado.descripcionPublicacion}
                                onChange={(e) =>
                                    setRolSeleccionado({ ...rolSeleccionado, descripcionPublicacion: e.target.value })
                                }
                            />
                        </Form.Group>

                        {/* ✅ Campo Link de video */}
                        <Form.Group controlId="formLinkVideo" className="mt-2">
                            <Form.Label>Link de video (YouTube, Vimeo o MP4)</Form.Label>
                            <Form.Control
                                type="url"
                                value={rolSeleccionado.linkVideo ?? ""}
                                onChange={(e) =>
                                    setRolSeleccionado({ ...rolSeleccionado, linkVideo: e.target.value })
                                }
                                placeholder="Ej: https://youtu.be/xxxxxxxxx o https://dominio/video.mp4"
                            />
                            <Form.Text className="text-muted">
                                Si agregas un link válido se mostrará un reproductor en el detalle.
                            </Form.Text>

                            {/* ✅ Preview en vivo */}
                            {rolSeleccionado.linkVideo && (
                                <div className="mt-2">
                                    {emb.type === "youtube" || emb.type === "vimeo" ? (
                                        <div className="ratio ratio-16x9">
                                            <iframe
                                                src={emb.url}
                                                title="Preview video"
                                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                                allowFullScreen
                                                referrerPolicy="no-referrer-when-downgrade"
                                            />
                                        </div>
                                    ) : emb.type === "file" && emb.url ? (
                                        <video className="w-100" controls preload="metadata" style={{ borderRadius: 8 }}>
                                            <source src={emb.url} />
                                            Tu navegador no soporta el video.
                                        </video>
                                    ) : (
                                        <small className="text-muted">No se reconoce el formato del enlace.</small>
                                    )}
                                </div>
                            )}
                        </Form.Group>

                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseActualizar}>
                        Cancelar
                    </Button>
                    <Button variant="primary" onClick={actualizarPublicacion}>
                        Actualizar
                    </Button>
                </Modal.Footer>
            </Modal>

            {/* Modal Crear (si lo usas más adelante) */}
            <Modal show={showCrear} onHide={handleCloseCrear} backdrop="static" keyboard={false}>
                <Modal.Header closeButton className="bg-success text-white">
                    <Modal.Title>Crear Nueva Publicación</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group controlId="formTituloCrear">
                            <Form.Label>Título</Form.Label>
                            <Form.Control
                                type="text"
                                value={nuevaPublicacion.tituloPublicacion}
                                onChange={(e) =>
                                    setNuevaPublicacion({ ...nuevaPublicacion, tituloPublicacion: e.target.value })
                                }
                            />
                        </Form.Group>
                        <Form.Group controlId="formContenidoCrear" className="mt-2">
                            <Form.Label>Contenido</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={3}
                                value={nuevaPublicacion.descripcionPublicacion}
                                onChange={(e) =>
                                    setNuevaPublicacion({ ...nuevaPublicacion, descripcionPublicacion: e.target.value })
                                }
                            />
                        </Form.Group>

                        {/* (Opcional) Campo video para crear */}
                        <Form.Group controlId="formLinkVideoCrear" className="mt-2">
                            <Form.Label>Link de video (YouTube, Vimeo o MP4)</Form.Label>
                            <Form.Control
                                type="url"
                                value={nuevaPublicacion.linkVideo ?? ""}
                                onChange={(e) =>
                                    setNuevaPublicacion({ ...nuevaPublicacion, linkVideo: e.target.value })
                                }
                                placeholder="Ej: https://youtu.be/xxxxxxxxx o https://dominio/video.mp4"
                            />
                        </Form.Group>

                        <Form.Group controlId="formImagenesCrear" className="mt-2">
                            <Form.Label>Imágenes (puedes seleccionar múltiples)</Form.Label>
                            <Form.Control type="file" multiple accept="image/*" onChange={handleFileChange} />
                            <Form.Text className="text-muted">
                                Selecciona 1 o más imágenes. La primera será la principal.
                            </Form.Text>

                            {previewImages.length > 0 && (
                                <div className="mt-3">
                                    <Form.Label>Imágenes seleccionadas:</Form.Label>
                                    <div className="d-flex flex-wrap gap-2">
                                        {previewImages.map((preview, index) => (
                                            <div key={index} className="position-relative">
                                                <img
                                                    src={preview}
                                                    alt={`Nueva imagen ${index + 1}`}
                                                    style={{
                                                        width: "120px",
                                                        height: "120px",
                                                        objectFit: "cover",
                                                        borderRadius: "8px",
                                                    }}
                                                />
                                                <button
                                                    type="button"
                                                    className="btn btn-danger btn-sm position-absolute top-0 end-0"
                                                    style={{
                                                        transform: "translate(50%, -50%)",
                                                        borderRadius: "50%",
                                                        width: "25px",
                                                        height: "25px",
                                                        display: "flex",
                                                        alignItems: "center",
                                                        justifyContent: "center",
                                                        padding: "0",
                                                    }}
                                                    onClick={() => eliminarImagenPreview(index)}
                                                >
                                                    ×
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </Form.Group>
                    </Form>
                </Modal.Body>
            </Modal>
        </div>
    );
};
