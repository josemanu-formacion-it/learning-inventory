# Documentación de la API: Learning Inventory v1

**Base URL:** `http://localhost:4000/api/v1`

## Autenticación

### Login
- **URL:** `/auth/login`
- **Método:** `POST`
- **Cuerpo:**
  ```json
  {
    "email": "admin@learning-inventory.com",
    "password": "password123"
  }
  ```
- **Respuesta Exitosa (200 OK):**
  ```json
  {
    "token": "JWT_TOKEN_HERE",
    "user": {
      "id": "1",
      "email": "admin@learning-inventory.com",
      "name": "Admin Learning Inventory"
    }
  }
  ```

---

## Productos (Requiere Token)
*Todas las peticiones a estos endpoints deben incluir la cabecera `Authorization: Bearer <token>`.*

### Obtener todos los productos
- **URL:** `/products`
- **Método:** `GET`
- **Respuesta:** Array de productos.

### Crear un producto
- **URL:** `/products`
- **Método:** `POST`
- **Cuerpo:**
  ```json
  {
    "name": "Nombre",
    "category": "Categoría",
    "price": 10.5,
    "stock": 100,
    "description": "Opcional"
  }
  ```

### Actualizar un producto
- **URL:** `/products/:id`
- **Método:** `PUT`
- **Cuerpo:** Campos a actualizar.

### Eliminar un producto
- **URL:** `/products/:id`
- **Método:** `DELETE`
- **Respuesta:** 204 No Content.
