# Hooks de React - Learning Inventory

Utilizamos tanto hooks nativos de React como custom hooks para gestionar la lógica de la aplicación.

## Hooks Nativos

- **useState**: Para manejar estados locales como el contenido de formularios, la apertura de modales y filtros de búsqueda.
- **useEffect**: Para disparar la carga de datos desde la API cuando un componente se monta.
- **useMemo**: Utilizado en la tabla de inventario para filtrar productos sin recalcular en cada render innecesario.
- **useCallback**: Para memorizar funciones que se pasan a componentes hijos y evitar re-renders.

## Custom Hooks

### useAuth
Ubicado en `src/context/AuthContext.tsx`. 
Este hook facilita el acceso al estado de autenticación en cualquier parte de la app.

```typescript
const { user, login, logout, isLoading } = useAuth();
```

### (Opcional/Futuro) useProducts
Se recomienda crear un hook `useProducts` para centralizar la lógica de fetch, creación y eliminación de productos, separándola de los componentes de página.
