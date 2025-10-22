export const URLS = {
    URL_BASE: "https://undeft-psychomotor-marla.ngrok-free.dev",
    INICIAR_SESION: "/publico/accesos/signin",
    REGISTRO: "/publico/registros/user",



    LISTAR_PUBLICACION_PUBLICA: "/publico/publicacions-publicas/publico",
    LISTAR_PUBLICACION_POR_TIPO: "/publico/publicaciones/tipoCasa/:tipoVivienda",
    LISTAR_PUBLICACION_POR_ID: "/publico/publicaciones/one/:codPublicacion",
    LISTAR_PUBLICACION_POR_TITULO: "/publico/publicaciones/buscar/:titulo",


    /****SERVICIOS PRIVADOS ************ */
    LISTAR_USUARIOS: "/privado/usuarios/todos",
    CREAR_USUARIO: "/privado/usuarios/agregar",
    ACTUALIZAR_USUARIO: "/privado/usuarios/update",
    ELIMINAR_USUARIO: "/privado/usuarios/delete",
        
    
    /****SERVICIOS PRIVADOS PARA EL PERFIL ************ */
    LISTAR_PERFIL: "/privado/usuarios/perfil",
    ACTUALIZAR_PERFIL: "/privado/usuarios/perfil/actualizar",


    LISTAR_ROLES: "/privado/roles/todos",
    CREAR_ROLES: "/privado/roles/agregar",
    ACTUALIZAR_ROLES: "/privado/roles/update",
    ELIMINAR_ROLES: "/privado/roles/delete",


    LISTAR_PUBLICACION: "/privado/publicaciones/todos",
    LISTAR_PUBLICACION_PRIVADA: "/privado/publicaciones/mis-publicaciones",

    CREAR_PUBLICACION: "/privado/publicaciones/agregar",
    CREAR_PUBLICACION_CON_IMAGENES: "/privado/publicaciones/agregar-con-imagenes",
    ACTUALIZAR_PUBLICACION: "/privado/publicaciones/update",
    ELIMINAR_PUBLICACION: "/privado/publicaciones/delete",

    
}