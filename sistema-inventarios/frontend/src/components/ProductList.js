import React from 'react';
import { Table, Button } from 'react-bootstrap';

const ProductList = ({ products, onViewDetails, onDelete }) => {
  return (
    <div className="mt-4">
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>#</th>
            <th>Nombre</th>
            <th>Precio</th>
            <th>Stock</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {products.length > 0 ? (
            products.map((product) => (
              <tr key={product.id}>
                <td>{product.id}</td>
                <td>{product.name}</td>
                <td>${new Intl.NumberFormat('es-CO').format(product.price)}</td>
                <td>{product.stock} unidades</td>
                <td>
                  <Button
                    variant="info"
                    size="sm"
                    className="me-2"
                    onClick={() => onViewDetails(product)}
                  >
                    Ver Detalles
                  </Button>
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => onDelete(product.id)}
                  >
                    Eliminar
                  </Button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" className="text-center">
                No hay productos en el inventario.
              </td>
            </tr>
          )}
        </tbody>
      </Table>
    </div>
  );
};

export default ProductList;
