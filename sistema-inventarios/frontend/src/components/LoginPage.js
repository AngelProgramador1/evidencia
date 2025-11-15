import React, { useState } from 'react';
import { Form, Button, Container, Card, Alert } from 'react-bootstrap';
import { login } from '../services/api';

const LoginPage = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await login({ username, password });
      onLogin();
    } catch (err) {
      setError('Credenciales inválidas. Por favor, intente de nuevo.');
    }
  };

  return (
    <Container className="d-flex align-items-center justify-content-center" style={{ minHeight: '100vh' }}>
      <Card style={{ width: '30rem' }}>
        <Card.Body>
          <h2 className="text-center mb-4">Iniciar Sesión</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleLogin}>
            <Form.Group id="username">
              <Form.Label>Usuario</Form.Label>
              <Form.Control
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group id="password">
              <Form.Label className="mt-2">Contraseña</Form.Label>
              <Form.Control
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </Form.Group>
            <Button className="w-100 mt-4" type="submit">
              Ingresar
            </Button>
          </Form>
           <div className="text-center mt-3">
            <small>Usuario: admin / Contraseña: password123</small>
          </div>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default LoginPage;
