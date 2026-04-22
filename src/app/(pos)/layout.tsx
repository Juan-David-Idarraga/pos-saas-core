import { redirect } from 'next/navigation'
import { createClient } from '../../lib/supabase/server'

export default async function POSLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createClient()
  
  // 1. Obtener usuario (Desactivado temporalmente)
  // const { data: { user } } = await supabase.auth.getUser()
  // if (!user) redirect('/login')

  // 2. Obtener perfil y estado del negocio (Desactivado temporalmente)
  /*
  const { data: profile } = await supabase
    .from('profiles')
    .select('business_id, businesses(subscription_status)')
    .eq('id', user.id)
    .single()

  const status = profile?.businesses?.[0]?.subscription_status
  */

  // 3. Lógica de bloqueo SaaS (Desactivada temporalmente)
  /*
  if (status !== 'active') {
    redirect('/blocked') 
  }
  */

  return (
    <div className="h-screen w-full flex flex-col overflow-hidden bg-slate-50">
      {/* Header del POS */}
      {children}
    </div>
  )
}