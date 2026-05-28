import { Pool } from '@neondatabase/serverless';

if (!process.env.DATABASE_URL) {
  throw new Error('DATABASE_URL is not defined in the environment variables');
}

/**
 * Cliente de base de datos Neon (PostgreSQL)
 * Utiliza Pool para permitir el uso del método .query() y manejar múltiples conexiones.
 */
export const sql = new Pool({ connectionString: process.env.DATABASE_URL });
