const express = require('express');
const cors = require('cors');
const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');

const adapter = new FileSync('db.json');
const db = low(adapter);

const app = express();
app.use(cors());
app.use(express.json());

// Middleware para registrar cada solicitud entrante
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] Solicitud recibida: ${req.method} ${req.url}`);
  next();
});

const PORT = 3001;

// Endpoint para iniciar sesión
app.post('/login', (req, res) => {
  const { username, password } = req.body;
  const user = db.get('users').find({ username, password }).value();
  if (user) {
    res.status(200).json({ message: 'Login successful' });
  } else {
    res.status(401).json({ message: 'Invalid credentials' });
  }
});

// Endpoint para obtener todos los proveedores
app.get('/providers', (req, res) => {
  const providers = db.get('providers').value();
  res.status(200).json(providers);
});

// Endpoint para obtener todos los productos
app.get('/products', (req, res) => {
  const products = db.get('products').value();
  res.status(200).json(products);
});

// Endpoint para agregar un nuevo producto
app.post('/products', (req, res) => {
  const product = req.body;
  const newId = (db.get('products').value().length > 0) ? Math.max(...db.get('products').map(p => p.id).value()) + 1 : 1;
  const newProduct = { id: newId, ...product };
  db.get('products').push(newProduct).write();
  res.status(201).json(newProduct);
});

// Endpoint para eliminar un producto
app.delete('/products/:id', (req, res) => {
  const productId = parseInt(req.params.id, 10);
  const product = db.get('products').find({ id: productId }).value();

  if (product) {
    db.get('products').remove({ id: productId }).write();
    res.status(200).json({ message: 'Product deleted successfully' });
  } else {
    res.status(404).json({ message: 'Product not found' });
  }
});

app.listen(PORT, () => {
  console.log(`Backend server is running on http://localhost:${PORT}`);
});
