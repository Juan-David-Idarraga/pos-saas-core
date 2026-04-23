'use client'

import React, { useEffect, useState } from 'react'
import { useCartStore } from '../../lib/store'
import ProductGrid, { Product } from './ProductGrid'
import { getProductsByBusiness, getCurrentUserBusinessId } from '../../lib/services/productService'

export default function POSPage() {
  const [products, setProducts] = useState<Product[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const cartItems = useCartStore((state) => state.items)
  const total = useCartStore((state) => state.total)
  const increaseQuantity = useCartStore((state) => state.increaseQuantity)
  const decreaseQuantity = useCartStore((state) => state.decreaseQuantity)
  const clearCart = useCartStore((state) => state.clearCart)
  const removeItem = useCartStore((state) => state.removeItem)

  // Cargar productos al montar el componente
  useEffect(() => {
    const loadProducts = async () => {
      try {
        setIsLoading(true)
        setError(null)

        // Obtener el business_id del usuario actual
        const businessId = await getCurrentUserBusinessId()
        
        if (!businessId) {
          console.log('[POSPage] No business_id found')
          setProducts([])
          setError(null)
          return
        }

        console.log('[POSPage] Loading products for business:', businessId)

        // Obtener productos del negocio
        const productsData = await getProductsByBusiness(businessId)
        if (productsData === null) {
          console.log('[POSPage] Failed to fetch products')
          setProducts([])
          setError(null)
          return
        }

        console.log('[POSPage] Products loaded successfully:', productsData.length)
        setProducts(productsData)
      } catch (err) {
        console.error('[POSPage] Error loading products:', err)
        // No mostrar error, solo dejar el carrito vacío
        setProducts([])
        setError(null)
      } finally {
        setIsLoading(false)
      }
    }

    loadProducts()
  }, [])

  return (
    <div className="flex h-screen w-full">
      {/* Sección de Productos */}
      <div className="flex-1 p-4 md:p-6 lg:p-8 overflow-y-auto">
        <header className="mb-6">
          <h1 className="text-2xl md:text-3xl font-bold text-slate-800">Caja Principal</h1>
          <p className="text-slate-500">Selecciona los productos para la comanda</p>
        </header>

        <ProductGrid products={products} isLoading={isLoading} error={error} />
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
                <li key={item.id} className="flex justify-between items-center py-3 border-b border-slate-100 last:border-b-0">
                  <div className="flex-1">
                    <p className="font-semibold text-sm">{item.name}</p>
                    <p className="text-xs text-slate-500">${item.price.toLocaleString('es-CL')} x {item.quantity}</p>
                    <p className="text-xs font-semibold text-slate-700 mt-1">
                      Subtotal: ${(item.price * item.quantity).toLocaleString('es-CL')}
                    </p>
                  </div>
                  <div className="flex items-center space-x-1 ml-2">
                    <button
                      onClick={() => decreaseQuantity(item.id)}
                      className="bg-slate-100 text-slate-700 px-2 py-1 rounded-md hover:bg-slate-200 text-sm font-semibold"
                    >
                      −
                    </button>
                    <span className="w-6 text-center font-semibold">{item.quantity}</span>
                    <button
                      onClick={() => increaseQuantity(item.id)}
                      className="bg-slate-100 text-slate-700 px-2 py-1 rounded-md hover:bg-slate-200 text-sm font-semibold"
                    >
                      +
                    </button>
                    <button
                      onClick={() => removeItem(item.id)}
                      className="bg-red-100 text-red-700 px-2 py-1 rounded-md hover:bg-red-200 text-sm font-semibold ml-1"
                    >
                      ✕
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
        <div className="mt-4 pt-4 border-t border-slate-200">
          <div className="flex justify-between items-center mb-4">
            <span className="text-lg font-bold">Total:</span>
            <span className="text-2xl font-bold text-blue-600">${total.toLocaleString('es-CL')}</span>
          </div>
          <button
            onClick={clearCart}
            className="w-full bg-red-500 text-white py-3 rounded-lg font-semibold hover:bg-red-600 transition-colors disabled:opacity-50"
            disabled={cartItems.length === 0}
          >
            Vaciar Comanda
          </button>
          <button
            className="w-full bg-blue-500 text-white py-3 rounded-lg font-semibold hover:bg-blue-600 transition-colors mt-2 disabled:opacity-50"
            disabled={cartItems.length === 0}
          >
            Procesar Pago
          </button>
        </div>
      </div>
    </div>
  )
}
