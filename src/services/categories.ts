import { supabase } from './supabaseClient';

export interface Category {
  id: number;
  name: string;
  slug: string;
  description?: string;
}

// Internal type for Supabase
interface SupabaseCategory {
  id: number;
  name: string;
  slug: string;
  description?: string | null;
}

const fallbackCategories: Category[] = [
  { id: 1, name: 'Executive', slug: 'executive', description: 'High-end office chairs' },
  { id: 2, name: 'Ergonomic', slug: 'ergonomic', description: 'Chairs designed for comfort' },
  { id: 3, name: 'Gaming', slug: 'gaming', description: 'Chairs for gamers' },
  { id: 4, name: 'Conference', slug: 'conference', description: 'Chairs for meeting rooms' },
];

// Local storage helpers
const getLocalCategories = (): Category[] | null => {
  const data = localStorage.getItem('categories');
  return data ? JSON.parse(data) : null;
};

const saveLocalCategories = (categories: Category[]) => {
  localStorage.setItem('categories', JSON.stringify(categories));
};

const mapSupabaseToCategory = (sb: SupabaseCategory): Category => ({
  id: sb.id,
  name: sb.name,
  slug: sb.slug,
  description: sb.description || undefined,
});

export async function fetchCategories(): Promise<{ data: Category[]; error: any }> {
  let data: Category[] = [];
  let error = null;

  if (supabase) {
    const { data: sbData, error: sbError } = await supabase
      .from('categories')
      .select('*');
    
    if (!sbError && sbData) {
      data = sbData.map(mapSupabaseToCategory);
      saveLocalCategories(data);
      return { data, error: null };
    }
    // If Supabase fails or returns null, fall through to local
  }

  // Fallback to local storage or default data
  const local = getLocalCategories();
  if (local && local.length > 0) {
    data = local;
  } else {
    data = fallbackCategories;
    saveLocalCategories(data);
  }

  return { data, error };
}

export async function saveCategory(category: Category): Promise<{ data: Category | null; error: any }> {
  // Try Supabase first
  if (supabase) {
    const sbCategory: any = {
      name: category.name,
      slug: category.slug,
      description: category.description,
    };

    let result;
    if (category.id > 0) {
      // Update
      result = await supabase
        .from('categories')
        .update(sbCategory)
        .eq('id', category.id)
        .select()
        .single();
    } else {
      // Insert
      // Remove id for insert to let DB generate it
      result = await supabase
        .from('categories')
        .insert(sbCategory)
        .select()
        .single();
    }

    if (!result.error && result.data) {
      const saved = mapSupabaseToCategory(result.data);
      // Update local cache
      const local = getLocalCategories() || [];
      const idx = local.findIndex(c => c.id === saved.id);
      if (idx >= 0) {
        local[idx] = saved;
      } else {
        local.push(saved);
      }
      saveLocalCategories(local);
      return { data: saved, error: null };
    }
  }

  // Fallback to local storage
  const local = getLocalCategories() || [];
  let saved: Category;
  
  if (category.id > 0) {
    const idx = local.findIndex(c => c.id === category.id);
    if (idx >= 0) {
      local[idx] = category;
      saved = category;
    } else {
      return { data: null, error: 'Category not found' };
    }
  } else {
    // Generate new ID
    const newId = Math.max(...local.map(c => c.id), 0) + 1;
    saved = { ...category, id: newId };
    local.push(saved);
  }
  
  saveLocalCategories(local);
  return { data: saved, error: null };
}

export async function deleteCategory(id: number): Promise<{ error: any }> {
  if (supabase) {
    const { error } = await supabase
      .from('categories')
      .delete()
      .eq('id', id);
    
    if (!error) {
      const local = getLocalCategories() || [];
      const filtered = local.filter(c => c.id !== id);
      saveLocalCategories(filtered);
      return { error: null };
    }
  }

  // Fallback local
  const local = getLocalCategories() || [];
  const filtered = local.filter(c => c.id !== id);
  saveLocalCategories(filtered);
  return { error: null };
}
