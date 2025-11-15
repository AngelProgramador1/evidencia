import React from 'react';
import { Navbar, Container, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Header = ({ onLogout, onAddProduct }) => {
  return (
    <Navbar bg="primary" variant="dark" expand="lg">
      <Container fluid>
        <Navbar.Brand href="#home">Gestión de Inventarios</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <div className="ms-auto d-flex align-items-center">
            <Button variant="success" onClick={onAddProduct} className="me-3">
              + Agregar Producto
            </Button>
            <Link to="/providers" className="btn btn-outline-light me-3">
              Gestionar Proveedores
            </Link>
            <Button variant="danger" onClick={onLogout}>
              Cerrar Sesión
            </Button>
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
