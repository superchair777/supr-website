import React, { useMemo, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { 
  Star, 
  Heart, 
  ShoppingCart, 
  ArrowLeft, 
  Plus, 
  Minus, 
  Truck, 
  Shield, 
  RotateCcw,
  Check,
  ChevronLeft,
  ChevronRight,
  Zap,
  Award,
  Users,
  Settings,
  ChevronDown,
  ChevronUp,
  Info,
  Layers,
  Box,
  Palette,
  X
} from 'lucide-react';
import { useCart } from '../context/CartContext';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { FadeIn } from '../components/ui/FadeIn';
import { cn } from '../lib/utils';

interface ProductDetailProps {
  isDarkMode?: boolean;
}

const ProductDetail: React.FC<ProductDetailProps> = ({ isDarkMode = false }) => {
  const { id } = useParams<{ id: string }>();
  const { t } = useTranslation();
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  
  // Configuration State
  const [selectedBackrestColor, setSelectedBackrestColor] = useState('lime-black');
  const [selectedSeatColor, setSelectedSeatColor] = useState('leather-black');
  const [selectedPuColor, setSelectedPuColor] = useState('black-pu');
  const [selectedMaterial, setSelectedMaterial] = useState('leather');
  const [assembledOption, setAssembledOption] = useState<'assembled' | 'not_assembled'>('assembled');
  
  // Advanced Config State
  const [armrestType, setArmrestType] = useState('3d');
  const [baseMaterial, setBaseMaterial] = useState('aluminum');
  const [wheelType, setWheelType] = useState('rubber');
  const [lumbarSupport, setLumbarSupport] = useState('adjustable');
  const [headrest, setHeadrest] = useState('included');
  
  // UI State
  const [selectedPackage, setSelectedPackage] = useState<'basic' | 'medium' | 'premium' | 'custom'>('basic');
  const [backrestTier, setBackrestTier] = useState<'basic' | 'premium'>('basic');
  const [configTab, setConfigTab] = useState<'specs' | 'colors' | 'features' | 'assembly'>('specs');
  const [isCustomizeOpen, setIsCustomizeOpen] = useState(false);

  const { addItem } = useCart();
  const lineUrl = import.meta.env.VITE_LINE_URL ?? 'https://shop.line.me/@superchair';

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
  
  const seatColorSet = selectedMaterial === 'leather' ? seatLeatherColors : selectedMaterial === 'mesh' ? seatFabricMeshColors : seatSyntheticColors;
  const seatAllColors = [...seatLeatherColors, ...seatSyntheticColors, ...seatFabricMeshColors];
  const getSeatColorLabel = (name: string) => seatAllColors.find(c => c.name === name)?.label || name;

  type MoodPreset = { id: string; label: string; backrest: string; material: 'leather' | 'fabric' | 'mesh'; seat: string };
  const moodPresets: MoodPreset[] = [
    { id: 'calm-blue', label: t('product.mood_calm'), backrest: 'navy-blue', material: 'leather', seat: 'leather-grey' },
    { id: 'energetic-red', label: t('product.mood_energetic'), backrest: 'ruby-red', material: 'fabric', seat: 'syn-red' },
    { id: 'nature-green', label: t('product.mood_nature'), backrest: 'tree-green', material: 'mesh', seat: 'mesh-tree-green' },
    { id: 'pro-black', label: t('product.mood_pro'), backrest: 'ultra-black', material: 'leather', seat: 'leather-black' },
    { id: 'modern-grey', label: t('product.mood_modern'), backrest: 'smoke-grey', material: 'fabric', seat: 'syn-dark-grey' }
  ];

  const applyMoodPreset = (preset: MoodPreset) => {
    setSelectedBackrestColor(preset.backrest);
    setBackrestTier(premiumBackrestNames.includes(preset.backrest) ? 'premium' : 'basic');
    setSelectedMaterial(preset.material);
    setSelectedSeatColor(preset.seat);
  };

  // Mock product data
  const product = {
    id: parseInt(id || '1'),
    name: 'Executive Office Chair',
    category: 'Executive',
    price: 899.99,
    originalPrice: 1199.99,
    rating: 4.8,
    reviews: 124,
    inStock: true,
    description: 'Premium leather executive chair with lumbar support, adjustable height, and ergonomic design - perfect for long work sessions.',
    longDescription: t('product.long_description'),
    images: [
      'https://images.pexels.com/photos/1957477/pexels-photo-1957477.jpeg?auto=compress&cs=tinysrgb&w=600',
      'https://images.pexels.com/photos/1957477/pexels-photo-1957477.jpeg?auto=compress&cs=tinysrgb&w=600',
      'https://images.pexels.com/photos/1957477/pexels-photo-1957477.jpeg?auto=compress&cs=tinysrgb&w=600',
      'https://images.pexels.com/photos/1957477/pexels-photo-1957477.jpeg?auto=compress&cs=tinysrgb&w=600'
    ],
    features: [
      'feature_premium_leather',
      'feature_adjustable_lumbar',
      'feature_height_adjustable',
      'feature_swivel_base',
      'feature_tilt_lock',
      'feature_padded_armrests',
      'feature_heavy_casters',
      'feature_warranty_5y'
    ],
    specifications: {
      dimensions: '26" W x 28" D x 42-46" H',
      weight: '45 lbs',
      weightCapacity: '300 lbs',
      materials: 'Genuine leather, steel frame, high-density foam',
      assembly: 'Required (30-45 minutes)',
      warranty: '5 years comprehensive'
    },
    backrestColors: [
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
    ],
    seatColors: [
      { name: 'black-solid', label: 'Black', hex: '#1a1a1a' },
      { name: 'light-grey-solid', label: 'Light Grey', hex: '#a0aec0' },
      { name: 'dark-grey-solid', label: 'Dark Grey', hex: '#4a5568' },
      { name: 'green-solid', label: 'Green', hex: '#38a169' },
      { name: 'red-solid', label: 'Red', hex: '#e53e3e' },
      { name: 'blue-solid', label: 'Blue', hex: '#3182ce' }
    ],
    puColors: [
      { name: 'black-pu', label: 'Black', hex: '#2d3748' },
      { name: 'grey-pu', label: 'Grey', hex: '#a0aec0' },
      { name: 'white-pu', label: 'White', hex: '#f7fafc' },
      { name: 'beige-pu', label: 'Beige', hex: '#d6bcaa' },
      { name: 'brown-pu', label: 'Brown', hex: '#8b4513' },
      { name: 'dark-brown-pu', label: 'Dark Brown', hex: '#553c2c' }
    ],
    materials: [
      { name: 'leather', label: 'Genuine Leather', price: 0 },
      { name: 'fabric', label: 'Premium Fabric', price: -100 },
      { name: 'mesh', label: 'Breathable Mesh', price: -50 }
    ],
    configOptions: {
      armrests: [
        { name: '2d', label: '2D Armrests', price: -30 },
        { name: '3d', label: '3D Armrests', price: 0 },
        { name: '4d', label: '4D Armrests', price: 40 }
      ],
      base: [
        { name: 'nylon', label: 'Nylon Base', price: -50 },
        { name: 'steel', label: 'Steel Base', price: 0 },
        { name: 'aluminum', label: 'Aluminum Base', price: 80 }
      ],
      wheels: [
        { name: 'standard', label: 'Standard Wheels', price: 0 },
        { name: 'rubber', label: 'Rubber Quiet Wheels', price: 25 }
      ],
      lumbar: [
        { name: 'fixed', label: 'Fixed Lumbar', price: -20 },
        { name: 'adjustable', label: 'Adjustable Lumbar', price: 35 }
      ],
      headrest: [
        { name: 'none', label: 'No Headrest', price: -40 },
        { name: 'included', label: 'Headrest Included', price: 0 }
      ]
    }
  };

  const specLabelKey = (k: string) => {
    switch (k) {
      case 'dimensions': return 'spec_dimensions';
      case 'weight': return 'spec_weight';
      case 'weightCapacity': return 'spec_weight_capacity';
      case 'materials': return 'spec_materials';
      case 'assembly': return 'spec_assembly';
      case 'warranty': return 'spec_warranty';
      default: return k;
    }
  };

  const optionPriceDelta = useMemo(() => {
    const mat = product.materials.find(m => m.name === selectedMaterial)?.price || 0;
    const arm = product.configOptions.armrests.find(a => a.name === armrestType)?.price || 0;
    const base = product.configOptions.base.find(b => b.name === baseMaterial)?.price || 0;
    const wheel = product.configOptions.wheels.find(w => w.name === wheelType)?.price || 0;
    const lum = product.configOptions.lumbar.find(l => l.name === lumbarSupport)?.price || 0;
    const hdr = product.configOptions.headrest.find(h => h.name === headrest)?.price || 0;
    return mat + arm + base + wheel + lum + hdr;
  }, [selectedMaterial, armrestType, baseMaterial, wheelType, lumbarSupport, headrest]);

  const currentPrice = product.price + optionPriceDelta;
  const savings = product.originalPrice ? product.originalPrice - currentPrice : 0;

  const handleQuantityChange = (change: number) => {
    const newQuantity = quantity + change;
    if (newQuantity >= 1 && newQuantity <= 10) {
      setQuantity(newQuantity);
    }
  };

  const handleAddToCart = () => {
    if (!product.inStock) return;
    addItem({
      id: product.id,
      name: product.name,
      price: currentPrice,
      originalPrice: product.originalPrice ?? null,
      image: product.images[0],
      category: product.category,
      inStock: product.inStock,
      options: {
        backrestColor: product.backrestColors.find(c => c.name === selectedBackrestColor)?.label || selectedBackrestColor,
        seatColor: getSeatColorLabel(selectedSeatColor),
        puColor: product.puColors.find(c => c.name === selectedPuColor)?.label || selectedPuColor,
        material: product.materials.find(m => m.name === selectedMaterial)?.label || selectedMaterial,
        armrests: product.configOptions.armrests.find(a => a.name === armrestType)?.label || armrestType,
        base: product.configOptions.base.find(b => b.name === baseMaterial)?.label || baseMaterial,
        wheels: product.configOptions.wheels.find(w => w.name === wheelType)?.label || wheelType,
        lumbar: product.configOptions.lumbar.find(l => l.name === lumbarSupport)?.label || lumbarSupport,
        headrest: product.configOptions.headrest.find(h => h.name === headrest)?.label || headrest,
        qty: String(quantity)
      }
    }, quantity)
  }

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

  const nextImage = () => {
    setSelectedImage((prev) => (prev + 1) % product.images.length);
  };

  const prevImage = () => {
    setSelectedImage((prev) => (prev - 1 + product.images.length) % product.images.length);
  };

  const applyPackage = (pkg: 'basic' | 'medium' | 'premium') => {
    setSelectedPackage(pkg);
    if (pkg === 'basic') {
      setSelectedMaterial('mesh');
      setArmrestType('2d');
      setBaseMaterial('nylon');
      setWheelType('standard');
      setLumbarSupport('fixed');
      setHeadrest('none');
    } else if (pkg === 'medium') {
      setSelectedMaterial('fabric');
      setArmrestType('3d');
      setBaseMaterial('steel');
      setWheelType('rubber');
      setLumbarSupport('adjustable');
      setHeadrest('included');
    } else {
      setSelectedMaterial('leather');
      setArmrestType('4d');
      setBaseMaterial('aluminum');
      setWheelType('rubber');
      setLumbarSupport('adjustable');
      setHeadrest('included');
    }
  };

  const handleCustomChange = () => {
    setSelectedPackage('custom');
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

  return (
    <div className="min-h-screen transition-colors duration-300 bg-white dark:bg-gray-900">
      {/* Breadcrumb */}
      <div className="py-4 border-b transition-colors duration-300 border-gray-200 dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 text-sm">
            <Link to="/" className="hover:underline transition-colors text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300">
              Home
            </Link>
            <span className="text-gray-400 dark:text-gray-600">/</span>
            <Link to="/products" className="hover:underline transition-colors text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300">
              {t('product.products')}
            </Link>
            <span className="text-gray-400 dark:text-gray-600">/</span>
            <span className="transition-colors text-gray-900 dark:text-white">
              {product.name}
            </span>
          </div>
        </div>
      </div>

      {/* Back Button */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <FadeIn direction="right">
          <Link
            to="/products"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-colors bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
          >
            <ArrowLeft className="h-4 w-4" />
            {t('product.back_to_products')}
          </Link>
        </FadeIn>
      </div>

      {/* Product Main Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          
          {/* Left Column: Images (Sticky) */}
          <div className="lg:sticky lg:top-8 lg:h-[calc(100vh-4rem)] lg:overflow-y-auto hide-scrollbar">
            <FadeIn>
              <div className="relative mb-6">
                <Card className="overflow-hidden aspect-square border-0 p-0 shadow-2xl">
                  <img
                    src={product.images[selectedImage]}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                  
                  {/* Navigation Arrows */}
                  <button
                    onClick={prevImage}
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 p-2 rounded-full transition-colors bg-white/70 hover:bg-white/90 text-gray-900 dark:bg-black/50 dark:hover:bg-black/70 dark:text-white backdrop-blur-sm"
                  >
                    <ChevronLeft className="h-5 w-5" />
                  </button>
                  <button
                    onClick={nextImage}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 p-2 rounded-full transition-colors bg-white/70 hover:bg-white/90 text-gray-900 dark:bg-black/50 dark:hover:bg-black/70 dark:text-white backdrop-blur-sm"
                  >
                    <ChevronRight className="h-5 w-5" />
                  </button>

                  {/* Sale Badge */}
                  {product.originalPrice && (
                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1 bg-red-500 text-white text-sm font-bold rounded-full shadow-lg">
                  {t('product.sale')}
                </span>
                    </div>
                  )}

                  {/* Wishlist Button */}
                  <button className="absolute top-4 right-4 p-2 rounded-full bg-white/90 hover:bg-white transition-all shadow-lg">
                    <Heart className="h-5 w-5 text-gray-600 hover:text-mustard-500" />
                  </button>
                </Card>

                {/* Thumbnails */}
                <div className="flex gap-3 mt-4 overflow-x-auto pb-2 px-1">
                  {product.images.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImage(index)}
                      className={cn(
                        "w-20 h-20 rounded-xl overflow-hidden border-2 shrink-0 transition-all",
                        selectedImage === index
                          ? "border-black ring-1 ring-black dark:border-white dark:ring-white scale-105"
                          : "border-gray-200 hover:border-gray-300 dark:border-gray-700 dark:hover:border-gray-600"
                      )}
                    >
                      <img
                        src={image}
                        alt={`${product.name} view ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              </div>
            </FadeIn>
          </div>

          {/* Right Column: Details & Config */}
          <FadeIn delay={200} className="space-y-8">
            {/* Header */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-300">
                  {product.category}
                </span>
                <div className="flex items-center gap-1">
                  <Star className="h-4 w-4 text-yellow-400 fill-current" />
                  <span className="text-sm font-medium text-gray-900 dark:text-white">{product.rating}</span>
                  <span className="text-sm text-gray-500 dark:text-gray-400">({product.reviews} reviews)</span>
                </div>
              </div>

              <h1 className="text-4xl lg:text-5xl font-bold mb-4 text-gray-900 dark:text-white font-display tracking-tight">
                {product.name}
              </h1>

              <div className="flex items-end gap-4 mb-6">
                <div className="text-4xl font-bold text-gray-900 dark:text-white">
                  ${currentPrice.toFixed(2)}
                </div>
                {product.originalPrice && (
                  <div className="text-xl line-through mb-1 text-gray-400 dark:text-gray-500">
                    ${product.originalPrice}
                  </div>
                )}
                {savings > 0 && (
                  <div className="px-3 py-1 bg-mustard-500 text-black text-sm font-medium rounded-full mb-1">
                    Save ${savings.toFixed(2)}
                  </div>
                )}
              </div>

              <p className="text-lg leading-relaxed text-gray-600 dark:text-gray-300">
                {product.description}
              </p>
            </div>

            <hr className="border-t border-gray-200 dark:border-gray-800" />

            {/* Configurator */}
            <div className="space-y-8">
              
              {/* Package Selection */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                    {t('product.configuration')}
                  </h3>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-4">
                  {(['basic', 'medium', 'premium'] as const).map((pkg) => (
                    <button
                      key={pkg}
                      onClick={() => applyPackage(pkg)}
                      className={cn(
                        "relative p-4 rounded-2xl border-2 text-left transition-all duration-300",
                        selectedPackage === pkg
                          ? "border-black bg-gray-50 dark:border-white dark:bg-gray-800"
                          : "border-gray-200 hover:border-gray-300 dark:border-gray-700 dark:hover:border-gray-600"
                      )}
                    >
                      <div className="text-sm font-bold mb-1 capitalize text-gray-900 dark:text-white">
                        {pkg}
                      </div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">
                        {pkg === 'basic' ? 'Essential features' : pkg === 'medium' ? 'Balanced comfort' : 'Ultimate luxury'}
                      </div>
                      {selectedPackage === pkg && (
                        <div className="absolute top-2 right-2 p-1 rounded-full bg-black text-white dark:bg-white dark:text-black">
                          <Check className="h-3 w-3" />
                        </div>
                      )}
                    </button>
                  ))}
                </div>

                {/* Package Details Info */}
                {selectedPackage !== 'custom' && (
                  <Card variant="glass" className="p-4 text-sm bg-gray-50 dark:bg-gray-800/50">
                     <ul className="space-y-2">
                        {packageInfo[selectedPackage].map((text, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <Check className="h-4 w-4 text-mustard-500 mt-0.5 shrink-0" />
                            <span className="text-gray-600 dark:text-gray-300">{text}</span>
                          </li>
                        ))}
                     </ul>
                  </Card>
                )}
              </div>

              {/* Configuration Tabs */}
              <div>
                <div className="flex border-b border-gray-200 dark:border-gray-800 mb-6 overflow-x-auto hide-scrollbar">
                  {(['specs', 'colors', 'assembly'] as const).map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setConfigTab(tab)}
                      className={cn(
                        "px-6 py-3 text-sm font-bold border-b-2 transition-colors whitespace-nowrap",
                        configTab === tab
                          ? "border-black text-black dark:border-white dark:text-white"
                          : "border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
                      )}
                    >
                      {tab === 'specs' ? t('product.specifications') : tab === 'colors' ? t('product.colors_style') : t('product.assembly_option')}
                    </button>
                  ))}
                </div>

                <div className="min-h-[300px]">
                  {configTab === 'specs' && (
                    <div className="space-y-6 animate-fadeIn">
                      {/* Material */}
                      <div>
                        <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">Upholstery Material</label>
                        <div className="flex flex-wrap gap-2">
                          {product.materials.map((m) => (
                            <button
                              key={m.name}
                              onClick={() => { setSelectedMaterial(m.name); handleCustomChange(); }}
                              className={cn(
                                "px-4 py-2 rounded-xl text-sm font-medium border transition-all",
                                selectedMaterial === m.name
                                  ? "bg-black text-white border-black dark:bg-white dark:text-black dark:border-white"
                                  : "border-gray-300 text-gray-700 hover:border-gray-400 dark:border-gray-600 dark:text-gray-300 dark:hover:border-gray-500"
                              )}
                            >
                              {m.label} {m.price !== 0 && `(${m.price > 0 ? '+' : ''}$${m.price})`}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Armrests */}
                      <div>
                        <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">Armrests</label>
                        <div className="flex flex-wrap gap-2">
                          {product.configOptions.armrests.map((opt) => (
                            <button
                              key={opt.name}
                              onClick={() => { setArmrestType(opt.name); handleCustomChange(); }}
                              className={cn(
                                "px-3 py-2 rounded-lg text-sm border transition-all",
                                armrestType === opt.name
                                  ? "border-mustard-500 bg-mustard-50 text-black dark:border-mustard-500 dark:bg-mustard-500/20 dark:text-white"
                                  : "border-gray-300 text-gray-600 dark:border-gray-600 dark:text-gray-400"
                              )}
                            >
                              {opt.label} {opt.price !== 0 && `(${opt.price > 0 ? '+' : ''}$${opt.price})`}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Base */}
                      <div>
                        <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">Base Material</label>
                        <div className="flex flex-wrap gap-2">
                          {product.configOptions.base.map((opt) => (
                            <button
                              key={opt.name}
                              onClick={() => { setBaseMaterial(opt.name); handleCustomChange(); }}
                              className={cn(
                                "px-3 py-2 rounded-lg text-sm border transition-all",
                                baseMaterial === opt.name
                                  ? "border-mustard-500 bg-mustard-50 text-black dark:border-mustard-500 dark:bg-mustard-500/20 dark:text-white"
                                  : "border-gray-300 text-gray-600 dark:border-gray-600 dark:text-gray-400"
                              )}
                            >
                              {opt.label} {opt.price !== 0 && `(${opt.price > 0 ? '+' : ''}$${opt.price})`}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                  {configTab === 'colors' && (
                    <div className="space-y-6 animate-fadeIn">
                        {/* Mood Presets */}
                        <div className="mb-6 overflow-x-auto pb-2">
                           <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">{t('product.recommended_moods')}</label>
                           <div className="flex gap-3">
                            {moodPresets.map(preset => (
                              <button 
                                key={preset.id} 
                                onClick={() => applyMoodPreset(preset)} 
                                className={cn(
                                  "flex-shrink-0 p-3 rounded-xl border text-sm font-medium transition-all",
                                  "border-gray-200 bg-white hover:bg-gray-50 text-gray-700 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700 dark:text-gray-200"
                                )}
                              >
                                <div className="flex items-center gap-2 mb-2 justify-center">
                                  <span className="w-4 h-4 rounded-full shadow-sm" style={{ backgroundColor: product.backrestColors.find(c => c.name === preset.backrest)?.hex || '#ccc' }} />
                                  <span className="w-4 h-4 rounded-full shadow-sm" style={{ backgroundColor: seatAllColors.find(c => c.name === preset.seat)?.hex || '#ccc' }} />
                                </div>
                                <div className="text-xs">{preset.label}</div>
                              </button>
                            ))}
                           </div>
                        </div>

                        {/* Backrest Color */}
                        <div className="mb-6">
                          <div className="flex items-center justify-between mb-3">
                            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                              Backrest: <span className="text-black dark:text-white">{product.backrestColors.find(c => c.name === selectedBackrestColor)?.label}</span>
                            </label>
                            <div className="flex bg-gray-100 dark:bg-gray-800 rounded-lg p-1">
                              <button onClick={() => setBackrestTier('basic')} className={cn("px-3 py-1 text-xs rounded-md transition-all", backrestTier === 'basic' ? "bg-white dark:bg-gray-600 shadow-sm text-black dark:text-white" : "text-gray-500 dark:text-gray-400")}>Basic</button>
                              <button onClick={() => setBackrestTier('premium')} className={cn("px-3 py-1 text-xs rounded-md transition-all", backrestTier === 'premium' ? "bg-white dark:bg-gray-600 shadow-sm text-black dark:text-white" : "text-gray-500 dark:text-gray-400")}>Premium</button>
                            </div>
                          </div>
                          <div className="grid grid-cols-5 sm:grid-cols-8 gap-3">
                            {product.backrestColors
                              .filter(color => backrestTier === 'basic'
                                ? basicBackrestNames.includes(color.name)
                                : premiumBackrestNames.includes(color.name)
                              )
                              .map((color) => (
                              <button
                                key={color.name}
                                onClick={() => setSelectedBackrestColor(color.name)}
                                className={cn(
                                  "group relative w-10 h-10 rounded-full border-2 transition-all",
                                  selectedBackrestColor === color.name
                                    ? "border-black dark:border-white scale-110 ring-2 ring-offset-2 ring-mustard-500"
                                    : "border-gray-200 dark:border-gray-600"
                                )}
                                title={color.label}
                              >
                                <span 
                                  className="absolute inset-0.5 rounded-full"
                                  style={{ 
                                    backgroundColor: color.hex,
                                    backgroundImage: color.pattern === 'mesh' 
                                      ? 'repeating-linear-gradient(45deg, transparent, transparent 1px, rgba(255,255,255,0.1) 1px, rgba(255,255,255,0.1) 2px)'
                                      : color.pattern === 'dots'
                                      ? 'radial-gradient(circle at 2px 2px, rgba(255,255,255,0.15) 1px, transparent 0)'
                                      : 'none'
                                  }}
                                />
                              </button>
                            ))}
                          </div>
                        </div>

                        {/* Seat Color */}
                        <div>
                          <div className="flex items-center justify-between mb-3">
                            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                              Seat: <span className="text-black dark:text-white">{getSeatColorLabel(selectedSeatColor)}</span>
                            </label>
                          </div>
                          <div className="grid grid-cols-5 sm:grid-cols-8 gap-3">
                            {seatColorSet.map((color) => (
                              <button
                                key={color.name}
                                onClick={() => setSelectedSeatColor(color.name)}
                                className={cn(
                                  "group relative w-10 h-10 rounded-full border-2 transition-all",
                                  selectedSeatColor === color.name
                                     ? "border-black dark:border-white scale-110 ring-2 ring-offset-2 ring-mustard-500"
                                    : "border-gray-200 dark:border-gray-600"
                                )}
                                title={color.label}
                              >
                                 <span className="absolute inset-0.5 rounded-full" style={{ backgroundColor: color.hex }} />
                              </button>
                            ))}
                          </div>
                        </div>
                    </div>
                  )}

                  {configTab === 'assembly' && (
                    <div className="animate-fadeIn">
                      <div className="p-4 rounded-2xl border border-gray-200 bg-gray-50 dark:border-gray-700 dark:bg-gray-800">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <Box className="h-5 w-5 text-gray-900 dark:text-white" />
                            <span className="font-medium text-gray-900 dark:text-white">{t('product.assembly_option')}</span>
                          </div>
                        </div>
                        <div className="flex gap-2">
                           <button 
                             onClick={() => setAssembledOption('assembled')}
                             className={cn(
                               "flex-1 py-2 px-3 rounded-xl text-sm border transition-all",
                               assembledOption === 'assembled' 
                                ? "bg-black text-white dark:bg-white dark:text-black" 
                                : "border-gray-300 text-gray-600 dark:border-gray-600 dark:text-gray-400"
                             )}
                           >
                             {t('product.assembled')}
                           </button>
                           <button 
                             onClick={() => setAssembledOption('not_assembled')}
                             className={cn(
                               "flex-1 py-2 px-3 rounded-xl text-sm border transition-all",
                               assembledOption === 'not_assembled' 
                                ? "bg-black text-white dark:bg-white dark:text-black" 
                                : "border-gray-300 text-gray-600 dark:border-gray-600 dark:text-gray-400"
                             )}
                           >
                             {t('product.not_assembled')}
                           </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-6 border-t border-gray-200 dark:border-gray-800">
                <div className="flex items-center gap-4 mb-4">
                  <div className="flex items-center border rounded-full border-gray-300 bg-gray-50 dark:border-gray-600 dark:bg-gray-800">
                    <button onClick={() => handleQuantityChange(-1)} disabled={quantity <= 1} className="p-3 text-gray-500 hover:text-gray-700 disabled:opacity-50"><Minus className="h-4 w-4" /></button>
                    <span className="px-4 font-medium text-gray-900 dark:text-white">{quantity}</span>
                    <button onClick={() => handleQuantityChange(1)} disabled={quantity >= 10} className="p-3 text-gray-500 hover:text-gray-700 disabled:opacity-50"><Plus className="h-4 w-4" /></button>
                  </div>
                  <div className={cn("text-sm", product.inStock ? "text-mustard-600" : "text-gray-500")}>
                    {product.inStock ? 'In Stock & Ready to Ship' : 'Currently Out of Stock'}
                  </div>
                </div>

                <div className="flex gap-4">
                  <Button
                    onClick={(e) => { triggerAddAnimation(e.currentTarget as HTMLElement, product.images[0]); handleAddToCart(); }}
                    disabled={!product.inStock}
                    className="flex-1 h-14 text-lg"
                    variant="primary"
                  >
                    <ShoppingCart className="h-5 w-5 mr-2" />
                    {t('products.add_to_cart')}
                  </Button>
                </div>
                
              <div className="text-center mt-2">
                <a href={lineUrl} target="_blank" rel="noopener noreferrer" className="block mt-3 text-center text-sm text-[#00b900] hover:underline dark:text-[#00b900]">
                   {t('product.book_on_line')}
                </a>
              </div>
              </div>

              {/* Trust Badges */}
              <div className="grid grid-cols-3 gap-4 pt-4">
                <div className="text-center">
                  <Truck className="h-6 w-6 mx-auto mb-2 text-gray-600 dark:text-gray-400" />
                  <div className="text-xs text-gray-600 dark:text-gray-400">{t('product.free_shipping')}</div>
                </div>
                <div className="text-center">
                  <Shield className="h-6 w-6 mx-auto mb-2 text-gray-600 dark:text-gray-400" />
                  <div className="text-xs text-gray-600 dark:text-gray-400">{t('product.warranty_years')}</div>
                </div>
                <div className="text-center">
                  <RotateCcw className="h-6 w-6 mx-auto mb-2 text-gray-600 dark:text-gray-400" />
                  <div className="text-xs text-gray-600 dark:text-gray-400">{t('product.returns_30_day')}</div>
                </div>
              </div>

            </div>
          </FadeIn>
        </div>

        {/* Product Details Tabs (Features, Specs, Reviews) */}
        <div className="mt-24">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Features */}
            <FadeIn delay={100} className="h-full">
              <Card className="h-full p-8 bg-gray-50 dark:bg-gray-800 border-0">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-3 rounded-xl bg-white shadow-sm dark:bg-gray-700">
                    <Zap className="h-6 w-6 text-yellow-500 dark:text-yellow-400" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                    {t('product.key_features')}
                  </h3>
                </div>
                <ul className="space-y-4">
                  {product.features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <Check className="h-5 w-5 text-mustard-500 flex-shrink-0 mt-0.5" />
                      <span className="text-base text-gray-700 dark:text-gray-300">
                        {t(`product.${feature}`)}
                      </span>
                    </li>
                  ))}
                </ul>
              </Card>
            </FadeIn>

            {/* Specifications */}
            <FadeIn delay={200} className="h-full">
              <Card className="h-full p-8 bg-gray-50 dark:bg-gray-800 border-0">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-3 rounded-xl bg-white shadow-sm dark:bg-gray-700">
                    <Award className="h-6 w-6 text-blue-500 dark:text-blue-400" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                    {t('product.specifications')}
                  </h3>
                </div>
                <dl className="space-y-4">
                  {Object.entries(product.specifications).map(([key, value]) => (
                    <div key={key} className="flex justify-between border-b border-gray-200 dark:border-gray-700 pb-2 last:border-0">
                      <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">
                        {t(`product.${specLabelKey(key)}`)}
                      </dt>
                      <dd className="text-sm font-semibold text-right text-gray-900 dark:text-gray-200">
                        {value}
                      </dd>
                    </div>
                  ))}
                </dl>
              </Card>
            </FadeIn>

            {/* Reviews */}
            <FadeIn delay={300} className="h-full">
              <Card className="h-full p-8 bg-gray-50 dark:bg-gray-800 border-0">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-3 rounded-xl bg-white shadow-sm dark:bg-gray-700">
                    <Users className="h-6 w-6 text-purple-500 dark:text-purple-400" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                    {t('product.customer_reviews')}
                  </h3>
                </div>
                
                <div className="flex items-center gap-4 mb-6">
                  <div className="text-5xl font-bold text-gray-900 dark:text-white">
                    {product.rating}
                  </div>
                  <div>
                    <div className="flex text-yellow-400 mb-1">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className={cn("h-4 w-4", i < Math.floor(product.rating) ? "fill-current" : "text-gray-300")} />
                      ))}
                    </div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      {t('product.based_on_reviews', { count: product.reviews })}
                    </div>
                  </div>
                </div>
                
                <div className="space-y-2">
                  {[5, 4, 3, 2, 1].map((stars) => (
                    <div key={stars} className="flex items-center gap-2">
                      <span className="text-xs w-6 font-medium text-gray-600 dark:text-gray-400">{stars}★</span>
                      <div className="flex-1 h-2 rounded-full bg-gray-200 dark:bg-gray-700">
                        <div
                          className="h-full bg-yellow-400 rounded-full"
                          style={{ width: `${stars === 5 ? 70 : stars === 4 ? 20 : stars === 3 ? 5 : stars === 2 ? 3 : 2}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </FadeIn>
          </div>
        </div>

        {/* Related Products */}
        <div className="mt-20">
          <FadeIn>
            <h2 className="text-3xl font-bold mb-8 text-gray-900 dark:text-white">
              {t('product.you_might_also_like')}
            </h2>
          </FadeIn>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((item) => (
              <FadeIn key={item} delay={item * 100}>
                <Link
                  to={`/product/${item + 10}`}
                  className="group block"
                >
                  <Card className="overflow-hidden transition-all duration-300 bg-gray-50 hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-700 border-0 h-full">
                    <div className="aspect-square p-4">
                      <img
                        src="https://images.pexels.com/photos/1957477/pexels-photo-1957477.jpeg?auto=compress&cs=tinysrgb&w=300"
                        alt={`Related Product ${item}`}
                        className="w-full h-full object-cover rounded-2xl group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    <div className="p-4 pt-0">
                      <h3 className="font-medium mb-1 text-gray-900 dark:text-white">
                        {t('product.related_chair', { id: item })}
                      </h3>
                      <p className="text-sm font-semibold text-gray-600 dark:text-gray-400">
                        ${(599 + item * 100).toFixed(2)}
                      </p>
                    </div>
                  </Card>
                </Link>
              </FadeIn>
            ))}
          </div>
        </div>
      </div>

      {/* Mobile Sticky Bar & Customization Drawer */}
      <div className="lg:hidden">
        {/* Backdrop */}
        {isCustomizeOpen && (
           <div 
             className="fixed inset-0 bg-black/50 z-[60] backdrop-blur-sm transition-opacity"
             onClick={() => setIsCustomizeOpen(false)}
           />
        )}

        {/* Customization Drawer */}
        <div className={cn(
          "fixed bottom-0 left-0 right-0 z-[70] bg-white dark:bg-gray-900 rounded-t-3xl shadow-[0_-10px_40px_rgba(0,0,0,0.2)] transition-transform duration-300 transform flex flex-col max-h-[60vh]",
          isCustomizeOpen ? "translate-y-0" : "translate-y-[110%]"
        )}>
           <div className="flex items-center justify-between p-4 border-b border-gray-100 dark:border-gray-800">
             <h3 className="font-bold text-lg dark:text-white">Customize Your Chair</h3>
             <button onClick={() => setIsCustomizeOpen(false)} className="p-2 bg-gray-100 dark:bg-gray-800 rounded-full text-gray-500 dark:text-gray-400">
               <X className="h-5 w-5" />
             </button>
           </div>
           
           <div className="overflow-y-auto p-6 space-y-6">
              {/* Mood Presets */}
              <div>
                <label className="block text-sm font-medium mb-3 text-gray-700 dark:text-gray-300">
                  {t('product.recommended_moods')}
                </label>
                <div className="flex gap-3 overflow-x-auto pb-2 -mx-6 px-6 hide-scrollbar">
                  {moodPresets.map(preset => (
                    <button 
                      key={preset.id} 
                      onClick={() => applyMoodPreset(preset)} 
                      className={cn(
                        "flex-shrink-0 p-3 rounded-xl border text-sm font-medium transition-all w-28",
                        "border-gray-200 bg-white hover:bg-gray-50 text-gray-700 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700 dark:text-gray-200"
                      )}
                    >
                      <div className="flex items-center gap-2 mb-2 justify-center">
                        <span className="w-4 h-4 rounded-full shadow-sm" style={{ backgroundColor: product.backrestColors.find(c => c.name === preset.backrest)?.hex || '#ccc' }} />
                        <span className="w-4 h-4 rounded-full shadow-sm" style={{ backgroundColor: seatAllColors.find(c => c.name === preset.seat)?.hex || '#ccc' }} />
                      </div>
                      <div className="text-xs text-center truncate">{preset.label}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Backrest Color */}
              <div>
                <label className="block text-sm font-medium mb-3 text-gray-700 dark:text-gray-300">
                   Backrest Color: <span className="text-black dark:text-white font-bold">{product.backrestColors.find(c => c.name === selectedBackrestColor)?.label}</span>
                </label>
                <div className="grid grid-cols-5 gap-3">
                  {product.backrestColors.map((color) => (
                    <button
                      key={color.name}
                      onClick={() => setSelectedBackrestColor(color.name)}
                      className={cn(
                        "group relative w-12 h-12 rounded-full border-2 transition-all shrink-0",
                        selectedBackrestColor === color.name
                          ? "border-black dark:border-white scale-110 ring-2 ring-offset-2 ring-mustard-500"
                          : "border-gray-200 dark:border-gray-600"
                      )}
                    >
                      <span 
                        className="absolute inset-0.5 rounded-full"
                        style={{ 
                          backgroundColor: color.hex,
                          backgroundImage: color.pattern === 'mesh' 
                            ? 'repeating-linear-gradient(45deg, transparent, transparent 1px, rgba(255,255,255,0.1) 1px, rgba(255,255,255,0.1) 2px)'
                            : color.pattern === 'dots'
                            ? 'radial-gradient(circle at 2px 2px, rgba(255,255,255,0.15) 1px, transparent 0)'
                            : 'none'
                        }}
                      />
                    </button>
                  ))}
                </div>
              </div>

              {/* Seat Color */}
              <div>
                <label className="block text-sm font-medium mb-3 text-gray-700 dark:text-gray-300">
                   Seat Color: <span className="text-black dark:text-white font-bold">{getSeatColorLabel(selectedSeatColor)}</span>
                </label>
                <div className="grid grid-cols-5 gap-3">
                  {seatColorSet.map((color) => (
                    <button
                      key={color.name}
                      onClick={() => setSelectedSeatColor(color.name)}
                      className={cn(
                        "group relative w-12 h-12 rounded-full border-2 transition-all shrink-0",
                        selectedSeatColor === color.name
                           ? "border-black dark:border-white scale-110 ring-2 ring-offset-2 ring-mustard-500"
                          : "border-gray-200 dark:border-gray-600"
                      )}
                    >
                       <span className="absolute inset-0.5 rounded-full" style={{ backgroundColor: color.hex }} />
                    </button>
                  ))}
                </div>
              </div>
           </div>
           
           <div className="p-4 border-t border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-900/50">
             <Button onClick={() => setIsCustomizeOpen(false)} className="w-full py-3" variant="primary">
               Done
             </Button>
           </div>
        </div>

        {/* Sticky Bottom Bar */}
        <div className="fixed bottom-0 left-0 right-0 z-50 p-4 bg-gradient-to-t from-white/90 to-transparent dark:from-black/90 pointer-events-none pb-6">
          <div className="flex items-center gap-3 pointer-events-auto">
            <button
              onClick={() => setIsCustomizeOpen(true)}
              className="flex flex-col items-center justify-center w-16 h-14 rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-lg text-gray-900 dark:text-white active:scale-95 transition-transform"
            >
               <Palette className="h-5 w-5 mb-1 text-mustard-500" />
               <span className="text-[10px] font-bold uppercase tracking-wide">Color</span>
            </button>
            
            <div className="flex-1 flex items-center gap-3 rounded-xl shadow-xl px-4 py-2 bg-white/90 backdrop-blur-md text-gray-900 border border-gray-200 dark:bg-gray-900/90 dark:text-white dark:border-gray-700 h-14">
              <div className="flex-1 flex flex-col justify-center">
                <div className="text-[10px] font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider line-clamp-1">{product.name}</div>
                <div className="text-lg font-bold leading-none">${currentPrice.toFixed(0)}</div>
              </div>
              <Button
                onClick={handleAddToCart}
                disabled={!product.inStock}
                variant="primary"
                className="px-4 py-2 h-auto text-sm font-bold shadow-none"
              >
                {t('products.add_to_cart')}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
