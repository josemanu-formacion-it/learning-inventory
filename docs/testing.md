# Testing y Mejoras - Learning Inventory

## Pruebas Manuales Realizadas
1. **Flujo de Autenticación**: 
   - Login con credenciales correctas -> Acceso al dashboard.
   - Login con credenciales incorrectas -> Mensaje de error.
   - Acceso a rutas protegidas sin token -> Redirección a login.
2. **Gestión de Inventario**:
   - Visualización de productos cargados desde la API.
   - Filtrado de productos en la tabla.
3. **Responsividad**:
   - Verificación de la UI en dispositivos móviles y escritorio.

## Errores Corregidos
- Se ajustó el `apiClient` para incluir el token Bearer en todas las peticiones automáticamente.
- Se corrigieron problemas de tipos en las respuestas de la API.

## Posibles Mejoras Futuras
- Implementar tests unitarios con **Vitest** y **React Testing Library**.
- Añadir validaciones más robustas en el frontend con **Zod** o **Yup**.
- Implementar feedback visual (Toasts) para acciones exitosas (crear, editar, eliminar).
