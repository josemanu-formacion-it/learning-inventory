import { NextResponse } from 'next/server';
import { sql } from '@/lib/db';

export async function GET() {
  try {
    const result = await sql.query('SELECT id, name FROM categories ORDER BY name ASC');
    return NextResponse.json(result.rows || []);
  } catch (error) {
    console.error('Database error:', error);
    return NextResponse.json(
      { error: 'Error al obtener las categorías' }, 
      { status: 500 }
    );
  }
}
