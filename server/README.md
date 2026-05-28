# Learning Inventory - API Backend ⚙️

Servidor robusto y escalable que gestiona la lógica de negocio, autenticación e inventario de Learning Inventory.

## 🛠️ Stack Tecnológico
- **Node.js v22**: Motor de ejecución de JavaScript.
- **Express 5**: Framework web minimalista para la creación de APIs.
- **TypeScript 6**: Desarrollo seguro con tipado estático.
- **JWT**: Gestión de sesiones y seguridad de rutas.

## 🏗️ Arquitectura
El servidor sigue un patrón de arquitectura por capas para separar responsabilidades:
- **Routes**: Definición de endpoints y mapeo a controladores.
- **Controllers**: Manejo de la lógica de entrada/salida de las peticiones.
- **Services**: Lógica de negocio pura y manipulación de datos.
- **Middleware**: Validaciones de seguridad (Auth) y manejo de errores.

## 🌐 Despliegue
- **Platform:** Render.
- **URL:** [https://learning-inventory-api.onrender.com](https://learning-inventory-api.onrender.com)
- **Modo Producción:** El servidor se compila a JavaScript (`dist/`) y se ejecuta con `node`.

## 🚀 Comandos
- `npm run dev`: Ejecuta el servidor en modo desarrollo con `nodemon` y `ts-node`.
- `npm run build`: Compila el código TypeScript a JavaScript en la carpeta `dist`.
- `npm run start`: Inicia el servidor compilado (usado en producción).

## 🔌 Endpoints Principales
- **Auth**: `POST /api/v1/auth/login` - Inicio de sesión y obtención de token.
- **Productos**: `GET/POST/PUT/DELETE /api/v1/products` - Gestión completa del inventario.
