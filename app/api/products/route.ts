import { NextResponse } from 'next/server';
import { sql } from '@/lib/db';

export async function GET() {
  try {
    // Consulta con JOIN para obtener productos y sus categorías, incluyendo el ID de categoría para el formulario
    const result = await sql.query(`
      SELECT 
        p.id, 
        p.name, 
        p.price, 
        p.stock, 
        p.category_id,
        c.name as category_name
      FROM products p
      INNER JOIN categories c ON p.category_id = c.id
      ORDER BY p.created_at DESC
    `);

    // El driver de Neon devuelve un objeto con una propiedad 'rows'
    return NextResponse.json(result.rows || []);
  } catch (error) {
    console.error('Database error:', error);
    return NextResponse.json(
      { error: 'Error al obtener los productos' }, 
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, price, stock, category_id } = body;

    const result = await sql.query(
      'INSERT INTO products (name, price, stock, category_id) VALUES ($1, $2, $3, $4) RETURNING *',
      [name, price, stock, category_id]
    );

    return NextResponse.json(result.rows[0], { status: 201 });
  } catch (error) {
    console.error('Database error:', error);
    return NextResponse.json(
      { error: 'Error al crear el producto' }, 
      { status: 500 }
    );
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const { id, name, price, stock, category_id } = body;

    const result = await sql.query(
      'UPDATE products SET name = $1, price = $2, stock = $3, category_id = $4 WHERE id = $5 RETURNING *',
      [name, price, stock, category_id, id]
    );

    if (result.rows.length === 0) {
      return NextResponse.json({ error: 'Producto no encontrado' }, { status: 404 });
    }

    return NextResponse.json(result.rows[0]);
  } catch (error) {
    console.error('Database error:', error);
    return NextResponse.json(
      { error: 'Error al actualizar el producto' }, 
      { status: 500 }
    );
  }
}
