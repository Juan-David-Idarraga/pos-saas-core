import { redirect } from 'next/navigation'
import { createClient } from '../../lib/supabase/server'

export default async function POSLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createClient()
  
  // 1. Obtener usuario autenticado
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  // 2. Obtener perfil y estado del negocio
  const { data: profile, error: profileError } = await supabase
    .from('profiles')
    .select('business_id, businesses(subscription_status)')
    .eq('id', user.id)
    .single()

  // Si no existe perfil o hay error, redirigir a setup
  if (profileError || !profile) {
    redirect('/setup')
  }

  // 3. Validar estado de suscripción
  const status = profile?.businesses?.[0]?.subscription_status
  
  if (status !== 'active') {
    redirect('/blocked')
  }

  return (
    <div className="h-screen w-full flex flex-col overflow-hidden bg-slate-50">
      {/* Header del POS con información del usuario */}
      <header className="bg-white border-b border-slate-200 px-6 py-3 flex justify-between items-center">
        <div>
          <h2 className="text-lg font-semibold text-slate-800">Bienvenido, {user.email}</h2>
          <p className="text-sm text-slate-500">Negocio ID: {profile.business_id}</p>
        </div>
        <form action={async () => {
          'use server'
          const supabaseLogout = await createClient()
          await supabaseLogout.auth.signOut()
          redirect('/login')
        }}>
          <button
            type="submit"
            className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors font-semibold"
          >
            Cerrar Sesión
          </button>
        </form>
      </header>

      {/* Contenido del POS */}
      {children}
    </div>
  )
}
