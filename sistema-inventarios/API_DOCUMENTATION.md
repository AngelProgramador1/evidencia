# Documentación de la API - Sistema de Inventarios

Este documento detalla los endpoints de la API proporcionados por el servicio de backend.

**URL Base:** `http://localhost:3001`

---

## 1. Autenticación

### Iniciar Sesión

- **Endpoint:** `POST /login`
- **Descripción:** Autentica a un usuario basado en sus credenciales.
- **Cuerpo de la Solicitud (Request Body):**
  ```json
  {
    "username": "admin",
    "password": "password123"
  }
  ```
- **Respuesta Exitosa (200 OK):**
  ```json
  {
    "message": "Login successful"
  }
  ```
- **Respuesta de Error (401 Unauthorized):**
  ```json
  {
    "message": "Invalid credentials"
  }
  ```

---

## 2. Productos

### Obtener todos los productos

- **Endpoint:** `GET /products`
- **Descripción:** Devuelve una lista de todos los productos en el inventario.
- **Respuesta Exitosa (200 OK):**
  ```json
  [
    {
      "id": 1,
      "name": "Refrigerador Smart Inverter 312L",
      "price": 2500000,
      "size": "170x60x70 cm",
      "material": "Acero Inoxidable",
      "stock": 15
    },
    {
      "id": 2,
      "name": "Lavadora Carga Frontal 12kg",
      "price": 1800000,
      "size": "85x60x60 cm",
      "material": "Plástico y Acero",
      "stock": 22
    }
  ]
  ```

### Agregar un nuevo producto

- **Endpoint:** `POST /products`
- **Descripción:** Agrega un nuevo producto al inventario. El `id` se genera automáticamente.
- **Cuerpo de la Solicitud (Request Body):**
  ```json
  {
    "name": "Nuevo Producto",
    "price": 150000,
    "size": "10x10x10 cm",
    "material": "Plástico",
    "stock": 50
  }
  ```
- **Respuesta Exitosa (201 Created):** Devuelve el objeto del producto recién creado con su nuevo `id`.
  ```json
  {
    "id": 4,
    "name": "Nuevo Producto",
    "price": 150000,
    "size": "10x10x10 cm",
    "material": "Plástico",
    "stock": 50
  }
  ```

### Eliminar un producto

- **Endpoint:** `DELETE /products/:id`
- **Descripción:** Elimina un producto del inventario según su `id`.
- **Parámetro de URL:**
  - `id` (integer): El ID del producto a eliminar. Ejemplo: `/products/3`
- **Respuesta Exitosa (200 OK):**
  ```json
  {
    "message": "Product deleted successfully"
  }
  ```
- **Respuesta de Error (404 Not Found):**
  ```json
  {
    "message": "Product not found"
  }
  ```

---

## 3. Proveedores

### Obtener todos los proveedores

- **Endpoint:** `GET /providers`
- **Descripción:** Devuelve una lista de todos los proveedores.
- **Respuesta Exitosa (200 OK):**
  ```json
  [
    {
      "id": 1,
      "name": "Samsung"
    },
    {
      "id": 2,
      "name": "LG"
    }
  ]
  ```
