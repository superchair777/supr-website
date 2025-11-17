import { supabase } from './supabaseClient'

export type ProductRecord = {
  id: number
  name: string
  category: string
  price: number
  wholesale_price?: number | null
  moq?: number | null
  original_price?: number | null
  rating?: number | null
  reviews?: number | null
  image_url?: string | null
  description?: string | null
  features?: string[] | null
  in_stock?: boolean | null
  is_new?: boolean | null
  is_sale?: boolean | null
}

export async function fetchProducts() {
  if (!supabase) return { data: null as ProductRecord[] | null, error: null as any }
  const { data, error } = await supabase.from('products').select('*')
  return { data, error }
}
