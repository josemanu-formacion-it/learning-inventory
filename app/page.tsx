'use client';

import { useEffect, useState } from 'react';
import { 
  Package, 
  AlertCircle, 
  TrendingUp, 
  Layers, 
  Plus, 
  Search,
  RefreshCcw,
  ArrowUpRight,
  ShoppingCart,
  Boxes,
  Database,
  ChevronRight,
  X,
  Loader2,
  CheckCircle2
} from 'lucide-react';

interface Product {
  id: string;
  name: string;
  price: string | number;
  stock: number;
  category_name: string;
}

interface Category {
  id: string;
  name: string;
}

export default function InventoryPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsModalSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  // Form State
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    stock: '',
    category_id: ''
  });

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/products');
      const data = await res.json();
      setProducts(Array.isArray(data) ? data : []);
      
      // Extraer categorías únicas para el formulario (simulado a partir de los datos actuales o se podría llamar a un API de categorías si existiera)
      const uniqueCategories = Array.from(new Set(data.map((p: any) => p.category_name))).map(name => {
        const prod = data.find((p: any) => p.category_name === name);
        return { id: prod.category_id || '', name };
      }).filter(c => c.id !== '');
      
      // Como no tenemos un endpoint de categorías independiente todavía, usaremos IDs fijos basados en las semillas si los conocemos, 
      // o dejaremos que el usuario los use si los productos ya vienen con ellos.
      setCategories(uniqueCategories);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setTimeout(() => setLoading(false), 600);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleAddProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsModalSubmitting(true);
    try {
      const res = await fetch('/api/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          price: parseFloat(formData.price),
          stock: parseInt(formData.stock, 10)
        }),
      });

      if (res.ok) {
        setSuccessMessage('¡Producto añadido con éxito!');
        setFormData({ name: '', price: '', stock: '', category_id: '' });
        setTimeout(() => {
          setIsModalOpen(false);
          setSuccessMessage(null);
          fetchProducts();
        }, 1500);
      }
    } catch (error) {
      console.error('Error adding product:', error);
    } finally {
      setIsModalSubmitting(false);
    }
  };

  const filteredProducts = products.filter(p => 
    p.name.toLowerCase().includes(filter.toLowerCase()) || 
    p.category_name.toLowerCase().includes(filter.toLowerCase())
  );

  const totalValue = products.reduce((acc, p) => acc + (Number(p.price) * p.stock), 0);
  const lowStock = products.filter(p => p.stock < 10);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 pb-20 relative">
      {/* Background Decor */}
      <div className="absolute top-0 inset-x-0 h-96 bg-gradient-to-b from-indigo-50/50 to-slate-50 -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white text-indigo-600 text-xs font-bold uppercase tracking-wider mb-4 border border-indigo-100 shadow-sm">
              <Database size={14} />
              Neon Database Live
            </div>
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900 mb-2">
              Learning <span className="text-indigo-600">Inventory</span>
            </h1>
            <p className="text-slate-500 text-lg max-w-2xl">
              Gestión inteligente y persistencia serverless para tu catálogo de productos.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button 
              onClick={fetchProducts}
              className="p-3 rounded-xl bg-white border border-slate-200 text-slate-600 hover:text-indigo-600 hover:border-indigo-200 transition-all shadow-sm active:scale-95"
              title="Refrescar datos"
            >
              <RefreshCcw className={loading ? 'animate-spin' : ''} size={20} />
            </button>
            <button 
              onClick={() => setIsModalOpen(true)}
              className="flex items-center gap-2 bg-indigo-600 text-white px-6 py-3 rounded-xl font-bold shadow-lg shadow-indigo-200 hover:bg-indigo-700 transition-all active:scale-95"
            >
              <Plus size={20} />
              <span>Añadir Producto</span>
            </button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm relative overflow-hidden group">
            <div className="bg-indigo-50 text-indigo-600 w-12 h-12 rounded-2xl flex items-center justify-center mb-4">
              <TrendingUp size={24} />
            </div>
            <h3 className="text-slate-400 font-bold uppercase text-[10px] tracking-widest mb-1">Valor Activo</h3>
            <p className="text-3xl font-black text-slate-900">
              {totalValue.toLocaleString('es-ES', { minimumFractionDigits: 2 })}<span className="text-indigo-400 ml-1">€</span>
            </p>
          </div>

          <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm relative overflow-hidden group">
            <div className="bg-emerald-50 text-emerald-600 w-12 h-12 rounded-2xl flex items-center justify-center mb-4">
              <Boxes size={24} />
            </div>
            <h3 className="text-slate-400 font-bold uppercase text-[10px] tracking-widest mb-1">Stock Total</h3>
            <p className="text-3xl font-black text-slate-900">
              {products.reduce((acc, p) => acc + p.stock, 0)}<span className="text-emerald-400 ml-1">uds</span>
            </p>
          </div>

          <div className="bg-slate-900 p-8 rounded-3xl shadow-xl relative overflow-hidden group">
            <div className="bg-white/10 text-white w-12 h-12 rounded-2xl flex items-center justify-center mb-4 backdrop-blur-md">
              <AlertCircle size={24} />
            </div>
            <h3 className="text-slate-300/60 font-bold uppercase text-[10px] tracking-widest mb-1">Alertas Stock</h3>
            <p className="text-3xl font-black text-white">
              {lowStock.length}<span className="text-indigo-400 ml-1">críticos</span>
            </p>
          </div>
        </div>

        {/* Content Section */}
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <h2 className="text-2xl font-bold flex items-center gap-3">
              Catálogo General
              <span className="bg-indigo-100 text-indigo-700 text-sm px-3 py-1 rounded-full font-bold">
                {filteredProducts.length}
              </span>
            </h2>
            <div className="relative w-full sm:w-96">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input 
                type="text" 
                placeholder="Buscar por nombre o categoría..." 
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                className="w-full bg-white border border-slate-200 rounded-2xl pl-12 pr-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all shadow-sm"
              />
            </div>
          </div>

          {loading ? (
             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[1,2,3,4,5,6].map(i => (
                  <div key={i} className="h-48 bg-white rounded-3xl border border-slate-100 animate-pulse" />
                ))}
             </div>
          ) : filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map((product) => (
                <div 
                  key={product.id} 
                  className="group bg-white p-6 rounded-3xl border border-slate-200 shadow-sm hover:shadow-md transition-all duration-300"
                >
                  <div className="flex justify-between items-start mb-6">
                    <span className="px-3 py-1 rounded-full bg-slate-100 text-slate-600 text-[10px] font-bold uppercase tracking-wider border border-slate-200">
                      {product.category_name}
                    </span>
                    <div className="text-slate-300 group-hover:text-indigo-600 transition-colors">
                      <ArrowUpRight size={18} />
                    </div>
                  </div>

                  <h4 className="text-lg font-bold text-slate-900 mb-4 truncate">
                    {product.name}
                  </h4>
                  
                  <div className="flex items-end justify-between">
                    <div>
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-0.5">Precio Unidad</p>
                      <p className="text-xl font-black text-slate-900">
                        {Number(product.price).toLocaleString('es-ES', { minimumFractionDigits: 2 })}€
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-0.5">Existencias</p>
                      <div className={`flex items-center gap-1.5 font-bold text-sm ${
                        product.stock < 10 ? 'text-rose-600' : 'text-slate-900'
                      }`}>
                        <ShoppingCart size={14} />
                        {product.stock} uds
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 pt-4 border-t border-slate-50 flex items-center justify-between opacity-0 group-hover:opacity-100 transition-opacity">
                    <button className="text-xs font-bold text-indigo-600 hover:text-indigo-800 flex items-center gap-1">
                      Detalles <ChevronRight size={14} />
                    </button>
                    <div className="text-[8px] font-mono text-slate-300 uppercase">
                      ID: {product.id.substring(0, 8)}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="py-24 text-center bg-white rounded-3xl border-2 border-dashed border-slate-200">
              <Search size={40} className="mx-auto mb-4 text-slate-200" />
              <h3 className="text-lg font-bold text-slate-900 mb-1">Sin resultados</h3>
              <p className="text-slate-500">No hay productos que coincidan con tu búsqueda.</p>
            </div>
          )}
        </div>
      </div>

      {/* Modal - Añadir Producto */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
          <div className="bg-white w-full max-w-md rounded-3xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
            <div className="px-8 py-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
              <h3 className="text-xl font-bold text-slate-900">Nuevo Producto</h3>
              <button 
                onClick={() => setIsModalOpen(false)}
                className="p-2 hover:bg-white rounded-xl text-slate-400 hover:text-slate-600 transition-colors border border-transparent hover:border-slate-200"
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleAddProduct} className="p-8 space-y-5">
              {successMessage ? (
                <div className="py-12 text-center space-y-4">
                  <div className="bg-emerald-100 text-emerald-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto animate-bounce">
                    <CheckCircle2 size={32} />
                  </div>
                  <p className="text-emerald-700 font-bold">{successMessage}</p>
                </div>
              ) : (
                <>
                  <div>
                    <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5 ml-1">Nombre del Producto</label>
                    <input 
                      type="text" 
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      placeholder="Ej. Teclado Mecánico RGB"
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5 ml-1">Precio (€)</label>
                      <input 
                        type="number" 
                        step="0.01"
                        required
                        value={formData.price}
                        onChange={(e) => setFormData({...formData, price: e.target.value})}
                        placeholder="0.00"
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5 ml-1">Stock Inicial</label>
                      <input 
                        type="number" 
                        required
                        value={formData.stock}
                        onChange={(e) => setFormData({...formData, stock: e.target.value})}
                        placeholder="0"
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5 ml-1">Categoría</label>
                    <select 
                      required
                      value={formData.category_id}
                      onChange={(e) => setFormData({...formData, category_id: e.target.value})}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all appearance-none"
                    >
                      <option value="">Seleccionar categoría...</option>
                      {categories.map(cat => (
                        <option key={cat.id} value={cat.id}>{cat.name}</option>
                      ))}
                    </select>
                  </div>

                  <div className="pt-4 flex gap-3">
                    <button 
                      type="button"
                      onClick={() => setIsModalOpen(false)}
                      className="flex-1 px-6 py-3 rounded-xl font-bold text-slate-500 hover:bg-slate-100 transition-colors"
                    >
                      Cancelar
                    </button>
                    <button 
                      type="submit"
                      disabled={isSubmitting}
                      className="flex-[2] bg-slate-900 text-white px-6 py-3 rounded-xl font-bold shadow-lg hover:bg-indigo-600 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                    >
                      {isSubmitting ? <Loader2 className="animate-spin" size={20} /> : <Plus size={20} />}
                      Guardar Producto
                    </button>
                  </div>
                </>
              )}
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
