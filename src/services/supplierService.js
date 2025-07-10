import axios from "axios";

const API_URL = "https://localhost:7267/api/proveedores";

export const getSuppliers = async () => {
  const res = await axios.get(API_URL);
  return res.data;
};

export const getSupplierById = async (id) => {
  const res = await axios.get(`${API_URL}/${id}`);
  return res.data;
};

export const createSupplier = async (data) => {
  const res = await axios.post(API_URL, data);
  return res.data;
};

export const updateSupplier = async (id, data) => {
  await axios.put(`${API_URL}/${id}`, data);
};

export const deleteSupplier = async (id) => {
  await axios.delete(`${API_URL}/${id}`);
};
