export class Publicacion {
  public codPublicacion: number;
  public codUsuario: number;
  public tituloPublicacion: string;
  public descripcionPublicacion: string;
  public imagenUrl: string;
  public imagenesUrls: string[]; // Array para múltiples imágenes
  public fechaCreacionPublicacion: Date;
  public ubicacionPublicacion: string;
  public linkVideo?: string; // Enlace opcional a un video

  constructor(
    codP: number,
    codUsu: number,
    tit: string,
    descrip: string,
    ubi: string,
    img: string,
    fec: Date,
    link: string,
    imagenes: string[] = [], // ✅ Array para múltiples imágenes con valor por defecto
  ) {
    this.codPublicacion = codP;
    this.codUsuario = codUsu;
    this.tituloPublicacion = tit;
    this.descripcionPublicacion = descrip;
    this.imagenUrl = img;
    this.imagenesUrls = imagenes; // ✅ Asignar array de imágenes
    this.fechaCreacionPublicacion = fec;
    this.ubicacionPublicacion = ubi;
    this.linkVideo = link;
  }
}
