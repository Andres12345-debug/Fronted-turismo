
export const OPCIONES_MENU = [
    {
        titulo: "Inicio",
        ruta: "/dash/welcome",
        icono: "fa fa-home text-muted"
    },
   
    , {
        titulo: "Publicaciones",
        ruta: "/dash/publicacion",
        icono: "fa fa-camera text-muted",
        hijos: [
            {
                titulo: "Administrar",
                ruta: "/dash/adminPublicacion"
            },
            {
                titulo: "Registrar",
                ruta: "/dash/addPublicacion"
            }

        ]

    }



]