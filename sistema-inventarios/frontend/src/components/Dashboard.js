import React, { useState, useEffect } from 'react';
import { Container, Alert, Spinner } from 'react-bootstrap';
import { getProducts, addProduct, deleteProduct } from '../services/api';

import Header from './Header';
import ProductList from './ProductList';
import ProductModal from './ProductModal';
import AddProductModal from './AddProductModal';

const Dashboard = ({ onLogout }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const [showDetailModal, setShowDetailModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const fetchProducts = async () => {
    try {
      setError('');
      setLoading(true);
      const response = await getProducts();
      setProducts(response.data);
    } catch (err) {
      setError('No se pudieron cargar los productos.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleViewDetails = (product) => {
    setSelectedProduct(product);
    setShowDetailModal(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('¿Está seguro de que desea eliminar este producto?')) {
      try {
        await deleteProduct(id);
        fetchProducts(); // Refresh the list
      } catch (err) {
        setError('No se pudo eliminar el producto.');
      }
    }
  };

  const handleAddProduct = async (newProduct) => {
    try {
      await addProduct(newProduct);
      fetchProducts(); // Refresh the list
    } catch (err) {
      setError('No se pudo agregar el producto.');
    }
  };

  return (
    <>
      <Header onLogout={onLogout} onAddProduct={() => setShowAddModal(true)} />
      <Container fluid className="p-4">
        <h1 className="mb-4">Catálogo de Electrodomésticos</h1>
        {error && <Alert variant="danger">{error}</Alert>}
        {loading ? (
          <div className="text-center">
            <Spinner animation="border" role="status">
              <span className="visually-hidden">Cargando...</span>
            </Spinner>
          </div>
        ) : (
          <ProductList
            products={products}
            onViewDetails={handleViewDetails}
            onDelete={handleDelete}
          />
        )}
      </Container>

      <ProductModal
        product={selectedProduct}
        show={showDetailModal}
        onHide={() => setShowDetailModal(false)}
      />

      <AddProductModal
        show={showAddModal}
        onHide={() => setShowAddModal(false)}
        onAdd={handleAddProduct}
      />
    </>
  );
};

export default Dashboard;

