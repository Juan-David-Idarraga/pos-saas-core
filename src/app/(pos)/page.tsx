'use client'
import React from 'react'


// Interfaz para definir la estructura de un producto
interface Product {
  id: string
  name: string
  price: number
  color: string
}

// Datos de prueba simulando la base de datos
const mockProducts: Product[] = [
  { id: '1', name: 'Hamburguesa Doble', price: 8500, color: 'bg-orange-500' },
  { id: '2', name: 'Papas Mixtas', price: 4500, color: 'bg-yellow-500' },
  { id: '3', name: 'Bebida 500ml', price: 2000, color: 'bg-blue-500' },
  { id: '4', name: 'Pizza Pepperoni', price: 12000, color: 'bg-red-500' },
  { id: '5', name: 'Empanada de Pino', price: 2500, color: 'bg-amber-700' },
  { id: '6', name: 'Cerveza Artesanal', price: 4000, color: 'bg-amber-400' },
]

export default function POSPage() {
  const handleAddToOrder = (product: Product) => {
    // Más adelante aquí conectaremos Zustand para el carrito
    console.log(`Agregando al carrito: ${product.name}`)
  }

  return (
    <div className="flex-1 p-4 md:p-6 lg:p-8 overflow-y-auto">
      <header className="mb-6">
        <h1 className="text-2xl md:text-3xl font-bold text-slate-800">Caja Principal</h1>
        <p className="text-slate-500">Selecciona los productos para la comanda</p>
      </header>

      {/* Responsive Grid:
        - Móvil: 2 columnas
        - Tablet (md): 3 columnas
        - PC (lg): 4 columnas
        - Pantallas grandes (xl): 5 columnas
      */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 md:gap-4 lg:gap-6">
        {mockProducts.map((product) => (
          <button
            key={product.id}
            onClick={() => handleAddToOrder(product)}
            className="flex flex-col items-center justify-center text-center p-4 h-32 md:h-40 rounded-2xl shadow-sm border border-slate-200 bg-white hover:bg-slate-50 hover:border-blue-400 active:scale-95 transition-all select-none group"
          >
            <div className={`w-12 h-12 md:w-16 md:h-16 rounded-full mb-3 shadow-sm ${product.color} group-hover:scale-105 transition-transform`} />
            
            <span className="font-semibold text-slate-800 text-sm md:text-base leading-tight">
              {product.name}
            </span>
            
            <span className="mt-1 text-slate-500 font-bold text-sm md:text-base">
              ${product.price.toLocaleString('es-CL')}
            </span>
          </button>
        ))}
      </div>
    </div>
  )
}