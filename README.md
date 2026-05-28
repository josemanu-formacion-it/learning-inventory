# Learning Inventory - Fase 6 🚀

Este proyecto es una aplicación de gestión de inventario diseñada para dominar las bases de datos relacionales con **PostgreSQL** y **Neon**.

## 🛠️ Stack Tecnológico
- **Base de Datos:** PostgreSQL (Serverless via [Neon](https://neon.tech))
- **Backend:** Next.js (App Router)
- **Frontend:** React + Tailwind CSS
- **Despliegue:** Vercel

## 📂 Estructura del Proyecto
- `/sql`: Scripts de base de datos (Esquema y Semillas).
- `/docs`: Documentación técnica y análisis.
- `/lib`: Configuración de la conexión a la DB y utilidades.
- `/app`: Rutas y lógica de la aplicación (Next.js).

## 🚀 Pasos para Empezar

### 1. Configuración de Base de Datos (Neon)
1. Regístrate en [Neon.tech](https://neon.tech).
2. Crea un proyecto llamado `learning-inventory`.
3. En el panel de control, copia tu **Connection String** (ej: `postgresql://user:password@host/dbname?sslmode=require`).
4. Ve a la sección **SQL Editor** en Neon y pega el contenido de `sql/schema.sql` para crear las tablas.
5. (Opcional) Ejecuta `sql/seed.sql` para cargar datos iniciales de prueba.

### 2. Variables de Entorno
Crea un archivo `.env.local` en la raíz del proyecto y añade tu cadena de conexión:
```env
DATABASE_URL=tu_cadena_de_conexion_aqui
```

### 3. Instalación de Dependencias
```bash
npm install @neondatabase/serverless
```

## 📖 Documentación Requerida
- [Diseño de Arquitectura](./docs/arquitectura-datos.md)
- [Análisis SQL (Joins)](./docs/analisis-sql.md)
- [Seguridad y Prevención de Inyección SQL](./docs/seguridad-db.md)

## 🏗️ Abstracción con ORMs: Drizzle ORM

Aunque escribir SQL puro es fundamental, para escalar aplicaciones utilizamos **Drizzle ORM**. 

### Ventajas de usar Drizzle ORM:
1. **Type Safety:** El esquema se define en TypeScript (`lib/schema.ts`), lo que permite que el autocompletado nos ayude a evitar errores de nombres de columnas o tipos de datos.
2. **SQL-like:** A diferencia de otros ORMs que abstraen demasiado, Drizzle mantiene una sintaxis muy parecida a SQL, lo que facilita la transición.
3. **Rendimiento:** Es extremadamente ligero y no tiene sobrecarga de ejecución (runtime overhead) significativa.
4. **Migraciones:** Facilita la evolución de la base de datos de forma controlada.

Puedes ver un ejemplo de implementación en `/app/api/drizzle-test/route.ts`.
