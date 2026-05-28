import { Pool } from '@neondatabase/serverless';
import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';

// Cargar variables de entorno
dotenv.config({ path: '.env.local' });

const sql = new Pool({ connectionString: process.env.DATABASE_URL });

async function migrate() {
  try {
    console.log('🚀 Iniciando migración de base de datos...');

    const schemaPath = path.join(process.cwd(), 'sql', 'schema.sql');
    const seedPath = path.join(process.cwd(), 'sql', 'seed.sql');

    const schemaSql = fs.readFileSync(schemaPath, 'utf8');
    const seedSql = fs.readFileSync(seedPath, 'utf8');

    console.log('⏳ Creando tablas...');
    // Dividimos el archivo por el punto y coma y filtramos líneas vacías
    const schemaCommands = schemaSql.split(';').map(cmd => cmd.trim()).filter(cmd => cmd.length > 0);
    for (const cmd of schemaCommands) {
      await sql.query(cmd);
    }
    console.log('✅ Tablas creadas correctamente.');

    console.log('⏳ Insertando datos de prueba...');
    const seedCommands = seedSql.split(';').map(cmd => cmd.trim()).filter(cmd => cmd.length > 0);
    for (const cmd of seedCommands) {
      await sql.query(cmd);
    }
    console.log('✅ Datos insertados correctamente.');

    console.log('🎉 ¡Base de datos configurada con éxito!');
  } catch (error) {
    console.error('❌ Error durante la migración:', error);
  }
}

migrate();
