'use client'

import React, { useState } from 'react'
import { signIn, signUp } from './actions'

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [isSignUp, setIsSignUp] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [fullName, setFullName] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)

    try {
      if (isSignUp) {
        const result = await signUp(email, password, fullName)
        if (result?.error) {
          console.error('Sign up error:', result.error)
          setError(result.error)
        } else {
          setError(null)
          setIsSignUp(false)
          setEmail('')
          setPassword('')
          setFullName('')
          alert(result?.message || 'Registro exitoso. Por favor, inicia sesión.')
        }
      } else {
        console.log('Attempting sign in with:', email)
        const result = await signIn(email, password)
        if (result?.error) {
          console.error('Sign in error:', result.error)
          setError(result.error)
        } else {
          console.log('Sign in successful, redirecting...')
        }
      }
    } catch (err) {
      console.error('Unexpected error:', err)
      setError('Ocurrió un error inesperado. Intenta de nuevo.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-8">
        {/* Logo/Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-slate-800">POS SaaS Core</h1>
          <p className="text-slate-500 mt-2">Sistema de Punto de Venta Multi-tenant</p>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-6 bg-slate-100 p-1 rounded-lg">
          <button
            onClick={() => {
              setIsSignUp(false)
              setError(null)
            }}
            className={`flex-1 py-2 px-4 rounded-md font-semibold transition-all ${
              !isSignUp
                ? 'bg-white text-blue-600 shadow-sm'
                : 'text-slate-600 hover:text-slate-800'
            }`}
          >
            Iniciar Sesión
          </button>
          <button
            onClick={() => {
              setIsSignUp(true)
              setError(null)
            }}
            className={`flex-1 py-2 px-4 rounded-md font-semibold transition-all ${
              isSignUp
                ? 'bg-white text-blue-600 shadow-sm'
                : 'text-slate-600 hover:text-slate-800'
            }`}
          >
            Registrarse
          </button>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg text-sm">
            {error}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {isSignUp && (
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Nombre Completo
              </label>
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Juan Pérez"
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required={isSignUp}
              />
            </div>
          )}

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Correo Electrónico
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="tu@email.com"
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Contraseña
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading
              ? 'Cargando...'
              : isSignUp
              ? 'Crear Cuenta'
              : 'Iniciar Sesión'}
          </button>
        </form>

        {/* Debug Info */}
        <div className="mt-6 p-4 bg-yellow-50 rounded-lg border border-yellow-200">
          <p className="text-xs font-semibold text-yellow-900 mb-2">⚠️ Debugging:</p>
          <p className="text-xs text-yellow-800">Abre la consola (F12) para ver errores detallados.</p>
          <p className="text-xs text-yellow-800 mt-1">Verifica que .env.local tenga NEXT_PUBLIC_SUPABASE_URL y NEXT_PUBLIC_SUPABASE_ANON_KEY</p>
        </div>

        {/* Demo Credentials */}
        <div className="mt-3 p-4 bg-blue-50 rounded-lg border border-blue-200">
          <p className="text-xs font-semibold text-blue-900 mb-2">📝 Credenciales de Prueba:</p>
          <p className="text-xs text-blue-800">Email: <code className="bg-white px-2 py-1 rounded">demo@example.com</code></p>
          <p className="text-xs text-blue-800">Contraseña: <code className="bg-white px-2 py-1 rounded">demo123456</code></p>
        </div>
      </div>
    </div>
  )
}
