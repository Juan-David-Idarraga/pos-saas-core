'use server'

import { createClient } from '../../lib/supabase/server'
import { redirect } from 'next/navigation'

export async function signIn(email: string, password: string) {
  try {
    const supabase = await createClient()

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
      console.error('Sign in error:', {
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

    redirect('/pos')
  } catch (err) {
    console.error('Unexpected error during sign in:', {
      error: err,
      message: err instanceof Error ? err.message : 'Unknown error',
      stack: err instanceof Error ? err.stack : undefined,
    })
    
    if (err instanceof Error && err.message.includes('environment variables')) {
      return { error: 'Configuración del servidor incompleta. Contacta al administrador.' }
    }
    
    return { error: 'Error inesperado. Verifica tu conexión a internet.' }
  }
}

export async function signUp(email: string, password: string, fullName: string) {
  try {
    const supabase = await createClient()

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName,
        },
      },
    })

    if (error) {
      console.error('Sign up error:', {
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
      const { error: profileError } = await supabase
        .from('profiles')
        .insert([
          {
            id: data.user.id,
            full_name: fullName,
          },
        ])

      if (profileError) {
        console.error('Profile creation error:', profileError)
        // No retornar error aquí porque el usuario se creó en auth
        // El perfil se puede crear después
      }
    }

    return { success: true, message: 'Registro exitoso. Por favor, inicia sesión.' }
  } catch (err) {
    console.error('Unexpected error during sign up:', {
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
    const supabase = await createClient()
    await supabase.auth.signOut()
    redirect('/login')
  } catch (err) {
    console.error('Error during sign out:', err)
    redirect('/login')
  }
}
