# Context API y Estado Global - Learning Inventory

Para evitar el "prop drilling" (pasar datos por muchos niveles de componentes), utilizamos la Context API de React.

## AuthContext
Gestiona el estado global de autenticación de la aplicación.

### ¿Por qué usarlo aquí?
La información del usuario (nombre, email) y el token de sesión son necesarios en casi todas las páginas (Dashboard, Inventory, Layout). Mantenerlo en un contexto centralizado permite que cualquier componente sepa si el usuario está logueado o no.

### Implementación
- **Provider**: Envuelve toda la aplicación en `App.tsx`.
- **Estado**: Almacena el objeto `user`, un booleano `isLoading` y posibles mensajes de `error`.
- **Persistencia**: El token se guarda en `localStorage` para mantener la sesión tras recargar la página.

### Ejemplo de uso
```typescript
import { useAuth } from '../context/AuthContext';

const MyComponent = () => {
  const { user } = useAuth();
  return <h1>Hola, {user?.name}</h1>;
};
```
