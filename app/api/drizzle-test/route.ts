import { NextResponse } from 'next/server';
import { db } from '@/lib/db-drizzle';
import { products, categories } from '@/lib/schema';
import { eq } from 'drizzle-orm';

export async function GET() {
  try {
    // Ejemplo de consulta usando Drizzle ORM con Join tipado
    const allProducts = await db.select({
      id: products.id,
      name: products.name,
      price: products.price,
      stock: products.stock,
      categoryName: categories.name,
    })
    .from(products)
    .innerJoin(categories, eq(products.categoryId, categories.id));

    return NextResponse.json(allProducts);
  } catch (error) {
    console.error('Drizzle error:', error);
    return NextResponse.json({ error: 'Error al obtener productos con Drizzle' }, { status: 500 });
  }
}
