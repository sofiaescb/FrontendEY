// src/components/SupplierTable.jsx
import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  IconButton,
  Box,
  Chip
} from '@mui/material';
import BusinessIcon from '@mui/icons-material/Business';
import VisibilityIcon from '@mui/icons-material/Visibility';
import EditIcon from '@mui/icons-material/Edit';
import PublicIcon from '@mui/icons-material/Public';
import DeleteIcon from '@mui/icons-material/Delete';

const getChipColor = (status) => {
  switch (status) {
    case 'Active': return 'success';
    case 'Inactive': return 'default';
    case 'Pending': return 'warning';
    default: return 'default';
  }
};

const SupplierTable = ({ suppliers, searchTerm, onView, onEdit, onDelete, onScreen }) => {
  const filtered = suppliers.filter(supplier =>
    supplier.razonSocial.toLowerCase().includes(searchTerm.toLowerCase()) ||
    supplier.nombreComercial.toLowerCase().includes(searchTerm.toLowerCase()) ||
    supplier.telefono.toLowerCase().includes(searchTerm.toLowerCase()) ||
    supplier.pais.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <TableContainer component={Paper} variant="outlined" sx={{ mb: 3 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Razón Social</TableCell>
              <TableCell>Teléfono</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>País</TableCell>
              <TableCell align="right">Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filtered.map((supplier) => (
              <TableRow key={supplier.id}>
                <TableCell>{supplier.razonSocial}</TableCell>
                <TableCell>{supplier.telefono}</TableCell>
                <TableCell>{supplier.email}</TableCell>
                <TableCell>{supplier.pais}</TableCell>
                <TableCell align="right">
                  <Box display="flex" justifyContent="flex-end" gap={1}>
                    <IconButton onClick={() => onView(supplier)} size="small" title="Ver detalles"><VisibilityIcon fontSize="small" /></IconButton>
                    <IconButton onClick={() => onEdit(supplier)} size="small" title="Editar"><EditIcon fontSize="small" /></IconButton>
                    <IconButton onClick={() => onScreen(supplier)} size="small" sx={{ color: 'primary.main' }} title="Screening"><PublicIcon fontSize="small" /></IconButton>
                    <IconButton onClick={() => onDelete(supplier.id)} size="small" sx={{ color: 'error.main' }} title="Eliminar"><DeleteIcon fontSize="small" /></IconButton>
                  </Box>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {filtered.length === 0 && (
        <Box textAlign="center" py={4}>
          <BusinessIcon sx={{ fontSize: 48, color: 'grey.400' }} />
          <Typography variant="subtitle1" mt={2}>No se encontraron proveedores</Typography>
          <Typography variant="body2" color="text.secondary">
            {searchTerm ? 'Intenta ajustar los criterios de búsqueda.' : 'Agrega tu primer proveedor para comenzar.'}
          </Typography>
        </Box>
      )}
    </>
  );
};

export default SupplierTable;