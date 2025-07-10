// src/utils/supplierValidations.js
// Validaciones para el formulario de proveedores

export const validateRazonSocial = (value) => {
  if (!value || value.trim() === '') return 'La razón social es obligatoria.';
  if (value.length > 100) return 'Máximo 100 caracteres para la razón social.';
  return '';
};

export const validateNombreComercial = (value) => {
  if (!value || value.trim() === '') return 'El nombre comercial es obligatorio.';
  if (value.length > 100) return 'Máximo 100 caracteres para el nombre comercial.';
  return '';
};

export const validateRUC = (value) => {
  if (!value || value.trim() === '') return 'La identificación tributaria es obligatoria.';
  if (!/^\d{11}$/.test(value)) return 'La identificación tributaria debe tener exactamente 11 dígitos.';
  return '';
};

export const validateTelefono = (value) => {
  if (!value || value.trim() === '') return 'El teléfono es obligatorio.';
  if (!/^[\+]?[1-9][\d]{0,15}$/.test(value.replace(/[\s\-\(\)]/g, ''))) {
    return 'Formato de teléfono inválido.';
  }
  return '';
};

export const validateEmail = (value) => {
  if (!value || value.trim() === '') return 'El email es obligatorio.';
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
    return 'Formato de correo electrónico inválido.';
  }
  return '';
};

export const validateSitioWeb = (value) => {
  if (!value || value.trim() === '') return 'El sitio web es obligatorio.';
  if (!/^https?:\/\/.+/.test(value)) {
    return 'Formato de URL inválido. Debe comenzar con http:// o https://';
  }
  return '';
};

export const validateDireccion = (value) => {
  if (!value || value.trim() === '') return 'La dirección es obligatoria.';
  if (value.length > 200) return 'Máximo 200 caracteres para la dirección.';
  return '';
};

export const validatePais = (value) => {
  if (!value || value.trim() === '') return 'El país es obligatorio.';
  return '';
};

export const validateFacturacion = (value) => {
  if (value === undefined || value === null || value === '') return 'La facturación anual es obligatoria.';
  if (isNaN(value) || value < 0) {
    return 'La facturación anual debe ser un número positivo.';
  }
  return '';
};

// Función principal para obtener errores
export const getFieldError = (fieldName, value) => {
  switch (fieldName) {
    case 'razonSocial': return validateRazonSocial(value);
    case 'nombreComercial': return validateNombreComercial(value);
    case 'identificacionTributaria': return validateRUC(value);
    case 'telefono': return validateTelefono(value);
    case 'email': return validateEmail(value);
    case 'sitioWeb': return validateSitioWeb(value);
    case 'direccion': return validateDireccion(value);
    case 'pais': return validatePais(value);
    case 'facturacionAnual': return validateFacturacion(value);
    default: return '';
  }
};

// Función para verificar si todos los campos están completos
export const areAllFieldsValid = (supplier) => {
  return (
    supplier.razonSocial &&
    supplier.nombreComercial &&
    supplier.identificacionTributaria &&
    supplier.telefono &&
    supplier.email &&
    supplier.direccion &&
    supplier.pais &&
    supplier.sitioWeb &&
    (supplier.facturacionAnual !== undefined && supplier.facturacionAnual !== null && supplier.facturacionAnual !== '') &&
    !getFieldError('razonSocial', supplier.razonSocial) &&
    !getFieldError('nombreComercial', supplier.nombreComercial) &&
    !getFieldError('identificacionTributaria', supplier.identificacionTributaria) &&
    !getFieldError('telefono', supplier.telefono) &&
    !getFieldError('email', supplier.email) &&
    !getFieldError('sitioWeb', supplier.sitioWeb) &&
    !getFieldError('direccion', supplier.direccion) &&
    !getFieldError('pais', supplier.pais) &&
    !getFieldError('facturacionAnual', supplier.facturacionAnual)
  );
};
