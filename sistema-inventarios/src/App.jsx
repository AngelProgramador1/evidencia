import React, { useState } from 'react';
import { Package, Plus, Edit2, Trash2, Search, TrendingUp, TrendingDown, AlertCircle, Truck } from 'lucide-react';
import GestionProveedores from './GestionProveedores'; // Importamos el nuevo componente

// ============================================
// COMPONENTE PRINCIPAL DE LA APLICACIÓN
// ============================================
export default function App() {
  const [currentView, setCurrentView] = useState('products'); // 'products' o 'providers'
  // Estado para almacenar todos los productos
  const [products, setProducts] = useState([
    { id: 1, name: 'Laptop Dell XPS 13', category: 'electronics', quantity: 15, price: 1299.99, minStock: 5, sku: 'LAP-001' },
    { id: 2, name: 'Mouse Logitech MX Master', category: 'electronics', quantity: 45, price: 99.99, minStock: 10, sku: 'MOU-002' },
    { id: 3, name: 'Silla de Oficina Ergonómica', category: 'furniture', quantity: 8, price: 349.99, minStock: 5, sku: 'CHA-003' },
    { id: 4, name: 'Escritorio Ajustable', category: 'furniture', quantity: 3, price: 599.99, minStock: 5, sku: 'DES-004' },
    { id: 5, name: 'Papel Bond Tamaño Carta', category: 'office', quantity: 120, price: 4.99, minStock: 50, sku: 'PAP-005' },
    { id: 6, name: 'Bolígrafos Azules (Caja 50)', category: 'office', quantity: 25, price: 12.99, minStock: 10, sku: 'BOL-006' },
    { id: 7, name: 'Martillo Profesional', category: 'tools', quantity: 18, price: 29.99, minStock: 8, sku: 'MAR-007' },
    { id: 8, name: 'Taladro Inalámbrico', category: 'tools', quantity: 2, price: 149.99, minStock: 5, sku: 'TAL-008' },
  ]);

  // Estados de la UI
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);

  // Estado para el formulario de nuevo producto
  const [newProduct, setNewProduct] = useState({
    name: '',
    category: 'electronics',
    quantity: 0,
    price: 0,
    minStock: 0,
    sku: ''
  });

  // ============================================
  // CATEGORÍAS DEL SISTEMA
  // ============================================
  const categories = [
    { id: 'all', name: 'Todos', icon: '📦' },
    { id: 'electronics', name: 'Electrónicos', icon: '💻' },
    { id: 'furniture', name: 'Muebles', icon: '🪑' },
    { id: 'office', name: 'Oficina', icon: '📎' },
    { id: 'tools', name: 'Herramientas', icon: '🔧' },
  ];

  // ============================================
  // FUNCIONES DE FILTRADO Y BÚSQUEDA
  // ============================================
  const filteredProducts = products.filter(product => {
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.sku.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // ============================================
  // FUNCIONES CRUD (Crear, Leer, Actualizar, Eliminar)
  // ============================================

  // Agregar nuevo producto
  const handleAddProduct = () => {
    if (!newProduct.name || !newProduct.sku) {
      alert('Por favor completa todos los campos requeridos');
      return;
    }

    const product = {
      id: Date.now(),
      ...newProduct,
      quantity: Number(newProduct.quantity),
      price: Number(newProduct.price),
      minStock: Number(newProduct.minStock)
    };
    setProducts([...products, product]);
    setNewProduct({ name: '', category: 'electronics', quantity: 0, price: 0, minStock: 0, sku: '' });
    setShowAddModal(false);
  };

  // Iniciar edición de producto
  const handleEditClick = (product) => {
    setEditingProduct({ ...product });
    setShowEditModal(true);
  };

  // Guardar cambios de edición
  const handleSaveEdit = () => {
    if (!editingProduct.name || !editingProduct.sku) {
      alert('Por favor completa todos los campos requeridos');
      return;
    }

    setProducts(products.map(p =>
      p.id === editingProduct.id ? {
        ...editingProduct,
        quantity: Number(editingProduct.quantity),
        price: Number(editingProduct.price),
        minStock: Number(editingProduct.minStock)
      } : p
    ));
    setShowEditModal(false);
    setEditingProduct(null);
  };

  // Eliminar producto
  const handleDelete = (id) => {
    if (window.confirm('¿Estás seguro de eliminar este producto?')) {
      setProducts(products.filter(p => p.id !== id));
    }
  };

  // ============================================
  // CÁLCULOS Y ESTADÍSTICAS
  // ============================================
  const totalProducts = filteredProducts.length;
  const totalValue = filteredProducts.reduce((sum, p) => sum + (p.quantity * p.price), 0);
  const lowStockItems = filteredProducts.filter(p => p.quantity <= p.minStock).length;

  // ============================================
  // COMPONENTE DE TARJETA DE ESTADÍSTICA
  // ============================================
  const StatCard = ({ title, value, icon: Icon, color, subtext }) => (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-500 text-sm font-medium">{title}</p>
          <p className={`text-3xl font-bold ${color} mt-2`}>{value}</p>
          {subtext && <p className="text-gray-400 text-xs mt-1">{subtext}</p>}
        </div>
        <div className={`${color} bg-opacity-10 rounded-full p-3`}>
          <Icon className={color} size={24} />
        </div>
      </div>
    </div>
  );

  // ============================================
  // COMPONENTE DE MODAL REUTILIZABLE
  // ============================================
  const Modal = ({ show, onClose, title, children }) => {
    if (!show) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-lg shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
          <div className="p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold text-gray-800">{title}</h3>
              <button onClick={onClose} className="text-gray-400 hover:text-gray-600 text-2xl">×</button>
            </div>
            {children}
          </div>
        </div>
      </div>
    );
  };

  // ============================================
  // COMPONENTE DE FORMULARIO DE PRODUCTO
  // ============================================
  const ProductForm = ({ product, onChange, onSubmit, submitText }) => (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Nombre del Producto</label>
        <input
          type="text"
          value={product.name}
          onChange={(e) => onChange({ ...product, name: e.target.value })}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="Ej: Laptop Dell XPS 13"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">SKU</label>
        <input
          type="text"
          value={product.sku}
          onChange={(e) => onChange({ ...product, sku: e.target.value })}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="Ej: LAP-001"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Categoría</label>
        <select
          value={product.category}
          onChange={(e) => onChange({ ...product, category: e.target.value })}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          <option value="electronics">Electrónicos</option>
          <option value="furniture">Muebles</option>
          <option value="office">Oficina</option>
          <option value="tools">Herramientas</option>
        </select>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Cantidad</label>
          <input
            type="number"
            min="0"
            value={product.quantity}
            onChange={(e) => onChange({ ...product, quantity: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Precio</label>
          <input
            type="number"
            min="0"
            step="0.01"
            value={product.price}
            onChange={(e) => onChange({ ...product, price: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Stock Mín.</label>
          <input
            type="number"
            min="0"
            value={product.minStock}
            onChange={(e) => onChange({ ...product, minStock: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>

      <div className="flex gap-3 pt-4">
        <button
          onClick={onSubmit}
          className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors"
        >
          {submitText}
        </button>
      </div>
    </div>
  );

  // ============================================
  // RENDERIZADO PRINCIPAL
  // ============================================
  return (
    <div className="min-h-screen bg-gray-50">
      {/* ENCABEZADO */}
      <header className="bg-gradient-to-r from-blue-600 to-blue-800 text-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Package size={32} />
              <div>
                <h1 className="text-2xl font-bold">Sistema de Inventarios</h1>
                <p className="text-blue-100 text-sm">Gestión completa de productos</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              {/* Botones de Navegación */}
              <button
                onClick={() => setCurrentView('products')}
                className={`font-medium py-2 px-4 rounded-lg flex items-center gap-2 transition-colors ${currentView === 'products' ? 'bg-white text-blue-600' : 'bg-transparent text-white hover:bg-blue-700'}`}
              >
                <Package size={20} />
                Inventario
              </button>
              <button
                onClick={() => setCurrentView('providers')}
                className={`font-medium py-2 px-4 rounded-lg flex items-center gap-2 transition-colors ${currentView === 'providers' ? 'bg-white text-blue-600' : 'bg-transparent text-white hover:bg-blue-700'}`}
              >
                <Truck size={20} />
                Proveedores
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {currentView === 'products' ? (
          <>
            {/* Botón para agregar producto, ahora aquí */}
            <div className="flex justify-end mb-6">
              <button
                onClick={() => setShowAddModal(true)}
                className="bg-blue-600 text-white hover:bg-blue-700 font-medium py-2 px-4 rounded-lg flex items-center gap-2 transition-colors shadow-md"
              >
                <Plus size={20} />
                Agregar Producto
              </button>
            </div>

            {/* TARJETAS DE ESTADÍSTICAS */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <StatCard
                title="Total de Productos"
                value={totalProducts}
                icon={Package}
                color="text-blue-600"
                subtext="En inventario actual"
              />
              <StatCard
                title="Valor Total"
                value={`$${totalValue.toLocaleString('es-ES', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`}
                icon={TrendingUp}
                color="text-green-600"
                subtext="Valor del inventario"
              />
              <StatCard
                title="Stock Bajo"
                value={lowStockItems}
                icon={AlertCircle}
                color="text-red-600"
                subtext="Productos por reabastecer"
              />
            </div>

            {/* FILTROS Y BÚSQUEDA */}
            <div className="bg-white rounded-lg shadow-md p-6 mb-8">
              <div className="flex flex-col md:flex-row gap-4">
                {/* Barra de búsqueda */}
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                  <input
                    type="text"
                    placeholder="Buscar por nombre o SKU..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                {/* Filtro de categorías */}
                <div className="flex gap-2 flex-wrap">
                  {categories.map(cat => (
                    <button
                      key={cat.id}
                      onClick={() => setSelectedCategory(cat.id)}
                      className={`px-4 py-2 rounded-lg font-medium transition-all ${selectedCategory === cat.id
                        ? 'bg-blue-600 text-white shadow-md'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                    >
                      <span className="mr-2">{cat.icon}</span>
                      {cat.name}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* TABLA DE PRODUCTOS */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Producto</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">SKU</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Categoría</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Cantidad</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Precio</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Valor Total</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Estado</th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Acciones</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredProducts.length === 0 ? (
                      <tr>
                        <td colSpan="8" className="px-6 py-12 text-center text-gray-500">
                          <Package className="mx-auto mb-3 text-gray-400" size={48} />
                          <p className="text-lg font-medium">No se encontraron productos</p>
                          <p className="text-sm">Intenta con otros filtros o agrega un nuevo producto</p>
                        </td>
                      </tr>
                    ) : (
                      filteredProducts.map(product => (
                        <tr key={product.id} className="hover:bg-gray-50 transition-colors">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="font-medium text-gray-900">{product.name}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className="text-sm text-gray-500 font-mono">{product.sku}</span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className="text-sm text-gray-600">
                              {categories.find(c => c.id === product.category)?.name || product.category}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className="text-sm font-semibold text-gray-900">{product.quantity}</span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className="text-sm text-gray-900">${product.price.toFixed(2)}</span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className="text-sm font-semibold text-green-600">
                              ${(product.quantity * product.price).toFixed(2)}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            {product.quantity <= product.minStock ? (
                              <span className="px-2 py-1 text-xs font-semibold rounded-full bg-red-100 text-red-800 flex items-center gap-1 w-fit">
                                <TrendingDown size={14} />
                                Stock Bajo
                              </span>
                            ) : (
                              <span className="px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800 flex items-center gap-1 w-fit">
                                <TrendingUp size={14} />
                                Disponible
                              </span>
                            )}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right">
                            <div className="flex gap-2 justify-end">
                              <button
                                onClick={() => handleEditClick(product)}
                                className="text-blue-600 hover:text-blue-800 p-2 hover:bg-blue-50 rounded-lg transition-colors"
                                title="Editar"
                              >
                                <Edit2 size={18} />
                              </button>
                              <button
                                onClick={() => handleDelete(product.id)}
                                className="text-red-600 hover:text-red-800 p-2 hover:bg-red-50 rounded-lg transition-colors"
                                title="Eliminar"
                              >
                                <Trash2 size={18} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        ) : (
          <GestionProveedores />
        )}
      </div>

      {/* MODAL PARA AGREGAR PRODUCTO */}
      <Modal show={showAddModal} onClose={() => setShowAddModal(false)} title="Agregar Nuevo Producto">
        <ProductForm
          product={newProduct}
          onChange={setNewProduct}
          onSubmit={handleAddProduct}
          submitText="Agregar Producto"
        />
      </Modal>

      {/* MODAL PARA EDITAR PRODUCTO */}
      <Modal show={showEditModal} onClose={() => setShowEditModal(false)} title="Editar Producto">
        {editingProduct && (
          <ProductForm
            product={editingProduct}
            onChange={setEditingProduct}
            onSubmit={handleSaveEdit}
            submitText="Guardar Cambios"
          />
        )}
      </Modal>
    </div>
  );
}