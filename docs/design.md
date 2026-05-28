# Arquitectura del Sistema: Learning Inventory

Learning Inventory sigue una arquitectura de **Aplicación de Página Única (SPA)** con un backend desacoplado, utilizando el stack MERN (sin la M de Mongo por ahora, usando persistencia en memoria).

## Frontend (Client)
- **Framework:** React con TypeScript.
- **Estado Global:** Context API (`AuthContext`) para la gestión de autenticación.
- **Estilos:** Tailwind CSS para un diseño responsivo y moderno.
- **Iconografía:** Lucide React.
- **Navegación:** React Router para rutas protegidas.
- **Comunicación:** Axios con interceptores para adjuntar automáticamente el JWT en las cabeceras.

## Backend (Server)
- **Runtime:** Node.js con TypeScript.
- **Framework:** Express.
- **Arquitectura:** Por capas para mejorar la mantenibilidad y escalabilidad:
    - **Routes:** Define los endpoints de la API.
    - **Controllers:** Maneja la lógica de entrada/salida HTTP y validaciones básicas.
    - **Services:** Contiene la lógica de negocio y acceso a datos.
    - **Middleware:** Funciones intermedias como `authMiddleware` para validación de JWT.
    - **Types:** Definiciones de interfaces compartidas.

## Seguridad
- **JWT (JSON Web Tokens):** Utilizado para la autenticación persistente. El token se genera al hacer login y se almacena en el `localStorage` del navegador.
- **Rutas Protegidas:** Implementadas tanto en el frontend (React Router) como en el backend (Express middleware).

## Persistencia
Para el MVP actual, los datos se mantienen en memoria dentro de los servicios del backend. Esto facilita las pruebas y el desarrollo inicial sin dependencias externas de bases de datos.
