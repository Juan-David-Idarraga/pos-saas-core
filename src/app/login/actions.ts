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
      console.error('Sign in error:', error)
      // Proporcionar mensajes más amigables según el tipo de error
      if (error.message.includes('Invalid login credentials')) {
        return { error: 'Email o contraseña incorrectos. Intenta de nuevo.' }
      }
      if (error.message.includes('Email not confirmed')) {
        return { error: 'Por favor, confirma tu email antes de iniciar sesión.' }
      }
      return { error: error.message || 'Error al iniciar sesión. Intenta de nuevo.' }
    }

    redirect('/pos')
  } catch (err) {
    console.error('Unexpected error during sign in:', err)
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
      console.error('Sign up error:', error)
      if (error.message.includes('already registered')) {
        return { error: 'Este email ya está registrado. Intenta iniciar sesión.' }
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
            email: email,
          },
        ])

      if (profileError) {
        console.error('Profile creation error:', profileError)
        return { error: 'Error al crear tu perfil. Contacta a soporte.' }
      }
    }

    return { success: true, message: 'Registro exitoso. Por favor, inicia sesión.' }
  } catch (err) {
    console.error('Unexpected error during sign up:', err)
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
