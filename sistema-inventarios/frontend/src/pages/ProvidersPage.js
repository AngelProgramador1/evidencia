import React, { useState, useEffect } from 'react';
import { Container, Card, ListGroup, Alert, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { getProviders } from '../services/api';

const ProvidersPage = () => {
  const [providers, setProviders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProviders = async () => {
      try {
        const response = await getProviders();
        setProviders(response.data);
      } catch (err) {
        setError('No se pudieron cargar los proveedores.');
      } finally {
        setLoading(false);
      }
    };

    fetchProviders();
  }, []);

  return (
    <Container className="mt-5">
       <Link to="/" className="btn btn-secondary mb-4">
        &larr; Volver al Dashboard
      </Link>
      <Card>
        <Card.Header as="h2">Gestión de Proveedores</Card.Header>
        <Card.Body>
          {error && <Alert variant="danger">{error}</Alert>}
          {loading ? (
            <p>Cargando proveedores...</p>
          ) : (
            <ListGroup variant="flush">
              {providers.map((provider) => (
                <ListGroup.Item key={provider.id}>
                  {provider.name}
                </ListGroup.Item>
              ))}
            </ListGroup>
          )}
        </Card.Body>
      </Card>
    </Container>
  );
};

export default ProvidersPage;
