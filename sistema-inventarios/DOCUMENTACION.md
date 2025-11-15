# Documentación del Proyecto: Sistema de Inventarios

Este documento proporciona una descripción general del proyecto, su estructura y cómo ejecutarlo.

## 1. Propósito del Proyecto

El objetivo de este sistema es gestionar de manera eficiente el inventario de productos. Las funcionalidades principales incluyen:

- Gestión de Productos
- Control de Stock (Entradas y Salidas)
- Gestión de Proveedores
- Sistema de Reservas de pedidos

## 2. Scripts Disponibles

Puedes usar los siguientes comandos desde la terminal en la raíz del proyecto:

- `npm run dev`: Inicia el servidor de desarrollo para trabajar en la aplicación.
- `npm run build`: Compila y empaqueta la aplicación para producción.
- `npm run lint`: Analiza el código en busca de errores y problemas de estilo.
- `npm run preview`: Ejecuta un servidor local para ver la versión de producción.

## 3. Estructura de Carpetas Principal

- `/src`: Contiene todo el código fuente de la aplicación React.
- `/src/components`: Contiene los componentes reutilizables de la interfaz de usuario.
- `/src/features`: Contiene los componentes y la lógica para las funcionalidades principales (ej. `proveedores`).