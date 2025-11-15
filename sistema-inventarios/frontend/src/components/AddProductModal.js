import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

const AddProductModal = ({ show, onHide, onAdd }) => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [stock, setStock] = useState('');
  const [size, setSize] = useState('');
  const [material, setMaterial] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const newProduct = {
      name,
      price: parseFloat(price),
      stock: parseInt(stock, 10),
      size,
      material,
    };
    onAdd(newProduct);
    // Clear form and close modal
    setName('');
    setPrice('');
    setStock('');
    setSize('');
    setMaterial('');
    onHide();
  };

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>Agregar Nuevo Producto</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Nombre del Producto</Form.Label>
            <Form.Control type="text" value={name} onChange={(e) => setName(e.target.value)} required />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Precio</Form.Label>
            <Form.Control type="number" value={price} onChange={(e) => setPrice(e.target.value)} required />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Stock</Form.Label>
            <Form.Control type="number" value={stock} onChange={(e) => setStock(e.target.value)} required />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Tamaño</Form.Label>
            <Form.Control type="text" value={size} onChange={(e) => setSize(e.target.value)} required />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Material</Form.Label>
            <Form.Control type="text" value={material} onChange={(e) => setMaterial(e.target.value)} required />
          </Form.Group>
          <div className="d-grid gap-2">
             <Button variant="primary" type="submit">
                Agregar Producto
             </Button>
             <Button variant="secondary" onClick={onHide}>
                Cancelar
             </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default AddProductModal;
