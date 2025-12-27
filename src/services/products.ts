import { supabase } from './supabaseClient';

export interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  wholesalePrice?: number | null;
  moq?: number | null;
  originalPrice?: number | null;
  rating?: number | null;
  reviews?: number | null;
  monthlySold?: number | null;
  image: string;
  description: string;
  features: string[];
  inStock: boolean;
  isNew: boolean;
  isSale: boolean;
}

// Internal type for Supabase
interface SupabaseProduct {
  id: number;
  name: string;
  category: string;
  price: number;
  wholesale_price?: number | null;
  moq?: number | null;
  original_price?: number | null;
  rating?: number | null;
  reviews?: number | null;
  monthly_sold?: number | null;
  image_url?: string | null;
  description?: string | null;
  features?: string[] | null;
  in_stock?: boolean | null;
  is_new?: boolean | null;
  is_sale?: boolean | null;
}

const fallbackProducts: Product[] = [
  {
    id: 1,
    name: 'Executive Office Chair',
    category: 'executive',
    price: 899.99,
    wholesalePrice: 649.99,
    moq: 10,
    originalPrice: 1199.99,
    rating: 4.8,
    reviews: 124,
    monthlySold: 320,
    image: 'https://images.pexels.com/photos/1957477/pexels-photo-1957477.jpeg?auto=compress&cs=tinysrgb&w=400',
    description: 'Premium leather executive chair with lumbar support, adjustable height, and ergonomic design.',
    features: ['Leather upholstery', 'Lumbar support', 'Height adjustable', '360° swivel'],
    inStock: true,
    isNew: false,
    isSale: true
  },
  {
    id: 2,
    name: 'Ergonomic Task Chair',
    category: 'ergonomic',
    price: 649.99,
    wholesalePrice: 449.99,
    moq: 15,
    originalPrice: null,
    rating: 4.9,
    reviews: 89,
    monthlySold: 280,
    image: 'https://images.pexels.com/photos/1957477/pexels-photo-1957477.jpeg?auto=compress&cs=tinysrgb&w=400',
    description: 'Advanced ergonomic task chair with mesh back, adjustable armrests, and lumbar support.',
    features: ['Mesh back', 'Adjustable armrests', 'Lumbar support', 'Breathable fabric'],
    inStock: true,
    isNew: true,
    isSale: false
  },
  {
    id: 3,
    name: 'Gaming Chair Pro',
    category: 'gaming',
    price: 549.99,
    wholesalePrice: 379.99,
    moq: 12,
    originalPrice: 699.99,
    rating: 4.7,
    reviews: 156,
    monthlySold: 340,
    image: 'https://images.pexels.com/photos/1957477/pexels-photo-1957477.jpeg?auto=compress&cs=tinysrgb&w=400',
    description: 'High-performance gaming chair with RGB lighting, memory foam padding, and full recline.',
    features: ['RGB lighting', 'Memory foam', 'Full recline', 'Racing style'],
    inStock: true,
    isNew: false,
    isSale: true
  },
  {
    id: 4,
    name: 'Mesh Office Chair',
    category: 'ergonomic',
    price: 449.99,
    wholesalePrice: 299.99,
    moq: 20,
    originalPrice: null,
    rating: 4.6,
    reviews: 73,
    monthlySold: 210,
    image: 'https://images.pexels.com/photos/1957477/pexels-photo-1957477.jpeg?auto=compress&cs=tinysrgb&w=400',
    description: 'Breathable mesh office chair with modern design and excellent ventilation.',
    features: ['Full mesh design', 'Breathable', 'Modern style', 'Lightweight'],
    inStock: true,
    isNew: false,
    isSale: false
  },
  {
    id: 5,
    name: 'Conference Room Chair',
    category: 'conference',
    price: 349.99,
    wholesalePrice: 229.99,
    moq: 25,
    originalPrice: null,
    rating: 4.5,
    reviews: 45,
    monthlySold: 120,
    image: 'https://images.pexels.com/photos/1957477/pexels-photo-1957477.jpeg?auto=compress&cs=tinysrgb&w=400',
    description: 'Professional conference room chair with sleek design and comfortable padding.',
    features: ['Professional design', 'Comfortable padding', 'Stackable', 'Durable frame'],
    inStock: false,
    isNew: false,
    isSale: false
  },
  {
    id: 6,
    name: 'Premium Gaming Chair',
    category: 'gaming',
    price: 1249.99,
    wholesalePrice: 899.99,
    moq: 8,
    originalPrice: null,
    rating: 4.9,
    reviews: 201,
    monthlySold: 260,
    image: 'https://images.pexels.com/photos/1957477/pexels-photo-1957477.jpeg?auto=compress&cs=tinysrgb&w=400',
    description: 'Ultimate gaming chair with premium materials, advanced ergonomics, and customizable features.',
    features: ['Premium materials', 'Advanced ergonomics', 'Customizable', 'Professional grade'],
    inStock: true,
    isNew: true,
    isSale: false
  },
  {
    id: 7,
    name: 'Standing Desk Chair',
    category: 'ergonomic',
    price: 799.99,
    wholesalePrice: 549.99,
    moq: 10,
    originalPrice: 999.99,
    rating: 4.7,
    reviews: 67,
    monthlySold: 190,
    image: 'https://images.pexels.com/photos/1957477/pexels-photo-1957477.jpeg?auto=compress&cs=tinysrgb&w=400',
    description: 'Innovative standing desk chair that promotes active sitting and better posture.',
    features: ['Active sitting', 'Height adjustable', 'Posture support', 'Innovative design'],
    inStock: true,
    isNew: false,
    isSale: true
  },
  {
    id: 8,
    name: 'Luxury Executive Chair',
    category: 'executive',
    price: 1599.99,
    wholesalePrice: 1149.99,
    moq: 5,
    originalPrice: null,
    rating: 4.8,
    reviews: 92,
    monthlySold: 150,
    image: 'https://images.pexels.com/photos/1957477/pexels-photo-1957477.jpeg?auto=compress&cs=tinysrgb&w=400',
    description: 'Top-tier luxury executive chair with premium leather and advanced comfort features.',
    features: ['Premium leather', 'Luxury design', 'Advanced comfort', 'Executive style'],
    inStock: true,
    isNew: true,
    isSale: false
  }
];

