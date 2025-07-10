// src/components/ViewSupplierDialog.jsx
import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  Typography,
  Box,
  IconButton,
  DialogActions,
  Link
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import './SupplierFormDialog.css';
import './ViewSupplierDialog.css';


const ViewSupplierDialog = ({ open, onClose, supplier }) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="sm"
    >
      <DialogTitle className="dialog-header">
        <Box>
          <Typography variant="h5" component="h2" className="dialog-title">
            Detalles del Proveedor
          </Typography>
          <Typography variant="body2" className="dialog-subtitle">
            Información completa del proveedor seleccionado.
          </Typography>
        </Box>
        <IconButton onClick={onClose} size="small" className="close-button">
          <CloseIcon />
        </IconButton>
      </DialogTitle>
       <DialogContent
        >
        <Box sx={{ margin: 0, padding: 0 }}>
          {supplier && (
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5, paddingBottom: 0 }}>
              <Box sx={{ display: 'flex', alignItems: 'flex-start' }}>
                <Typography variant="subtitle2" sx={{ minWidth: 160, fontWeight: 500, color: '#333', flexShrink: 0 }}>Razón Social:</Typography>
                <Typography>{supplier.razonSocial}</Typography>
              </Box>

              <Box sx={{ display: 'flex', alignItems: 'flex-start' }}>
                <Typography variant="subtitle2" sx={{ minWidth: 160, fontWeight: 500, color: '#333', flexShrink: 0 }}>Nombre Comercial:</Typography>
                <Typography>{supplier.nombreComercial}</Typography>
              </Box>

              <Box sx={{ display: 'flex', alignItems: 'flex-start' }}>
                <Typography variant="subtitle2" sx={{ minWidth: 160, fontWeight: 500, color: '#333', flexShrink: 0 }}>RUC:</Typography>
                <Typography>{supplier.identificacionTributaria}</Typography>
              </Box>

              <Box sx={{ display: 'flex', alignItems: 'flex-start' }}>
                <Typography variant="subtitle2" sx={{ minWidth: 160, fontWeight: 500, color: '#333', flexShrink: 0 }}>Teléfono:</Typography>
                <Typography>{supplier.telefono}</Typography>
              </Box>

              <Box sx={{ display: 'flex', alignItems: 'flex-start' }}>
                <Typography variant="subtitle2" sx={{ minWidth: 160, fontWeight: 500, color: '#333', flexShrink: 0 }}>Correo electrónico:</Typography>
                <Typography>{supplier.email}</Typography>
              </Box>

              <Box sx={{ display: 'flex', alignItems: 'flex-start' }}>
                <Typography variant="subtitle2" sx={{ minWidth: 160, fontWeight: 500, color: '#333', flexShrink: 0 }}>Sitio web:</Typography>
                <Link href={supplier.sitioWeb} target="_blank" rel="noopener noreferrer">
                  {supplier.sitioWeb.replace(/^https?:\/\//, '')}
                </Link>
              </Box>

              <Box sx={{ display: 'flex', alignItems: 'flex-start' }}>
                <Typography variant="subtitle2" sx={{ minWidth: 160, fontWeight: 500, color: '#333', flexShrink: 0 }}>Dirección:</Typography>
                <Typography>{supplier.direccion}</Typography>
              </Box>

              <Box sx={{ display: 'flex', alignItems: 'flex-start' }}>
                <Typography variant="subtitle2" sx={{ minWidth: 160, fontWeight: 500, color: '#333', flexShrink: 0 }}>País:</Typography>
                <Typography>{supplier.pais}</Typography>
              </Box>

              <Box sx={{ display: 'flex', alignItems: 'flex-start' }}>
                <Typography variant="subtitle2" sx={{ minWidth: 160, fontWeight: 500, color: '#333', flexShrink: 0 }}>Facturación Anual:</Typography>
                <Typography>${supplier.facturacionAnual?.toLocaleString()}</Typography>
              </Box>

              <Box sx={{ display: 'flex', alignItems: 'flex-start' }}>
                <Typography variant="subtitle2" sx={{ minWidth: 160, fontWeight: 500, color: '#333', flexShrink: 0 }}>Última Edición:</Typography>
                <Typography>{
                  (() => {
                    const date = new Date(supplier.fechaEdicion);
                    date.setHours(date.getHours() - 5);
                    return date.toLocaleString('es-PE');
                  })()
                }</Typography>
              </Box>
            </Box>
          )}
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default ViewSupplierDialog;