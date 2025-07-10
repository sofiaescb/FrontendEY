// src/components/SupplierFormDialog.jsx
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

  if (!supplier) return null;

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
              placeholder="Ingrese el nombre comercial"
              size="small"
              className="form-input"
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
              placeholder="Ingrese el RUC"
              size="small"
              className="form-input"
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
              placeholder="Ingrese el teléfono"
              size="small"
              className="form-input"
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
              placeholder="Ingrese la dirección"
              size="small"
              className="form-input"
            />
          </Box>

          <Box className="form-row">
            <Typography variant="subtitle2" className="form-label">
              País
            </Typography>
            <TextField
              select
              value={supplier.pais}
              onChange={(e) => onSupplierChange({ ...supplier, pais: e.target.value })}
              fullWidth
              placeholder="Seleccione un país"
              size="small"
              className="form-input"
            >
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
              placeholder="Ingrese el sitio web"
              size="small"
              className="form-input"
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
              placeholder="Ingrese la facturación anual"
              size="small"
              className="form-input"
            />
          </Box>

        </Box>
      </DialogContent>
      <DialogActions className="dialog-actions">
        <Button onClick={onClose} className="cancel-button">
          Cancelar
        </Button>
        <Button
          onClick={onSubmit}
          variant="contained"
          disabled={!(supplier.razonSocial && supplier.identificacionTributaria && supplier.email)}
          className="submit-button"
        >
          {isEdit ? 'Actualizar Proveedor' : 'Agregar Proveedor'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default SupplierFormDialog;