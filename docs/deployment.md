# Despliegue - Learning Inventory

El proyecto está preparado para ser desplegado en plataformas modernas como **Vercel**.

## Frontend (Vercel)
Vercel detecta automáticamente proyectos de Vite.
- **Comando de Build**: `npm run build`
- **Directorio de salida**: `dist`
- **Variables de Entorno**: Es necesario configurar `VITE_API_URL` apuntando a la URL del backend.

## Backend (Render / Railway / Vercel Functions)
El servidor Express puede desplegarse de forma independiente o como Serverless Functions.
- **Puerto**: El servidor utiliza `process.env.PORT` para adaptarse al entorno de despliegue.
- **CORS**: Configurado para permitir peticiones desde el dominio del frontend.

## Configuración de Producción
En el archivo `client/src/services/apiClient.ts`, la URL cambia automáticamente:
```typescript
baseURL: import.meta.env.VITE_API_URL || 'http://localhost:4000/api/v1'
```
