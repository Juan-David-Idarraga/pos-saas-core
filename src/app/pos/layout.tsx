import { redirect } from 'next/navigation'
import { createClient } from '../../lib/supabase/server'

export default async function POSLayout({ children }: { children: React.ReactNode }) {
  try {
    console.log('[POSLayout] Starting layout validation...')
    
    const supabase = await createClient()
    console.log('[POSLayout] Supabase client created')
    
    // 1. Obtener usuario autenticado
    const { data: { user }, error: userError } = await supabase.auth.getUser()
    console.log('[POSLayout] Auth user:', { 
      hasUser: !!user, 
      email: user?.email,
      userId: user?.id,
      error: userError?.message 
    })
    
    if (!user) {
      console.log('[POSLayout] No user found, redirecting to /login')
      redirect('/login')
    }

    // 2. Obtener perfil del usuario
    console.log('[POSLayout] Fetching profile for user:', user.id)
    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .select('id, full_name, business_id')
      .eq('id', user.id)
      .single()

    console.log('[POSLayout] Profile query result:', {
      hasProfile: !!profile,
      profile: profile ? { id: profile.id, full_name: profile.full_name, business_id: profile.business_id } : null,
      error: profileError?.message,
      errorCode: profileError?.code
    })

    if (profileError || !profile) {
      console.log('[POSLayout] Profile error or not found, redirecting to /setup')
      redirect('/setup')
    }

    // 3. Obtener información del negocio
    if (!profile.business_id) {
      console.log('[POSLayout] No business_id in profile, redirecting to /setup')
      redirect('/setup')
    }

    console.log('[POSLayout] Fetching business info for business_id:', profile.business_id)
    const { data: business, error: businessError } = await supabase
      .from('businesses')
      .select('id, name, subscription_status')
      .eq('id', profile.business_id)
      .single()

    console.log('[POSLayout] Business query result:', {
      hasBusiness: !!business,
      business: business ? { 
        id: business.id, 
        name: business.name, 
        subscription_status: business.subscription_status 
      } : null,
      error: businessError?.message,
      errorCode: businessError?.code
    })

    if (businessError || !business) {
      console.log('[POSLayout] Business not found, redirecting to /blocked')
      redirect('/blocked')
    }

    // 4. Validar estado de suscripción
    console.log('[POSLayout] Checking subscription status:', business.subscription_status)
    
    if (business.subscription_status !== 'active') {
      console.log('[POSLayout] Subscription not active, redirecting to /blocked')
      redirect('/blocked')
    }

    console.log('[POSLayout] All validations passed, rendering POS')

    return (
      <div className="h-screen w-full flex flex-col overflow-hidden bg-slate-50">
        {/* Header del POS con información del usuario */}
        <header className="bg-white border-b border-slate-200 px-6 py-3 flex justify-between items-center">
          <div>
            <h2 className="text-lg font-semibold text-slate-800">Bienvenido, {user.email}</h2>
            <p className="text-sm text-slate-500">Negocio: {business.name}</p>
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
    console.error('[POSLayout] Unexpected error:', {
      error: err,
      message: err instanceof Error ? err.message : 'Unknown error',
      stack: err instanceof Error ? err.stack : undefined,
    })
    throw err
  }
}
