// ServicioGet.ts
type Json = any;

function ensureJsonContentType(res: Response) {
  const ct = (res.headers.get('content-type') || '').toLowerCase();
  // Acepta application/json con charset
  return ct.includes('application/json');
}

async function parseJsonSafe(res: Response) {
  // Si es 204/205 o no hay contenido, devuelve null
  if (res.status === 204 || res.status === 205) return null;

  const text = await res.text();
  if (!text) return null;

  try {
    return JSON.parse(text);
  } catch (e) {
    throw new Error(
      `El servidor no devolvió JSON válido. Content-Type="${res.headers.get('content-type')}". ` +
      `Fragmento: ${text.slice(0, 200)}`
    );
  }
}

export class ServicioGet {
  public static async peticionGet(urlServicio: string): Promise<Json> {
    const token = localStorage.getItem('TOKEN_AUTORIZACION') || '';
    const headers: Record<string, string> = {
      // Este header evita la página HTML de advertencia de ngrok
      'ngrok-skip-browser-warning': 'true',
      // Pedimos JSON
      'Accept': 'application/json',
    };

    // Solo añade Authorization si hay token
    if (token) {
      // Ajusta al formato que requiera tu backend (Bearer ...)
      headers['Authorization'] = token.startsWith('Bearer ')
        ? token
        : `Bearer ${token}`;
    }

    const opciones: RequestInit = {
      method: 'GET',
      headers,
      // ¡No uses mode: 'no-cors'!
      // credentials: 'include', // si tu API usa cookies/sesión
    };

    try {
      const res = await fetch(urlServicio, opciones);

      if (!res.ok) {
        // Lee texto para log más útil
        const body = await res.text().catch(() => '');
        console.error('Error HTTP:', res.status, res.statusText);
        console.error('URL que falló:', urlServicio);
        console.error('Respuesta del servidor:', body.slice(0, 400));
        throw new Error(`HTTP ${res.status} ${res.statusText}`);
      }

      if (!ensureJsonContentType(res)) {
        const body = await res.text().catch(() => '');
        console.error('Respuesta no-JSON:', body.slice(0, 400));
        throw new Error('El servidor no devolvió JSON válido');
      }

      return await parseJsonSafe(res);
    } catch (error) {
      console.error('Error en petición GET:', error);
      console.error('URL que causó el error:', urlServicio);
      throw error;
    }
  }

  public static async peticionGetPublica(urlServicio: string): Promise<Json> {
    const opciones: RequestInit = {
      method: 'GET',
      headers: {
        'ngrok-skip-browser-warning': 'true',
        'Accept': 'application/json',
      },
    };

    try {
      const res = await fetch(urlServicio, opciones);

      if (!res.ok) {
        const body = await res.text().catch(() => '');
        console.error('Error HTTP:', res.status, res.statusText);
        console.error('URL que falló:', urlServicio);
        console.error('Respuesta del servidor:', body.slice(0, 400));
        throw new Error(`HTTP ${res.status} ${res.statusText}`);
      }

      if (!ensureJsonContentType(res)) {
        const body = await res.text().catch(() => '');
        console.error('Respuesta no-JSON:', body.slice(0, 400));
        throw new Error('El servidor no devolvió JSON válido');
      }

      return await parseJsonSafe(res);
    } catch (error) {
      console.error('Error en petición GET pública:', error);
      console.error('URL que causó el error:', urlServicio);
      throw error;
    }
  }

  public static async obtenerCasas(urlServicio: string): Promise<Json> {
    const datos = await this.peticionGet(urlServicio);
    return Array.isArray(datos) ? datos.filter((v: any) => v?.tipo === 'Casa') : [];
  }

  public static async buscarPublicacionesPorTitulo(urlServicio: string, titulo: string): Promise<any[]> {
    const url = urlServicio.replace(':titulo', encodeURIComponent(titulo));
    const resultado = await this.peticionGetPublica(url);
    return Array.isArray(resultado) ? resultado : [];
  }
}
