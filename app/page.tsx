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
  LayoutDashboard,
  Settings,
  Bell,
  BarChart3
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
      setTimeout(() => setLoading(false), 800);
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
  const totalStock = products.reduce((acc, p) => acc + p.stock, 0);
  const lowStockCount = products.filter(p => p.stock < 10).length;

  return (
    <div className="min-h-screen bg-[#0f172a] text-slate-200 font-sans overflow-x-hidden selection:bg-indigo-500/30">
      {/* Mesh Gradient Background */}
      <div className="fixed inset-0 z-0 opacity-40">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-indigo-600/30 blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-blue-600/20 blur-[120px]" />
        <div className="absolute top-[20%] right-[10%] w-[30%] h-[30%] rounded-full bg-purple-600/20 blur-[120px]" />
      </div>

      <div className="relative z-10 flex flex-col lg:flex-row min-h-screen">
        {/* Sidebar (Desktop) */}
        <aside className="hidden lg:flex flex-col w-72 border-r border-slate-800/50 bg-slate-900/50 backdrop-blur-xl p-6">
          <div className="flex items-center gap-3 mb-12">
            <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-500/20">
              <Package className="text-white" size={24} />
            </div>
            <span className="text-xl font-black tracking-tighter text-white">ECO MARKET</span>
          </div>

          <nav className="space-y-2 flex-1">
            <a href="#" className="flex items-center gap-3 px-4 py-3 rounded-xl bg-indigo-500/10 text-indigo-400 font-bold border border-indigo-500/20 transition-all">
              <LayoutDashboard size={20} />
              Dashboard
            </a>
            <a href="#" className="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-400 hover:bg-slate-800/50 hover:text-slate-200 transition-all">
              <Boxes size={20} />
              Inventario
            </a>
            <a href="#" className="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-400 hover:bg-slate-800/50 hover:text-slate-200 transition-all">
              <BarChart3 size={20} />
              Reportes
            </a>
            <a href="#" className="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-400 hover:bg-slate-800/50 hover:text-slate-200 transition-all">
              <Settings size={20} />
              Ajustes
            </a>
          </nav>

          <div className="mt-auto p-4 bg-gradient-to-br from-indigo-600/20 to-purple-600/20 rounded-2xl border border-white/5 backdrop-blur-md">
            <p className="text-xs font-bold text-indigo-400 uppercase mb-2">Soporte Premium</p>
            <p className="text-xs text-slate-400 leading-relaxed mb-4">¿Necesitas ayuda con tu inventario?</p>
            <button className="w-full py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold rounded-lg transition-colors">
              Contactar
            </button>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-4 lg:p-10">
          {/* Header */}
          <header className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
            <div>
              <h2 className="text-3xl lg:text-4xl font-black text-white mb-2 tracking-tight">Panel de Existencias</h2>
              <div className="flex items-center gap-2 text-slate-400 text-sm">
                <Database size={14} className="text-emerald-500" />
                <span className="font-medium">Conectado a Neon PostgreSQL • Serverless</span>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="relative hidden md:block group">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-indigo-400 transition-colors" size={18} />
                <input 
                  type="text" 
                  placeholder="Buscar..." 
                  value={filter}
                  onChange={(e) => setFilter(e.target.value)}
                  className="bg-slate-900/50 border border-slate-700/50 rounded-xl pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all w-64"
                />
              </div>
              <button className="p-2.5 bg-slate-800/50 border border-slate-700/50 rounded-xl text-slate-400 hover:text-white transition-all">
                <Bell size={20} />
              </button>
              <button 
                onClick={fetchProducts}
                className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white px-6 py-2.5 rounded-xl font-bold shadow-lg shadow-indigo-600/20 transition-all active:scale-95"
              >
                <Plus size={20} />
                <span className="hidden sm:inline">Nuevo</span>
              </button>
            </div>
          </header>

          {/* Stats Bar */}
          <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {[
              { label: 'Valor Total', value: `${totalValue.toLocaleString()}€`, icon: TrendingUp, color: 'text-indigo-400', bg: 'bg-indigo-500/10' },
              { label: 'Unidades', value: totalStock, icon: Boxes, color: 'text-blue-400', bg: 'bg-blue-500/10' },
              { label: 'Alertas', value: lowStockCount, icon: AlertCircle, color: 'text-rose-400', bg: 'bg-rose-500/10' },
              { label: 'Categorías', value: new Set(products.map(p => p.category_name)).size, icon: Layers, color: 'text-purple-400', bg: 'bg-purple-500/10' }
            ].map((stat, i) => (
              <div key={i} className="bg-slate-900/40 backdrop-blur-md border border-white/5 p-6 rounded-3xl group hover:border-indigo-500/30 transition-all duration-300">
                <div className={`${stat.bg} ${stat.color} w-10 h-10 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                  <stat.icon size={20} />
                </div>
                <p className="text-slate-500 text-xs font-bold uppercase tracking-widest mb-1">{stat.label}</p>
                <p className="text-2xl font-black text-white">{stat.value}</p>
              </div>
            ))}
          </section>

          {/* Grid Content */}
          <section className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-bold text-white flex items-center gap-2">
                Explorador de Inventario
                {loading && <RefreshCcw size={16} className="animate-spin text-indigo-400" />}
              </h3>
              <div className="h-px flex-1 mx-6 bg-gradient-to-r from-slate-800/0 via-slate-800 to-slate-800/0 hidden sm:block" />
            </div>

            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {[1,2,3,4,5,6].map(i => (
                  <div key={i} className="h-56 bg-slate-900/40 animate-pulse rounded-3xl border border-white/5" />
                ))}
              </div>
            ) : filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredProducts.map((p) => (
                  <div key={p.id} className="group relative bg-slate-900/40 backdrop-blur-md border border-white/5 hover:border-indigo-500/30 p-6 rounded-[2.5rem] transition-all duration-500 overflow-hidden">
                    {/* Hover Glow */}
                    <div className="absolute inset-0 bg-gradient-to-br from-indigo-600/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                    
                    <div className="relative z-10">
                      <div className="flex justify-between items-start mb-6">
                        <span className="px-3 py-1 rounded-full bg-slate-800 text-slate-400 text-[10px] font-black uppercase tracking-wider border border-white/5">
                          {p.category_name}
                        </span>
                        <div className="p-2 bg-slate-800/50 rounded-xl text-slate-500 group-hover:text-indigo-400 transition-colors">
                          <ArrowUpRight size={18} />
                        </div>
                      </div>

                      <h4 className="text-xl font-bold text-white mb-6 group-hover:translate-x-1 transition-transform">{p.name}</h4>

                      <div className="flex items-end justify-between">
                        <div>
                          <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">Precio</p>
                          <p className="text-2xl font-black text-white tracking-tight">
                            {Number(p.price).toLocaleString()}
                            <span className="text-indigo-500 ml-1">€</span>
                          </p>
                        </div>
                        <div className="text-right">
                          <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-xl text-xs font-black ${
                            p.stock < 10 ? 'bg-rose-500/20 text-rose-400' : 'bg-emerald-500/20 text-emerald-400'
                          }`}>
                            <ShoppingCart size={14} />
                            {p.stock} UDS
                          </div>
                        </div>
                      </div>

                      <div className="mt-6 pt-6 border-t border-white/5 flex items-center justify-between translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                        <button className="text-xs font-bold text-indigo-400 hover:text-white flex items-center gap-1 group/btn">
                          Ver detalles 
                          <ChevronRight size={14} className="group-hover/btn:translate-x-1 transition-transform" />
                        </button>
                        <span className="text-[10px] font-mono text-slate-600">#{p.id.substring(0, 6)}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="py-32 text-center bg-slate-900/20 rounded-[3rem] border-2 border-dashed border-slate-800/50">
                <div className="w-20 h-20 bg-slate-800/50 rounded-3xl flex items-center justify-center mx-auto mb-6 text-slate-600">
                  <Search size={32} />
                </div>
                <h3 className="text-2xl font-black text-white mb-2">Sin coincidencias</h3>
                <p className="text-slate-500 font-medium">No hay productos que coincidan con "{filter}"</p>
                <button 
                  onClick={() => setFilter('')}
                  className="mt-6 text-indigo-400 font-bold hover:text-white transition-colors"
                >
                  Restablecer búsqueda
                </button>
              </div>
            )}
          </section>
        </main>
      </div>
    </div>
  );
}
