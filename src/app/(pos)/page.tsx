'use client'
import React from 'react'
import { useCartStore } from '../../lib/store'

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
  const addItem = useCartStore((state) => state.addItem)
  const cartItems = useCartStore((state) => state.items)
  const total = useCartStore((state) => state.total)
  const increaseQuantity = useCartStore((state) => state.increaseQuantity)
  const decreaseQuantity = useCartStore((state) => state.decreaseQuantity)
  const clearCart = useCartStore((state) => state.clearCart)

  const handleAddToOrder = (product: Product) => {
    addItem(product)
  }

  return (
    <div className="flex h-screen w-full">
      {/* Sección de Productos */}
      <div className="flex-1 p-4 md:p-6 lg:p-8 overflow-y-auto">
        <header className="mb-6">
          <h1 className="text-2xl md:text-3xl font-bold text-slate-800">Caja Principal</h1>
          <p className="text-slate-500">Selecciona los productos para la comanda</p>
        </header>

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

      {/* Sección del Carrito */}
      <div className="w-80 bg-white border-l border-slate-200 p-4 flex flex-col">
        <h2 className="text-xl font-bold mb-4">Comanda Actual</h2>
        <div className="flex-1 overflow-y-auto">
          {cartItems.length === 0 ? (
            <p className="text-slate-500">No hay productos en la comanda.</p>
          ) : (
            <ul>
              {cartItems.map((item) => (
                <li key={item.id} className="flex justify-between items-center py-2 border-b border-slate-100 last:border-b-0">
                  <div>
                    <p className="font-semibold">{item.name}</p>
                    <p className="text-sm text-slate-500">${item.price.toLocaleString('es-CL')} x {item.quantity}</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button onClick={() => decreaseQuantity(item.id)} className="bg-slate-100 text-slate-700 px-2 py-1 rounded-md hover:bg-slate-200">-</button>
                    <span>{item.quantity}</span>
                    <button onClick={() => increaseQuantity(item.id)} className="bg-slate-100 text-slate-700 px-2 py-1 rounded-md hover:bg-slate-200">+</button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
        <div className="mt-4 pt-4 border-t border-slate-200">
          <div className="flex justify-between items-center mb-4">
            <span className="text-lg font-bold">Total:</span>
            <span className="text-lg font-bold">${total.toLocaleString('es-CL')}</span>
          </div>
          <button
            onClick={clearCart}
            className="w-full bg-red-500 text-white py-3 rounded-lg font-semibold hover:bg-red-600 transition-colors"
          >
            Vaciar Comanda
          </button>
          <button className="w-full bg-blue-500 text-white py-3 rounded-lg font-semibold hover:bg-blue-600 transition-colors mt-2">
            Procesar Pago
          </button>
        </div>
      </div>
    </div>
  )
}
