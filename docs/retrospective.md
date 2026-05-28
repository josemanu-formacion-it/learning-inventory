# Retrospectiva del Proyecto: Learning Inventory

## Logros
1.  **Fullstack funcional:** Se ha entregado un MVP completo con frontend, backend y comunicación fluida entre ambos.
2.  **Arquitectura Limpia:** El backend está organizado por capas, lo que permitirá migrar a una base de datos real (como PostgreSQL o MongoDB) fácilmente sustituyendo solo la capa de servicios.
3.  **Seguridad Implementada:** Uso de JWT para proteger tanto la navegación en el cliente como los endpoints en el servidor.
4.  **UI/UX Moderna:** Interfaz limpia, responsiva y con indicadores visuales de stock bajo.

## Desafíos
- **Persistencia en Memoria:** Al no usar una base de datos, los cambios se pierden al reiniciar el servidor. Esto se identificó como una limitación aceptable para el MVP.
- **Manejo de Tipos:** Asegurar la consistencia de tipos entre el frontend y el backend requirió duplicar algunas interfaces, lo cual se podría mejorar con un monorepo o una librería de tipos compartida.

## Futuras Mejoras (Post-MVP)
- **Base de Datos Real:** Integrar Prisma o TypeORM con PostgreSQL.
- **Gestión de Imágenes:** Permitir subir fotos de los productos usando servicios como Cloudinary.
- **Módulo de Ventas:** Registro de transacciones que descuenten automáticamente del stock.
- **Notificaciones:** Alertas por correo electrónico cuando el stock llegue a niveles críticos.

## Conclusión
Learning Inventory demuestra que es posible construir una herramienta robusta y escalable para pequeños negocios utilizando tecnologías modernas y siguiendo buenas prácticas de ingeniería de software.
