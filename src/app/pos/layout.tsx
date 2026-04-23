import { redirect } from 'next/navigation'
import { createClient } from '../../lib/supabase/server'

export default async function POSLayout({ children }: { children: React.ReactNode }) {
  try {
    console.log('[POSLayout] Starting layout validation...')
    
    const supabase = await createClient()
    
    // 1. Obtener usuario autenticado (CRÍTICO - si falla, redirigir a login)
    const { data: { user }, error: userError } = await supabase.auth.getUser()
    
    if (!user || userError) {
      console.log('[POSLayout] No authenticated user, redirecting to /login')
      redirect('/login')
    }

    console.log('[POSLayout] User authenticated:', user.email)

    // 2. Intentar obtener información del negocio (NO CRÍTICO - usar valores por defecto si falla)
    let businessName = 'Mi Negocio'
    let userEmail = user.email || 'Usuario'

    try {
      // Intentar obtener el perfil y negocio del usuario
      const { data: profile } = await supabase
        .from('profiles')
        .select('business_id')
        .eq('id', user.id)
        .single()

      if (profile?.business_id) {
        // Si tenemos business_id, intentar obtener el nombre del negocio
        const { data: business } = await supabase
          .from('businesses')
          .select('name')
          .eq('id', profile.business_id)
          .single()

        if (business?.name) {
          businessName = business.name
          console.log('[POSLayout] Business found:', businessName)
        }
      }
    } catch (err) {
      console.log('[POSLayout] Could not fetch business info, using defaults:', err instanceof Error ? err.message : 'Unknown error')
      // Continuar de todas formas - no es crítico
    }

    return (
      <div className="h-screen w-full flex flex-col overflow-hidden bg-slate-50">
        {/* Header del POS con información del usuario */}
        <header className="bg-white border-b border-slate-200 px-6 py-3 flex justify-between items-center">
          <div>
            <h2 className="text-lg font-semibold text-slate-800">Bienvenido, {userEmail}</h2>
            <p className="text-sm text-slate-500">Negocio: {businessName}</p>
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
  } catch (err) {
    console.error('[POSLayout] Critical error:', err instanceof Error ? err.message : 'Unknown error')
    // Si hay un error crítico, redirigir a login
    redirect('/login')
  }
}
