# Formularios e Interacción - Learning Inventory

Los formularios son piezas clave para la gestión del inventario.

## Manejo de Formularios
Utilizamos **componentes controlados**, donde el valor de cada input está vinculado a un estado de React (`useState`).

### Ejemplo: Formulario de Login
1. Se definen estados para `email` y `password`.
2. El evento `onChange` actualiza el estado en tiempo real.
3. El evento `onSubmit` previene el comportamiento por defecto del navegador y llama a la API.

## Validación
- **Nativa**: Uso de atributos `required`, `type="email"`, etc.
- **Lógica**: Verificación de campos vacíos o formatos incorrectos antes de enviar la petición al servidor.

## Feedback al Usuario
- **Loading States**: Mientras la API responde, el botón muestra un spinner (`Loader2`) y se deshabilita para evitar envíos duplicados.
- **Mensajes de Error**: Se muestran alertas visuales en rojo si las credenciales son incorrectas o si falla el servidor.
