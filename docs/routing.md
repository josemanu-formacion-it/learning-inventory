# Rutas y Navegación - Learning Inventory

La navegación se gestiona con **React Router v7**.

## Estructura de Rutas

- `/login`: Página de acceso público. Si el usuario ya está logueado, se redirige automáticamente a la raíz.
- `/`: Dashboard principal (Ruta protegida).
- `/inventory`: Gestión de inventario (Ruta protegida).
- `*`: Cualquier ruta no definida redirige al Dashboard o al Login.

## Protección de Rutas (PrivateRoute)
Hemos implementado un componente `PrivateRoute` en `App.tsx` que:
1. Verifica si el usuario está autenticado.
2. Si no lo está, lo redirige a `/login`.
3. Si lo está, renderiza el contenido dentro del `Layout` común.

## Navegación Programática
Utilizamos el hook `useNavigate` para redirigir al usuario tras acciones exitosas (como el login o el cierre de sesión).
