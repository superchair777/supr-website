import React, { useEffect, useState } from 'react';
import { useTranslation, Trans } from 'react-i18next';
import { Link } from 'react-router-dom';
import { Filter, Grid, List, Star, Heart, ShoppingCart, Facebook, Instagram, X, Building, User, Mail, Phone, MapPin, FileText } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { fetchProducts, ProductRecord } from '../services/products';

interface ProductsProps {
  isDarkMode: boolean;
}

const Products: React.FC<ProductsProps> = ({ isDarkMode }) => {
  const { t } = useTranslation();
  const { addItem } = useCart();
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [priceRange, setPriceRange] = useState([0, 2000]);
  const [isWholesale, setIsWholesale] = useState(false);
  const [showWholesaleModal, setShowWholesaleModal] = useState(false);
  const [remoteProducts, setRemoteProducts] = useState<ProductRecord[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [wholesaleForm, setWholesaleForm] = useState({
    companyName: '',
    contactName: '',
    email: '',
    phone: '',
    address: '',
    businessType: '',
    yearsInBusiness: '',
    estimatedOrderVolume: '',
    message: ''
  });

  const fallbackProducts = [
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
      image: 'https://images.pexels.com/photos/1957477/pexels-photo-1957477.jpeg?auto=compress&cs=tinysrgb&w=400',
      description: 'Top-tier luxury executive chair with premium leather and advanced comfort features.',
      features: ['Premium leather', 'Luxury design', 'Advanced comfort', 'Executive style'],
      inStock: true,
      isNew: true,
      isSale: false
    }
  ];

  const sourceProducts = remoteProducts ?? fallbackProducts;
  const categories = [
    { id: 'all', name: t('products.all_products'), count: sourceProducts.length },
    { id: 'executive', name: t('home.executive_chair'), count: sourceProducts.filter(p => p.category === 'executive').length },
    { id: 'ergonomic', name: t('home.ergonomic_chairs'), count: sourceProducts.filter(p => p.category === 'ergonomic').length },
    { id: 'gaming', name: t('home.gaming_chairs'), count: sourceProducts.filter(p => p.category === 'gaming').length },
    { id: 'conference', name: t('home.conference_chair'), count: sourceProducts.filter(p => p.category === 'conference').length }
  ];

  const filteredProducts = sourceProducts.filter(product => {
    const categoryMatch = selectedCategory === 'all' || product.category === selectedCategory;
    const currentPrice = isWholesale ? (product.wholesalePrice ?? (product as any).wholesale_price ?? product.price) : product.price;
    const priceMatch = currentPrice >= priceRange[0] && currentPrice <= priceRange[1];
    return categoryMatch && priceMatch;
  });

  const getCurrentPrice = (product: typeof fallbackProducts[0] | ProductRecord) => {
    const retail = (product as any).price ?? 0;
    const wholesale = (product as any).wholesalePrice ?? (product as any).wholesale_price ?? null;
    return isWholesale && wholesale ? wholesale : retail;
  };

  useEffect(() => {
    setLoading(true);
    fetchProducts()
      .then(({ data, error }) => {
        if (error) {
          setLoadError('Failed to load products');
          setRemoteProducts(null);
        } else if (data && data.length) {
          const mapped: any[] = data.map((p) => ({
            id: p.id,
            name: p.name,
            category: p.category,
            price: p.price,
            wholesalePrice: p.wholesale_price ?? null,
            moq: p.moq ?? null,
            originalPrice: p.original_price ?? null,
            rating: p.rating ?? 0,
            reviews: p.reviews ?? 0,
            image: p.image_url ?? '',
            description: p.description ?? '',
            features: p.features ?? [],
            inStock: p.in_stock ?? true,
            isNew: p.is_new ?? false,
            isSale: p.is_sale ?? false,
          }))
          setRemoteProducts(mapped)
        } else {
          setRemoteProducts(null)
        }
      })
      .finally(() => setLoading(false))
  }, [])

  const handleWholesaleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setWholesaleForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleWholesaleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission here
    console.log('Wholesale application submitted:', wholesaleForm);
    setShowWholesaleModal(false);
    // Reset form
    setWholesaleForm({
      companyName: '',
      contactName: '',
      email: '',
      phone: '',
      address: '',
      businessType: '',
      yearsInBusiness: '',
      estimatedOrderVolume: '',
      message: ''
    });
  };

  const ProductCard = ({ product }: { product: typeof products[0] }) => (
    <Link to={`/product/${product.id}`} className={`group relative rounded-3xl overflow-hidden transition-all duration-300 ${isDarkMode ? 'glass-card-dark hover:bg-black/50' : 'glass-card hover:bg-white/50'} shadow-sm hover:shadow-lg block`}>
      {/* Product Badges */}
      <div className="absolute top-4 left-4 z-10 flex flex-col gap-2">
        {product.isNew && (
          <span className="px-2 py-1 bg-green-500 text-white text-xs font-medium rounded-full">{t('products.new')}</span>
        )}
        {product.isSale && (
          <span className="px-2 py-1 bg-red-500 text-white text-xs font-medium rounded-full">{t('products.sale')}</span>
        )}
        {!product.inStock && (
          <span className="px-2 py-1 bg-gray-500 text-white text-xs font-medium rounded-full">{t('products.out_of_stock')}</span>
        )}
        {isWholesale && (
          <span className="px-2 py-1 bg-blue-500 text-white text-xs font-medium rounded-full">{t('products.wholesale')}</span>
        )}
      </div>

      {/* Wishlist Button */}
      <button className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white bg-opacity-90 hover:bg-opacity-100 transition-all">
        <Heart className="h-4 w-4 text-gray-600 hover:text-red-500" />
      </button>

      {/* Product Image */}
      <div className="aspect-square p-6">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover rounded-2xl"
        />
      </div>

      {/* Product Info */}
      <div className="p-6 pt-0">
        <div className="flex items-center gap-2 mb-2">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`h-3 w-3 ${i < Math.floor(product.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
              />
            ))}
          </div>
          <span className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
            {t('products.reviews', { count: product.reviews })}
          </span>
        </div>

        <h3 className={`font-medium mb-2 transition-colors duration-300 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
          {product.name}
        </h3>

        <p className={`text-sm mb-4 line-clamp-2 transition-colors duration-300 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
          {product.description}
        </p>

        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <span className={`font-semibold transition-colors duration-300 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              ${getCurrentPrice(product)}
            </span>
            {!isWholesale && product.originalPrice && (
              <span className={`text-sm line-through transition-colors duration-300 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                ${product.originalPrice}
              </span>
            )}
            {isWholesale && (
              <span className={`text-sm line-through transition-colors duration-300 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                ${product.price}
              </span>
            )}
          </div>
          <span className={`text-xs px-2 py-1 rounded-full transition-colors duration-300 ${isDarkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-600'}`}>
            {product.category}
          </span>
        </div>

        {isWholesale && (
          <div className={`mb-4 p-3 rounded-lg transition-colors duration-300 ${isDarkMode ? 'bg-gray-700' : 'bg-blue-50'}`}>
            <p className={`text-xs font-medium mb-1 transition-colors duration-300 ${isDarkMode ? 'text-blue-300' : 'text-blue-700'}`}>
              {t('products.wholesale_pricing')}
            </p>
            <p className={`text-xs transition-colors duration-300 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              {t('products.moq', { count: product.moq })}
            </p>
          </div>
        )}

        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            addItem({
              id: product.id,
              name: product.name,
              price: getCurrentPrice(product),
              originalPrice: (product as any).originalPrice ?? (product as any).original_price ?? undefined,
              image: product.image,
              category: product.category,
              inStock: product.inStock
            }, 1)
          }}
          className={`w-full py-3 px-4 rounded-full text-sm font-medium transition-all duration-300 flex items-center justify-center gap-2 ${
            product.inStock
              ? isDarkMode
                ? 'bg-white text-black hover:bg-gray-200'
                : 'bg-black text-white hover:bg-gray-800'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed pointer-events-none'
          }`}
        >
          <ShoppingCart className="h-4 w-4" />
          {product.inStock ? t('products.add_to_cart') : t('products.out_of_stock')}
        </button>
      </div>
    </Link>
  );

  const ProductListItem = ({ product }: { product: typeof products[0] }) => (
    <div className={`flex gap-6 p-6 rounded-3xl transition-all duration-300 ${isDarkMode ? 'glass-card-dark hover:bg-black/50' : 'glass-card hover:bg-white/50'} shadow-sm hover:shadow-lg`}>
      <div className="relative">
        <Link to={`/product/${product.id}`}>
          <img
            src={product.image}
            alt={product.name}
            className="w-32 h-32 object-cover rounded-2xl"
          />
        </Link>
        <div className="absolute top-2 left-2 flex flex-col gap-1">
          {product.isNew && (
            <span className="px-2 py-1 bg-green-500 text-white text-xs font-medium rounded-full">{t('products.new')}</span>
          )}
          {product.isSale && (
            <span className="px-2 py-1 bg-red-500 text-white text-xs font-medium rounded-full">{t('products.sale')}</span>
          )}
        </div>
      </div>

      <div className="flex-1">
        <div className="flex items-start justify-between mb-2">
          <Link to={`/product/${product.id}`}>
            <h3 className={`text-xl font-medium transition-colors duration-300 ${isDarkMode ? 'text-white' : 'text-gray-900'} hover:underline`}>
              {product.name}
            </h3>
          </Link>
          <button className="p-2 rounded-full hover:bg-gray-100 transition-colors">
            <Heart className="h-4 w-4 text-gray-600 hover:text-red-500" />
          </button>
        </div>

        <div className="flex items-center gap-2 mb-3">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`h-4 w-4 ${i < Math.floor(product.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
              />
            ))}
          </div>
          <span className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
            {product.rating} {t('products.reviews', { count: product.reviews })}
          </span>
        </div>

        <Link to={`/product/${product.id}`}>
          <p className={`mb-4 transition-colors duration-300 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            {product.description}
          </p>
        </Link>

        <div className="flex flex-wrap gap-2 mb-4">
          {product.features.map((feature, index) => (
            <span
              key={index}
              className={`px-3 py-1 rounded-full text-xs transition-colors duration-300 ${isDarkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-600'}`}
            >
              {feature}
            </span>
          ))}
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className={`text-2xl font-semibold transition-colors duration-300 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              ${getCurrentPrice(product)}
            </span>
            {!isWholesale && product.originalPrice && (
              <span className={`text-lg line-through transition-colors duration-300 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                ${product.originalPrice}
              </span>
            )}
            {isWholesale && (
              <span className={`text-lg line-through transition-colors duration-300 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                ${product.price}
              </span>
            )}
          </div>

          <div className="flex items-center gap-3">
            {isWholesale && (
              <div className={`text-right mr-4 transition-colors duration-300`}>
                <p className={`text-xs font-medium transition-colors duration-300 ${isDarkMode ? 'text-blue-300' : 'text-blue-700'}`}>
                  {t('products.wholesale')}
                </p>
                <p className={`text-xs transition-colors duration-300 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                  {t('products.moq', { count: product.moq })}
                </p>
              </div>
            )}

            <button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                addItem({
                  id: product.id,
                  name: product.name,
                  price: getCurrentPrice(product),
                  originalPrice: (product as any).originalPrice ?? (product as any).original_price ?? undefined,
                  image: product.image,
                  category: product.category,
                  inStock: product.inStock
                }, 1)
              }}
              className={`py-3 px-6 rounded-full text-sm font-medium transition-all duration-300 flex items-center gap-2 ${
                product.inStock
                  ? isDarkMode
                    ? 'bg-white text-black hover:bg-gray-200'
                    : 'bg-black text-white hover:bg-gray-800'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed pointer-events-none'
              }`}
            >
              <ShoppingCart className="h-4 w-4" />
              {product.inStock ? t('products.add_to_cart') : t('products.out_of_stock')}
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className={`min-h-screen transition-colors duration-300 ${isDarkMode ? 'bg-gray-900' : 'bg-white'}`}>
      {/* Hero Section */}
      <section className={`py-16 transition-colors duration-300 ${isDarkMode ? 'bg-gray-900' : 'bg-white'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className={`text-5xl font-bold mb-4 transition-colors duration-300 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              {t('products.title')}
            </h1>
            <div className="max-w-3xl mx-auto">
              <div className={`inline-flex items-center gap-3 px-4 py-3 rounded-2xl shadow-sm transition-colors duration-300 ${isDarkMode ? 'bg-gray-800 text-gray-100' : 'bg-gray-100 text-gray-800'}`}>
                <span className={`inline-flex h-6 w-6 items-center justify-center rounded-lg ${isDarkMode ? 'bg-gray-700 text-white' : 'bg-black text-white'}`}>🚚</span>
                <span className="text-sm sm:text-base font-semibold tracking-tight leading-snug">
                  <Trans i18nKey="products.subtitle">
                    Orders of 5,000 THB or more qualify for free delivery within Bangkok and metropolitan areas.<br />
                    (คำสั่งซื้อ 5,000 บาท ขึ้นไป ส่งฟรี เฉพาะกรุงเทพและปริมณฑล)
                  </Trans>
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Filters and Products */}
      <section className={`py-8 transition-colors duration-300 ${isDarkMode ? 'bg-gray-900' : 'bg-white'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Sidebar Filters */}
            <div className="lg:w-64 flex-shrink-0">
              <div className={`rounded-3xl p-6 transition-colors duration-300 ${isDarkMode ? 'bg-gray-800' : 'bg-gray-50'}`}>
                <div className="flex items-center gap-2 mb-6">
                  <Filter className={`h-5 w-5 ${isDarkMode ? 'text-white' : 'text-gray-900'}`} />
                  <h3 className={`font-medium transition-colors duration-300 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{t('products.filters')}</h3>
                </div>

                {/* Categories */}
                <div className="mb-6">
                  <h4 className={`font-medium mb-3 transition-colors duration-300 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{t('products.categories')}</h4>
                  <div className="space-y-2">
                    {categories.map((category) => (
                      <button
                        key={category.id}
                        onClick={() => setSelectedCategory(category.id)}
                        className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                          selectedCategory === category.id
                            ? isDarkMode
                              ? 'bg-gray-700 text-white'
                              : 'bg-gray-200 text-gray-900'
                            : isDarkMode
                            ? 'text-gray-300 hover:bg-gray-700'
                            : 'text-gray-600 hover:bg-gray-200'
                        }`}
                      >
                        <div className="flex justify-between items-center">
                          <span>{category.name}</span>
                          <span className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                            {category.count}
                          </span>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Price Range */}
                <div className="mb-6">
                  <h4 className={`font-medium mb-3 transition-colors duration-300 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{t('products.price_range')}</h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className={`text-sm transition-colors duration-300 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                        ${priceRange[0]}
                      </span>
                      <span className={`text-sm transition-colors duration-300 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                        ${priceRange[1]}
                      </span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="2000"
                      value={priceRange[1]}
                      onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                      className="w-full"
                    />
                  </div>
                </div>

              </div>
            </div>

            {/* Products Grid */}
            <div className="flex-1">
              {/* View Controls */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
                <div className="flex flex-wrap items-center gap-3 sm:gap-4 w-full">
                  <button
                    onClick={() => setIsWholesale(!isWholesale)}
                    className={`w-full sm:w-auto px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                      isWholesale
                        ? isDarkMode
                          ? 'bg-blue-600 text-white hover:bg-blue-700'
                          : 'bg-blue-600 text-white hover:bg-blue-700'
                        : isDarkMode
                          ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                          : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                    }`}
                  >
                    {isWholesale ? t('products.retail_pricing') : t('products.wholesale_pricing')}
                  </button>
                  <button
                    onClick={() => setShowWholesaleModal(true)}
                    className={`w-full sm:w-auto px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                      isDarkMode
                        ? 'bg-green-600 text-white hover:bg-green-700'
                        : 'bg-green-600 text-white hover:bg-green-700'
                    }`}
                  >
                    {t('products.apply_wholesale')}
                  </button>
                  <span className={`text-sm transition-colors duration-300 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                    {t('products.products_found', { count: filteredProducts.length })}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`p-2 rounded-lg transition-colors ${
                      viewMode === 'grid'
                        ? isDarkMode
                          ? 'bg-gray-700 text-white'
                          : 'bg-gray-200 text-gray-900'
                        : isDarkMode
                          ? 'text-gray-400 hover:bg-gray-700'
                          : 'text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    <Grid className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={`p-2 rounded-lg transition-colors ${
                      viewMode === 'list'
                        ? isDarkMode
                          ? 'bg-gray-700 text-white'
                          : 'bg-gray-200 text-gray-900'
                        : isDarkMode
                          ? 'text-gray-400 hover:bg-gray-700'
                          : 'text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    <List className="h-4 w-4" />
                  </button>
                </div>
              </div>

              {/* Products Display */}
              {viewMode === 'grid' ? (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                  {filteredProducts.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              ) : (
                <div className="space-y-6">
                  {filteredProducts.map((product) => (
                    <ProductListItem key={product.id} product={product} />
                  ))}
                </div>
              )}

              {filteredProducts.length === 0 && (
                <div className="text-center py-16">
                  <p className={`text-lg transition-colors duration-300 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                    {t('products.no_products_found')}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Wholesaler Application Modal */}
      {showWholesaleModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className={`max-w-2xl w-full max-h-[90vh] overflow-y-auto rounded-3xl transition-colors duration-300 ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
            {/* Modal Header */}
            <div className={`flex items-center justify-between p-6 border-b transition-colors duration-300 ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}>
              <div className="flex items-center gap-3">
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-colors duration-300 ${isDarkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
                  <Building className={`h-6 w-6 ${isDarkMode ? 'text-white' : 'text-gray-700'}`} />
                </div>
                <div>
                  <h2 className={`text-2xl font-bold transition-colors duration-300 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                    {t('products.wholesale_application')}
                  </h2>
                  <p className={`text-sm transition-colors duration-300 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    {t('products.wholesale_program_join')}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setShowWholesaleModal(false)}
                className={`p-2 rounded-full transition-colors ${isDarkMode ? 'hover:bg-gray-700 text-gray-400' : 'hover:bg-gray-100 text-gray-500'}`}
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Modal Content */}
            <form onSubmit={handleWholesaleSubmit} className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Company Information */}
                <div className="md:col-span-2">
                  <h3 className={`text-lg font-semibold mb-4 flex items-center gap-2 transition-colors duration-300 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                    <Building className="h-5 w-5" />
                    {t('products.company_information')}
                  </h3>
                </div>

                <div>
                  <label className={`block text-sm font-medium mb-2 transition-colors duration-300 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    {t('products.company_name')}
                  </label>
                  <input
                    type="text"
                    name="companyName"
                    value={wholesaleForm.companyName}
                    onChange={handleWholesaleFormChange}
                    required
                    className={`w-full px-4 py-3 border rounded-2xl focus:outline-none focus:ring-1 transition-colors ${isDarkMode ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:ring-gray-500' : 'bg-white border-gray-200 text-black placeholder-gray-500 focus:ring-gray-300'}`}
                    placeholder={t('products.company_name_placeholder')}
                  />
                </div>

                <div>
                  <label className={`block text-sm font-medium mb-2 transition-colors duration-300 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    {t('products.business_type')}
                  </label>
                  <select
                    name="businessType"
                    value={wholesaleForm.businessType}
                    onChange={handleWholesaleFormChange}
                    required
                    className={`w-full px-4 py-3 border rounded-2xl focus:outline-none focus:ring-1 transition-colors ${isDarkMode ? 'bg-gray-700 border-gray-600 text-white focus:ring-gray-500' : 'bg-white border-gray-200 text-black focus:ring-gray-300'}`}
                  >
                    <option value="">{t('products.select_business_type')}</option>
                    <option value="retailer">{t('products.retailer')}</option>
                    <option value="distributor">{t('products.distributor')}</option>
                    <option value="office-supplier">{t('products.office_supplier')}</option>
                    <option value="interior-designer">{t('products.interior_designer')}</option>
                    <option value="corporate">{t('products.corporate_buyer')}</option>
                    <option value="other">{t('products.other')}</option>
                  </select>
                </div>

                <div>
                  <label className={`block text-sm font-medium mb-2 transition-colors duration-300 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    {t('products.years_in_business')}
                  </label>
                  <select
                    name="yearsInBusiness"
                    value={wholesaleForm.yearsInBusiness}
                    onChange={handleWholesaleFormChange}
                    required
                    className={`w-full px-4 py-3 border rounded-2xl focus:outline-none focus:ring-1 transition-colors ${isDarkMode ? 'bg-gray-700 border-gray-600 text-white focus:ring-gray-500' : 'bg-white border-gray-200 text-black focus:ring-gray-300'}`}
                  >
                    <option value="">{t('products.select_years')}</option>
                    <option value="0-1">{t('products.years_0_1')}</option>
                    <option value="2-5">{t('products.years_2_5')}</option>
                    <option value="6-10">{t('products.years_6_10')}</option>
                    <option value="11-20">{t('products.years_11_20')}</option>
                    <option value="20+">{t('products.years_20_plus')}</option>
                  </select>
                </div>

                <div>
                  <label className={`block text-sm font-medium mb-2 transition-colors duration-300 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    {t('products.estimated_order_volume')}
                  </label>
                  <select
                    name="estimatedOrderVolume"
                    value={wholesaleForm.estimatedOrderVolume}
                    onChange={handleWholesaleFormChange}
                    required
                    className={`w-full px-4 py-3 border rounded-2xl focus:outline-none focus:ring-1 transition-colors ${isDarkMode ? 'bg-gray-700 border-gray-600 text-white focus:ring-gray-500' : 'bg-white border-gray-200 text-black focus:ring-gray-300'}`}
                  >
                    <option value="">{t('products.select_volume')}</option>
                    <option value="5-10">{t('products.volume_5_10')}</option>
                    <option value="11-25">{t('products.volume_11_25')}</option>
                    <option value="26-50">{t('products.volume_26_50')}</option>
                    <option value="51-100">{t('products.volume_51_100')}</option>
                    <option value="100+">{t('products.volume_100_plus')}</option>
                  </select>
                </div>

                {/* Contact Information */}
                <div className="md:col-span-2 mt-6">
                  <h3 className={`text-lg font-semibold mb-4 flex items-center gap-2 transition-colors duration-300 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                    <User className="h-5 w-5" />
                    {t('products.contact_information')}
                  </h3>
                </div>

                <div>
                  <label className={`block text-sm font-medium mb-2 transition-colors duration-300 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    {t('products.contact_name')}
                  </label>
                  <input
                    type="text"
                    name="contactName"
                    value={wholesaleForm.contactName}
                    onChange={handleWholesaleFormChange}
                    required
                    className={`w-full px-4 py-3 border rounded-2xl focus:outline-none focus:ring-1 transition-colors ${isDarkMode ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:ring-gray-500' : 'bg-white border-gray-200 text-black placeholder-gray-500 focus:ring-gray-300'}`}
                    placeholder={t('products.contact_name_placeholder')}
                  />
                </div>

                <div>
                  <label className={`block text-sm font-medium mb-2 transition-colors duration-300 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    {t('products.email_address')}
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={wholesaleForm.email}
                    onChange={handleWholesaleFormChange}
                    required
                    className={`w-full px-4 py-3 border rounded-2xl focus:outline-none focus:ring-1 transition-colors ${isDarkMode ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:ring-gray-500' : 'bg-white border-gray-200 text-black placeholder-gray-500 focus:ring-gray-300'}`}
                    placeholder={t('products.email_address_placeholder')}
                  />
                </div>

                <div>
                  <label className={`block text-sm font-medium mb-2 transition-colors duration-300 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    {t('products.phone_number')}
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={wholesaleForm.phone}
                    onChange={handleWholesaleFormChange}
                    required
                    className={`w-full px-4 py-3 border rounded-2xl focus:outline-none focus:ring-1 transition-colors ${isDarkMode ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:ring-gray-500' : 'bg-white border-gray-200 text-black placeholder-gray-500 focus:ring-gray-300'}`}
                    placeholder={t('products.phone_number_placeholder')}
                  />
                </div>

                <div>
                  <label className={`block text-sm font-medium mb-2 transition-colors duration-300 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    {t('products.business_address')}
                  </label>
                  <input
                    type="text"
                    name="address"
                    value={wholesaleForm.address}
                    onChange={handleWholesaleFormChange}
                    required
                    className={`w-full px-4 py-3 border rounded-2xl focus:outline-none focus:ring-1 transition-colors ${isDarkMode ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:ring-gray-500' : 'bg-white border-gray-200 text-black placeholder-gray-500 focus:ring-gray-300'}`}
                    placeholder={t('products.business_address_placeholder')}
                  />
                </div>

                <div className="md:col-span-2">
                  <label className={`block text-sm font-medium mb-2 transition-colors duration-300 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    {t('products.additional_information')}
                  </label>
                  <textarea
                    name="message"
                    value={wholesaleForm.message}
                    onChange={handleWholesaleFormChange}
                    rows={4}
                    className={`w-full px-4 py-3 border rounded-2xl focus:outline-none focus:ring-1 resize-none transition-colors ${isDarkMode ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:ring-gray-500' : 'bg-white border-gray-200 text-black placeholder-gray-500 focus:ring-gray-300'}`}
                    placeholder={t('products.additional_information_placeholder')}
                  />
                </div>
              </div>

              {/* Benefits Section */}
              <div className={`mt-8 p-4 rounded-2xl transition-colors duration-300 ${isDarkMode ? 'bg-gray-700' : 'bg-green-50'}`}>
                <h4 className={`font-semibold mb-3 transition-colors duration-300 ${isDarkMode ? 'text-green-300' : 'text-green-800'}`}>
                  {t('products.wholesale_benefits_title')}
                </h4>
                <ul className={`text-sm space-y-1 transition-colors duration-300 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  <li>{t('products.wholesale_benefit_1')}</li>
                  <li>{t('products.wholesale_benefit_2')}</li>
                  <li>{t('products.wholesale_benefit_3')}</li>
                  <li>{t('products.wholesale_benefit_4')}</li>
                  <li>{t('products.wholesale_benefit_5')}</li>
                  <li>{t('products.wholesale_benefit_6')}</li>
                </ul>
              </div>

              {/* Form Actions */}
              <div className="flex flex-col sm:flex-row gap-4 mt-8">
                <button
                  type="button"
                  onClick={() => setShowWholesaleModal(false)}
                  className={`flex-1 px-6 py-3 rounded-2xl text-sm font-medium border transition-colors ${isDarkMode ? 'border-gray-600 text-gray-300 hover:border-gray-500 hover:bg-gray-700' : 'border-gray-300 text-gray-700 hover:border-gray-400 hover:bg-gray-50'}`}
                >
                  {t('products.cancel')}
                </button>
                <button
                  type="submit"
                  className={`flex-1 px-6 py-3 rounded-2xl text-sm font-medium transition-colors ${isDarkMode ? 'bg-green-600 text-white hover:bg-green-700' : 'bg-green-600 text-white hover:bg-green-700'}`}
                >
                  {t('products.submit_application')}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Products;
