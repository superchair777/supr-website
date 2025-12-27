import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { fetchProducts, saveProduct, deleteProduct, Product } from '../services/products';
import { fetchCategories, saveCategory, deleteCategory, Category } from '../services/categories';
import { fetchArticles, saveArticle, deleteArticle, Article } from '../services/articles';
import { fetchClients, deleteClient, saveClient, Client } from '../services/clients';
import { fetchPromotions, savePromotion, deletePromotion, PromotionSlide } from '../services/promotions';
import { Plus, Edit, Trash, X, Save, Loader, Layers, Package, FileText, Users, Image } from 'lucide-react';

const AdminDashboard: React.FC = () => {
  const { isAdmin, logout } = useAuth();
  const navigate = useNavigate();
  
  // State
  const [activeTab, setActiveTab] = useState<'products' | 'categories' | 'articles' | 'clients' | 'promotions'>('products');
  const [loading, setLoading] = useState(true);
  
  // Promotions State
  const [promotions, setPromotions] = useState<PromotionSlide[]>([]);
  const [editingPromotion, setEditingPromotion] = useState<PromotionSlide | null>(null);
  const [isPromotionModalOpen, setIsPromotionModalOpen] = useState(false);
  
  // Clients State
  const [clients, setClients] = useState<Client[]>([]);
  const [editingClient, setEditingClient] = useState<Client | null>(null);
  const [isClientModalOpen, setIsClientModalOpen] = useState(false);
  
  // Products State
  const [products, setProducts] = useState<Product[]>([]);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);

  // Categories State
  const [categories, setCategories] = useState<Category[]>([]);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);

  // Articles State
  const [articles, setArticles] = useState<Article[]>([]);
  const [editingArticle, setEditingArticle] = useState<Article | null>(null);
  const [isArticleModalOpen, setIsArticleModalOpen] = useState(false);

  useEffect(() => {
    if (!isAdmin) {
      navigate('/admin/login');
      return;
    }
    loadData();
  }, [isAdmin, navigate]);

  const loadData = async () => {
    setLoading(true);
    const [productsData, categoriesData, articlesData, clientsData, promotionsData] = await Promise.all([
      fetchProducts(),
      fetchCategories(),
      fetchArticles(),
      fetchClients(),
      fetchPromotions()
    ]);
    setProducts(productsData.data);
    setCategories(categoriesData.data);
    setArticles(articlesData);
    setClients(clientsData);
    setPromotions(promotionsData);
    setLoading(false);
  };

  // --- Product Handlers ---

  const handleProductEdit = (product: Product) => {
    setEditingProduct({ ...product });
    setIsProductModalOpen(true);
  };

  const handleProductAdd = () => {
    setEditingProduct({
      id: 0,
      name: '',
      category: categories.length > 0 ? categories[0].slug : 'ergonomic',
      price: 0,
      image: '',
      description: '',
      features: [],
      inStock: true,
      isNew: false,
      isSale: false
    } as Product);
    setIsProductModalOpen(true);
  };

  const handleProductDelete = async (id: number) => {
    if (confirm('Are you sure you want to delete this product?')) {
      await deleteProduct(id);
      loadData();
    }
  };

  const handleProductSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProduct) return;
    await saveProduct(editingProduct);
    setIsProductModalOpen(false);
    setEditingProduct(null);
    loadData();
  };

  const handleProductChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    if (!editingProduct) return;
    const { name, value, type } = e.target;
    
    if (type === 'checkbox') {
        const checked = (e.target as HTMLInputElement).checked;
        setEditingProduct({ ...editingProduct, [name]: checked });
    } else if (type === 'number') {
        setEditingProduct({ ...editingProduct, [name]: parseFloat(value) });
    } else {
        setEditingProduct({ ...editingProduct, [name]: value });
    }
  };

  const handleFeaturesChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      if (!editingProduct) return;
      const features = e.target.value.split('\n').filter(f => f.trim());
      setEditingProduct({ ...editingProduct, features });
  }

  // --- Category Handlers ---

  const handleCategoryEdit = (category: Category) => {
    setEditingCategory({ ...category });
    setIsCategoryModalOpen(true);
  };

  const handleCategoryAdd = () => {
    setEditingCategory({
      id: 0,
      name: '',
      slug: '',
      description: ''
    });
    setIsCategoryModalOpen(true);
  };

  const handleCategoryDelete = async (id: number) => {
    if (confirm('Are you sure you want to delete this category? Products using this category might be affected.')) {
      await deleteCategory(id);
      loadData();
    }
  };

  const handleCategorySave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingCategory) return;
    
    // Auto-generate slug if empty
    if (!editingCategory.slug) {
      editingCategory.slug = editingCategory.name.toLowerCase().replace(/\s+/g, '-');
    }

    await saveCategory(editingCategory);
    setIsCategoryModalOpen(false);
    setEditingCategory(null);
    loadData();
  };

  const handleCategoryChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (!editingCategory) return;
    const { name, value } = e.target;
    setEditingCategory({ ...editingCategory, [name]: value });
  };


  // --- Article Handlers ---

  const handleArticleEdit = (article: Article) => {
    setEditingArticle({ ...article });
    setIsArticleModalOpen(true);
  };

  const handleArticleAdd = () => {
    setEditingArticle({
      id: 0,
      title: '',
      excerpt: '',
      category: 'ergonomics',
      author: '',
      date: new Date().toISOString().split('T')[0],
      readTime: '5 min read',
      image: '',
      featured: false
    } as Article);
    setIsArticleModalOpen(true);
  };

  const handleArticleDelete = async (id: number) => {
    if (confirm('Are you sure you want to delete this article?')) {
      await deleteArticle(id);
      loadData();
    }
  };

  const handleArticleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingArticle) return;
    await saveArticle(editingArticle);
    setIsArticleModalOpen(false);
    setEditingArticle(null);
    loadData();
  };

  const handleArticleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    if (!editingArticle) return;
    const { name, value, type } = e.target;
    
    if (type === 'checkbox') {
        const checked = (e.target as HTMLInputElement).checked;
        setEditingArticle({ ...editingArticle, [name]: checked });
    } else {
        setEditingArticle({ ...editingArticle, [name]: value });
    }
  };

  const handleClientEdit = (client: Client) => {
    setEditingClient({ ...client });
    setIsClientModalOpen(true);
  };

  const handleClientSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingClient) return;
    await saveClient(editingClient);
    setIsClientModalOpen(false);
    loadData();
  };

  const handleClientChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    if (!editingClient) return;
    const { name, value } = e.target;
    // Client interface doesn't have nested objects or arrays that we edit here, so shallow copy is fine.
    // Also no checkbox inputs for client currently.
    setEditingClient({ ...editingClient, [name as keyof Client]: value });
  };

  const handleClientDelete = async (id: number) => {
    if (confirm('Are you sure you want to delete this client?')) {
      await deleteClient(id);
      loadData();
    }
  };

  // --- Promotion Handlers ---

  const handlePromotionEdit = (promotion: PromotionSlide) => {
    setEditingPromotion({ ...promotion });
    setIsPromotionModalOpen(true);
  };

  const handlePromotionAdd = () => {
    setEditingPromotion({
      id: '',
      title: '',
      desc: '',
      cta: '',
      image: ''
    });
    setIsPromotionModalOpen(true);
  };

  const handlePromotionDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this promotion?')) {
      await deletePromotion(id);
      loadData();
    }
  };

  const handlePromotionSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingPromotion) return;
    await savePromotion(editingPromotion);
    setIsPromotionModalOpen(false);
    loadData();
  };

  const handlePromotionChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (!editingPromotion) return;
    const { name, value } = e.target;
    setEditingPromotion({ ...editingPromotion, [name]: value });
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!editingPromotion || !e.target.files || e.target.files.length === 0) return;
    
    const file = e.target.files[0];

    // Check file size (limit to 800KB for localStorage safety)
    if (file.size > 800 * 1024) {
      alert('Image size is too large. Please upload an image smaller than 800KB.');
      return;
    }

    const reader = new FileReader();
    
    reader.onloadend = () => {
      setEditingPromotion({ ...editingPromotion, image: reader.result as string });
    };
    
    reader.readAsDataURL(file);
  };

  if (!isAdmin) return null;

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
          <div className="flex gap-4">
            <button
              onClick={logout}
              className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300"
            >
              Logout
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex space-x-4 mb-6 border-b border-gray-200">
          <button
            className={`pb-2 px-4 flex items-center ${activeTab === 'products' ? 'border-b-2 border-mustard-500 text-mustard-600 font-bold' : 'text-gray-500 hover:text-gray-700'}`}
            onClick={() => setActiveTab('products')}
          >
            <Package className="w-4 h-4 mr-2" /> Products
          </button>
          <button
            className={`pb-2 px-4 flex items-center ${activeTab === 'categories' ? 'border-b-2 border-mustard-500 text-mustard-600 font-bold' : 'text-gray-500 hover:text-gray-700'}`}
            onClick={() => setActiveTab('categories')}
          >
            <Layers className="w-4 h-4 mr-2" /> Categories
          </button>
          <button
            className={`pb-2 px-4 flex items-center ${activeTab === 'articles' ? 'border-b-2 border-mustard-500 text-mustard-600 font-bold' : 'text-gray-500 hover:text-gray-700'}`}
            onClick={() => setActiveTab('articles')}
          >
            <FileText className="w-4 h-4 mr-2" /> Articles
          </button>
          <button
            className={`pb-2 px-4 flex items-center ${activeTab === 'clients' ? 'border-b-2 border-mustard-500 text-mustard-600 font-bold' : 'text-gray-500 hover:text-gray-700'}`}
            onClick={() => setActiveTab('clients')}
          >
            <Users className="w-4 h-4 mr-2" /> Clients
          </button>
          <button
            className={`pb-2 px-4 flex items-center ${activeTab === 'promotions' ? 'border-b-2 border-mustard-500 text-mustard-600 font-bold' : 'text-gray-500 hover:text-gray-700'}`}
            onClick={() => setActiveTab('promotions')}
          >
            <Image className="w-4 h-4 mr-2" /> Promotions
          </button>
        </div>

        {/* Content */}
        {loading ? (
          <div className="flex justify-center py-12">
            <Loader className="w-8 h-8 animate-spin text-gray-400" />
          </div>
        ) : (
          <>
            {activeTab === 'products' && (
              <>
                <div className="flex justify-end mb-4">
                  <button
                    onClick={handleProductAdd}
                    className="flex items-center px-4 py-2 bg-mustard-500 text-black rounded-md hover:bg-mustard-600"
                  >
                    <Plus className="w-4 h-4 mr-2" /> Add Product
                  </button>
                </div>
                <div className="bg-white shadow overflow-hidden rounded-lg">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {products.map((product) => (
                        <tr key={product.id}>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="h-10 w-10 flex-shrink-0">
                                <img className="h-10 w-10 rounded-full object-cover" src={product.image} alt="" />
                              </div>
                              <div className="ml-4">
                                <div className="text-sm font-medium text-gray-900">{product.name}</div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {categories.find(c => c.slug === product.category)?.name || product.category}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            ${product.price}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                              product.inStock ? 'bg-mustard-100 text-mustard-800' : 'bg-gray-200 text-gray-800'
                            }`}>
                              {product.inStock ? 'In Stock' : 'Out of Stock'}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <button onClick={() => handleProductEdit(product)} className="text-mustard-600 hover:text-mustard-900 mr-4">
                              <Edit className="w-5 h-5" />
                            </button>
                            <button onClick={() => handleProductDelete(product.id)} className="text-gray-600 hover:text-black">
                              <Trash className="w-5 h-5" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </>
            )}

            {activeTab === 'clients' && (
              <div className="bg-white shadow overflow-hidden rounded-lg">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ชื่อ</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">อีเมล</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ชื่อบริษัท</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">เบอร์ติดต่อ</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">หัวข้อ</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">วันที่</th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">การดำเนินการ</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {clients.map((client) => (
                      <tr key={client.id}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {client.name}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {client.email}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {client.companyName || '-'}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {client.phone}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 capitalize">
                          {client.inquiryType}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {client.date}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <button onClick={() => handleClientEdit(client)} className="text-mustard-600 hover:text-mustard-900 mr-4">
                              <Edit className="w-5 h-5" />
                            </button>
                          <button onClick={() => handleClientDelete(client.id)} className="text-gray-600 hover:text-black">
                            <Trash className="w-5 h-5" />
                          </button>
                        </td>
                      </tr>
                    ))}
                    {clients.length === 0 && (
                      <tr>
                        <td colSpan={7} className="px-6 py-4 text-center text-gray-500 text-sm">
                          No clients found.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            )}

            {activeTab === 'categories' && (
              <>
                <div className="flex justify-end mb-4">
                  <button
                    onClick={handleCategoryAdd}
                    className="flex items-center px-4 py-2 bg-mustard-500 text-black rounded-md hover:bg-mustard-600"
                  >
                    <Plus className="w-4 h-4 mr-2" /> Add Category
                  </button>
                </div>
                <div className="bg-white shadow overflow-hidden rounded-lg">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Slug</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {categories.map((category) => (
                        <tr key={category.id}>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                            {category.name}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {category.slug}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {category.description || '-'}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <button onClick={() => handleCategoryEdit(category)} className="text-mustard-600 hover:text-mustard-900 mr-4">
                              <Edit className="w-5 h-5" />
                            </button>
                            <button onClick={() => handleCategoryDelete(category.id)} className="text-gray-600 hover:text-black">
                              <Trash className="w-5 h-5" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </>
            )}

            {activeTab === 'articles' && (
              <>
                <div className="flex justify-end mb-4">
                  <button
                    onClick={handleArticleAdd}
                    className="flex items-center px-4 py-2 bg-mustard-500 text-black rounded-md hover:bg-mustard-600"
                  >
                    <Plus className="w-4 h-4 mr-2" /> Add Article
                  </button>
                </div>
                <div className="bg-white shadow overflow-hidden rounded-lg">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Article</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Author</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {articles.map((article) => (
                        <tr key={article.id}>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="h-10 w-10 flex-shrink-0">
                                <img className="h-10 w-10 rounded-full object-cover" src={article.image} alt="" />
                              </div>
                              <div className="ml-4">
                                <div className="text-sm font-medium text-gray-900 line-clamp-1">{article.title}</div>
                                {article.featured && (
                                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-mustard-100 text-mustard-800">
                                    Featured
                                  </span>
                                )}
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 capitalize">
                            {article.category}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {article.author}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {article.date}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <button onClick={() => handleArticleEdit(article)} className="text-mustard-600 hover:text-mustard-900 mr-4">
                            <Edit className="w-5 h-5" />
                          </button>
                          <button onClick={() => handleArticleDelete(article.id)} className="text-gray-600 hover:text-black">
                            <Trash className="w-5 h-5" />
                          </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </>
            )}

            {activeTab === 'promotions' && (
              <>
                <div className="flex justify-end mb-4">
                  <button
                    onClick={handlePromotionAdd}
                    className="flex items-center px-4 py-2 bg-mustard-500 text-black rounded-md hover:bg-mustard-600"
                  >
                    <Plus className="w-4 h-4 mr-2" /> Add Promotion
                  </button>
                </div>
                <div className="bg-white shadow overflow-hidden rounded-lg">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Slide Image</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">CTA Label</th>
                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {promotions.map((promo) => (
                        <tr key={promo.id}>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="h-16 w-24 bg-gray-100 rounded overflow-hidden">
                              {promo.image ? (
                                <img src={promo.image} alt={promo.title} className="h-full w-full object-cover" />
                              ) : (
                                <div className="h-full w-full flex items-center justify-center text-gray-400 text-xs">No Image</div>
                              )}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                            {promo.title}
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-500 max-w-xs truncate">
                            {promo.desc}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {promo.cta}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <button onClick={() => handlePromotionEdit(promo)} className="text-mustard-600 hover:text-mustard-900 mr-4">
                              <Edit className="w-5 h-5" />
                            </button>
                            <button onClick={() => handlePromotionDelete(promo.id)} className="text-gray-600 hover:text-black">
                              <Trash className="w-5 h-5" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </>
            )}
          </>
        )}
      </div>

      {/* Product Modal */}
      {isProductModalOpen && editingProduct && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full p-6 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">{editingProduct.id ? 'Edit Product' : 'New Product'}</h2>
              <button onClick={() => setIsProductModalOpen(false)} className="text-gray-400 hover:text-gray-500">
                <X className="w-6 h-6" />
              </button>
            </div>
            <form onSubmit={handleProductSave} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Name</label>
                  <input
                    type="text"
                    name="name"
                    value={editingProduct.name}
                    onChange={handleProductChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-mustard-500 focus:ring-mustard-500 sm:text-sm border p-2"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Category</label>
                  <select
                    name="category"
                    value={editingProduct.category}
                    onChange={handleProductChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-mustard-500 focus:ring-mustard-500 sm:text-sm border p-2"
                  >
                    {categories.map(c => (
                      <option key={c.id} value={c.slug}>{c.name}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Price</label>
                  <input
                    type="number"
                    name="price"
                    value={editingProduct.price}
                    onChange={handleProductChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-mustard-500 focus:ring-mustard-500 sm:text-sm border p-2"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Image URL</label>
                  <input
                    type="text"
                    name="image"
                    value={editingProduct.image}
                    onChange={handleProductChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-mustard-500 focus:ring-mustard-500 sm:text-sm border p-2"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700">Description</label>
                <textarea
                  name="description"
                  value={editingProduct.description}
                  onChange={handleProductChange}
                  rows={3}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-mustard-500 focus:ring-mustard-500 sm:text-sm border p-2"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Features (one per line)</label>
                <textarea
                  value={editingProduct.features.join('\n')}
                  onChange={handleFeaturesChange}
                  rows={4}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-mustard-500 focus:ring-mustard-500 sm:text-sm border p-2"
                />
              </div>

              <div className="flex gap-4">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    name="inStock"
                    checked={editingProduct.inStock}
                    onChange={handleProductChange}
                    className="h-4 w-4 text-mustard-600 focus:ring-mustard-500 border-gray-300 rounded"
                  />
                  <span className="ml-2 text-sm text-gray-900">In Stock</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    name="isNew"
                    checked={editingProduct.isNew}
                    onChange={handleProductChange}
                    className="h-4 w-4 text-mustard-600 focus:ring-mustard-500 border-gray-300 rounded"
                  />
                  <span className="ml-2 text-sm text-gray-900">New Arrival</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    name="isSale"
                    checked={editingProduct.isSale}
                    onChange={handleProductChange}
                    className="h-4 w-4 text-mustard-600 focus:ring-mustard-500 border-gray-300 rounded"
                  />
                  <span className="ml-2 text-sm text-gray-900">On Sale</span>
                </label>
              </div>

              <div className="flex justify-end gap-3 mt-6">
                <button
                  type="button"
                  onClick={() => setIsProductModalOpen(false)}
                  className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-black bg-mustard-500 hover:bg-mustard-600"
                >
                  Save Product
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Category Modal */}
      {isCategoryModalOpen && editingCategory && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">{editingCategory.id ? 'Edit Category' : 'New Category'}</h2>
              <button onClick={() => setIsCategoryModalOpen(false)} className="text-gray-400 hover:text-gray-500">
                <X className="w-6 h-6" />
              </button>
            </div>
            <form onSubmit={handleCategorySave} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Name</label>
                <input
                  type="text"
                  name="name"
                  value={editingCategory.name}
                  onChange={handleCategoryChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-mustard-500 focus:ring-mustard-500 sm:text-sm border p-2"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Slug (Optional, auto-generated)</label>
                <input
                  type="text"
                  name="slug"
                  value={editingCategory.slug}
                  onChange={handleCategoryChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-mustard-500 focus:ring-mustard-500 sm:text-sm border p-2"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Description</label>
                <textarea
                  name="description"
                  value={editingCategory.description || ''}
                  onChange={handleCategoryChange}
                  rows={3}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-mustard-500 focus:ring-mustard-500 sm:text-sm border p-2"
                />
              </div>

              <div className="flex justify-end gap-3 mt-6">
                <button
                  type="button"
                  onClick={() => setIsCategoryModalOpen(false)}
                  className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-black bg-mustard-500 hover:bg-mustard-600"
                >
                  Save Category
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Article Modal */}
      {isArticleModalOpen && editingArticle && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full p-6 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">{editingArticle.id ? 'Edit Article' : 'New Article'}</h2>
              <button onClick={() => setIsArticleModalOpen(false)} className="text-gray-400 hover:text-gray-500">
                <X className="w-6 h-6" />
              </button>
            </div>
            <form onSubmit={handleArticleSave} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2">
                  <label className="block text-sm font-medium text-gray-700">Title</label>
                  <input
                    type="text"
                    name="title"
                    value={editingArticle.title}
                    onChange={handleArticleChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-mustard-500 focus:ring-mustard-500 sm:text-sm border p-2"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700">Category</label>
                  <select
                    name="category"
                    value={editingArticle.category}
                    onChange={handleArticleChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-mustard-500 focus:ring-mustard-500 sm:text-sm border p-2"
                  >
                    <option value="ergonomics">Ergonomics</option>
                    <option value="health">Health & Wellness</option>
                    <option value="productivity">Productivity</option>
                    <option value="design">Design</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Author</label>
                  <input
                    type="text"
                    name="author"
                    value={editingArticle.author}
                    onChange={handleArticleChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-mustard-500 focus:ring-mustard-500 sm:text-sm border p-2"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Date</label>
                  <input
                    type="date"
                    name="date"
                    value={editingArticle.date}
                    onChange={handleArticleChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-mustard-500 focus:ring-mustard-500 sm:text-sm border p-2"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Read Time</label>
                  <input
                    type="text"
                    name="readTime"
                    value={editingArticle.readTime}
                    onChange={handleArticleChange}
                    placeholder="e.g. 5 min read"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-mustard-500 focus:ring-mustard-500 sm:text-sm border p-2"
                    required
                  />
                </div>

                <div className="col-span-2">
                  <label className="block text-sm font-medium text-gray-700">Image URL</label>
                  <input
                    type="text"
                    name="image"
                    value={editingArticle.image}
                    onChange={handleArticleChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-mustard-500 focus:ring-mustard-500 sm:text-sm border p-2"
                  />
                </div>

                <div className="col-span-2">
                  <label className="block text-sm font-medium text-gray-700">Excerpt</label>
                  <textarea
                    name="excerpt"
                    value={editingArticle.excerpt}
                    onChange={handleArticleChange}
                    rows={3}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-mustard-500 focus:ring-mustard-500 sm:text-sm border p-2"
                  />
                </div>
              </div>

              <div className="flex gap-4">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    name="featured"
                    checked={editingArticle.featured}
                    onChange={handleArticleChange}
                    className="h-4 w-4 text-mustard-600 focus:ring-mustard-500 border-gray-300 rounded"
                  />
                  <span className="ml-2 text-sm text-gray-900">Featured Article</span>
                </label>
              </div>

              <div className="flex justify-end gap-3 mt-6">
                <button
                  type="button"
                  onClick={() => setIsArticleModalOpen(false)}
                  className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-black bg-mustard-500 hover:bg-mustard-600"
                >
                  Save Article
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      {/* Client Modal */}
      {isClientModalOpen && editingClient && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full p-6 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">แก้ไขข้อมูลลูกค้า</h2>
              <button onClick={() => setIsClientModalOpen(false)} className="text-gray-400 hover:text-gray-500">
                <X className="w-6 h-6" />
              </button>
            </div>
            <form onSubmit={handleClientSave} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">ชื่อ</label>
                  <input
                    type="text"
                    name="name"
                    value={editingClient.name}
                    onChange={handleClientChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-mustard-500 focus:ring-mustard-500 sm:text-sm border p-2"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">อีเมล</label>
                  <input
                    type="email"
                    name="email"
                    value={editingClient.email}
                    onChange={handleClientChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-mustard-500 focus:ring-mustard-500 sm:text-sm border p-2"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">ชื่อบริษัท</label>
                  <input
                    type="text"
                    name="companyName"
                    value={editingClient.companyName || ''}
                    onChange={handleClientChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-mustard-500 focus:ring-mustard-500 sm:text-sm border p-2"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">เบอร์ติดต่อ</label>
                  <input
                    type="tel"
                    name="phone"
                    value={editingClient.phone}
                    onChange={handleClientChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-mustard-500 focus:ring-mustard-500 sm:text-sm border p-2"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">ประเภทการสอบถาม</label>
                <select
                  name="inquiryType"
                  value={editingClient.inquiryType}
                  onChange={handleClientChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-mustard-500 focus:ring-mustard-500 sm:text-sm border p-2"
                >
                  <option value="general">General Inquiry</option>
                  <option value="support">Product Support</option>
                  <option value="wholesale">Wholesale Orders</option>
                  <option value="returns">Returns & Exchanges</option>
                  <option value="warranty">Warranty Claim</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">หัวข้อ</label>
                <input
                  type="text"
                  name="subject"
                  value={editingClient.subject}
                  onChange={handleClientChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-mustard-500 focus:ring-mustard-500 sm:text-sm border p-2"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">ข้อความ</label>
                <textarea
                  name="message"
                  value={editingClient.message}
                  onChange={handleClientChange}
                  rows={4}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-mustard-500 focus:ring-mustard-500 sm:text-sm border p-2"
                  required
                />
              </div>

              <div className="flex justify-end gap-3 mt-6">
                <button
                  type="button"
                  onClick={() => setIsClientModalOpen(false)}
                  className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                >
                  ยกเลิก
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-black bg-mustard-500 hover:bg-mustard-600"
                >
                  บันทึกข้อมูล
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Promotion Modal */}
      {isPromotionModalOpen && editingPromotion && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-lg w-full p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">{editingPromotion.id ? 'Edit Promotion Slide' : 'New Promotion Slide'}</h2>
              <button onClick={() => setIsPromotionModalOpen(false)} className="text-gray-400 hover:text-gray-500">
                <X className="w-6 h-6" />
              </button>
            </div>
            <form onSubmit={handlePromotionSave} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Title</label>
                <input
                  type="text"
                  name="title"
                  value={editingPromotion.title}
                  onChange={handlePromotionChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-mustard-500 focus:ring-mustard-500 sm:text-sm border p-2"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Description</label>
                <textarea
                  name="desc"
                  value={editingPromotion.desc}
                  onChange={handlePromotionChange}
                  rows={3}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-mustard-500 focus:ring-mustard-500 sm:text-sm border p-2"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">CTA Label</label>
                <input
                  type="text"
                  name="cta"
                  value={editingPromotion.cta}
                  onChange={handlePromotionChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-mustard-500 focus:ring-mustard-500 sm:text-sm border p-2"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Image</label>
                <div className="mt-1 space-y-3">
                  {/* File Upload */}
                  <div>
                    <label className="block text-xs text-gray-500 mb-1">Upload Image</label>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="block w-full text-sm text-gray-500
                        file:mr-4 file:py-2 file:px-4
                        file:rounded-md file:border-0
                        file:text-sm file:font-semibold
                        file:bg-mustard-500 file:text-black
                        hover:file:bg-mustard-600"
                    />
                  </div>
                  
                  {/* URL Input */}
                  <div>
                     <label className="block text-xs text-gray-500 mb-1">Or Image URL</label>
                     <div className="flex rounded-md shadow-sm">
                      <input
                        type="text"
                        name="image"
                        value={editingPromotion.image || ''}
                        onChange={handlePromotionChange}
                        className="flex-1 block w-full rounded-none rounded-l-md border-gray-300 focus:border-mustard-500 focus:ring-mustard-500 sm:text-sm border p-2"
                        placeholder="https://..."
                      />
                      <span className="inline-flex items-center px-3 rounded-r-md border border-l-0 border-gray-300 bg-gray-50 text-gray-500 sm:text-sm">
                        URL
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              {editingPromotion.image && (
                <div className="mt-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Preview</label>
                  <img src={editingPromotion.image} alt="Preview" className="h-32 w-full object-cover rounded-md" />
                </div>
              )}

              <div className="flex justify-end gap-3 mt-6">
                <button
                  type="button"
                  onClick={() => setIsPromotionModalOpen(false)}
                  className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-black bg-mustard-500 hover:bg-mustard-600"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;