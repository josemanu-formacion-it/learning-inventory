# Documentación de Componentes - Learning Inventory

En esta aplicación, hemos seguido una estructura de componentes modulares y reutilizables utilizando **React**, **TypeScript** y **Tailwind CSS**.

## Estructura de Componentes

### 1. Componentes de UI (Reutilizables)
Ubicados en `src/components/`, estos componentes no tienen lógica de negocio pesada y se centran en la presentación.

- **StatCard.tsx**: Muestra estadísticas rápidas (ej. total de productos, stock bajo). Utiliza props tipadas para definir el color, el icono y el valor.
- **InventoryTable.tsx**: Una tabla dinámica que muestra la lista de productos. Recibe la lista de productos y funciones para editar o eliminar.
- **ProductForm.tsx**: Formulario modal para crear o editar productos. Gestiona su propio estado interno para los inputs.

### 2. Componentes de Layout
Ubicados en `src/layout/`.

- **Layout.tsx**: Envuelve las páginas privadas. Incluye la barra de navegación lateral y el encabezado principal, asegurando una experiencia consistente.

### 3. Componentes de Página
Ubicados en `src/pages/`. Representan las rutas principales de la aplicación.

- **Login.tsx**: Página de acceso.
- **Dashboard.tsx**: Resumen visual del estado del inventario.
- **Inventory.tsx**: Gestión completa (CRUD) de productos.

## Tipado con TypeScript
Cada componente define su interfaz de props. Por ejemplo:

```typescript
interface StatCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  trend?: string;
  color: 'green' | 'blue' | 'yellow' | 'red';
}
```

## Estilos con Tailwind CSS
Utilizamos clases de utilidad para el diseño responsive y moderno. Ejemplo:
`className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6"`
