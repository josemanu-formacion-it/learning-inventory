import { pgTable, uuid, varchar, text, numeric, integer, timestamp, check } from 'drizzle-orm/pg-core';
import { sql } from 'drizzle-orm';

export const categories = pgTable('categories', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: varchar('name', { length: 100 }).unique().notNull(),
  description: text('description'),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow(),
});

export const products = pgTable('products', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: varchar('name', { length: 150 }).notNull(),
  price: numeric('price', { precision: 10, scale: 2 }).notNull(),
  stock: integer('stock').notNull().default(0),
  categoryId: uuid('category_id')
    .notNull()
    .references(() => categories.id, { onDelete: 'restrict' }),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow(),
}, (table) => {
  return {
    priceCheck: check('price_check', sql`${table.price} > 0`),
    stockCheck: check('stock_check', sql`${table.stock} >= 0`),
  };
});
