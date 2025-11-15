import React from 'react';
import { Modal, Button } from 'react-bootstrap';

const ProductModal = ({ product, show, onHide }) => {
  if (!product) {
    return null;
  }

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>{product.name}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p><strong>Precio:</strong> ${new Intl.NumberFormat('es-CO').format(product.price)}</p>
        <p><strong>Stock Disponible:</strong> {product.stock} unidades</p>
        <p><strong>Tamaño:</strong> {product.size}</p>
        <p><strong>Material:</strong> {product.material}</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Cerrar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ProductModal;
