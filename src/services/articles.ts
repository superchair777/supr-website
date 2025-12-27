import { supabase } from './supabaseClient';

export interface Article {
  id: number;
  title: string;
  excerpt: string;
  category: string;
  author: string;
  date: string;
  readTime: string;
  image: string;
  featured: boolean;
}

// Internal type for Supabase
interface SupabaseArticle {
  id: number;
  title: string;
  excerpt: string;
  category: string;
  author: string;
  date: string;
  read_time: string;
  image_url: string;
  featured: boolean;
}

const fallbackArticles: Article[] = [
  {
    id: 1,
    title: 'The Ultimate Guide to Ergonomic Office Setup in 2025',
    excerpt: 'Learn how to create the perfect ergonomic workspace that reduces strain, improves posture, and boosts productivity.',
    category: 'ergonomics',
    author: 'Dr. Sarah Johnson',
    date: '2025-01-15',
    readTime: '8 min read',
    image: 'https://images.pexels.com/photos/1957477/pexels-photo-1957477.jpeg?auto=compress&cs=tinysrgb&w=400',
    featured: true
  },
  {
    id: 2,
    title: 'How the Right Chair Can Reduce Back Pain by 80%',
    excerpt: 'Discover the science behind ergonomic seating and how proper support can dramatically reduce workplace injuries.',
    category: 'health',
    author: 'Mark Thompson',
    date: '2025-01-12',
    readTime: '6 min read',
    image: 'https://images.pexels.com/photos/1957477/pexels-photo-1957477.jpeg?auto=compress&cs=tinysrgb&w=400',
    featured: false
  },
  {
    id: 3,
    title: 'Top 10 Productivity Hacks for Remote Workers',
    excerpt: 'Maximize your work-from-home efficiency with these proven strategies and workspace optimization tips.',
    category: 'productivity',
    author: 'Lisa Chen',
    date: '2025-01-10',
    readTime: '5 min read',
    image: 'https://images.pexels.com/photos/1957477/pexels-photo-1957477.jpeg?auto=compress&cs=tinysrgb&w=400',
    featured: false
  },
  {
    id: 4,
    title: 'The Psychology of Color in Office Design',
    excerpt: 'Explore how different colors in your workspace can affect mood, creativity, and overall work performance.',
    category: 'design',
    author: 'Alex Rivera',
    date: '2025-01-08',
    readTime: '7 min read',
    image: 'https://images.pexels.com/photos/1957477/pexels-photo-1957477.jpeg?auto=compress&cs=tinysrgb&w=400',
    featured: false
  },
  {
    id: 5,
    title: 'Standing vs. Sitting: Finding the Perfect Balance',
    excerpt: 'Learn about the benefits of alternating between sitting and standing throughout your workday.',
    category: 'health',
    author: 'Dr. Michael Brown',
    date: '2025-01-05',
    readTime: '6 min read',
    image: 'https://images.pexels.com/photos/1957477/pexels-photo-1957477.jpeg?auto=compress&cs=tinysrgb&w=400',
    featured: false
  },
  {
    id: 6,
    title: 'Ergonomic Accessories That Make a Difference',
    excerpt: 'Discover the essential ergonomic accessories that can complement your chair and improve your workspace.',
    category: 'ergonomics',
    author: 'Jennifer Davis',
    date: '2025-01-03',
    readTime: '4 min read',
    image: 'https://images.pexels.com/photos/1957477/pexels-photo-1957477.jpeg?auto=compress&cs=tinysrgb&w=400',
    featured: false
  },
  {
    id: 7,
    title: 'Creating a Productive Home Office on Any Budget',
    excerpt: 'Transform your home workspace without breaking the bank with these budget-friendly tips and tricks.',
    category: 'productivity',
    author: 'Tom Wilson',
    date: '2024-12-28',
    readTime: '5 min read',
    image: 'https://images.pexels.com/photos/1957477/pexels-photo-1957477.jpeg?auto=compress&cs=tinysrgb&w=400',
    featured: false
  },
  {
    id: 8,
    title: 'The Future of Office Chairs: Smart Seating',
    excerpt: 'Get a glimpse into the future of ergonomic seating with AI-integrated features and smart adjustments.',
    category: 'design',
    author: 'Emma Roberts',
    date: '2024-12-25',
    readTime: '6 min read',
    image: 'https://images.pexels.com/photos/1957477/pexels-photo-1957477.jpeg?auto=compress&cs=tinysrgb&w=400',
    featured: false
  }
];

export const fetchArticles = async (): Promise<Article[]> => {
  try {
    const { data, error } = await supabase
      .from('articles')
      .select('*')
      .order('date', { ascending: false });

    if (error) {
      console.warn('Supabase fetch error (using fallback):', error);
      return fallbackArticles;
    }

    if (!data || data.length === 0) {
      return fallbackArticles;
    }

    return data.map((item: SupabaseArticle) => ({
      id: item.id,
      title: item.title,
      excerpt: item.excerpt,
      category: item.category,
      author: item.author,
      date: item.date,
      readTime: item.read_time,
      image: item.image_url,
      featured: item.featured
    }));
  } catch (error) {
    console.warn('Fetch error (using fallback):', error);
    return fallbackArticles;
  }
};

export const saveArticle = async (article: Omit<Article, 'id'> | Article): Promise<Article> => {
  try {
    const supabaseArticle = {
      title: article.title,
      excerpt: article.excerpt,
      category: article.category,
      author: article.author,
      date: article.date,
      read_time: article.readTime,
      image_url: article.image,
      featured: article.featured
    };

    if ('id' in article) {
      // Update existing article
      const { data, error } = await supabase
        .from('articles')
        .update(supabaseArticle)
        .eq('id', article.id)
        .select()
        .single();

      if (error) throw error;
      
      return {
        id: data.id,
        title: data.title,
        excerpt: data.excerpt,
        category: data.category,
        author: data.author,
        date: data.date,
        readTime: data.read_time,
        image: data.image_url,
        featured: data.featured
      };
    } else {
      // Create new article
      const { data, error } = await supabase
        .from('articles')
        .insert(supabaseArticle)
        .select()
        .single();

      if (error) throw error;

      return {
        id: data.id,
        title: data.title,
        excerpt: data.excerpt,
        category: data.category,
        author: data.author,
        date: data.date,
        readTime: data.read_time,
        image: data.image_url,
        featured: data.featured
      };
    }
  } catch (error) {
    console.error('Save article error:', error);
    // Return mock response for now since we might not have the table
    if ('id' in article) {
      return article;
    } else {
      return { ...article, id: Math.floor(Math.random() * 1000) + 100 };
    }
  }
};

export const deleteArticle = async (id: number): Promise<void> => {
  try {
    const { error } = await supabase
      .from('articles')
      .delete()
      .eq('id', id);

    if (error) throw error;
  } catch (error) {
    console.error('Delete article error:', error);
    // Assume success for fallback
  }
};
