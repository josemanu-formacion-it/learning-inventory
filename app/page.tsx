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
  ChevronRight
} from 'lucide-react';

interface Product {
  id: string;
  name: string;
  price: string | number;
  stock: number;
  category_name: string;
}

export default function InventoryPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('');

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/products');
      const data = await res.json();
      setProducts(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setTimeout(() => setLoading(false), 600); // Pequeño delay para suavizar la transición
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const filteredProducts = products.filter(p => 
    p.name.toLowerCase().includes(filter.toLowerCase()) || 
    p.category_name.toLowerCase().includes(filter.toLowerCase())
  );

  const totalValue = products.reduce((acc, p) => acc + (Number(p.price) * p.stock), 0);
  const lowStock = products.filter(p => p.stock < 10);

  return (
    <div className="min-h-screen bg-[#fdfdfe] text-slate-900 font-sans selection:bg-indigo-100">
      {/* Abstract Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-indigo-50 rounded-full blur-3xl opacity-50" />
        <div className="absolute top-1/2 -right-24 w-80 h-80 bg-blue-50 rounded-full blur-3xl opacity-30" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-20">
        {/* Top Navigation / Hero */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 text-indigo-600 text-xs font-bold uppercase tracking-wider mb-4 border border-indigo-100">
              <Database size={14} />
              Neon Database Live
            </div>
            <h1 className="text-4xl md:text-5xl font-black tracking-tight text-slate-900 mb-2">
              EcoMarket<span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-blue-500 underline decoration-indigo-200 decoration-4 underline-offset-8 ml-2">Stock</span>
            </h1>
            <p className="text-slate-500 text-lg max-w-2xl">
              Sistema inteligente de gestión de inventario serverless. Control total sobre tus productos y categorías.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button 
              onClick={fetchProducts}
              className="p-3 rounded-2xl bg-white border border-slate-200 text-slate-600 hover:text-indigo-600 hover:border-indigo-200 transition-all shadow-sm active:scale-95"
              title="Sincronizar datos"
            >
              <RefreshCcw className={loading ? 'animate-spin' : ''} size={20} />
            </button>
            <button className="flex items-center gap-2 bg-slate-900 text-white px-6 py-3 rounded-2xl font-bold shadow-xl shadow-slate-200 hover:bg-indigo-600 transition-all active:scale-95">
              <Plus size={20} />
              <span>Añadir Producto</span>
            </button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="group bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm hover:shadow-xl hover:shadow-indigo-50 transition-all duration-500 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
              <TrendingUp size={120} />
            </div>
            <div className="bg-indigo-50 text-indigo-600 w-12 h-12 rounded-2xl flex items-center justify-center mb-6">
              <TrendingUp size={24} />
            </div>
            <h3 className="text-slate-400 font-medium mb-1 uppercase text-xs tracking-widest">Valor Activo</h3>
            <p className="text-4xl font-black text-slate-900 tabular-nums">
              {totalValue.toLocaleString('es-ES', { minimumFractionDigits: 2 })}<span className="text-indigo-400 ml-1">€</span>
            </p>
          </div>

          <div className="group bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm hover:shadow-xl hover:shadow-emerald-50 transition-all duration-500 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity text-emerald-600">
              <Boxes size={120} />
            </div>
            <div className="bg-emerald-50 text-emerald-600 w-12 h-12 rounded-2xl flex items-center justify-center mb-6">
              <Boxes size={24} />
            </div>
            <h3 className="text-slate-400 font-medium mb-1 uppercase text-xs tracking-widest">Total Stock</h3>
            <p className="text-4xl font-black text-slate-900 tabular-nums">
              {products.reduce((acc, p) => acc + p.stock, 0)}<span className="text-emerald-400 ml-1">uds</span>
            </p>
          </div>

          <div className="group bg-slate-900 p-8 rounded-[2rem] shadow-xl shadow-slate-200 relative overflow-hidden transition-all duration-500">
             <div className="absolute top-0 right-0 p-4 opacity-10 text-white">
              <AlertCircle size={120} />
            </div>
            <div className="bg-white/10 text-white w-12 h-12 rounded-2xl flex items-center justify-center mb-6 backdrop-blur-md">
              <AlertCircle size={24} />
            </div>
            <h3 className="text-slate-400 font-medium mb-1 uppercase text-xs tracking-widest">Alertas Stock</h3>
            <p className="text-4xl font-black text-white tabular-nums">
              {lowStock.length}<span className="text-indigo-400 ml-1">críticos</span>
            </p>
          </div>
        </div>

        {/* Content Section */}
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <h2 className="text-2xl font-black flex items-center gap-3">
              Catálogo General
              <span className="bg-slate-100 text-slate-500 text-sm px-3 py-1 rounded-full font-bold">
                {filteredProducts.length}
              </span>
            </h2>
            <div className="relative w-full sm:w-96 group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-500 transition-colors" size={18} />
              <input 
                type="text" 
                placeholder="Buscar por nombre o categoría..." 
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                className="w-full bg-white border border-slate-200 rounded-[1.25rem] pl-12 pr-4 py-4 text-sm font-medium focus:outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all shadow-sm"
              />
            </div>
          </div>

          {loading ? (
             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-pulse">
                {[1,2,3,4,5,6].map(i => (
                  <div key={i} className="h-48 bg-slate-100 rounded-[2rem] border border-slate-200" />
                ))}
             </div>
          ) : filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map((product) => (
                <div 
                  key={product.id} 
                  className="group bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 relative"
                >
                  <div className="flex justify-between items-start mb-6">
                    <div className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border ${
                      product.stock < 10 
                        ? 'bg-rose-50 text-rose-600 border-rose-100' 
                        : 'bg-indigo-50 text-indigo-600 border-indigo-100'
                    }`}>
                      {product.category_name}
                    </div>
                    <div className="text-slate-300 group-hover:text-indigo-600 transition-colors">
                      <ArrowUpRight size={20} />
                    </div>
                  </div>

                  <h4 className="text-xl font-bold text-slate-900 mb-2 truncate group-hover:text-indigo-600 transition-colors">
                    {product.name}
                  </h4>
                  
                  <div className="flex items-end justify-between mt-auto">
                    <div>
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Precio Unitario</p>
                      <p className="text-2xl font-black text-slate-900">
                        {Number(product.price).toLocaleString('es-ES', { minimumFractionDigits: 2 })}€
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1 text-right">Existencias</p>
                      <div className={`flex items-center gap-1.5 font-black text-sm ${
                        product.stock < 10 ? 'text-rose-600' : 'text-slate-900'
                      }`}>
                        <ShoppingCart size={14} />
                        {product.stock} uds
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 pt-6 border-t border-slate-50 flex items-center justify-between opacity-0 group-hover:opacity-100 transition-opacity">
                    <button className="text-xs font-bold text-indigo-600 hover:text-indigo-800 flex items-center gap-1">
                      Gestionar Stock <ChevronRight size={14} />
                    </button>
                    <div className="text-[8px] font-bold text-slate-300 tracking-tighter uppercase">
                      ID: {product.id.substring(0, 8)}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="py-24 text-center bg-white rounded-[2rem] border-2 border-dashed border-slate-100">
              <div className="bg-slate-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 text-slate-300">
                <Search size={32} />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">Sin resultados</h3>
              <p className="text-slate-500">No hemos encontrado productos que coincidan con tu búsqueda.</p>
              <button 
                onClick={() => setFilter('')}
                className="mt-6 text-indigo-600 font-bold hover:underline"
              >
                Limpiar filtros
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
