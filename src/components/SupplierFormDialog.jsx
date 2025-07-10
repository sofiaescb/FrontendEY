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
      <DialogTitle 
        sx={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          backgroundColor: '#f8f9fa',
          borderBottom: '1px solid #e0e0e0',
          pb: 2
        }}
      >
        <Box>
          <Typography variant="h5" component="h2" sx={{ fontWeight: 'bold', color: '#333' }}>
            {isEdit ? 'Editar Proveedor' : 'Agregar Nuevo Proveedor'}
          </Typography>
          <Typography variant="body2" sx={{ color: '#666', mt: 0.5 }}>
            {isEdit ? 'Actualiza la información del proveedor a continuación.' : 'Ingresa la información del proveedor a continuación.'}
          </Typography>
        </Box>
        <IconButton onClick={onClose} size="small" sx={{ color: '#666' }}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent sx={{ p: 3, backgroundColor: '#fafafa' }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, mt: 1 }}>
          
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Typography variant="subtitle2" sx={{ fontWeight: 'medium', color: '#333', minWidth: '150px' }}>
              Razón Social
            </Typography>
            <TextField
              value={supplier.razonSocial}
              onChange={(e) => onSupplierChange({ ...supplier, razonSocial: e.target.value })}
              fullWidth
              required
              placeholder="Ingrese la razón social"
              size="small"
              sx={{ 
                '& .MuiOutlinedInput-root': {
                  backgroundColor: 'white',
                  '& fieldset': {
                    borderColor: '#ffd700',
                    borderWidth: 2
                  },
                  '&:hover fieldset': {
                    borderColor: '#ffd700',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: '#ffd700',
                  },
                }
              }}
            />
          </Box>
          
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Typography variant="subtitle2" sx={{ fontWeight: 'medium', color: '#333', minWidth: '150px' }}>
              Nombre Comercial
            </Typography>
            <TextField
              value={supplier.nombreComercial}
              onChange={(e) => onSupplierChange({ ...supplier, nombreComercial: e.target.value })}
              fullWidth
              placeholder="Ingrese el nombre comercial"
              size="small"
              sx={{ 
                '& .MuiOutlinedInput-root': {
                  backgroundColor: 'white'
                }
              }}
            />
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Typography variant="subtitle2" sx={{ fontWeight: 'medium', color: '#333', minWidth: '150px' }}>
              RUC
            </Typography>
            <TextField
              value={supplier.identificacionTributaria}
              onChange={(e) => onSupplierChange({ ...supplier, identificacionTributaria: e.target.value })}
              fullWidth
              required
              placeholder="Ingrese el RUC"
              size="small"
              sx={{ 
                '& .MuiOutlinedInput-root': {
                  backgroundColor: 'white'
                }
              }}
            />
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Typography variant="subtitle2" sx={{ fontWeight: 'medium', color: '#333', minWidth: '150px' }}>
              Teléfono
            </Typography>
            <TextField
              value={supplier.telefono}
              onChange={(e) => onSupplierChange({ ...supplier, telefono: e.target.value })}
              fullWidth
              placeholder="Ingrese el teléfono"
              size="small"
              sx={{ 
                '& .MuiOutlinedInput-root': {
                  backgroundColor: 'white'
                }
              }}
            />
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Typography variant="subtitle2" sx={{ fontWeight: 'medium', color: '#333', minWidth: '150px' }}>
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
              sx={{ 
                '& .MuiOutlinedInput-root': {
                  backgroundColor: 'white'
                }
              }}
            />
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Typography variant="subtitle2" sx={{ fontWeight: 'medium', color: '#333', minWidth: '150px' }}>
              Dirección
            </Typography>
            <TextField
              value={supplier.direccion}
              onChange={(e) => onSupplierChange({ ...supplier, direccion: e.target.value })}
              fullWidth
              placeholder="Ingrese la dirección"
              size="small"
              sx={{ 
                '& .MuiOutlinedInput-root': {
                  backgroundColor: 'white'
                }
              }}
            />
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Typography variant="subtitle2" sx={{ fontWeight: 'medium', color: '#333', minWidth: '150px' }}>
              País
            </Typography>
            <TextField
              select
              value={supplier.pais}
              onChange={(e) => onSupplierChange({ ...supplier, pais: e.target.value })}
              fullWidth
              placeholder="Seleccione un país"
              size="small"
              sx={{ 
                '& .MuiOutlinedInput-root': {
                  backgroundColor: 'white'
                }
              }}
            >
              {countries.map((pais) => (
                <MenuItem key={pais} value={pais}>{pais}</MenuItem>
              ))}
            </TextField>
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Typography variant="subtitle2" sx={{ fontWeight: 'medium', color: '#333', minWidth: '150px' }}>
              Sitio Web
            </Typography>
            <TextField
              value={supplier.sitioWeb}
              onChange={(e) => onSupplierChange({ ...supplier, sitioWeb: e.target.value })}
              fullWidth
              placeholder="Ingrese el sitio web"
              size="small"
              sx={{ 
                '& .MuiOutlinedInput-root': {
                  backgroundColor: 'white'
                }
              }}
            />
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Typography variant="subtitle2" sx={{ fontWeight: 'medium', color: '#333', minWidth: '150px' }}>
              Facturación Anual (USD)
            </Typography>
            <TextField
              type="number"
              value={supplier.facturacionAnual}
              onChange={(e) => onSupplierChange({ ...supplier, facturacionAnual: Number(e.target.value) })}
              fullWidth
              placeholder="Ingrese la facturación anual"
              size="small"
              sx={{ 
                '& .MuiOutlinedInput-root': {
                  backgroundColor: 'white'
                }
              }}
            />
          </Box>

        </Box>
      </DialogContent>
      <DialogActions sx={{ p: 3, backgroundColor: '#f8f9fa', borderTop: '1px solid #e0e0e0' }}>
        <Button 
          onClick={onClose}
          sx={{ 
            color: '#666',
            textTransform: 'none',
            fontWeight: 'medium'
          }}
        >
          Cancelar
        </Button>
        <Button
          onClick={onSubmit}
          variant="contained"
          disabled={!(supplier.razonSocial && supplier.identificacionTributaria && supplier.email)}
          sx={{
            backgroundColor: '#ffd700',
            color: '#333',
            textTransform: 'none',
            fontWeight: 'bold',
            px: 4,
            '&:hover': {
              backgroundColor: '#ffed4e',
            },
            '&:disabled': {
              backgroundColor: '#e0e0e0',
              color: '#999'
            }
          }}
        >
          {isEdit ? 'Actualizar Proveedor' : 'Agregar Proveedor'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default SupplierFormDialog;