const STORAGE_KEY = 'products_data';

function getLocalProducts(): Product[] | null {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      return JSON.parse(stored);
    }
  } catch (e) {
    console.error('Failed to load from local storage', e);
  }
  return null;
}

function saveLocalProducts(products: Product[]) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(products));
  } catch (e) {
    console.error('Failed to save to local storage', e);
  }
}

function mapSupabaseToProduct(p: SupabaseProduct): Product {
  return {
    id: p.id,
    name: p.name,
    category: p.category,
    price: p.price,
    wholesalePrice: p.wholesale_price ?? null,
    moq: p.moq ?? null,
    originalPrice: p.original_price ?? null,
    rating: p.rating ?? 0,
    reviews: p.reviews ?? 0,
    monthlySold: p.monthly_sold ?? null,
    image: p.image_url ?? '',
    description: p.description ?? '',
    features: p.features ?? [],
    inStock: p.in_stock ?? true,
    isNew: p.is_new ?? false,
    isSale: p.is_sale ?? false,
  };
}

function mapProductToSupabase(p: Partial<Product>): Partial<SupabaseProduct> {
  const result: Partial<SupabaseProduct> = {};
  if (p.id !== undefined) result.id = p.id;
  if (p.name !== undefined) result.name = p.name;
  if (p.category !== undefined) result.category = p.category;
  if (p.price !== undefined) result.price = p.price;
  if (p.wholesalePrice !== undefined) result.wholesale_price = p.wholesalePrice;
  if (p.moq !== undefined) result.moq = p.moq;
  if (p.originalPrice !== undefined) result.original_price = p.originalPrice;
  if (p.rating !== undefined) result.rating = p.rating;
  if (p.reviews !== undefined) result.reviews = p.reviews;
  if (p.monthlySold !== undefined) result.monthly_sold = p.monthlySold;
  if (p.image !== undefined) result.image_url = p.image;
  if (p.description !== undefined) result.description = p.description;
  if (p.features !== undefined) result.features = p.features;
  if (p.inStock !== undefined) result.in_stock = p.inStock;
  if (p.isNew !== undefined) result.is_new = p.isNew;
  if (p.isSale !== undefined) result.is_sale = p.isSale;
  return result;
}

export async function fetchProducts(): Promise<{ data: Product[]; error: any }> {
  let data: Product[] = [];
  let error = null;

  // Try Supabase first if available
  if (supabase) {
    const { data: sbData, error: sbError } = await supabase.from('products').select('*');
    if (!sbError && sbData) {
      data = sbData.map(mapSupabaseToProduct);
      // Sync to local storage for offline fallback/consistency
      saveLocalProducts(data);
      return { data, error: null };
    } else {
      console.warn('Supabase fetch failed, falling back to local', sbError);
    }
  }

  // Fallback to Local Storage
  const local = getLocalProducts();
  if (local && local.length > 0) {
    data = local;
  } else {
    // Fallback to Hardcoded
    data = fallbackProducts;
    saveLocalProducts(data); // Initialize local storage
  }

  return { data, error };
}

export async function saveProduct(product: Product): Promise<{ data: Product | null; error: any }> {
  // Update Local Storage
  const local = getLocalProducts() || fallbackProducts;
  const index = local.findIndex(p => p.id === product.id);
  let updatedLocal = [...local];
  if (index >= 0) {
    updatedLocal[index] = product;
  } else {
    // For new products, generate a simple ID if not provided or collision
    if (!product.id) {
      product.id = Math.max(...local.map(p => p.id), 0) + 1;
    }
    updatedLocal.push(product);
  }
  saveLocalProducts(updatedLocal);

  // Try Supabase
  if (supabase) {
    const sbProduct = mapProductToSupabase(product);
    const { data, error } = await supabase.from('products').upsert(sbProduct).select();
    if (error) {
      console.error('Supabase save failed', error);
      // Return local success anyway so UI updates
      return { data: product, error: null }; 
    }
    return { data: mapSupabaseToProduct(data[0]), error: null };
  }

  return { data: product, error: null };
}

export async function deleteProduct(id: number): Promise<{ error: any }> {
  // Update Local Storage
  const local = getLocalProducts() || fallbackProducts;
  const updatedLocal = local.filter(p => p.id !== id);
  saveLocalProducts(updatedLocal);

  // Try Supabase
  if (supabase) {
    const { error } = await supabase.from('products').delete().eq('id', id);
    if (error) {
      console.error('Supabase delete failed', error);
    }
  }

  return { error: null };
}
