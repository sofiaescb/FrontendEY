# FrontendEY
Este proyecto consiste en una aplicación web SPA (Single Page Application) desarrollada con React y Vite. Está diseñada para facilitar la gestión de proveedores y realizar screening (cruce) contra listas de alto riesgo como OFAC y World Bank.

## 🧩 Tecnologías utilizadas

- React 18 + Vite
- JavaScript
- Material UI (MUI)
- Axios (para llamadas HTTP)
- React Router
- Vercel/Netlify (para despliegue opcional)

## 🚀 Instrucciones para desplegar la solución

Este frontend puede ejecutarse localmente o desplegarse en plataformas como Netlify o Vercel.

### 1. Clonar el repositorio

```bash
git clone https://github.com/sofiaescb/FrontendEY.git
cd FrontendEY
```

### 2. Ejecutar la aplicación en desarrollo

```bash
npm run dev
```

La aplicación estará disponible en:

```
http://localhost:5173
```

> Asegurarse de que el backend esté corriendo en paralelo en `http://localhost:7267` o la URL correspondiente.

## 🧪 Funcionalidades principales

- 📋 Listado de proveedores con opciones: Ver, Editar, Eliminar, Screening.
- ➕ Crear nuevos proveedores mediante formulario con validaciones.
- ✏️ Editar proveedores existentes (formulario reutilizado).
- 🧼 Validaciones en formularios: campos obligatorios, RUC (11 dígitos), email y URL válidas.
- ✅ Mensajes de confirmación ante operaciones exitosas.
- 🔎 Pantalla de screening con selector de fuente y resultados en tabla.
- 📊 Resultados formateados según atributos de cada fuente (OFAC, World Bank).



## 📁 Estructura del proyecto

```
FrontendEY/
│
├── public/
├── src/
│   ├── assets/
│   ├── components/
│   ├── pages/
│   ├── services/
│   ├── utils/
│   ├── App.jsx
│   ├── main.jsx
│   └── theme.js
├── index.html
├── package.json
└── vite.config.js
```

## 🔗 Conexión con el backend

Esta aplicación consume la API disponible en el repositorio:
[https://github.com/sofiaescb/BackendEY](https://github.com/sofiaescb/BackendEY)

## 📦 Despliegue

El proyecto puede ser desplegado usando servicios como:

- [Vercel](https://vercel.com/)
- [Netlify](https://www.netlify.com/)
- [Servidor propio](http://3.85.36.85/)

<img width="1838" height="877" alt="image" src="https://github.com/user-attachments/assets/568a4928-9873-45e8-80b1-f24c68ebb763" />


## 📜 Licencia

Repositorio creado como parte de una prueba técnica para EY – FY26.
