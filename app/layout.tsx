import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Learning Inventory - Neon DB',
  description: 'Gestión de inventario con PostgreSQL y Neon',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className="h-full">
      <body className="h-full font-sans antialiased text-gray-900 bg-gray-50">
        <nav className="bg-white border-b border-gray-200 sticky top-0 z-40">
          <div className="max-w-full px-[10%]">
            <div className="flex justify-between h-16">
              <div className="flex items-center">
                <div className="flex-shrink-0 flex items-center gap-2">
                  <div className="bg-indigo-600 p-1.5 rounded-lg">
                    <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                    </svg>
                  </div>
                  <span className="text-xl font-bold tracking-tight text-gray-900">Learning <span className="text-indigo-600">Inventory</span></span>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-emerald-100 text-emerald-800">
                  <span className="w-2 h-2 bg-emerald-500 rounded-full mr-2 animate-pulse"></span>
                  Conectado a Neon
                </span>
              </div>
            </div>
          </div>
        </nav>
        <main>{children}</main>
      </body>
    </html>
  );
}
