# 📦 Learning Inventory - Fase 6

Bienvenido al sistema de gestión de inventario de **Learning Inventory**. Este proyecto representa la culminación de la Fase 6, centrada en la maestría de **Bases de Datos Relacionales con PostgreSQL**, modelado de datos avanzado y arquitectura serverless con **Neon**.

[![Desplegado en Vercel](https://img.shields.io/badge/Vercel-Desplegado-black?style=for-the-badge&logo=vercel)](https://learning-inventory-olive.vercel.app/)
[![Base de Datos Neon](https://img.shields.io/badge/Neon-PostgreSQL-00E599?style=for-the-badge&logo=postgresql&logoColor=white)](https://neon.tech)

## 🎯 Objetivos Cumplidos

### 1. Modelado de Datos Avanzado
- **Esquema Relacional**: Diseño robusto con tablas `categories` y `products`.
- **Integridad Referencial**: Uso de Claves Primarias (UUID) y Claves Foráneas con restricciones `ON DELETE RESTRICT` para evitar pérdidas accidentales de datos.
- **Validaciones a Nivel de Motor**: Restricciones `CHECK` para precios positivos y stock no negativo.

### 2. Operaciones SQL Críticas
Se han implementado y probado scripts para las operaciones fundamentales del negocio:
- **Joins Complejos**: Consultas `INNER JOIN` para reconstruir la información del producto con su categoría.
- **Agregaciones**: Reportes de conteo por categoría usando `GROUP BY` y `COUNT()`.
- **Transacciones**: Actualizaciones seguras de stock tras simulaciones de venta.

### 3. Seguridad y Persistencia
- **Capa Serverless**: Integración con el driver `@neondatabase/serverless` optimizado para Vercel Edge.
- **Prevención de Inyección SQL**: Implementación mandatoria de **consultas parametrizadas** en todos los endpoints de la API.
- **Variables de Entorno**: Gestión segura de credenciales mediante `.env.local` (ignorado en Git) y secretos de Vercel.

## 🏗️ Abstracción: SQL Puro vs Drizzle ORM

En este proyecto hemos explorado ambos mundos para entender los cimientos y la productividad moderna.

| Característica | SQL Puro (Driver Neon) | Drizzle ORM |
| :--- | :--- | :--- |
| **Control** | Total y absoluto sobre cada byte de la query. | Alto, con sintaxis muy cercana a SQL. |
| **Seguridad** | Manual (requiere disciplina con parámetros). | Nativa (las queries son seguras por diseño). |
| **Type Safety** | Nula (los resultados son `any` o interfaces manuales). | Máxima (inferencia de tipos automática desde el esquema). |
| **Mantenimiento** | Difícil en esquemas grandes (strings de SQL). | Excelente (el esquema es el "Single Source of Truth"). |

**Conclusión**: Para este proyecto, hemos implementado el esquema principal en SQL puro para demostrar dominio de la base, pero hemos configurado **Drizzle ORM** (`lib/schema.ts`) para mostrar cómo escalaríamos a una aplicación empresarial donde la seguridad de tipos es innegociable.

## 🚀 Despliegue Técnico

### Entregables de la Fase
- **Frontend**: [https://learning-inventory-olive.vercel.app/](https://learning-inventory-olive.vercel.app/)
- **Scripts SQL**: Ubicados en `/sql` (`schema.sql`, `seed.sql`, `queries.sql`).
- **Documentación**: Análisis técnico detallado en `/docs`.

### Instrucciones de Instalación Local
1. Clona el repositorio.
2. Instala dependencias: `npm install`.
3. Configura `DATABASE_URL` en tu `.env.local`.
4. Ejecuta la migración inicial: `npm run migrate`.
5. Inicia el modo desarrollo: `npm run dev`.

---
*Proyecto desarrollado como parte del programa de formación avanzada en desarrollo FullStack.*

