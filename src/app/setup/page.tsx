import Link from 'next/link'

export default function SetupPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-8 text-center">
        <div className="mb-6">
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg
              className="w-8 h-8 text-blue-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <h1 className="text-3xl font-bold text-slate-800 mb-2">Configuración Requerida</h1>
          <p className="text-slate-600">Tu perfil necesita ser configurado</p>
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
          <p className="text-slate-700 text-sm">
            Parece que tu cuenta no tiene un negocio asignado. Por favor, contacta con el administrador del sistema para completar tu configuración.
          </p>
        </div>

        <div className="space-y-3">
          <Link href="/login">
            <button className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
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
