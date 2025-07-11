// src/components/SupplierFormDialog.jsx
import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  IconButton,
  MenuItem,
  Typography,
  Box
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import './SupplierFormDialog.css';
import { getFieldError, areAllFieldsValid } from '../utils/supplierValidations';

const SupplierFormDialog = ({
  open,
  onClose,
  mode = 'add',
  supplier,
  onSupplierChange,
  onSubmit
}) => {
  const isEdit = mode === 'edit';
  const countries = ['Perú', 'Chile', 'México', 'Argentina', 'Colombia', 'Brasil', 'Ecuador'];
  const [showValidationErrors, setShowValidationErrors] = useState(false);

  useEffect(() => {
    if (open) {
      setShowValidationErrors(false);
    }
  }, [open]);

  useEffect(() => {
    if (!open && mode === 'add' && onSupplierChange) {
      const emptySupplier = {
        razonSocial: '',
        nombreComercial: '',
        identificacionTributaria: '',
        telefono: '',
        email: '',
        direccion: '',
        pais: '',
        sitioWeb: '',
        facturacionAnual: ''
      };
      onSupplierChange(emptySupplier);
    }
  }, [open, mode, onSupplierChange]);

  if (!supplier) return null;

  const handleSubmit = () => {
    setShowValidationErrors(true);
    
    // Validar todos los campos
    if (areAllFieldsValid(supplier)) {
      onSubmit();
      setShowValidationErrors(false); 
    }
  };

  const getFieldErrorMessage = (fieldName, value) => {
    if (!showValidationErrors) return '';
    return getFieldError(fieldName, value);
  };

  const hasFieldError = (fieldName, value) => {
    if (!showValidationErrors) return false;
    return !!getFieldError(fieldName, value);
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle className="dialog-header">
        <Box>
          <Typography variant="h5" component="h2" className="dialog-title">
            {isEdit ? 'Editar Proveedor' : 'Agregar Nuevo Proveedor'}
          </Typography>
          <Typography variant="body2" className="dialog-subtitle">
            {isEdit ? 'Actualiza la información del proveedor a continuación.' : 'Ingresa la información del proveedor a continuación.'}
          </Typography>
        </Box>
        <IconButton onClick={onClose} size="small" className="close-button">
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent className="dialog-content">
        <Box className="form-container">
          
          <Box className="form-row">
            <Typography variant="subtitle2" className="form-label">
              Razón Social
            </Typography>
            <TextField
              value={supplier.razonSocial}
              onChange={(e) => onSupplierChange({ ...supplier, razonSocial: e.target.value })}
              fullWidth
              required
              placeholder="Ingrese la razón social"
              size="small"
              className="form-input-highlighted"
              error={hasFieldError('razonSocial', supplier.razonSocial)}
              helperText={getFieldErrorMessage('razonSocial', supplier.razonSocial)}
              inputProps={{ maxLength: 100 }}
            />
          </Box>
          
          <Box className="form-row">
            <Typography variant="subtitle2" className="form-label">
              Nombre Comercial
            </Typography>
            <TextField
              value={supplier.nombreComercial}
              onChange={(e) => onSupplierChange({ ...supplier, nombreComercial: e.target.value })}
              fullWidth
              required
              placeholder="Ingrese el nombre comercial"
              size="small"
              className="form-input"
              error={hasFieldError('nombreComercial', supplier.nombreComercial)}
              helperText={getFieldErrorMessage('nombreComercial', supplier.nombreComercial)}
              inputProps={{ maxLength: 100 }}
            />
          </Box>

          <Box className="form-row">
            <Typography variant="subtitle2" className="form-label">
              RUC
            </Typography>
            <TextField
              value={supplier.identificacionTributaria}
              onChange={(e) => onSupplierChange({ ...supplier, identificacionTributaria: e.target.value })}
              fullWidth
              required
              placeholder="Ingrese el RUC (11 dígitos)"
              size="small"
              className="form-input"
              error={hasFieldError('identificacionTributaria', supplier.identificacionTributaria)}
              helperText={getFieldErrorMessage('identificacionTributaria', supplier.identificacionTributaria)}
              inputProps={{ maxLength: 11, pattern: '[0-9]*' }}
            />
          </Box>

          <Box className="form-row">
            <Typography variant="subtitle2" className="form-label">
              Teléfono
            </Typography>
            <TextField
              value={supplier.telefono}
              onChange={(e) => onSupplierChange({ ...supplier, telefono: e.target.value })}
              fullWidth
              required
              placeholder="Ingrese el teléfono"
              size="small"
              className="form-input"
              error={hasFieldError('telefono', supplier.telefono)}
              helperText={getFieldErrorMessage('telefono', supplier.telefono)}
            />
          </Box>

          <Box className="form-row">
            <Typography variant="subtitle2" className="form-label">
              Email
            </Typography>
            <TextField
              type="email"
              value={supplier.email}
              onChange={(e) => onSupplierChange({ ...supplier, email: e.target.value })}
              fullWidth
              required
              placeholder="Ingrese el email"
              size="small"
              className="form-input"
              error={hasFieldError('email', supplier.email)}
              helperText={getFieldErrorMessage('email', supplier.email)}
            />
          </Box>

          <Box className="form-row">
            <Typography variant="subtitle2" className="form-label">
              Dirección
            </Typography>
            <TextField
              value={supplier.direccion}
              onChange={(e) => onSupplierChange({ ...supplier, direccion: e.target.value })}
              fullWidth
              required
              placeholder="Ingrese la dirección"
              size="small"
              className="form-input"
              error={hasFieldError('direccion', supplier.direccion)}
              helperText={getFieldErrorMessage('direccion', supplier.direccion)}
              inputProps={{ maxLength: 200 }}
            />
          </Box>

          <Box className="form-row">
            <Typography variant="subtitle2" className="form-label">
              País
            </Typography>
            <TextField
              select
              value={supplier.pais || ''}
              onChange={(e) => onSupplierChange({ ...supplier, pais: e.target.value })}
              fullWidth
              required
              size="small"
              className="form-input"
              error={hasFieldError('pais', supplier.pais)}
              helperText={getFieldErrorMessage('pais', supplier.pais)}
              displayEmpty
              SelectProps={{
                displayEmpty: true
              }}
            >
              <MenuItem value="" disabled>
                Seleccione país
              </MenuItem>
              {countries.map((pais) => (
                <MenuItem key={pais} value={pais}>{pais}</MenuItem>
              ))}
            </TextField>
          </Box>

          <Box className="form-row">
            <Typography variant="subtitle2" className="form-label">
              Sitio Web
            </Typography>
            <TextField
              value={supplier.sitioWeb}
              onChange={(e) => onSupplierChange({ ...supplier, sitioWeb: e.target.value })}
              fullWidth
              required
              placeholder="https://ejemplo.com"
              size="small"
              className="form-input"
              error={hasFieldError('sitioWeb', supplier.sitioWeb)}
              helperText={getFieldErrorMessage('sitioWeb', supplier.sitioWeb)}
            />
          </Box>

          <Box className="form-row">
            <Typography variant="subtitle2" className="form-label">
              Facturación Anual (USD)
            </Typography>
            <TextField
              type="number"
              value={supplier.facturacionAnual}
              onChange={(e) => onSupplierChange({ ...supplier, facturacionAnual: Number(e.target.value) })}
              fullWidth
              required
              placeholder="Ingrese la facturación anual"
              size="small"
              className="form-input"
              error={hasFieldError('facturacionAnual', supplier.facturacionAnual)}
              helperText={getFieldErrorMessage('facturacionAnual', supplier.facturacionAnual)}
              inputProps={{ min: 0, step: 0.01 }}
            />
          </Box>

        </Box>
      </DialogContent>
      <DialogActions className="dialog-actions">
        <Button onClick={onClose} className="cancel-button">
          Cancelar
        </Button>
        <Button
          onClick={handleSubmit}
          variant="contained"
          className="submit-button"
        >
          {isEdit ? 'Actualizar Proveedor' : 'Agregar Proveedor'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default SupplierFormDialog;