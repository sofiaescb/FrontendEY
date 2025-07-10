import axios from 'axios';

const API_URL = '/api/screening';

/**
 * Ejecuta una búsqueda en listas de alto riesgo.
 * @param {Object} params
 * @param {string} params.Proveedor - Nombre del proveedor a buscar
 * @param {string} params.Fuente - Fuente de la cual obtener resultados (ej: "ofac")
 * @returns {Promise<Object>} Resultado del scraping
 */
export const ejecutarBusquedaScreening = async ({ Proveedor, Fuente }) => {
    const queryParams = new URLSearchParams();

    if (Fuente) queryParams.append('Fuente', Fuente);
    if (Proveedor) queryParams.append('Proveedor', Proveedor);
  
    const url = `${API_URL}?${queryParams.toString()}`;
    return axios.get(url).then(res => res.data);
};
