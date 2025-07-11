import axios from "axios";

const SCRAPING_API_URL = import.meta.env.VITE_API_BASE_URL+"screening";
const TOKEN = import.meta.env.VITE_API_TOKEN;

export async function getScreeningResults(fuente, proveedor) {
  const params = new URLSearchParams({ Fuente: fuente, Proveedor: proveedor });
  const res = await axios.get(`${SCRAPING_API_URL}?${params.toString()}`, {
    headers: {
      Authorization: `Bearer ${TOKEN}`
    }
  });
  return res.data;
}

export async function getMultipleScreeningResults(fuentes, proveedor) {
  const results = {};
  for (const fuente of fuentes) {
    try {
      const data = await getScreeningResults(fuente, proveedor);
      results[fuente] = data;
    } catch (error) {
      results[fuente] = { error: error.message, resultados: [] };
    }
  }
  return results;
}
