import { useEffect, useState } from "react";
import { Button, Form, Card, Row, Col } from "react-bootstrap";
import { ServicioPost } from "../../../services/ServicioPost";
import { crearMensaje } from "../../../utilities/funciones/mensaje";
import { URLS } from "../../../utilities/dominios/urls";
import { Usuario } from "../../../models/Usuario";
import { ServicioGet } from "../../../services/ServicioGet";
import { Publicacion } from "../../../models/Publicacion";
import { toEmbeddableUrl } from "../../../utilities/video/embed";


export const PublicacionRegistrar = () => {
  // Estado inicial del formulario
  const [formData, setFormData] = useState<Publicacion>(() =>
    new Publicacion(0, 1, "", "", "", "", new Date(), "") // Añadir codUsuario por defecto
  );

  // Estado para almacenar los usuarios
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);

  // Estado para almacenar múltiples archivos de imagen
  const [imagenes, setImagenes] = useState<File[]>([]);
  const [previewImages, setPreviewImages] = useState<string[]>([]);

  // Obtener los usuarios desde el backend
  const obtenerUsuarios = async () => {
    const urlServicio = URLS.URL_BASE + URLS.LISTAR_USUARIOS;
    try {
      const resultado = await ServicioGet.peticionGet(urlServicio);
      setUsuarios(Array.isArray(resultado) ? resultado : []);
    } catch (error) {
      console.error("Error al obtener los usuarios:", error);
      crearMensaje("error", "No se pudo cargar la lista de usuarios.");
    }
  };

  // Ejecutar obtenerUsuarios al cargar el componente
  useEffect(() => {
    obtenerUsuarios();
  }, []);

  // Método para manejar múltiples archivos de imagen
  const manejarImagenes = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const archivosSeleccionados = Array.from(e.target.files);

      // Guardar las imágenes en el estado
      setImagenes((prev) => [...prev, ...archivosSeleccionados]);

      // Generar previews
      const nuevasPreviews = archivosSeleccionados.map((archivo) =>
        URL.createObjectURL(archivo)
      );

      setPreviewImages((prev) => [...prev, ...nuevasPreviews]);
    }
  };


  //Para puntos y comas
  const formatNumber = (value: string) => {
    return value.replace(/\B(?=(\d{3})+(?!\d))/g, "."); // agrega puntos
  };

  // Método para eliminar una imagen específica
  const eliminarImagen = (index: number) => {
    const nuevasImagenes = imagenes.filter((_, i) => i !== index);
    const nuevasPreviews = previewImages.filter((_, i) => i !== index);
    setImagenes(nuevasImagenes);
    setPreviewImages(nuevasPreviews);
  };

  // Método para registrar la publicación
  const crearPublicacion = async () => {
    // Validación de campos
    if (
      !formData.tituloPublicacion.trim() ||
      !formData.descripcionPublicacion.trim() ||
      imagenes.length === 0 // Verificamos que haya al menos una imagen
    ) {
      crearMensaje("error", "Por favor, complete todos los campos obligatorios y suba al menos una imagen.");
      return;
    }

    // Crear el objeto FormData
    const formDataToSend = new FormData();
    formDataToSend.append("tituloPublicacion", formData.tituloPublicacion);
    formDataToSend.append("descripcionPublicacion", formData.descripcionPublicacion);

    // Agregar múltiples imágenes
    imagenes.forEach((imagen, index) => {
      formDataToSend.append(`imagenes`, imagen);
    });

    formDataToSend.append("codUsuario", formData.codUsuario.toString());
    formDataToSend.append("fechaCreacionPublicacion", formData.fechaCreacionPublicacion.toISOString());
    if (formData.linkVideo?.trim()) {
      formDataToSend.append("linkVideo", formData.linkVideo.trim());
    }


    // URL del servicio
    const urlServicio = URLS.URL_BASE + URLS.CREAR_PUBLICACION;

    try {
      // Llamamos al servicio para crear la publicación
      const resultado = await ServicioPost.peticionPost(urlServicio, formDataToSend, true); // true para multipart

      // Manejar la respuesta
      if (resultado.success) {
        crearMensaje("success", resultado.message || "Publicación registrada con éxito.");

        // Resetear formulario
        setFormData(new Publicacion(0, 1, "", "", "", "", new Date(), "")); // Reiniciar el formulario
        setImagenes([]); // Limpiar las imágenes
        setPreviewImages([]); // Limpiar las previews
      } else {
        crearMensaje("error", resultado.message || "Error al crear la publicación.");
      }
    } catch (error) {
      console.error("Error en la creación:", error);
      crearMensaje("error", "Error de conexión con el servidor.");
    }
  };

  // Renderización del formulario
  return (
    <div className="m-4">
      <h3 className="text-center mb-4">Formulario de Registro de Publicación</h3>

      <Card className="shadow-sm p-4">
        <Card.Body>
          <Form>
            <Row className="mb-3">
              {/* Título Publicación */}
              <Col sm={12} md={6}>
                <Form.Group controlId="formTituloPublicacion">
                  <Form.Label>Título Publicación</Form.Label>
                  <Form.Control
                    type="text"
                    value={formData.tituloPublicacion}
                    onChange={(e) =>
                      setFormData({ ...formData, tituloPublicacion: e.target.value })
                    }
                    placeholder="Ejemplo: Casa en arriendo – Barrio Altamira, Tunja"
                  />
                </Form.Group>
              </Col>
              {/* ✅ Campo Link de video */}
              <Col sm={12} md={6}>
                <Form.Group controlId="formLinkVideo">
                  <Form.Label>Link de video (YouTube, Vimeo o MP4)</Form.Label>
                  <Form.Control
                    type="url"
                    value={formData.linkVideo ?? ""}
                    onChange={(e) =>
                      setFormData({ ...formData, linkVideo: e.target.value })
                    }
                    placeholder="Ej: https://youtu.be/xxxxxxxxx o https://dominio/video.mp4"
                  />
                  <Form.Text className="text-muted">
                    Pega un enlace de YouTube, Vimeo o un archivo .mp4/.webm/.ogg
                  </Form.Text>
                </Form.Group>

                {/* ✅ Preview simple */}
                {formData.linkVideo && (() => {
                  const emb = toEmbeddableUrl(formData.linkVideo);
                  if (emb.type === "youtube" || emb.type === "vimeo") {
                    return (
                      <div className="ratio ratio-16x9 mt-2">
                        <iframe
                          src={emb.url}
                          title="Preview video"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                          referrerPolicy="no-referrer-when-downgrade"
                        />
                      </div>
                    );
                  } else if (emb.type === "file" && emb.url) {
                    return (
                      <video className="mt-2 w-100" controls preload="metadata">
                        <source src={emb.url} />
                        Tu navegador no soporta el video.
                      </video>
                    );
                  }
                  return null;
                })()}
              </Col>
              {/* Descripcion Publicación */}
              <Col sm={12} md={6}>
                <Form.Group controlId="formDescripcionPublicacion">
                  <Form.Label>Descripción Publicación</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={6}
                    value={formData.descripcionPublicacion}
                    onChange={(e) => {
                      const value = e.target.value;
                      if (value.length <= 500) {
                        setFormData({ ...formData, descripcionPublicacion: value });
                      }
                    }}
                    placeholder="Especifica el contenido de la publicación"
                  />
                  <Form.Text muted>
                    {formData.descripcionPublicacion.length}/500 caracteres
                  </Form.Text>
                </Form.Group>
              </Col>
              {/* Selección de Usuario */}
              <Row className="mb-3">
                <Col sm={12} md={6}>
                  <Form.Group controlId="formRolUsuario">
                    <Form.Label>Usuario</Form.Label>
                    <Form.Control
                      as="select"
                      value={formData.codUsuario}
                      onChange={(e) =>
                        setFormData({ ...formData, codUsuario: parseInt(e.target.value) })
                      }
                    >
                      <option value="0">Seleccione un usuario</option>
                      {usuarios.map((usuario) => (
                        <option key={usuario.codUsuario} value={usuario.codUsuario}>
                          {usuario.nombreUsuario}
                        </option>
                      ))}
                    </Form.Control>
                  </Form.Group>
                </Col>
              </Row>
              {/* Contacto de WhatsApp */}
              <Col sm={12}>
                <Form.Group controlId="formImagenes">
                  <Form.Label>Imágenes (selecciona múltiples imágenes)</Form.Label>
                  <Form.Control
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={manejarImagenes}
                  />
                  <Form.Text className="text-muted">
                    Puedes seleccionar múltiples imágenes para tu publicación.
                  </Form.Text>
                </Form.Group>
                {/* Vista previa de imágenes */}
                {previewImages.length > 0 && (
                  <div className="mt-3">
                    <Form.Label>Vista previa de imágenes:</Form.Label>
                    <div className="d-flex flex-wrap gap-2">
                      {previewImages.map((preview, index) => (
                        <div key={index} className="position-relative">
                          <img
                            src={preview}
                            alt={`Preview ${index + 1}`}
                            style={{
                              width: "120px",
                              height: "120px",
                              objectFit: "cover",
                              borderRadius: "8px"
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
                              padding: "0"
                            }}
                            onClick={() => eliminarImagen(index)}
                          >
                            ×
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </Col>

              {/* Fecha de Publicación */}

            </Row>



            {/* Botón de Enviar */}
            <Button variant="primary" onClick={crearPublicacion}>
              Registrar Publicación
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
};
