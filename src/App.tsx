// App.tsx
import React, { Suspense } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ThemeContextProvider } from '../src/app/shared/components/Theme/ThemeContext';
import { RuteoPrincipal } from './routes/RuteoPrincipal';

const cargarComponente = () => (
  <div className="d-flex justify-content-center">
    <div className="mt-3 text-center">
      <div className="spinner-border text-danger fs-4" role="status"></div>
      <br />
      <span className="fst-italic fs-3 text-primary">Cargando ...</span>
    </div>
  </div>
);

function App() {
  return (
    <ThemeContextProvider>
      {/* 👇 El basename toma el valor de PUBLIC_URL del entorno o "/" por defecto */}
      <BrowserRouter basename={process.env.PUBLIC_URL || '/'}>
        <ToastContainer />
        <Suspense fallback={cargarComponente()}>
          <RuteoPrincipal />
        </Suspense>
      </BrowserRouter>
    </ThemeContextProvider>
  );
}

export default App;
