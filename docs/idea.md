# Definición del Proyecto: Learning Inventory

## El Problema
Muchos pequeños negocios locales (tiendas de barrio, ferreterías, pequeñas boutiques) gestionan su inventario de forma manual, ya sea en papel o en hojas de cálculo desorganizadas. Esto conlleva a:
- Falta de control sobre el stock real.
- Dificultad para identificar productos próximos a agotarse.
- Pérdida de tiempo en conteos manuales.
- Falta de visibilidad sobre el valor total del inventario.

## Usuario Objetivo
Dueños de pequeños negocios locales que buscan una herramienta sencilla, rápida y accesible desde cualquier navegador para digitalizar su inventario sin la complejidad de un ERP corporativo.

## MVP (Producto Mínimo Viable) de Learning Inventory
El MVP se centrará en las funcionalidades críticas para la gestión diaria:

1.  **Autenticación de Usuario:** Registro e inicio de sesión seguro para proteger los datos del negocio.
2.  **Dashboard de Resumen:** Visualización rápida de métricas clave (Total de productos, valor del inventario, alertas de bajo stock).
3.  **Gestión de Inventario (CRUD):** 
    - Crear nuevos productos con nombre, categoría, precio y stock.
    - Listar productos con búsqueda y filtrado.
    - Actualizar información de productos existentes.
    - Eliminar productos.
4.  **Alertas Visuales:** Indicadores visuales para productos con stock bajo.
5.  **Diseño Responsivo:** Interfaz limpia y funcional tanto en escritorio como en dispositivos móviles.

## Objetivos Técnicos
- **Escalabilidad:** Arquitectura por capas en el backend.
- **Seguridad:** Uso de JWT para protección de rutas.
- **UX/UI:** Interfaz moderna y rápida usando React y Tailwind CSS.
