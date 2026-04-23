import { createClient } from '../supabase/server'

export interface Product {
  id: string
  name: string
  price: number
  color?: string // Opcional - si no viene de la BD, usaremos un color por defecto
  business_id: string
  description?: string
  stock?: number
}

// Colores por defecto para cuando no hay color en la BD
const DEFAULT_COLORS = [
  'bg-blue-500',
  'bg-purple-500',
  'bg-pink-500',
  'bg-green-500',
  'bg-yellow-500',
  'bg-red-500',
  'bg-indigo-500',
  'bg-cyan-500',
]

// Función para obtener un color por defecto basado en el ID del producto
function getDefaultColor(productId: string): string {
  const hash = productId.charCodeAt(0) + productId.charCodeAt(productId.length - 1)
  return DEFAULT_COLORS[hash % DEFAULT_COLORS.length]
}

/**
 * Obtiene todos los productos de un negocio específico desde Supabase
 * @param businessId - El ID del negocio (tenant)
 * @returns Array de productos o error
 */
export async function getProductsByBusiness(businessId: string): Promise<Product[] | null> {
  try {
    const supabase = await createClient()

    const { data, error } = await supabase
      .from('products')
      .select('id, name, price, color, business_id, description, stock')
      .eq('business_id', businessId)
      .eq('active', true) // Solo productos activos
      .order('name', { ascending: true })

    if (error) {
      console.error('Error fetching products:', error)
      return null
    }

    // Asignar color por defecto si no existe
    const productsWithColors = (data || []).map(product => ({
      ...product,
      color: product.color || getDefaultColor(product.id)
    }))

    return productsWithColors
  } catch (err) {
    console.error('Unexpected error fetching products:', err)
    return null
  }
}

/**
 * Obtiene un producto específico por ID
 * @param productId - El ID del producto
 * @param businessId - El ID del negocio (para validación de seguridad)
 * @returns El producto o null
 */
export async function getProductById(
  productId: string,
  businessId: string
): Promise<Product | null> {
  try {
    const supabase = await createClient()

    const { data, error } = await supabase
      .from('products')
      .select('id, name, price, color, business_id, description, stock')
      .eq('id', productId)
      .eq('business_id', businessId) // Validación de seguridad: solo su negocio
      .single()

    if (error) {
      console.error('Error fetching product:', error)
      return null
    }

    // Asignar color por defecto si no existe
    if (data) {
      data.color = data.color || getDefaultColor(data.id)
    }

    return data
  } catch (err) {
    console.error('Unexpected error fetching product:', err)
    return null
  }
}

/**
 * Obtiene el business_id del usuario actual
 * @returns El business_id o null
 */
export async function getCurrentUserBusinessId(): Promise<string | null> {
  try {
    const supabase = await createClient()

    // Obtener usuario actual
    const { data: { user }, error: userError } = await supabase.auth.getUser()
    if (userError || !user) {
      console.error('Error getting current user:', userError)
      return null
    }

    // Obtener perfil del usuario
    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .select('business_id')
      .eq('id', user.id)
      .single()

    if (profileError) {
      console.error('Error getting user profile:', profileError)
      return null
    }

    return profile?.business_id || null
  } catch (err) {
    console.error('Unexpected error getting business ID:', err)
    return null
  }
}
