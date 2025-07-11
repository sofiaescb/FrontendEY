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
<img width="1824" height="666" alt="image" src="https://github.com/user-attachments/assets/e4e2fe16-1795-4a7f-a752-19fe6d2eeab2" />

- ➕ Crear nuevos proveedores mediante formulario con validaciones.
<img width="734" height="944" alt="image" src="https://github.com/user-attachments/assets/db81a04f-6a03-4953-9058-266bb3013a71" />

- ✏️ Editar proveedores existentes (formulario reutilizado).
<img width="753" height="962" alt="image" src="https://github.com/user-attachments/assets/537624e7-cc92-496a-bd7a-a81affe875e8" />

- 🧼 Validaciones en formularios: campos obligatorios, RUC (11 dígitos), email y URL válidas.
<img width="746" height="1010" alt="image" src="https://github.com/user-attachments/assets/4b60652e-5ecb-4a30-97c1-1fe1a5ad5423" />
  
- ✅ Mensajes de confirmación ante operaciones exitosas.
<img width="1505" height="699" alt="image" src="https://github.com/user-attachments/assets/b4b5d4b4-ceaa-4f6b-835d-14f10443fc55" />
<img width="1470" height="416" alt="image" src="https://github.com/user-attachments/assets/38355352-0193-49a8-8b6f-da053b6abddc" />

- 🔎 Pantalla de screening con selector de fuente y resultados en tabla.
<img width="1140" height="381" alt="image" src="https://github.com/user-attachments/assets/65d16d9a-8bea-4266-b7a9-92454610201f" />

- 📊 Resultados formateados según atributos de cada fuente (OFAC, World Bank).
<img width="982" height="746" alt="image" src="https://github.com/user-attachments/assets/b667c032-b6ea-4e6a-b05b-b0909cc2bd52" />
<img width="986" height="747" alt="image" src="https://github.com/user-attachments/assets/987b8ee3-18f0-482c-9f02-2af7e35245af" />


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
- [Servidor propio](http://13.222.89.27/)

<img width="1838" height="877" alt="image" src="https://github.com/user-attachments/assets/568a4928-9873-45e8-80b1-f24c68ebb763" />


## 📜 Licencia

Repositorio creado como parte de una prueba técnica para EY – FY26.
