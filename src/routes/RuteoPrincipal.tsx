import { lazy } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { Vigilante } from "../app/seguridad/Vigilante";

// Lazy imports (páginas públicas)
const LazySesion = lazy(() =>
  import("../app/public/Sesion").then(() => ({
    default: require("../app/public/Sesion").Sesion
  }))
);
const LazyRegistro = lazy(() =>
  import("../app/public/Registro").then(() => ({
    default: require("../app/public/Registro").Registro
  }))
);
const LazyError = lazy(() =>
  import("../app/shared/Error").then(() => ({
    default: require("../app/shared/Error").Error
  }))
);

// Lazy imports (área pública y privada)
const LazyTableroVistaPublica = lazy(() =>
  import("../app/pages/TableroVistaPublica").then(() => ({
    default: require("../app/pages/TableroVistaPublica").TableroVistaPublica
  }))
);
const LazyViviendas = lazy(() =>
  import("../app/private/contenedor/widgets/CarrucelViajes")
);

const LazyTablero = lazy(() =>
  import("../app/pages/TableroPrincipal").then(() => ({
    default: require("../app/pages/TableroPrincipal").TableroPrincipal
  }))
);

const LazyAcercaDe = lazy(() =>
  import("../app/pages/AcercaDeNostros").then(() => ({
    default: require("../app/pages/AcercaDeNostros").default
  }))
);

const LazyTableroEquipo = lazy(() => import("../app/pages/InfoEquipo"));




const LazyDetallePublicacion = lazy(() =>
  import("../app/pages/DetallePublicacion").then(() => ({
    default: require("../app/pages/DetallePublicacion").DetallePublicacion
  }))
);

const LazyBuscarResultados = lazy(() =>
  import("../app/pages/BuscarResultados")
);


export const RuteoPrincipal = () => {
  return (
    <Routes>
      {/* Área pública */}


      <Route path="land" element={<LazyTableroVistaPublica />}>
        <Route index element={<LazyViviendas />} />                {/* /land */}
        <Route path="welcome" element={<LazyViviendas />} />      {/* /land/welcome */}
        <Route path="publicacion/:codPublicacion" element={<LazyDetallePublicacion />} />  {/* /land/publicacion/123 */}
        <Route path="acerca-de" element={<LazyAcercaDe />} />  {/* /land/acerca-de */}
        <Route path="equipo" element={<LazyTableroEquipo />} />  {/* /land/equipo */}
        {/* 👇 Nueva ruta de búsqueda */}
        <Route
          path="buscar/:termino"
          element={
            <LazyBuscarResultados />
          }
        />
      </Route>
      <Route path="/login" element={<LazySesion />} />
      <Route path="/register" element={<LazyRegistro />} />

      {/* Área privada (protegida por Vigilante) */}
      <Route element={<Vigilante />}>
        <Route path="/dash/*" element={<LazyTablero />} />
      </Route>

      {/* Obligatorias */}
      <Route path="/" element={<LazyTableroVistaPublica />}>
        <Route index element={<LazyViviendas />} />
      </Route>
      <Route path="*" element={<LazyError />} />
    </Routes>
  );
};
