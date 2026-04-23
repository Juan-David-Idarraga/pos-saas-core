'use server'

import { createClient } from '../../lib/supabase/server'
import { redirect } from 'next/navigation'

export async function signIn(email: string, password: string) {
  try {
    console.log('[signIn] Starting sign in process for:', email)
    console.log('[signIn] Environment check:', {
      hasUrl: !!process.env.NEXT_PUBLIC_SUPABASE_URL,
      hasKey: !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    })

    const supabase = await createClient()
    console.log('[signIn] Supabase client created successfully')

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    console.log('[signIn] Auth response received:', { hasError: !!error })

    if (error) {
      console.error('[signIn] Authentication error:', {
        message: error.message,
        status: error.status,
        code: error.code,
      })
      
      // Proporcionar mensajes más amigables según el tipo de error
      if (error.message.includes('Invalid login credentials')) {
        return { error: 'Email o contraseña incorrectos. Intenta de nuevo.' }
      }
      if (error.message.includes('Email not confirmed')) {
        return { error: 'Por favor, confirma tu email antes de iniciar sesión.' }
      }
      if (error.message.includes('User not found')) {
        return { error: 'Este usuario no existe. Intenta registrarte primero.' }
      }
      
      return { error: error.message || 'Error al iniciar sesión. Intenta de nuevo.' }
    }

    console.log('[signIn] Authentication successful, redirecting to /pos')
    redirect('/pos')
  } catch (err) {
    console.error('[signIn] Unexpected error caught:', {
      error: err,
      message: err instanceof Error ? err.message : 'Unknown error',
      stack: err instanceof Error ? err.stack : undefined,
      type: typeof err,
    })
    
    // Devolver el error real en lugar de un mensaje genérico
    if (err instanceof Error) {
      const errorMessage = err.message
      
      if (errorMessage.includes('environment variables')) {
        return { error: 'Configuración del servidor incompleta. Contacta al administrador.' }
      }
      if (errorMessage.includes('fetch')) {
        return { error: 'No se pudo conectar con el servidor. Verifica tu conexión a internet.' }
      }
      
      // Devolver el error real para debugging
      return { error: `Error: ${errorMessage}` }
    }
    
    return { error: 'Error inesperado. Por favor, intenta de nuevo.' }
  }
}

export async function signUp(email: string, password: string, fullName: string) {
  try {
    console.log('[signUp] Starting sign up process for:', email)

    const supabase = await createClient()
    console.log('[signUp] Supabase client created successfully')

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName,
        },
      },
    })

    console.log('[signUp] Auth response received:', { hasError: !!error })

    if (error) {
      console.error('[signUp] Sign up error:', {
        message: error.message,
        status: error.status,
        code: error.code,
      })
      
      if (error.message.includes('already registered')) {
        return { error: 'Este email ya está registrado. Intenta iniciar sesión.' }
      }
      if (error.message.includes('rate limit')) {
        return { error: 'Demasiados intentos. Intenta de nuevo en unos minutos.' }
      }
      if (error.message.includes('invalid')) {
        return { error: 'Email inválido. Usa un formato de email válido (ej: usuario@dominio.com).' }
      }
      
      return { error: error.message || 'Error al registrarse. Intenta de nuevo.' }
    }

    // Crear un perfil en la tabla profiles
    if (data.user) {
      console.log('[signUp] Creating profile for user:', data.user.id)
      
      const { error: profileError } = await supabase
        .from('profiles')
        .insert([
          {
            id: data.user.id,
            full_name: fullName,
          },
        ])

      if (profileError) {
        console.error('[signUp] Profile creation error:', profileError)
        // No retornar error aquí porque el usuario se creó en auth
      }
    }

    console.log('[signUp] Sign up successful')
    return { success: true, message: 'Registro exitoso. Por favor, inicia sesión.' }
  } catch (err) {
    console.error('[signUp] Unexpected error caught:', {
      error: err,
      message: err instanceof Error ? err.message : 'Unknown error',
    })
    
    if (err instanceof Error && err.message.includes('environment variables')) {
      return { error: 'Configuración del servidor incompleta. Contacta al administrador.' }
    }
    
    return { error: 'Error inesperado. Verifica tu conexión a internet.' }
  }
}

export async function signOut() {
  try {
    console.log('[signOut] Starting sign out')
    const supabase = await createClient()
    await supabase.auth.signOut()
    console.log('[signOut] Sign out successful')
    redirect('/login')
  } catch (err) {
    console.error('[signOut] Error during sign out:', err)
    redirect('/login')
  }
}
