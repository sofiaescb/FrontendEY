// src/pages/Suppliers.jsx
import React, { useState, useEffect } from 'react';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import {
  Container,
  Box,
  TextField,
  Button,
  InputAdornment,
  Stack
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';
import Header from '../components/Header';
import SupplierTable from '../components/SupplierTable';
import SupplierFormDialog from '../components/SupplierFormDialog';
import ScreeningDialog from '../components/ScreeningDialog';
import ViewSupplierDialog from '../components/ViewSupplierDialog';
import { areAllFieldsValid } from '../utils/supplierValidations';
import {
  getSuppliers,
  createSupplier,
  updateSupplier,
  deleteSupplier
} from '../services/supplierService';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const Suppliers = () => {
  const [suppliers, setSuppliers] = useState([]);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
  const fetchAndSetSuppliers = async () => {
    try {
      const data = await getSuppliers();
      setSuppliers(data);
    } catch (error) {
      console.error('Error al obtener proveedores', error);
    }
  };

  useEffect(() => {
    fetchAndSetSuppliers();
  }, []);

  const [searchTerm, setSearchTerm] = useState('');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isScreeningDialogOpen, setIsScreeningDialogOpen] = useState(false);
  const [selectedSupplier, setSelectedSupplier] = useState(null);
  const [editingSupplier, setEditingSupplier] = useState(null);
  const [screeningUrl, setScreeningUrl] = useState('');
  const [newSupplier, setNewSupplier] = useState({
    razonSocial: '',
    nombreComercial: '',
    identificacionTributaria: '',
    telefono: '',
    email: '',
    direccion: '',
    pais: '',
    sitioWeb: '',
    facturacionAnual: ''
  });

  const handleAddSupplier = async () => {
    if (areAllFieldsValid(newSupplier)) {
      try {
        await createSupplier(newSupplier);
        await fetchAndSetSuppliers();
        setIsAddDialogOpen(false);
        setSnackbar({ open: true, message: 'Proveedor creado exitosamente', severity: 'success' });
      } catch (error) {
        setSnackbar({ open: true, message: 'Error al crear proveedor', severity: 'error' });
        console.error('Error al crear proveedor', error);
      }
    }
  };

  const handleViewSupplier = (supplier) => {
    setSelectedSupplier(supplier);
    setIsViewDialogOpen(true);
  };

  const handleEditSupplier = (supplier) => {
    setEditingSupplier({ ...supplier });
    setIsEditDialogOpen(true);
  };

  const handleUpdateSupplier = async () => {
    if (editingSupplier) {
      try {
        await updateSupplier(editingSupplier.id, editingSupplier);
        await fetchAndSetSuppliers();
        setIsEditDialogOpen(false);
        setEditingSupplier(null);
        setSnackbar({ open: true, message: 'Proveedor actualizado exitosamente', severity: 'success' });
      } catch (error) {
        setSnackbar({ open: true, message: 'Error al actualizar proveedor', severity: 'error' });
        console.error('Error al actualizar proveedor', error);
      }
    }
  };

  const handleScreeningSupplier = (supplier) => {
    setSelectedSupplier(supplier);
    setScreeningUrl('');
    setIsScreeningDialogOpen(true);
  };

  const handleStartScreening = () => {
    console.log(`Starting screening for ${selectedSupplier?.name} with URL: ${screeningUrl}`);
    setIsScreeningDialogOpen(false);
    setScreeningUrl('');
  };

  const handleDeleteSupplier = async (id) => {
    try {
      await deleteSupplier(id);
      await fetchAndSetSuppliers();
      setSnackbar({ open: true, message: 'Proveedor eliminado exitosamente', severity: 'success' });
    } catch (error) {
      setSnackbar({ open: true, message: 'Error al eliminar proveedor', severity: 'error' });
      console.error('Error al eliminar proveedor', error);
    }
  };

  return (
    <Box minHeight="100vh" bgcolor="#f9fafb">
      <Header />
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Box mb={3}>
          <Box mb={2}>
            <h2 style={{ fontWeight: 700, fontSize: '2rem', color: '#333', margin: 0 }}>Proveedores</h2>
          </Box>
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} mb={0}>
            <TextField
              fullWidth
              variant="outlined"
              placeholder="Buscar proveedores..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon color="action" />
                  </InputAdornment>
                )
              }}
              sx={{ height: 40, '& .MuiInputBase-root': { height: 40, minHeight: 40 } }}
            />
            <Button
              variant="contained"
              onClick={() => setIsAddDialogOpen(true)}
              startIcon={<AddIcon />}
              sx={{ bgcolor: '#FFD600', color: '#000', fontWeight: 500, height: 40, minHeight: 40, '&:hover': { bgcolor: '#ffcf00' } }}
            >
              Añadir
            </Button>
          </Stack>
        </Box>

        <SupplierTable
          suppliers={suppliers}
          searchTerm={searchTerm}
          onView={handleViewSupplier}
          onEdit={handleEditSupplier}
          onDelete={handleDeleteSupplier}
          onScreen={handleScreeningSupplier}
        />

        <SupplierFormDialog
          open={isAddDialogOpen}
          onClose={() => setIsAddDialogOpen(false)}
          mode="add"
          supplier={newSupplier}
          onSupplierChange={setNewSupplier}
          onSubmit={handleAddSupplier}
        />

        <SupplierFormDialog
          open={isEditDialogOpen}
          onClose={() => setIsEditDialogOpen(false)}
          mode="edit"
          supplier={editingSupplier}
          onSupplierChange={setEditingSupplier}
          onSubmit={handleUpdateSupplier}
        />

        <ViewSupplierDialog
          open={isViewDialogOpen}
          onClose={() => setIsViewDialogOpen(false)}
          supplier={selectedSupplier}
        />

        <ScreeningDialog
          open={isScreeningDialogOpen}
          onClose={() => setIsScreeningDialogOpen(false)}
          supplier={selectedSupplier}
          url={screeningUrl}
          onUrlChange={setScreeningUrl}
          onSubmit={handleStartScreening}
        />
        <Snackbar
          open={snackbar.open}
          autoHideDuration={3000}
          onClose={() => setSnackbar({ ...snackbar, open: false })}
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        >
          <Alert onClose={() => setSnackbar({ ...snackbar, open: false })} severity={snackbar.severity} sx={{ width: '100%' }}>
            {snackbar.message}
          </Alert>
        </Snackbar>
      </Container>
    </Box>
  );
};

export default Suppliers;