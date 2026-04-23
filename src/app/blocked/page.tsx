import Link from 'next/link'

export default function BlockedPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-red-500 to-red-700 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-8 text-center">
        <div className="mb-6">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg
              className="w-8 h-8 text-red-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4v2m0 0v2m0-6v-2m0 0V7a2 2 0 012-2h2.586a1 1 0 00.707-.293l2.414-2.414a1 1 0 00-.707-1.707H9.414a1 1 0 00-.707.293L6.293 2.586A1 1 0 006 3.293V5a2 2 0 01-2 2H2a2 2 0 01-2-2V3a2 2 0 012-2h2"
              />
            </svg>
          </div>
          <h1 className="text-3xl font-bold text-slate-800 mb-2">Acceso Bloqueado</h1>
          <p className="text-slate-600">Tu suscripción no está activa</p>
        </div>

        <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
          <p className="text-slate-700 text-sm">
            Tu negocio no tiene una suscripción activa. Por favor, contacta con el equipo de soporte o renueva tu suscripción para continuar usando el sistema POS.
          </p>
        </div>

        <div className="space-y-3">
          <button className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
            Renovar Suscripción
          </button>
          <Link href="/login">
            <button className="w-full bg-slate-200 text-slate-800 py-3 rounded-lg font-semibold hover:bg-slate-300 transition-colors">
              Volver al Login
            </button>
          </Link>
        </div>

        <p className="text-xs text-slate-500 mt-6">
          ¿Necesitas ayuda? Contacta a soporte@pos-saas.com
        </p>
      </div>
    </div>
  )
}
