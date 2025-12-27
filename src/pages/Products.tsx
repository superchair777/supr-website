import React, { useEffect, useState } from 'react';
import { useTranslation, Trans } from 'react-i18next';
import { Link } from 'react-router-dom';
import { Filter, Grid, List, Star, Heart, ShoppingCart, Facebook, Instagram, X, Building, User, Mail, Phone, MapPin, FileText, Minus, Plus, Check, Truck } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { fetchProducts, Product } from '../services/products';
import { fetchCategories, Category } from '../services/categories';

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
  const getDescriptionText = (p: any) => {
    const name = (p.name || '').toLowerCase();
    const map = [
      { match: 'executive office chair', key: 'executive_office_chair' },
      { match: 'ergonomic task chair', key: 'ergonomic_task_chair' },
      { match: 'gaming chair pro', key: 'gaming_chair_pro' },
      { match: 'mesh office chair', key: 'mesh_office_chair' },
      { match: 'conference room chair', key: 'conference_room_chair' },
      { match: 'standing desk chair', key: 'standing_desk_chair' },
      { match: 'premium gaming chair', key: 'premium_gaming_chair' },
      { match: 'luxury executive chair', key: 'luxury_executive_chair' },
    ];
    const hit = map.find(m => name.includes(m.match));
    if (hit) return t(`products.desc_map.${hit.key}`);
    return p.description;
  };
  const [showWholesaleModal, setShowWholesaleModal] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [dynamicCategories, setDynamicCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(false);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [confirmQty, setConfirmQty] = useState(1);
  const [confirmProduct, setConfirmProduct] = useState<Product | null>(null);
  const backrestColors = [
    { name: 'lime-black', label: 'Lime Black', hex: '#2d3748', pattern: 'mesh' },
    { name: 'ash-grey', label: 'Ash Grey', hex: '#718096', pattern: 'mesh' },
    { name: 'navy-blue', label: 'Navy Blue', hex: '#2c5282', pattern: 'mesh' },
    { name: 'light-blue', label: 'Light Blue', hex: '#63b3ed', pattern: 'mesh' },
    { name: 'tree-green', label: 'Tree Green', hex: '#38a169', pattern: 'mesh' },
    { name: 'vit-c-orange', label: 'Vit C Orange', hex: '#ed8936', pattern: 'mesh' },
    { name: 'ruby-red', label: 'Ruby Red', hex: '#e53e3e', pattern: 'mesh' },
    { name: 'red-wine', label: 'Red Wine', hex: '#742a2a', pattern: 'mesh' },
    { name: 'cherry-red', label: 'Cherry Red', hex: '#c53030', pattern: 'dots' },
    { name: 'facebook-blue', label: 'Facebook Blue', hex: '#3182ce', pattern: 'dots' },
    { name: 'smoke-grey', label: 'Smoke Grey', hex: '#a0aec0', pattern: 'dots' },
    { name: 'ultra-black', label: 'Ultra Black', hex: '#1a202c', pattern: 'dots' },
    { name: 'black-mesh', label: 'Black', hex: '#2d3748', pattern: 'fine-mesh' },
    { name: 'smoke-grey-mesh', label: 'Smoke Grey', hex: '#a0aec0', pattern: 'fine-mesh' },
    { name: 'blue-mesh', label: 'Blue', hex: '#4299e1', pattern: 'fine-mesh' }
  ];
  const basicBackrestNames = ['lime-black','ash-grey','navy-blue','light-blue','tree-green','vit-c-orange'];
  const premiumBackrestNames = ['ruby-red','red-wine','cherry-red','facebook-blue','smoke-grey','ultra-black','black-mesh','smoke-grey-mesh','blue-mesh'];
  const seatLeatherColors = [
    { name: 'leather-black', label: 'Black', hex: '#1a1a1a' },
    { name: 'leather-dark-brown', label: 'Dark Brown', hex: '#553c2c' },
    { name: 'leather-brown', label: 'Brown', hex: '#8b4513' },
    { name: 'leather-beige', label: 'Beige', hex: '#d6bcaa' },
    { name: 'leather-white', label: 'White', hex: '#f7fafc' },
    { name: 'leather-grey', label: 'Grey', hex: '#a0aec0' }
  ];
  const seatSyntheticColors = [
    { name: 'syn-black', label: 'Black', hex: '#1a1a1a' },
    { name: 'syn-grey', label: 'Grey', hex: '#a0aec0' },
    { name: 'syn-dark-grey', label: 'Dark Grey', hex: '#4a5568' },
    { name: 'syn-blue', label: 'Blue', hex: '#3182ce' },
    { name: 'syn-red', label: 'Red', hex: '#e53e3e' },
    { name: 'syn-green', label: 'Green', hex: '#38a169' }
  ];
  const seatFabricMeshColors = [
    { name: 'mesh-black', label: 'Black', hex: '#2d3748' },
    { name: 'mesh-smoke', label: 'Smoke Grey', hex: '#a0aec0' },
    { name: 'mesh-navy', label: 'Navy Blue', hex: '#2c5282' },
    { name: 'mesh-light-blue', label: 'Light Blue', hex: '#63b3ed' },
    { name: 'mesh-tree-green', label: 'Tree Green', hex: '#38a169' },
    { name: 'mesh-orange', label: 'Orange', hex: '#ed8936' }
  ];
  const seatAllColors = [...seatLeatherColors, ...seatSyntheticColors, ...seatFabricMeshColors];
  const getSeatColorLabel = (name: string) => seatAllColors.find(c => c.name === name)?.label || name;
  const [selectedPackage, setSelectedPackage] = useState<'basic' | 'medium' | 'premium'>('basic');
  const [confirmAssembly, setConfirmAssembly] = useState<'assembled' | 'not_assembled'>('assembled');
  const applyPackage = (pkg: 'basic' | 'medium' | 'premium') => {
    setSelectedPackage(pkg);
    if (pkg === 'basic') {
      setSelMaterial('mesh');
      setSelArmrests('2d');
      setSelBase('nylon');
      setSelWheels('standard');
      setSelLumbar('fixed');
      setSelHeadrest('none');
    } else if (pkg === 'medium') {
      setSelMaterial('fabric');
      setSelArmrests('3d');
      setSelBase('steel');
      setSelWheels('rubber');
      setSelLumbar('adjustable');
      setSelHeadrest('included');
    } else {
      setSelMaterial('leather');
      setSelArmrests('4d');
      setSelBase('aluminum');
      setSelWheels('rubber');
      setSelLumbar('adjustable');
      setSelHeadrest('included');
    }
  };
  const packageInfo: Record<'basic' | 'medium' | 'premium', string[]> = {
    basic: [
      t('product.pkg_basic_1'),
      t('product.pkg_basic_2'),
      t('product.pkg_basic_3'),
      t('product.pkg_basic_4'),
      t('product.pkg_basic_5')
    ],
    medium: [
      t('product.pkg_medium_1'),
      t('product.pkg_medium_2'),
      t('product.pkg_medium_3'),
      t('product.pkg_medium_4'),
      t('product.pkg_medium_5')
    ],
    premium: [
      t('product.pkg_premium_1'),
      t('product.pkg_premium_2'),
      t('product.pkg_premium_3'),
      t('product.pkg_premium_4'),
      t('product.pkg_premium_5')
    ]
  };
  const materialOptions = [
    { name: 'leather', label: 'Genuine Leather', price: 0 },
    { name: 'fabric', label: 'Premium Fabric', price: -100 },
    { name: 'mesh', label: 'Breathable Mesh', price: -50 }
  ];
  const armrestsOptions = [
    { name: '2d', label: '2D Armrests', price: -30 },
    { name: '3d', label: '3D Armrests', price: 0 },
    { name: '4d', label: '4D Armrests', price: 40 }
  ];
  const baseOptions = [
    { name: 'nylon', label: 'Nylon Base', price: -50 },
    { name: 'steel', label: 'Steel Base', price: 0 },
    { name: 'aluminum', label: 'Aluminum Base', price: 80 }
  ];
  const wheelOptions = [
    { name: 'standard', label: 'Standard Wheels', price: 0 },
    { name: 'rubber', label: 'Rubber Quiet Wheels', price: 25 }
  ];
  const lumbarOptions = [
    { name: 'fixed', label: 'Fixed Lumbar', price: -20 },
    { name: 'adjustable', label: 'Adjustable Lumbar', price: 35 }
  ];
  const headrestOptions = [
    { name: 'none', label: 'No Headrest', price: -40 },
    { name: 'included', label: 'Headrest Included', price: 0 }
  ];
  const [selBackrest, setSelBackrest] = useState(backrestColors[0].name);
  const [backrestTier, setBackrestTier] = useState<'basic' | 'premium'>('basic');
  const [selSeat, setSelSeat] = useState(seatLeatherColors[0].name);
  const [selMaterial, setSelMaterial] = useState<'leather' | 'fabric' | 'mesh'>('leather');
  const [selArmrests, setSelArmrests] = useState(armrestsOptions[1].name);
  const [selBase, setSelBase] = useState(baseOptions[2].name);
  const [selWheels, setSelWheels] = useState(wheelOptions[1].name);
  const [selLumbar, setSelLumbar] = useState(lumbarOptions[1].name);
  const [selHeadrest, setSelHeadrest] = useState(headrestOptions[1].name);
  const [wholesaleForm, setWholesaleForm] = useState({
    name: '',
    email: '',
    companyName: '',
    phone: '',
    inquiryType: 'wholesale',
    subject: '',
    message: ''
  });

  const getCurrentPrice = (product: Product) => {
    const retail = product.price ?? 0;
    const wholesale = product.wholesalePrice ?? null;
    return isWholesale && wholesale ? wholesale : retail;
  };

  const categoryGroups = [
    { id: 'all', name: t('products.all_products'), matches: (_p: any) => true },
    ...dynamicCategories.map(c => ({
      id: c.slug,
      name: c.name,
      matches: (p: any) => p.category === c.slug
    })),
    { id: 'other', name: 'OTHER', matches: (p: any) => !dynamicCategories.some(c => c.slug === p.category) }
  ];
  const categories = categoryGroups.map(c => ({ id: c.id, name: c.name, count: products.filter(p => c.matches(p)).length }));

  const computedMaxPrice = Math.ceil(Math.max(...products.map(p => {
    const wp = p.wholesalePrice ?? null
    return isWholesale && wp ? wp : p.price
  }))) || 0

  useEffect(() => {
    fetchCategories().then(({ data }) => {
      if (data) setDynamicCategories(data);
    });
  }, []);

  useEffect(() => {
    if (priceRange[1] > computedMaxPrice && computedMaxPrice > 0) {
      setPriceRange([priceRange[0], computedMaxPrice])
    }
  }, [computedMaxPrice])

  const filteredProducts = products.filter(product => {
    const categoryMatch = selectedCategory === 'all' || (categoryGroups.find(c => c.id === selectedCategory)?.matches(product) ?? true);
    const currentPrice = isWholesale ? (product.wholesalePrice ?? product.price) : product.price;
    const priceMatch = currentPrice >= priceRange[0] && currentPrice <= priceRange[1];
    return categoryMatch && priceMatch;
  });


  useEffect(() => {
    setLoading(true);
    fetchProducts()
      .then(({ data, error }) => {
        if (error) {
          setLoadError('Failed to load products');
          setProducts([]);
        } else {
          setProducts(data || []);
        }
      })
      .finally(() => setLoading(false))
  }, [])

  const openConfirm = (product: Product) => {
    setConfirmProduct(product)
    setConfirmQty(1)
    applyPackage('basic')
    setSelBackrest(backrestColors[0].name)
    setSelSeat(seatLeatherColors[0].name)
    setConfirmOpen(true)
  }

  const closeConfirm = () => {
    setConfirmOpen(false)
    setConfirmProduct(null)
  }

  const confirmAdd = () => {
    if (!confirmProduct) return
    const basePrice = getCurrentPrice(confirmProduct)
    const optionsPrice = (materialOptions.find(m=>m.name===selMaterial)?.price||0) +
                         (armrestsOptions.find(o=>o.name===selArmrests)?.price||0) +
                         (baseOptions.find(o=>o.name===selBase)?.price||0) +
                         (wheelOptions.find(o=>o.name===selWheels)?.price||0) +
                         (lumbarOptions.find(o=>o.name===selLumbar)?.price||0) +
                         (headrestOptions.find(o=>o.name===selHeadrest)?.price||0)

    addItem({
      id: confirmProduct.id,
      name: confirmProduct.name,
      price: basePrice + optionsPrice,
      originalPrice: confirmProduct.originalPrice ?? undefined,
      image: confirmProduct.image,
      category: confirmProduct.category,
      inStock: confirmProduct.inStock,
      options: {
        backrestColor: backrestColors.find(c=>c.name===selBackrest)?.label || selBackrest,
        seatColor: getSeatColorLabel(selSeat),
        assembly: confirmAssembly,
        material: materialOptions.find(m=>m.name===selMaterial)?.label || selMaterial,
        armrests: armrestsOptions.find(a => a.name === selArmrests)?.label || selArmrests,
        base: baseOptions.find(b => b.name === selBase)?.label || selBase,
        wheels: wheelOptions.find(w => w.name === selWheels)?.label || selWheels,
        lumbar: lumbarOptions.find(l => l.name === selLumbar)?.label || selLumbar,
        headrest: headrestOptions.find(h => h.name === selHeadrest)?.label || selHeadrest,
        qty: String(confirmQty)
      }
    }, confirmQty)
    closeConfirm()
  }

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
      name: '',
      email: '',
      companyName: '',
      phone: '',
      inquiryType: 'wholesale',
      subject: '',
      message: ''
    });
  };

  const lineUrl = import.meta.env.VITE_LINE_URL ?? 'https://shop.line.me/@superchair';

  const triggerAddAnimation = (originEl: HTMLElement, image?: string) => {
    const cart = document.getElementById('cart-target');
    if (!cart) return;
    const start = originEl.getBoundingClientRect();
    const end = cart.getBoundingClientRect();
    const clone = document.createElement('div');
    clone.className = 'fly-clone';
    clone.style.position = 'fixed';
    clone.style.left = `${start.left + start.width / 2 - 20}px`;
    clone.style.top = `${start.top + start.height / 2 - 20}px`;
    clone.style.width = '40px';
    clone.style.height = '40px';
    clone.style.zIndex = '9999';
    clone.style.borderRadius = '9999px';
    clone.style.boxShadow = '0 8px 30px rgba(0,0,0,0.25)';
    if (image) {
      clone.style.backgroundImage = `url(${image})`;
      clone.style.backgroundSize = 'cover';
      clone.style.backgroundPosition = 'center';
    } else {
      clone.style.backgroundColor = '#FFB900';
    }
    clone.style.transform = 'translate(0px, 0px) scale(1)';
    clone.style.opacity = '1';
    document.body.appendChild(clone);
    const dx = end.left + end.width / 2 - (start.left + start.width / 2);
    const dy = end.top + end.height / 2 - (start.top + start.height / 2);
    requestAnimationFrame(() => {
      clone.style.transform = `translate(${dx}px, ${dy}px) scale(0.3)`;
      clone.style.opacity = '0.2';
    });
    const cleanup = () => clone.remove();
    clone.addEventListener('transitionend', cleanup, { once: true });
    setTimeout(cleanup, 1200);
    cart.style.transition = 'transform 200ms';
    cart.style.transform = 'scale(1.15)';
    setTimeout(() => { cart.style.transform = 'scale(1)'; }, 220);
  };

  const ProductCard = ({ product }: { product: Product }) => (
    <Link to={`/product/${product.id}`} className={`group relative rounded-3xl overflow-hidden transition-all duration-500 ${isDarkMode ? 'bg-[#1a1a1a] hover:bg-[#222]' : 'bg-white hover:bg-white/60'} border ${isDarkMode ? 'border-white/5 hover:border-mustard-500/30' : 'border-gray-100 hover:border-mustard-500/30'} shadow-sm hover:shadow-2xl hover:-translate-y-1 block`}>
      {/* Product Badges */}
      <div className="absolute top-4 left-4 z-10 flex flex-col gap-2">
        {product.isNew && (
          <span className="px-3 py-1 bg-mustard-500 text-black text-xs font-bold tracking-wide rounded-full shadow-lg">{t('products.new')}</span>
        )}
        {product.isSale && (
          <span className="px-3 py-1 bg-red-600 text-white text-xs font-bold tracking-wide rounded-full shadow-lg">{t('products.sale')}</span>
        )}
        {!product.inStock && (
          <span className="px-3 py-1 bg-black text-white text-xs font-bold tracking-wide rounded-full shadow-lg">{t('products.out_of_stock')}</span>
        )}
        {isWholesale && (
          <span className="px-3 py-1 bg-black text-white text-xs font-bold tracking-wide rounded-full shadow-lg border border-white/20">{t('products.wholesale')}</span>
        )}
        {(product.rating && product.rating >= 4.8 && product.reviews && product.reviews >= 100) && (
          <span className="px-3 py-1 bg-emerald-500 text-white text-xs font-bold tracking-wide rounded-full shadow-lg">Highly Recommended</span>
        )}
      </div>

      {/* Wishlist Button */}
      <button className={`absolute top-4 right-4 z-10 p-3 rounded-full transition-all duration-300 ${isDarkMode ? 'bg-black/20 hover:bg-mustard-500 text-white backdrop-blur-md' : 'bg-white/80 hover:bg-mustard-500 hover:text-white text-gray-600 shadow-sm'}`}>
        <Heart className="h-4 w-4" />
      </button>

      {/* Product Image */}
      <div className={`aspect-[4/5] overflow-hidden ${isDarkMode ? 'bg-[#151515]' : 'bg-gray-50'}`}>
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
      </div>

      {/* Product Info */}
      <div className="p-6">
        <div className="flex items-center gap-2 mb-3">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`h-3.5 w-3.5 ${i < Math.floor(product.rating || 0) ? 'text-mustard-500 fill-current' : 'text-gray-300'}`}
              />
            ))}
          </div>
          <span className={`text-xs font-medium ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>({product.reviews || 0})</span>
        </div>

        <h3 className={`text-lg font-bold mb-2 transition-colors duration-300 line-clamp-1 ${isDarkMode ? 'text-white group-hover:text-mustard-500' : 'text-gray-900 group-hover:text-mustard-600'}`}>
          {product.name}
        </h3>

        <p className={`text-sm mb-4 line-clamp-2 transition-colors duration-300 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
          {getDescriptionText(product)}
        </p>

        <div className="flex items-center justify-between mb-4">
          <div className="flex flex-col">
             <div className="flex items-baseline gap-2">
              <span className={`text-xl font-bold transition-colors duration-300 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                ${getCurrentPrice(product).toLocaleString()}
              </span>
              {!isWholesale && product.originalPrice && (
                <span className={`text-sm line-through decoration-gray-500 ${isDarkMode ? 'text-gray-600' : 'text-gray-400'}`}>
                  ${product.originalPrice.toLocaleString()}
                </span>
              )}
            </div>
            {(!isWholesale && product.originalPrice && (product.originalPrice - getCurrentPrice(product)) > 0) && (
              <span className="text-xs font-medium text-emerald-500 mt-0.5">
                {t('product.save')} ${(product.originalPrice - getCurrentPrice(product)).toFixed(2)}
              </span>
            )}
          </div>
        </div>

        {isWholesale && (
          <div className={`mb-4 p-3 rounded-xl border transition-colors duration-300 ${isDarkMode ? 'bg-gray-800/50 border-white/10' : 'bg-mustard-50 border-mustard-100'}`}>
            <div className="flex justify-between items-center mb-1">
              <span className={`text-xs font-bold uppercase tracking-wider ${isDarkMode ? 'text-mustard-500' : 'text-mustard-700'}`}>
                {t('products.wholesale_pricing')}
              </span>
            </div>
            <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              {t('products.moq', { count: product.moq })}
            </p>
          </div>
        )}

        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            openConfirm(product)
          }}
          className={`w-full py-3 px-4 rounded-xl text-sm font-bold tracking-wide transition-all duration-300 flex items-center justify-center gap-2 ${
            product.inStock
              ? 'bg-mustard-500 text-black hover:bg-mustard-400 hover:shadow-lg hover:shadow-mustard-500/20 transform hover:-translate-y-0.5'
              : 'bg-gray-200 text-gray-400 cursor-not-allowed pointer-events-none'
          }`}
        >
          <ShoppingCart className="h-4 w-4" />
          {product.inStock ? t('products.add_to_cart') : t('products.out_of_stock')}
        </button>
      </div>
    </Link>
  );

  const ProductListItem = ({ product }: { product: Product }) => (
    <div className={`flex gap-6 p-6 rounded-3xl transition-all duration-300 border ${isDarkMode ? 'bg-[#1a1a1a] border-white/5 hover:border-mustard-500/30' : 'bg-white border-gray-100 hover:border-mustard-500/30'} shadow-sm hover:shadow-xl`}>
      <div className="relative flex-shrink-0">
        <Link to={`/product/${product.id}`} className="block overflow-hidden rounded-2xl">
          <img
            src={product.image}
            alt={product.name}
            className="w-48 h-48 object-cover transition-transform duration-700 hover:scale-110"
          />
        </Link>
        <div className="absolute top-3 left-3 flex flex-col gap-2">
          {product.isNew && (
            <span className="px-3 py-1 bg-mustard-500 text-black text-xs font-bold tracking-wide rounded-full shadow-lg">{t('products.new')}</span>
          )}
          {product.isSale && (
            <span className="px-3 py-1 bg-red-600 text-white text-xs font-bold tracking-wide rounded-full shadow-lg">{t('products.sale')}</span>
          )}
        </div>
      </div>

      <div className="flex-1 flex flex-col">
        <div className="flex items-start justify-between mb-2">
          <Link to={`/product/${product.id}`}>
            <h3 className={`text-2xl font-bold transition-colors duration-300 ${isDarkMode ? 'text-white hover:text-mustard-500' : 'text-gray-900 hover:text-mustard-600'}`}>
              {product.name}
            </h3>
          </Link>
          <button className={`p-3 rounded-full transition-colors ${isDarkMode ? 'bg-black/20 text-gray-400 hover:text-mustard-500 hover:bg-black/40' : 'bg-gray-100 text-gray-600 hover:text-mustard-500 hover:bg-gray-200'}`}>
            <Heart className="h-5 w-5" />
          </button>
        </div>

        <div className="flex items-center gap-3 mb-4">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`h-4 w-4 ${i < Math.floor(product.rating || 0) ? 'text-mustard-500 fill-current' : 'text-gray-300'}`}
              />
            ))}
          </div>
          <span className={`text-sm font-medium ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>({product.reviews || 0} reviews)</span>
        </div>

        <Link to={`/product/${product.id}`} className="flex-1">
          <p className={`mb-4 line-clamp-2 transition-colors duration-300 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            {getDescriptionText(product)}
          </p>
        </Link>

        <div className="flex flex-wrap gap-2 mb-6">
          {product.features && product.features.map((feature, index) => (
            <span
              key={index}
              className={`px-3 py-1 rounded-full text-xs font-medium transition-colors duration-300 ${isDarkMode ? 'bg-gray-800 text-gray-300 border border-gray-700' : 'bg-gray-100 text-gray-600'}`}
            >
              {feature}
            </span>
          ))}
        </div>

        <div className="flex items-end justify-between mt-auto">
          <div className="flex flex-col gap-1">
            <div className="flex items-baseline gap-3">
              <span className={`text-3xl font-bold transition-colors duration-300 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                ${getCurrentPrice(product).toLocaleString()}
              </span>
              {!isWholesale && product.originalPrice && (
                <span className={`text-lg line-through decoration-gray-500 ${isDarkMode ? 'text-gray-600' : 'text-gray-400'}`}>
                  ${product.originalPrice.toLocaleString()}
                </span>
              )}
            </div>
            {(!isWholesale && product.originalPrice && (product.originalPrice - getCurrentPrice(product)) > 0) && (
              <span className="text-sm font-bold text-emerald-500">
                {t('product.save')} ${(product.originalPrice - getCurrentPrice(product)).toFixed(2)}
              </span>
            )}
          </div>

          <div className="flex items-center gap-4">
            {isWholesale && (
              <div className={`text-right px-4 py-2 rounded-xl border ${isDarkMode ? 'bg-gray-800/50 border-white/10' : 'bg-mustard-50 border-mustard-100'}`}>
                <p className={`text-xs font-bold uppercase tracking-wider mb-1 ${isDarkMode ? 'text-mustard-500' : 'text-mustard-700'}`}>
                  {t('products.wholesale')}
                </p>
                <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  {t('products.moq', { count: product.moq })}
                </p>
              </div>
            )}

            <button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                openConfirm(product)
              }}
              className={`py-4 px-8 rounded-xl text-sm font-bold tracking-wide transition-all duration-300 flex items-center gap-2 ${
                product.inStock
                  ? 'bg-mustard-500 text-black hover:bg-mustard-400 hover:shadow-lg hover:shadow-mustard-500/20 transform hover:-translate-y-0.5'
                  : 'bg-gray-200 text-gray-400 cursor-not-allowed pointer-events-none'
              }`}
            >
              <ShoppingCart className="h-5 w-5" />
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
      <section className={`relative py-24 overflow-hidden transition-colors duration-300 ${isDarkMode ? 'bg-gray-900' : 'bg-white'}`}>
        <div className="absolute inset-0 pointer-events-none" style={{
            backgroundImage: `linear-gradient(${isDarkMode ? '#374151' : '#e5e7eb'} 1px, transparent 1px), linear-gradient(90deg, ${isDarkMode ? '#374151' : '#e5e7eb'} 1px, transparent 1px)`,
            backgroundSize: '40px 40px',
            opacity: 0.5
        }}></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-12">
            <div className={`inline-flex items-center px-4 py-1.5 rounded-full text-xs font-bold tracking-wider border shadow-sm mb-6 ${isDarkMode ? 'bg-gray-800 border-gray-700 text-gray-300' : 'bg-white border-gray-200 text-slate-600'}`}>
               <span className={`h-2 w-2 rounded-full mr-2 ${isDarkMode ? 'bg-mustard-500' : 'bg-mustard-500'}`}></span>
               PREMIUM COLLECTION
            </div>
            <h1 className={`text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight tracking-tight mb-6 transition-colors duration-300 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              {t('products.title')}
            </h1>
            <div className="w-20 h-1 bg-mustard-500 mx-auto mb-8 rounded-full"></div>
            
            <div className="max-w-3xl mx-auto">
              <div className={`inline-flex items-center gap-3 px-6 py-4 rounded-full shadow-lg border transition-all duration-300 transform hover:scale-105 ${isDarkMode ? 'bg-gray-800/80 border-gray-700 backdrop-blur-md text-gray-100' : 'bg-white/80 border-gray-100 backdrop-blur-md text-gray-800'}`}>
                <span className={`inline-flex h-8 w-8 items-center justify-center rounded-full shadow-inner ${isDarkMode ? 'bg-mustard-500 text-black' : 'bg-mustard-500 text-white'}`}>
                  <Truck className="h-4 w-4" />
                </span>
                <span className="text-sm sm:text-base font-medium tracking-wide leading-snug">
                  <Trans i18nKey="products.subtitle">
                    Free delivery in Bangkok for orders over 5,000 THB
                  </Trans>
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Filters and Products */}
      <section className={`py-12 transition-colors duration-300 ${isDarkMode ? 'bg-[#1a1a1a]' : 'bg-white'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Sidebar Filters */}
            <div className="lg:w-72 flex-shrink-0">
              <div className={`sticky top-24 rounded-3xl p-8 transition-all duration-300 border ${isDarkMode ? 'glass-card-dark bg-gray-800/40 border-gray-700/50' : 'glass-card bg-white/60 border-gray-100'} backdrop-blur-xl`}>
                <div className="flex items-center gap-2 mb-6">
                  <Filter className={`h-5 w-5 ${isDarkMode ? 'text-white' : 'text-gray-900'}`} />
                  <h3 className={`font-medium transition-colors duration-300 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{t('products.filters')}</h3>
                </div>

                {/* Categories */}
                <div className="mb-8">
                  <h4 className={`font-bold uppercase tracking-wider text-xs mb-4 transition-colors duration-300 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>{t('products.categories')}</h4>
                  <div className="space-y-2">
                    {categories.map((category) => (
                      <button
                        key={category.id}
                        onClick={() => setSelectedCategory(category.id)}
                        className={`w-full text-left px-4 py-3 rounded-xl text-sm font-medium transition-all duration-300 ${
                          selectedCategory === category.id
                            ? isDarkMode
                              ? 'bg-mustard-500 text-black shadow-lg shadow-mustard-500/20'
                              : 'bg-mustard-500 text-black shadow-lg shadow-mustard-500/20'
                            : isDarkMode
                            ? 'text-gray-400 hover:bg-gray-800 hover:text-white'
                            : 'text-gray-600 hover:bg-gray-100 hover:text-black'
                        }`}
                      >
                        <div className="flex justify-between items-center">
                          <span>{category.name}</span>
                          <span className={`text-xs px-2 py-0.5 rounded-full ${
                            selectedCategory === category.id
                              ? 'bg-black/10 text-black' 
                              : isDarkMode ? 'bg-gray-800 text-gray-500' : 'bg-gray-200 text-gray-500'
                          }`}>
                            {category.count}
                          </span>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Price Range */}
                <div className="mb-6">
                  <h4 className={`font-bold uppercase tracking-wider text-xs mb-4 transition-colors duration-300 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>{t('products.price_range')}</h4>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className={`text-sm font-medium transition-colors duration-300 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                        ${priceRange[0].toLocaleString()}
                      </span>
                      <span className={`text-sm font-medium transition-colors duration-300 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                        ${priceRange[1].toLocaleString()}
                      </span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max={computedMaxPrice}
                      value={priceRange[1]}
                      onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                      className={`w-full h-2 rounded-lg appearance-none cursor-pointer ${isDarkMode ? 'bg-gray-700 accent-mustard-500' : 'bg-gray-200 accent-mustard-500'}`}
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
                    className={`w-full sm:w-auto px-6 py-2.5 rounded-full text-sm font-bold tracking-wide transition-all duration-300 ${
                      isWholesale
                        ? isDarkMode
                          ? 'bg-white text-black hover:bg-gray-200 shadow-lg'
                          : 'bg-black text-white hover:bg-gray-800 shadow-lg'
                        : isDarkMode
                          ? 'bg-gray-800 text-gray-400 hover:bg-gray-700 border border-gray-700'
                          : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-200'
                    }`}
                  >
                    {isWholesale ? t('products.retail_pricing') : t('products.wholesale_pricing')}
                  </button>
                  <button
                    onClick={() => setShowWholesaleModal(true)}
                    className={`w-full sm:w-auto px-6 py-2.5 rounded-full text-sm font-bold tracking-wide transition-all duration-300 ${
                      isDarkMode
                        ? 'bg-mustard-500 text-black hover:bg-mustard-400 shadow-lg shadow-mustard-500/20'
                        : 'bg-mustard-500 text-black hover:bg-mustard-400 shadow-lg shadow-mustard-500/20'
                    }`}
                  >
                    {t('products.apply_wholesale')}
                  </button>
                  <span className={`text-sm font-medium ml-2 transition-colors duration-300 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                    {t('products.products_found', { count: filteredProducts.length })}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`p-2.5 rounded-xl transition-all duration-300 ${
                      viewMode === 'grid'
                        ? isDarkMode
                          ? 'bg-mustard-500 text-black shadow-lg shadow-mustard-500/20'
                          : 'bg-mustard-500 text-black shadow-lg shadow-mustard-500/20'
                        : isDarkMode
                        ? 'text-gray-400 hover:bg-gray-800 hover:text-white'
                        : 'text-gray-400 hover:bg-gray-100 hover:text-black'
                    }`}
                  >
                    <Grid className="h-5 w-5" />
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={`p-2.5 rounded-xl transition-all duration-300 ${
                      viewMode === 'list'
                        ? isDarkMode
                          ? 'bg-mustard-500 text-black shadow-lg shadow-mustard-500/20'
                          : 'bg-mustard-500 text-black shadow-lg shadow-mustard-500/20'
                        : isDarkMode
                        ? 'text-gray-400 hover:bg-gray-800 hover:text-white'
                        : 'text-gray-400 hover:bg-gray-100 hover:text-black'
                    }`}
                  >
                    <List className="h-5 w-5" />
                  </button>
                </div>
              </div>

              {loading ? (
                <div className="text-center py-12">
                  <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-gray-300 border-t-black"></div>
                  <p className={`mt-4 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Loading products...</p>
                </div>
              ) : filteredProducts.length > 0 ? (
                <div className={viewMode === 'grid' ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8" : "space-y-6"}>
                  {filteredProducts.map((product) => (
                    viewMode === 'grid' ? (
                      <ProductCard key={product.id} product={product} />
                    ) : (
                      <ProductListItem key={product.id} product={product} />
                    )
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <p className={`text-lg ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                    {t('products.no_products_found')}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
      
      {/* Wholesale Modal */}
      {showWholesaleModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 bg-black/80 backdrop-blur-sm transition-opacity" aria-hidden="true" onClick={() => setShowWholesaleModal(false)}></div>
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
            <div className={`inline-block align-bottom rounded-3xl text-left overflow-hidden shadow-2xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full border ${isDarkMode ? 'bg-[#1a1a1a] border-gray-700' : 'bg-white border-gray-100'}`}>
              <div className={`px-4 pt-5 pb-4 sm:p-8 ${isDarkMode ? 'bg-[#1a1a1a]' : 'bg-white'}`}>
                <div className="sm:flex sm:items-start">
                  <div className="mt-3 text-center sm:mt-0 sm:text-left w-full">
                    <h3 className={`text-2xl font-bold mb-6 ${isDarkMode ? 'text-white' : 'text-gray-900'}`} id="modal-title">
                      {t('products.wholesale_application')}
                    </h3>
                    <div className="mt-4">
                      <form onSubmit={handleWholesaleSubmit} className="space-y-6">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                          <div>
                            <label className={`block text-xs font-bold uppercase tracking-wider mb-2 transition-colors duration-300 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                              {t('contact.name')}
                            </label>
                            <input
                              type="text"
                              name="name"
                              value={wholesaleForm.name}
                              onChange={handleWholesaleFormChange}
                              required
                              className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 transition-all ${isDarkMode ? 'bg-gray-800/50 border-gray-700 text-white placeholder-gray-500 focus:ring-mustard-500 focus:border-transparent' : 'bg-gray-50 border-gray-200 text-black placeholder-gray-400 focus:ring-mustard-500 focus:border-transparent'}`}
                              placeholder={t('contact.name_placeholder')}
                            />
                          </div>
                          <div>
                            <label className={`block text-xs font-bold uppercase tracking-wider mb-2 transition-colors duration-300 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                              {t('contact.email')}
                            </label>
                            <input
                              type="email"
                              name="email"
                              value={wholesaleForm.email}
                              onChange={handleWholesaleFormChange}
                              required
                              className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 transition-all ${isDarkMode ? 'bg-gray-800/50 border-gray-700 text-white placeholder-gray-500 focus:ring-mustard-500 focus:border-transparent' : 'bg-gray-50 border-gray-200 text-black placeholder-gray-400 focus:ring-mustard-500 focus:border-transparent'}`}
                              placeholder={t('contact.email_placeholder')}
                            />
                          </div>
                          <div>
                            <label className={`block text-xs font-bold uppercase tracking-wider mb-2 transition-colors duration-300 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                              {t('home.q_company_name')} <span className="text-gray-500 text-[10px] font-normal">({t('home.optional') || 'Optional'})</span>
                            </label>
                            <input
                              type="text"
                              name="companyName"
                              value={wholesaleForm.companyName}
                              onChange={handleWholesaleFormChange}
                              className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 transition-all ${isDarkMode ? 'bg-gray-800/50 border-gray-700 text-white placeholder-gray-500 focus:ring-mustard-500 focus:border-transparent' : 'bg-gray-50 border-gray-200 text-black placeholder-gray-400 focus:ring-mustard-500 focus:border-transparent'}`}
                              placeholder={t('products.company_name_placeholder')}
                            />
                          </div>
                          <div>
                            <label className={`block text-xs font-bold uppercase tracking-wider mb-2 transition-colors duration-300 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                              {t('home.q_contact_number')}
                            </label>
                            <input
                              type="tel"
                              name="phone"
                              value={wholesaleForm.phone}
                              onChange={handleWholesaleFormChange}
                              required
                              className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 transition-all ${isDarkMode ? 'bg-gray-800/50 border-gray-700 text-white placeholder-gray-500 focus:ring-mustard-500 focus:border-transparent' : 'bg-gray-50 border-gray-200 text-black placeholder-gray-400 focus:ring-mustard-500 focus:border-transparent'}`}
                              placeholder={t('products.phone_number_placeholder')}
                            />
                          </div>
                        </div>

                        <div>
                          <label className={`block text-xs font-bold uppercase tracking-wider mb-2 transition-colors duration-300 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                            {t('contact.inquiry_type')}
                          </label>
                          <select
                            name="inquiryType"
                            value={wholesaleForm.inquiryType}
                            onChange={handleWholesaleFormChange}
                            className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 transition-all ${isDarkMode ? 'bg-gray-800/50 border-gray-700 text-white focus:ring-mustard-500 focus:border-transparent' : 'bg-gray-50 border-gray-200 text-black focus:ring-mustard-500 focus:border-transparent'}`}
                          >
                            <option value="general">{t('contact.general_inquiry')}</option>
                            <option value="support">{t('contact.product_support')}</option>
                            <option value="wholesale">{t('contact.wholesale_orders')}</option>
                            <option value="returns">{t('contact.returns_exchanges')}</option>
                            <option value="warranty">{t('contact.warranty_claim')}</option>
                          </select>
                        </div>

                        <div>
                          <label className={`block text-xs font-bold uppercase tracking-wider mb-2 transition-colors duration-300 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                            {t('contact.subject')}
                          </label>
                          <input
                            type="text"
                            name="subject"
                            value={wholesaleForm.subject}
                            onChange={handleWholesaleFormChange}
                            required
                            className={`w-full px-4 py-3 border rounded-2xl focus:outline-none focus:ring-1 transition-colors ${isDarkMode ? 'bg-gray-800 border-gray-700 text-white placeholder-gray-400 focus:ring-gray-600' : 'bg-white border-gray-200 text-black placeholder-gray-500 focus:ring-gray-300'}`}
                            placeholder={t('contact.subject_placeholder')}
                          />
                        </div>

                        <div>
                          <label className={`block text-sm font-medium mb-2 transition-colors duration-300 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                            {t('contact.message')}
                          </label>
                          <textarea
                            name="message"
                            value={wholesaleForm.message}
                            onChange={handleWholesaleFormChange}
                            required
                            rows={6}
                            className={`w-full px-4 py-3 border rounded-2xl focus:outline-none focus:ring-1 resize-none transition-colors ${isDarkMode ? 'bg-gray-800 border-gray-700 text-white placeholder-gray-400 focus:ring-gray-600' : 'bg-white border-gray-200 text-black placeholder-gray-500 focus:ring-gray-300'}`}
                            placeholder={t('contact.message_placeholder')}
                          />
                        </div>

                        <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
                          <button
                            type="submit"
                            className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-black text-base font-medium text-white hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black sm:ml-3 sm:w-auto sm:text-sm"
                          >
                            {t('products.submit_application')}
                          </button>
                          <button
                            type="button"
                            className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:w-auto sm:text-sm"
                            onClick={() => setShowWholesaleModal(false)}
                          >
                            {t('products.cancel')}
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Confirmation Modal */}
      {confirmOpen && confirmProduct && (
        <div className="fixed inset-0 z-50 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
            <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true" onClick={closeConfirm}></div>
                <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
                <div className={`inline-block align-bottom rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
                    <div className={`px-4 pt-5 pb-4 sm:p-6 sm:pb-4 ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
                        <div className="sm:flex sm:items-start">
                            <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-mustard-100 sm:mx-0 sm:h-10 sm:w-10">
                                <Check className="h-6 w-6 text-mustard-600" aria-hidden="true" />
                            </div>
                            <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                                <h3 className={`text-lg leading-6 font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`} id="modal-title">
                                    {t('products.add_to_cart')}
                                </h3>
                                <div className="mt-2">
                                    <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-500'}`}>
                                        Customize your {confirmProduct.name} below:
                                    </p>
                                    
                                    <div className="mt-4 max-h-[50vh] overflow-y-auto pr-2 custom-scrollbar">
                                      {/* Package Selection */}
                                      <div className="mb-4">
                                        <label className={`block text-xs font-bold uppercase tracking-wider mb-2 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Package Configuration</label>
                                        <div className="grid grid-cols-3 gap-2">
                                          {(['basic', 'medium', 'premium'] as const).map((pkg) => (
                                            <button
                                              key={pkg}
                                              onClick={() => applyPackage(pkg)}
                                              className={`py-2 px-1 rounded-lg text-xs font-bold uppercase tracking-wider border-2 transition-all ${
                                                selectedPackage === pkg
                                                  ? 'border-mustard-500 bg-mustard-50 text-mustard-700'
                                                  : isDarkMode
                                                    ? 'border-gray-700 bg-gray-800 text-gray-400 hover:border-gray-600'
                                                    : 'border-gray-200 bg-white text-gray-500 hover:border-gray-300'
                                              }`}
                                            >
                                              {pkg}
                                            </button>
                                          ))}
                                        </div>
                                      </div>

                                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        {/* Quantity */}
                                        <div>
                                            <label className={`block text-xs font-bold uppercase tracking-wider mb-2 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Quantity</label>
                                            <div className={`flex items-center rounded-lg border ${isDarkMode ? 'border-gray-600 bg-gray-700' : 'border-gray-200 bg-white'}`}>
                                                <button onClick={() => setConfirmQty(Math.max(1, confirmQty - 1))} className={`p-2 ${isDarkMode ? 'text-gray-300 hover:text-white' : 'text-gray-500 hover:text-black'}`}><Minus className="h-4 w-4" /></button>
                                                <span className={`flex-1 text-center font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{confirmQty}</span>
                                                <button onClick={() => setConfirmQty(Math.min(10, confirmQty + 1))} className={`p-2 ${isDarkMode ? 'text-gray-300 hover:text-white' : 'text-gray-500 hover:text-black'}`}><Plus className="h-4 w-4" /></button>
                                            </div>
                                        </div>

                                        {/* Backrest Color */}
                                        <div>
                                            <label className={`block text-xs font-bold uppercase tracking-wider mb-2 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Backrest Color</label>
                                            <select
                                                value={selBackrest}
                                                onChange={(e) => setSelBackrest(e.target.value)}
                                                className={`w-full p-2 rounded-lg border text-sm focus:ring-2 focus:ring-mustard-500 focus:outline-none ${isDarkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-200 text-gray-900'}`}
                                            >
                                                {backrestColors.map(c => <option key={c.name} value={c.name}>{c.label}</option>)}
                                            </select>
                                        </div>

                                        {/* Seat Color */}
                                        <div>
                                            <label className={`block text-xs font-bold uppercase tracking-wider mb-2 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Seat Color</label>
                                            <select
                                                value={selSeat}
                                                onChange={(e) => setSelSeat(e.target.value)}
                                                className={`w-full p-2 rounded-lg border text-sm focus:ring-2 focus:ring-mustard-500 focus:outline-none ${isDarkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-200 text-gray-900'}`}
                                            >
                                                {seatAllColors.map(c => <option key={c.name} value={c.name}>{c.label}</option>)}
                                            </select>
                                        </div>

                                        {/* Material */}
                                        <div>
                                            <label className={`block text-xs font-bold uppercase tracking-wider mb-2 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Material</label>
                                            <select
                                                value={selMaterial}
                                                onChange={(e) => setSelMaterial(e.target.value as any)}
                                                className={`w-full p-2 rounded-lg border text-sm focus:ring-2 focus:ring-mustard-500 focus:outline-none ${isDarkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-200 text-gray-900'}`}
                                            >
                                                {materialOptions.map(o => <option key={o.name} value={o.name}>{o.label} ({o.price > 0 ? `+$${o.price}` : o.price < 0 ? `-$${Math.abs(o.price)}` : 'Included'})</option>)}
                                            </select>
                                        </div>
                                        
                                        {/* Armrests */}
                                        <div>
                                            <label className={`block text-xs font-bold uppercase tracking-wider mb-2 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Armrests</label>
                                            <select
                                                value={selArmrests}
                                                onChange={(e) => setSelArmrests(e.target.value)}
                                                className={`w-full p-2 rounded-lg border text-sm focus:ring-2 focus:ring-mustard-500 focus:outline-none ${isDarkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-200 text-gray-900'}`}
                                            >
                                                {armrestsOptions.map(o => <option key={o.name} value={o.name}>{o.label} ({o.price > 0 ? `+$${o.price}` : o.price < 0 ? `-$${Math.abs(o.price)}` : 'Included'})</option>)}
                                            </select>
                                        </div>

                                        {/* Base */}
                                        <div>
                                            <label className={`block text-xs font-bold uppercase tracking-wider mb-2 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Base</label>
                                            <select
                                                value={selBase}
                                                onChange={(e) => setSelBase(e.target.value)}
                                                className={`w-full p-2 rounded-lg border text-sm focus:ring-2 focus:ring-mustard-500 focus:outline-none ${isDarkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-200 text-gray-900'}`}
                                            >
                                                {baseOptions.map(o => <option key={o.name} value={o.name}>{o.label} ({o.price > 0 ? `+$${o.price}` : o.price < 0 ? `-$${Math.abs(o.price)}` : 'Included'})</option>)}
                                            </select>
                                        </div>

                                        {/* Wheels */}
                                        <div>
                                            <label className={`block text-xs font-bold uppercase tracking-wider mb-2 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Wheels</label>
                                            <select
                                                value={selWheels}
                                                onChange={(e) => setSelWheels(e.target.value)}
                                                className={`w-full p-2 rounded-lg border text-sm focus:ring-2 focus:ring-mustard-500 focus:outline-none ${isDarkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-200 text-gray-900'}`}
                                            >
                                                {wheelOptions.map(o => <option key={o.name} value={o.name}>{o.label} ({o.price > 0 ? `+$${o.price}` : o.price < 0 ? `-$${Math.abs(o.price)}` : 'Included'})</option>)}
                                            </select>
                                        </div>

                                        {/* Lumbar */}
                                        <div>
                                            <label className={`block text-xs font-bold uppercase tracking-wider mb-2 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Lumbar</label>
                                            <select
                                                value={selLumbar}
                                                onChange={(e) => setSelLumbar(e.target.value)}
                                                className={`w-full p-2 rounded-lg border text-sm focus:ring-2 focus:ring-mustard-500 focus:outline-none ${isDarkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-200 text-gray-900'}`}
                                            >
                                                {lumbarOptions.map(o => <option key={o.name} value={o.name}>{o.label} ({o.price > 0 ? `+$${o.price}` : o.price < 0 ? `-$${Math.abs(o.price)}` : 'Included'})</option>)}
                                            </select>
                                        </div>

                                        {/* Headrest */}
                                        <div>
                                            <label className={`block text-xs font-bold uppercase tracking-wider mb-2 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Headrest</label>
                                            <select
                                                value={selHeadrest}
                                                onChange={(e) => setSelHeadrest(e.target.value)}
                                                className={`w-full p-2 rounded-lg border text-sm focus:ring-2 focus:ring-mustard-500 focus:outline-none ${isDarkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-200 text-gray-900'}`}
                                            >
                                                {headrestOptions.map(o => <option key={o.name} value={o.name}>{o.label} ({o.price > 0 ? `+$${o.price}` : o.price < 0 ? `-$${Math.abs(o.price)}` : 'Included'})</option>)}
                                            </select>
                                        </div>
                                      </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={`bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse ${isDarkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
                        <button
                            type="button"
                            className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-mustard-500 text-base font-medium text-black hover:bg-mustard-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-mustard-500 sm:ml-3 sm:w-auto sm:text-sm"
                            onClick={confirmAdd}
                        >
                            {t('products.add_to_cart')}
                        </button>
                        <button
                            type="button"
                            className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                            onClick={closeConfirm}
                        >
                            {t('products.cancel')}
                        </button>
                    </div>
                </div>
            </div>
        </div>
      )}
    </div>
  );
};

export default Products;
