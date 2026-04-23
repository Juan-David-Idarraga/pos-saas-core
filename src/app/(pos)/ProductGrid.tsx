'use client'

import React from 'react'
import { useCartStore } from '../../lib/store'

export interface Product {
  id: string
  name: string
  price: number
  color: string
  business_id: string
  description?: string
  stock?: number
}

interface ProductGridProps {
  products: Product[]
  isLoading: boolean
  error?: string | null
}

export default function ProductGrid({ products, isLoading, error }: ProductGridProps) {
  const addItem = useCartStore((state) => state.addItem)

  const handleAddToOrder = (product: Product) => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      color: product.color,
    })
  }

  // Estado de carga: mostrar skeleton loaders
  if (isLoading) {
    return (
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 md:gap-4 lg:gap-6">
        {Array.from({ length: 10 }).map((_, i) => (
          <div
            key={i}
            className="flex flex-col items-center justify-center text-center p-4 h-32 md:h-40 rounded-2xl shadow-sm border border-slate-200 bg-slate-100 animate-pulse"
          >
            <div className="w-12 h-12 md:w-16 md:h-16 rounded-full mb-3 bg-slate-300" />
            <div className="w-20 h-4 bg-slate-300 rounded mb-2" />
            <div className="w-16 h-4 bg-slate-300 rounded" />
          </div>
        ))}
      </div>
    )
  }

  // Estado de error
  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
        <p className="text-red-700 font-semibold">Error al cargar productos</p>
        <p className="text-red-600 text-sm mt-2">{error}</p>
      </div>
    )
  }

  // Sin productos
  if (products.length === 0) {
    return (
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 text-center">
        <p className="text-blue-700 font-semibold">No hay productos disponibles</p>
        <p className="text-blue-600 text-sm mt-2">Contacta con tu administrador para agregar productos.</p>
      </div>
    )
  }

  // Mostrar grilla de productos
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 md:gap-4 lg:gap-6">
      {products.map((product) => (
        <button
          key={product.id}
          onClick={() => handleAddToOrder(product)}
          className="flex flex-col items-center justify-center text-center p-4 h-32 md:h-40 rounded-2xl shadow-sm border border-slate-200 bg-white hover:bg-slate-50 hover:border-blue-400 active:scale-95 transition-all select-none group"
          title={product.description || product.name}
        >
          <div className={`w-12 h-12 md:w-16 md:h-16 rounded-full mb-3 shadow-sm ${product.color || 'bg-blue-500'} group-hover:scale-105 transition-transform`} />
          
          <span className="font-semibold text-slate-800 text-sm md:text-base leading-tight">
            {product.name}
          </span>
          
          <span className="mt-1 text-slate-500 font-bold text-sm md:text-base">
            ${product.price.toLocaleString('es-CL')}
          </span>

          {product.stock !== undefined && (
            <span className="mt-1 text-xs text-slate-400">
              Stock: {product.stock}
            </span>
          )}
        </button>
      ))}
    </div>
  )
}
