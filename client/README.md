# Learning Inventory - Cliente Frontend 💻

Interfaz de usuario moderna y reactiva para la gestión de inventario de Learning Inventory.

## 🛠️ Stack Tecnológico
- **React 19**: Aprovechando las últimas mejoras en rendimiento y hooks.
- **Vite 6**: Bundler ultra-rápido configurado para despliegues estables.
- **Tailwind CSS v4**: Estilizado moderno y eficiente.
- **TypeScript 6**: Tipado estricto para mayor robustez en el desarrollo.

## 🌐 Despliegue
- **Platform:** Vercel.
- **URL:** [https://learning-inventory-olive.vercel.app/](https://learning-inventory-olive.vercel.app/)
- **Configuración:** La aplicación consume la API alojada en Render a través de la URL base configurada.

## 🚀 Comandos Disponibles
- `npm run dev`: Inicia el servidor de desarrollo local de Vite.
- `npm run build`: Genera el bundle optimizado para producción en la carpeta `dist`.
- `npm run lint`: Ejecuta ESLint para asegurar la calidad del código.
- `npm run type-check`: Ejecuta el compilador de TypeScript para validar tipos sin generar archivos.

## 🔧 Solución de Problemas (Build)
Si experimentas errores relacionados con "native bindings" (como `@rolldown/binding`), asegúrate de que el `package-lock.json` se haya generado incluyendo las dependencias opcionales para Linux, las cuales están definidas en el `package.json` de la raíz del monorepo.
