-- 1. Operaciones de actualización (Venta de producto)
-- Reducir el stock del 'Smartphone X' en 1 unidad
UPDATE products 
SET stock = stock - 1 
WHERE name = 'Smartphone X' AND stock > 0;

-- 2. Operaciones de eliminación
-- Eliminar el producto 'Set de Plumas'
DELETE FROM products 
WHERE name = 'Set de Plumas';

-- 3. Consultas con JOIN
-- Obtener nombre del producto, precio y nombre de su categoría
SELECT 
    p.name AS producto, 
    p.price AS precio, 
    c.name AS categoria
FROM products p
INNER JOIN categories c ON p.category_id = c.id;

-- 4. Consultas con Agrupación
-- Obtener el nombre de cada categoría y cuántos productos tiene
SELECT 
    c.name AS categoria, 
    COUNT(p.id) AS total_productos
FROM categories c
LEFT JOIN products p ON c.id = p.category_id
GROUP BY c.name;
