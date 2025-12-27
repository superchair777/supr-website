import React from 'react';
import { ArrowRight, ArrowLeft, Truck, CreditCard, RotateCcw, ThumbsUp, Facebook, ExternalLink, ArrowDown } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation, Trans } from 'react-i18next';
import { fetchPromotions, PromotionSlide } from '../services/promotions';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { FadeIn } from '../components/ui/FadeIn';
import ShowroomModal from '../components/ShowroomModal';

interface HomeProps {
  isDarkMode: boolean;
}

const Home: React.FC<HomeProps> = ({ isDarkMode }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const brandLogos = [
    'https://ik.imagekit.io/k89qbj4z2/Customers%20(%20SUPR)%20/%E0%B8%A5%E0%B8%B9%E0%B8%81%E0%B8%84%E0%B9%89%E0%B8%B2%E0%B8%88%E0%B8%A3%E0%B8%B4%E0%B8%87-20251114T082753Z-1-001/%E0%B8%A5%E0%B8%B9%E0%B8%81%E0%B8%84%E0%B9%89%E0%B8%B2%E0%B8%88%E0%B8%A3%E0%B8%B4%E0%B8%87/9.png?updatedAt=1763108968774',
    'https://ik.imagekit.io/k89qbj4z2/Customers%20(%20SUPR)%20/%E0%B8%A5%E0%B8%B9%E0%B8%81%E0%B8%84%E0%B9%89%E0%B8%B2%E0%B8%88%E0%B8%A3%E0%B8%B4%E0%B8%87-20251114T082753Z-1-001/%E0%B8%A5%E0%B8%B9%E0%B8%81%E0%B8%84%E0%B9%89%E0%B8%B2%E0%B8%88%E0%B8%A3%E0%B8%B4%E0%B8%87/3.png?updatedAt=1763108968747',
    'https://ik.imagekit.io/k89qbj4z2/Customers%20(%20SUPR)%20/%E0%B8%A5%E0%B8%B9%E0%B8%81%E0%B8%84%E0%B9%89%E0%B8%B2%E0%B8%88%E0%B8%A3%E0%B8%B4%E0%B8%87-20251114T082753Z-1-001/%E0%B8%A5%E0%B8%B9%E0%B8%81%E0%B8%84%E0%B9%89%E0%B8%B2%E0%B8%88%E0%B8%A3%E0%B8%B4%E0%B8%87/4.png?updatedAt=1763108968731',
    'https://ik.imagekit.io/k89qbj4z2/Customers%20(%20SUPR)%20/%E0%B8%A5%E0%B8%B9%E0%B8%81%E0%B8%84%E0%B9%89%E0%B8%B2%E0%B8%88%E0%B8%A3%E0%B8%B4%E0%B8%87-20251114T082753Z-1-001/%E0%B8%A5%E0%B8%B9%E0%B8%81%E0%B8%84%E0%B9%89%E0%B8%B2%E0%B8%88%E0%B8%A3%E0%B8%B4%E0%B8%87/11.png?updatedAt=1763108968734',
    'https://ik.imagekit.io/k89qbj4z2/Customers%20(%20SUPR)%20/%E0%B8%A5%E0%B8%B9%E0%B8%81%E0%B8%84%E0%B9%89%E0%B8%B2%E0%B8%88%E0%B8%A3%E0%B8%B4%E0%B8%87-20251114T082753Z-1-001/%E0%B8%A5%E0%B8%B9%E0%B8%81%E0%B8%84%E0%B9%89%E0%B8%B2%E0%B8%88%E0%B8%A3%E0%B8%B4%E0%B8%87/15.png?updatedAt=1763108968782',
    'https://ik.imagekit.io/k89qbj4z2/Customers%20(%20SUPR)%20/%E0%B8%A5%E0%B8%B9%E0%B8%81%E0%B8%84%E0%B9%89%E0%B8%B2%E0%B8%88%E0%B8%A3%E0%B8%B4%E0%B8%87-20251114T082753Z-1-001/%E0%B8%A5%E0%B8%B9%E0%B8%81%E0%B8%84%E0%B9%89%E0%B8%B2%E0%B8%88%E0%B8%A3%E0%B8%B4%E0%B8%87/12.png?updatedAt=1763108968721',
    'https://ik.imagekit.io/k89qbj4z2/Customers%20(%20SUPR)%20/%E0%B8%A5%E0%B8%B9%E0%B8%81%E0%B8%84%E0%B9%89%E0%B8%B2%E0%B8%88%E0%B8%A3%E0%B8%B4%E0%B8%87-20251114T082753Z-1-001/%E0%B8%A5%E0%B8%B9%E0%B8%81%E0%B8%84%E0%B9%89%E0%B8%B2%E0%B8%88%E0%B8%A3%E0%B8%B4%E0%B8%87/20.png?updatedAt=1763108968771',
    'https://ik.imagekit.io/k89qbj4z2/Customers%20(%20SUPR)%20/%E0%B8%A5%E0%B8%B9%E0%B8%81%E0%B8%84%E0%B9%89%E0%B8%B2%E0%B8%88%E0%B8%A3%E0%B8%B4%E0%B8%87-20251114T082753Z-1-001/%E0%B8%A5%E0%B8%B9%E0%B8%81%E0%B8%84%E0%B9%89%E0%B8%B2%E0%B8%88%E0%B8%A3%E0%B8%B4%E0%B8%87/19.png?updatedAt=1763108968725',
    'https://ik.imagekit.io/k89qbj4z2/Customers%20(%20SUPR)%20/%E0%B8%A5%E0%B8%B9%E0%B8%81%E0%B8%84%E0%B9%89%E0%B8%B2%E0%B8%88%E0%B8%A3%E0%B8%B4%E0%B8%87-20251114T082753Z-1-001/%E0%B8%A5%E0%B8%B9%E0%B8%81%E0%B8%84%E0%B9%89%E0%B8%B2%E0%B8%88%E0%B8%A3%E0%B8%B4%E0%B8%87/18.png?updatedAt=1763108968716',
    'https://ik.imagekit.io/k89qbj4z2/Customers%20(%20SUPR)%20/%E0%B8%A5%E0%B8%B9%E0%B8%81%E0%B8%84%E0%B9%89%E0%B8%B2%E0%B8%88%E0%B8%A3%E0%B8%B4%E0%B8%87-20251114T082753Z-1-001/%E0%B8%A5%E0%B8%B9%E0%B8%81%E0%B8%84%E0%B9%89%E0%B8%B2%E0%B8%88%E0%B8%A3%E0%B8%B4%E0%B8%87/6.png?updatedAt=1763108968706',
    'https://ik.imagekit.io/k89qbj4z2/Customers%20(%20SUPR)%20/%E0%B8%A5%E0%B8%B9%E0%B8%81%E0%B8%84%E0%B9%89%E0%B8%B2%E0%B8%88%E0%B8%A3%E0%B8%B4%E0%B8%87-20251114T082753Z-1-001/%E0%B8%A5%E0%B8%B9%E0%B8%81%E0%B8%84%E0%B9%89%E0%B8%B2%E0%B8%88%E0%B8%A3%E0%B8%B4%E0%B8%87/17.png?updatedAt=1763108968713',
    'https://ik.imagekit.io/k89qbj4z2/Customers%20(%20SUPR)%20/%E0%B8%A5%E0%B8%B9%E0%B8%81%E0%B8%84%E0%B9%89%E0%B8%B2%E0%B8%88%E0%B8%A3%E0%B8%B4%E0%B8%87-20251114T082753Z-1-001/%E0%B8%A5%E0%B8%B9%E0%B8%81%E0%B8%84%E0%B9%89%E0%B8%B2%E0%B8%88%E0%B8%A3%E0%B8%B4%E0%B8%87/1.png?updatedAt=1763108968705',
    'https://ik.imagekit.io/k89qbj4z2/Customers%20(%20SUPR)%20/%E0%B8%A5%E0%B8%B9%E0%B8%81%E0%B8%84%E0%B9%89%E0%B8%B2%E0%B8%88%E0%B8%A3%E0%B8%B4%E0%B8%87-20251114T082753Z-1-001/%E0%B8%A5%E0%B8%B9%E0%B8%81%E0%B8%84%E0%B9%89%E0%B8%B2%E0%B8%88%E0%B8%A3%E0%B8%B4%E0%B8%87/10.png?updatedAt=1763108968697',
    'https://ik.imagekit.io/k89qbj4z2/Customers%20(%20SUPR)%20/%E0%B8%A5%E0%B8%B9%E0%B8%81%E0%B8%84%E0%B9%89%E0%B8%B2%E0%B8%88%E0%B8%A3%E0%B8%B4%E0%B8%87-20251114T082753Z-1-001/%E0%B8%A5%E0%B8%B9%E0%B8%81%E0%B8%84%E0%B9%89%E0%B8%B2%E0%B8%88%E0%B8%A3%E0%B8%B4%E0%B8%87/16.png?updatedAt=1763108968696',
    'https://ik.imagekit.io/k89qbj4z2/Customers%20(%20SUPR)%20/%E0%B8%A5%E0%B8%B9%E0%B8%81%E0%B8%84%E0%B9%89%E0%B8%B2%E0%B8%88%E0%B8%A3%E0%B8%B4%E0%B8%87-20251114T082753Z-1-001/%E0%B8%A5%E0%B8%B9%E0%B8%81%E0%B8%84%E0%B9%89%E0%B8%B2%E0%B8%88%E0%B8%A3%E0%B8%B4%E0%B8%87/13.png?updatedAt=1763108968686',
    'https://ik.imagekit.io/k89qbj4z2/Customers%20(%20SUPR)%20/%E0%B8%A5%E0%B8%B9%E0%B8%81%E0%B8%84%E0%B9%89%E0%B8%B2%E0%B8%88%E0%B8%A3%E0%B8%B4%E0%B8%87-20251114T082753Z-1-001/%E0%B8%A5%E0%B8%B9%E0%B8%81%E0%B8%84%E0%B9%89%E0%B8%B2%E0%B8%88%E0%B8%A3%E0%B8%B4%E0%B8%87/2.png?updatedAt=1763108968668',
    'https://ik.imagekit.io/k89qbj4z2/Customers%20(%20SUPR)%20/%E0%B8%A5%E0%B8%B9%E0%B8%81%E0%B8%84%E0%B9%89%E0%B8%B2%E0%B8%88%E0%B8%A3%E0%B8%B4%E0%B8%87-20251114T082753Z-1-001/%E0%B8%A5%E0%B8%B9%E0%B8%81%E0%B8%84%E0%B9%89%E0%B8%B2%E0%B8%88%E0%B8%A3%E0%B8%B4%E0%B8%87/8.png?updatedAt=1763108968674',
    'https://ik.imagekit.io/k89qbj4z2/Customers%20(%20SUPR)%20/%E0%B8%A5%E0%B8%B9%E0%B8%81%E0%B8%84%E0%B9%89%E0%B8%B2%E0%B8%88%E0%B8%A3%E0%B8%B4%E0%B8%87-20251114T082753Z-1-001/%E0%B8%A5%E0%B8%B9%E0%B8%81%E0%B8%84%E0%B9%89%E0%B8%B2%E0%B8%88%E0%B8%A3%E0%B8%B4%E0%B8%87/14.png?updatedAt=1763108968623',
    'https://ik.imagekit.io/k89qbj4z2/Customers%20(%20SUPR)%20/%E0%B8%A5%E0%B8%B9%E0%B8%81%E0%B8%84%E0%B9%89%E0%B8%B2%E0%B8%88%E0%B8%A3%E0%B8%B4%E0%B8%87-20251114T082753Z-1-001/%E0%B8%A5%E0%B8%B9%E0%B8%81%E0%B8%84%E0%B9%89%E0%B8%B2%E0%B8%88%E0%B8%A3%E0%B8%B4%E0%B8%87/7.png?updatedAt=1763108968479'
  ];
  const lineUrl = import.meta.env.VITE_LINE_URL ?? 'https://shop.line.me/@superchair';
  const fbReviewsUrl = import.meta.env.VITE_FACEBOOK_REVIEWS_URL ?? 'https://www.facebook.com';
  const googleReviewsUrl = import.meta.env.VITE_GOOGLE_REVIEWS_URL ?? 'https://maps.google.com';
  const googleLabel = t('home.google_reviews');
  const gIdx = googleLabel.toLowerCase().indexOf('google');
  const googlePrefix = gIdx >= 0 ? googleLabel.slice(0, gIdx) : '';
  const googleSuffix = gIdx >= 0 ? googleLabel.slice(gIdx + 'google'.length) : '';
  const [showLeadModal, setShowLeadModal] = React.useState(false);
  const [showPromoVideo, setShowPromoVideo] = React.useState(false);
  const [leadStep, setLeadStep] = React.useState(1);
  const [leadForm, setLeadForm] = React.useState({ width: '', length: '', chairs: '', tables: '', company: '', name: '', email: '', phone: '' });
  
  React.useEffect(() => {
    if (leadStep === 3) {
      setTimeout(generatePreview, 100);
    }
  }, [leadStep]);
  const [showConsultModal, setShowConsultModal] = React.useState(false);
  const [showShowroomModal, setShowShowroomModal] = React.useState(false);
  const [consultForm, setConsultForm] = React.useState({ phone: '', email: '', company: '', details: '' });
  const [consultImages, setConsultImages] = React.useState<File[]>([]);
  const canvasRef = React.useRef<HTMLCanvasElement | null>(null);
  const [generatedUrl, setGeneratedUrl] = React.useState<string>('');
  const handleLeadChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setLeadForm(prev => ({ ...prev, [name]: value }));
  };
  const handleConsultChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setConsultForm(prev => ({ ...prev, [name]: value }));
  };
  const handleConsultFiles = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (!files.length) return;
    const allowed = files.filter(f => f.type.startsWith('image/'));
    const merged = [...consultImages, ...allowed].slice(0, 5);
    setConsultImages(merged);
    e.target.value = '';
  };
  const handleLeadSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowLeadModal(false);
    window.open(lineUrl, '_blank');
  };
  const handleConsultSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowConsultModal(false);
    window.open(lineUrl, '_blank');
  };
  const generatePreview = () => {
    const c = canvasRef.current;
    if (!c) return;
    const ctx = c.getContext('2d');
    if (!ctx) return;
    const W = c.width;
    const H = c.height;
    ctx.clearRect(0, 0, W, H);
    ctx.fillStyle = '#f3f4f6';
    ctx.fillRect(0, 0, W, H);
    ctx.strokeStyle = '#111827';
    ctx.lineWidth = 4;
    ctx.strokeRect(20, 20, W - 40, H - 40);
    const tables = Math.max(0, parseInt(leadForm.tables || '0') || 0);
    const chairs = Math.max(0, parseInt(leadForm.chairs || '0') || 0);
    const rowsT = Math.max(1, Math.ceil(Math.sqrt(tables || 1)));
    const colsT = Math.max(1, Math.ceil((tables || 1) / rowsT));
    const gridX0 = 60;
    const gridY0 = 60;
    const gridW = W - 120;
    const gridH = H - 120;
    for (let i = 0; i < tables; i++) {
      const r = Math.floor(i / colsT);
      const cidx = i % colsT;
      const x = gridX0 + (cidx + 0.5) * (gridW / colsT) - 30;
      const y = gridY0 + (r + 0.5) * (gridH / rowsT) - 20;
      ctx.fillStyle = '#374151';
      ctx.fillRect(x, y, 60, 40);
    }
    const rowsC = Math.max(1, Math.ceil(Math.sqrt(chairs || 1)));
    const colsC = Math.max(1, Math.ceil((chairs || 1) / rowsC));
    for (let i = 0; i < chairs; i++) {
      const r = Math.floor(i / colsC);
      const cidx = i % colsC;
      const x = gridX0 + (cidx + 0.5) * (gridW / colsC);
      const y = gridY0 + (r + 0.5) * (gridH / rowsC);
      ctx.beginPath();
      ctx.arc(x, y, 8, 0, Math.PI * 2);
      ctx.fillStyle = '#FFB900';
      ctx.fill();
    }
    ctx.fillStyle = '#111827';
    ctx.font = '14px sans-serif';
    const sizeLabel = `${leadForm.width || ''}×${leadForm.length || ''} m`;
    ctx.fillText(sizeLabel.trim() ? sizeLabel : 'Room', 28, 40);
    setGeneratedUrl(c.toDataURL('image/png'));
  };

  const handleShopChairsClick = () => {
    navigate('/products');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleAboutClick = () => {
    navigate('/about');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const heroTitleRaw = t('home.hero_title');
  const heroParts = heroTitleRaw.split(/<br\s*\/?>/i);
  const [typedText, setTypedText] = React.useState('');
  React.useEffect(() => {
    const target = (heroParts[1] ?? '').trim();
    let i = 0;
    setTypedText('');
    if (!target) return;
    const timer = setInterval(() => {
      i++;
      setTypedText(target.slice(0, i));
      if (i >= target.length) clearInterval(timer);
    }, 40);
    return () => clearInterval(timer);
  }, [heroTitleRaw]);
  const [promoSlides, setPromoSlides] = React.useState<PromotionSlide[]>([]);

  React.useEffect(() => {
    fetchPromotions().then(setPromoSlides);
  }, []);
  const [promoIndex, setPromoIndex] = React.useState(0);
  const promoRef = React.useRef<HTMLDivElement | null>(null);
  const [dragStartX, setDragStartX] = React.useState<number | null>(null);
  const [dragDelta, setDragDelta] = React.useState(0);
  const [dragging, setDragging] = React.useState(false);
  React.useEffect(() => {
    if (promoSlides.length === 0 || dragging) return;
    const id = setInterval(() => {
      setPromoIndex(i => (i + 1) % promoSlides.length);
    }, 4000);
    return () => clearInterval(id);
  }, [promoSlides, dragging]);
  const onTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    setDragStartX(e.touches[0].clientX);
    setDragging(true);
    setDragDelta(0);
  };
  const onTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (dragStartX == null) return;
    const dx = e.touches[0].clientX - dragStartX;
    setDragDelta(dx);
  };
  const onTouchEnd = () => {
    if (dragStartX == null) {
      setDragging(false);
      return;
    }
    const threshold = 50;
    if (dragDelta > threshold) {
      setPromoIndex(i => (i - 1 + promoSlides.length) % promoSlides.length);
    } else if (dragDelta < -threshold) {
      setPromoIndex(i => (i + 1) % promoSlides.length);
    }
    setDragging(false);
    setDragStartX(null);
    setDragDelta(0);
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 ${isDarkMode ? 'bg-gray-900' : 'bg-white'}`}>
      {/* Infinity Scrolling Brand Bar */}
      <section className={`py-12 transition-colors duration-300 ${isDarkMode ? 'bg-gray-900 bg-grid-gray-800' : 'bg-white bg-grid-gray-100'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className={`text-center text-sm font-medium tracking-wide uppercase mb-10 transition-colors duration-300 ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>
            Trusted by leading companies worldwide
          </p>
          <div className="relative overflow-hidden group">
            <div className="flex animate-scroll whitespace-nowrap">
              <div className="flex items-center justify-center shrink-0 space-x-16 px-8">
                {brandLogos.map((src, i) => (
                  <img 
                    key={`logo-a-${i}`} 
                    src={src} 
                    alt="Client logo" 
                    className="h-[50px] sm:h-[70px] w-auto object-contain transition-all duration-300 drop-shadow-md" 
                    loading="lazy" 
                  />
                ))}
              </div>
              <div className="flex items-center justify-center shrink-0 space-x-16 px-8">
                {brandLogos.map((src, i) => (
                  <img 
                    key={`logo-b-${i}`} 
                    src={src} 
                    alt="Client logo" 
                    className="h-[50px] sm:h-[70px] w-auto object-contain transition-all duration-300 drop-shadow-md" 
                    loading="lazy" 
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Hero Section */}
      <section className={`py-12 lg:py-24 transition-colors duration-300 overflow-hidden relative ${isDarkMode ? 'bg-gray-900' : 'bg-white'}`}>
        <div className="absolute inset-0 pointer-events-none" style={{
            backgroundImage: `linear-gradient(${isDarkMode ? '#374151' : '#e5e7eb'} 1px, transparent 1px), linear-gradient(90deg, ${isDarkMode ? '#374151' : '#e5e7eb'} 1px, transparent 1px)`,
            backgroundSize: '40px 40px',
            opacity: 0.5
        }}></div>

        {/* Floating Visit Showroom Button - REMOVED (Moved to below video) */}
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            
            {/* Left Column: Text & Actions */}
            <div className="order-2 lg:order-1 relative z-10">
              <FadeIn direction="up" delay={100} className="space-y-10">
                <div className="space-y-6">
                  <div className={`inline-flex items-center px-4 py-1.5 rounded-full text-xs font-bold tracking-wider border shadow-sm ${isDarkMode ? 'bg-gray-800 border-gray-700 text-gray-300' : 'bg-white border-gray-200 text-slate-600'}`}>
                    <span className={`h-2 w-2 rounded-full mr-2 ${isDarkMode ? 'bg-green-500' : 'bg-green-400'}`}></span>
                    FACTORY DIRECT • THAILAND
                  </div>
                  
                  <h1 className={`text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight tracking-tight transition-colors duration-300 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                    <span>{heroParts[0] ?? ''}</span>
                    <br />
                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-mustard-400 to-mustard-600">
                      {typedText}<span className="type-caret text-mustard-500" />
                    </span>
                  </h1>
                  
                  <p className={`text-lg leading-relaxed max-w-xl transition-colors duration-300 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                    {t('home.hero_subtitle')}
                  </p>
                </div>

                <div className="flex flex-wrap gap-4 pt-4">
                  <Button 
                    onClick={handleShopChairsClick} 
                    variant="outline"
                    size="lg"
                    className="rounded-full"
                  >
                    Our Products <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                  <Button 
                    onClick={() => setShowLeadModal(true)} 
                    variant="primary"
                    size="lg"
                    className="rounded-full"
                  >
                    <CreditCard className="w-4 h-4 mr-2" /> {t('home.ai_builder_button')}
                  </Button>
                </div>

                <div className="pt-8 border-t border-gray-200 dark:border-gray-800 flex flex-col sm:flex-row items-start sm:items-center gap-6">
                  <p className={`text-sm font-medium ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Rated 4.9/5 by 1000+ companies</p>
                  <div className="flex items-center gap-3">
                    <a
                      href={fbReviewsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors bg-[#1877F2] text-white hover:bg-[#166fe5]`}
                    >
                      <Facebook className="h-4 w-4 text-white" /> Facebook
                    </a>
                    <a
                      href={googleReviewsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${isDarkMode ? 'bg-gray-800 text-white hover:bg-gray-700' : 'bg-gray-100 text-gray-900 hover:bg-gray-200'}`}
                    >
                      <span className="text-google font-bold">G</span> Google
                    </a>
                  </div>
                </div>
                {/* Floating Visit Showroom Button - Positioned below video */}
                <div className="flex justify-center mt-6 animate-float">
                  <button
                    onClick={() => setShowShowroomModal(true)}
                    className={`flex items-center gap-2 px-6 py-3 rounded-full shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl border ${isDarkMode ? 'bg-gray-800 text-white border-gray-700 hover:border-mustard-500' : 'bg-white text-slate-600 border-gray-100 hover:border-mustard-500 hover:bg-mustard-50'}`}
                  >
                    <span className="text-sm font-bold tracking-widest uppercase">Visit Showroom</span>
                    <ArrowDown className="w-4 h-4 text-mustard-500" />
                  </button>
                </div>
              </FadeIn>
            </div>

            {/* Right Column: Video & Visuals */}
            <div className="order-1 lg:order-2 relative">
              <FadeIn direction="left" delay={300}>
                <div className="relative rounded-3xl overflow-hidden shadow-2xl transition-transform duration-500">
                  <div className={`absolute inset-0 bg-gradient-to-tr from-mustard-500/20 to-black/20 mix-blend-overlay z-10 pointer-events-none`}></div>
                  <video 
                    src="https://ik.imagekit.io/k89qbj4z2/%E0%B9%80%E0%B8%9B%E0%B8%B4%E0%B8%94%E0%B8%95%E0%B8%B1%E0%B8%A7%E0%B9%82%E0%B8%A3%E0%B8%87%E0%B8%87%E0%B8%B2%E0%B8%99%E0%B9%83%E0%B8%AB%E0%B8%A1%E0%B9%88.mov" 
                    className="w-full h-auto object-cover aspect-video" 
                    controls 
                    playsInline
                    poster="https://ik.imagekit.io/k89qbj4z2/%E0%B9%80%E0%B8%9B%E0%B8%B4%E0%B8%94%E0%B8%95%E0%B8%B1%E0%B8%A7%E0%B9%82%E0%B8%A3%E0%B8%87%E0%B8%87%E0%B8%B2%E0%B8%99%E0%B9%83%E0%B8%AB%E0%B8%A1%E0%B9%88.mov/ik-thumbnail.jpg?tr=so-1"
                  />
                </div>
              </FadeIn>



              {/* Decorative Blur */}
              <div className="absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-gradient-to-r from-blue-500/30 to-purple-500/30 blur-3xl rounded-full opacity-50"></div>
            </div>

          </div>
        </div>
      </section>

      {/* Featured Testimonials */}
      <section className={`py-24 transition-colors duration-300 ${isDarkMode ? 'bg-gray-800' : 'bg-gray-50'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn direction="up" className="text-center mb-16">
            <h2 className={`text-3xl font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Loved by Professionals</h2>
            <p className={`max-w-2xl mx-auto ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>See what our customers have to say about their ergonomic journey with SuperChair.</p>
          </FadeIn>
          <FadeIn direction="up" delay={200} className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: "Sarah M.",
                role: "Product Designer",
                text: "This chair completely transformed my work experience. No more back pain after long design sessions.",
                stars: 5
              },
              {
                name: "Mike Chen",
                role: "Software Engineer",
                text: "Best investment for my home office. The build quality matches high-end brands at half the price.",
                stars: 5
              },
              {
                name: "James H.",
                role: "CEO",
                text: "Premium quality that fits perfectly in our executive meeting rooms. Highly recommended.",
                stars: 5
              }
            ].map((review, i) => (
              <Card key={i} variant="solid" className="p-8 hover:-translate-y-1 hover:shadow-xl transition-all duration-300 dark:bg-gray-900">
                <div className="flex text-yellow-400 mb-4">
                  {[...Array(review.stars)].map((_, k) => (
                    <svg key={k} className="w-5 h-5 fill-current" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>
                  ))}
                </div>
                <p className="mb-6 leading-relaxed italic text-gray-600 dark:text-gray-300">"{review.text}"</p>
                <div className="flex items-center gap-4">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm ${isDarkMode ? 'bg-gray-700 text-white' : 'bg-gray-100 text-gray-900'}`}>
                    {review.name.charAt(0)}
                  </div>
                  <div>
                    <div className="font-bold text-sm text-gray-900 dark:text-white">{review.name}</div>
                    <div className="text-xs text-gray-500">{review.role}</div>
                  </div>
                </div>
              </Card>
            ))}
          </FadeIn>
        </div>
      </section>

      {showLeadModal && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-2 sm:p-4">
          <div className={`${isDarkMode ? 'glass-card-dark bg-gray-900/85' : 'glass-card bg-white/95'} w-full max-w-[95vw] sm:max-w-xl md:max-w-2xl lg:max-w-4xl max-h-[90vh] overflow-y-auto rounded-3xl shadow-xl`}>
            <div className={`flex items-center justify-between p-6 border-b ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}>
              <h2 className="text-white text-2xl font-bold flex items-center gap-2">{t('home.ai_builder_title')} <span className="text-sm font-normal opacity-70">({leadStep}/3)</span></h2>
              <button onClick={() => setShowLeadModal(false)} className={`${isDarkMode ? 'hover:bg-gray-700 text-white' : 'hover:bg-gray-100 text-white'} p-2 rounded-full`}>×</button>
            </div>
            <form onSubmit={handleLeadSubmit} className="p-6 space-y-4">
              {leadStep === 1 && (
                <>
                  <p className="text-white text-sm">{t('home.ai_builder_desc')}</p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-white block text-sm font-medium mb-2">{t('home.q_office_width')}</label>
                      <input type="number" min="0" name="width" value={leadForm.width} onChange={handleLeadChange} placeholder="10" required className={`w-full px-4 py-3 border rounded-2xl focus:outline-none focus:ring-1 ${isDarkMode ? 'bg-gray-700 border-gray-600 text-white focus:ring-gray-500' : 'bg-white border-gray-300 text-black focus:ring-gray-400'}`} />
                    </div>
                    <div>
                      <label className="text-white block text-sm font-medium mb-2">{t('home.q_office_length')}</label>
                      <input type="number" min="0" name="length" value={leadForm.length} onChange={handleLeadChange} placeholder="8" required className={`w-full px-4 py-3 border rounded-2xl focus:outline-none focus:ring-1 ${isDarkMode ? 'bg-gray-700 border-gray-600 text-white focus:ring-gray-500' : 'bg-white border-gray-300 text-black focus:ring-gray-400'}`} />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-white block text-sm font-medium mb-2">{t('home.q_chairs')}</label>
                      <input type="number" min="0" name="chairs" value={leadForm.chairs} onChange={handleLeadChange} placeholder="12" className={`w-full px-4 py-3 border rounded-2xl focus:outline-none focus:ring-1 ${isDarkMode ? 'bg-gray-700 border-gray-600 text-white focus:ring-gray-500' : 'bg-white border-gray-300 text-black focus:ring-gray-400'}`} />
                    </div>
                    <div>
                      <label className="text-white block text-sm font-medium mb-2">{t('home.q_tables')}</label>
                      <input type="number" min="0" name="tables" value={leadForm.tables} onChange={handleLeadChange} placeholder="6" className={`w-full px-4 py-3 border rounded-2xl focus:outline-none focus:ring-1 ${isDarkMode ? 'bg-gray-700 border-gray-600 text-white focus:ring-gray-500' : 'bg-white border-gray-300 text-black focus:ring-gray-400'}`} />
                    </div>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-4 pt-2">
                    <button type="button" onClick={() => setShowLeadModal(false)} className={`flex-1 px-6 py-3 rounded-2xl text-sm font-medium border ${isDarkMode ? 'border-gray-600 text-white hover:border-gray-500 hover:bg-gray-700' : 'border-gray-300 text-white hover:border-gray-400 hover:bg-gray-50'}`}>{t('home.cancel')}</button>
                    <button type="button" onClick={() => setLeadStep(2)} className={`flex-1 px-6 py-3 rounded-2xl text-sm font-medium ${isDarkMode ? 'bg-blue-600 text-white hover:bg-blue-700' : 'bg-blue-600 text-white hover:bg-blue-700'}`}>Next</button>
                  </div>
                </>
              )}

              {leadStep === 2 && (
                <>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-white block text-sm font-medium mb-2">{t('home.q_company_name')}</label>
                      <input name="company" value={leadForm.company} onChange={handleLeadChange} className={`w-full px-4 py-3 border rounded-2xl focus:outline-none focus:ring-1 ${isDarkMode ? 'bg-gray-700 border-gray-600 text-white focus:ring-gray-500' : 'bg-white border-gray-300 text-black focus:ring-gray-400'}`} />
                    </div>
                    <div>
                      <label className="text-white block text-sm font-medium mb-2">{t('home.q_name')}</label>
                      <input name="name" value={leadForm.name} onChange={handleLeadChange} className={`w-full px-4 py-3 border rounded-2xl focus:outline-none focus:ring-1 ${isDarkMode ? 'bg-gray-700 border-gray-600 text-white focus:ring-gray-500' : 'bg-white border-gray-300 text-black focus:ring-gray-400'}`} />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-white block text-sm font-medium mb-2">{t('home.q_email')}</label>
                      <input name="email" type="email" value={leadForm.email} onChange={handleLeadChange} className={`w-full px-4 py-3 border rounded-2xl focus:outline-none focus:ring-1 ${isDarkMode ? 'bg-gray-700 border-gray-600 text-white focus:ring-gray-500' : 'bg-white border-gray-300 text-black focus:ring-gray-400'}`} />
                    </div>
                    <div>
                      <label className="text-white block text-sm font-medium mb-2">{t('home.q_contact_number')}</label>
                      <input name="phone" value={leadForm.phone} onChange={handleLeadChange} required className={`w-full px-4 py-3 border rounded-2xl focus:outline-none focus:ring-1 ${isDarkMode ? 'bg-gray-700 border-gray-600 text-white focus:ring-gray-500' : 'bg-white border-gray-300 text-black focus:ring-gray-400'}`} />
                    </div>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-4 pt-2">
                    <button type="button" onClick={() => setLeadStep(1)} className={`flex-1 px-6 py-3 rounded-2xl text-sm font-medium border ${isDarkMode ? 'border-gray-600 text-white hover:border-gray-500 hover:bg-gray-700' : 'border-gray-300 text-white hover:border-gray-400 hover:bg-gray-50'}`}>Back</button>
                    <button type="button" onClick={() => setLeadStep(3)} className={`flex-1 px-6 py-3 rounded-2xl text-sm font-medium ${isDarkMode ? 'bg-blue-600 text-white hover:bg-blue-700' : 'bg-blue-600 text-white hover:bg-blue-700'}`}>Next</button>
                  </div>
                </>
              )}

              {leadStep === 3 && (
                <div className="space-y-3">
                  <div className="text-sm text-white">{t('home.ai_builder_preview')}</div>
                  <canvas ref={canvasRef} width={800} height={500} className={`w-full rounded-xl ${isDarkMode ? 'bg-gray-900' : 'bg-gray-100'}`}></canvas>
                  <div className="flex flex-col sm:flex-row gap-3">
                    <button type="button" onClick={generatePreview} className={`flex-1 px-4 py-3 rounded-2xl text-sm font-medium ${isDarkMode ? 'bg-white text-black hover:bg-gray-200' : 'bg-black text-white hover:bg-gray-800'}`}>{t('home.generate_preview')}</button>
                    {generatedUrl && (
                      <a href={generatedUrl} download="office-layout.png" className={`flex-1 px-4 py-3 rounded-2xl text-sm font-medium ${isDarkMode ? 'border border-gray-600 text-gray-300 hover:border-gray-500 hover:bg-gray-700' : 'border border-gray-300 text-gray-700 hover:border-gray-400 hover:bg-gray-50'}`}>{t('home.download_image')}</a>
                    )}
                  </div>
                  <div className="flex flex-col sm:flex-row gap-4 pt-2">
                    <button type="button" onClick={() => setLeadStep(2)} className={`flex-1 px-6 py-3 rounded-2xl text-sm font-medium border ${isDarkMode ? 'border-gray-600 text-white hover:border-gray-500 hover:bg-gray-700' : 'border-gray-300 text-white hover:border-gray-400 hover:bg-gray-50'}`}>Back</button>
                    <button type="submit" className={`flex-1 px-6 py-3 rounded-2xl text-sm font-medium ${isDarkMode ? 'bg-[#00b900] text-white hover:bg-[#009900]' : 'bg-[#00b900] text-white hover:bg-[#009900]'}`}>{t('home.continue_line')}</button>
                  </div>
                </div>
              )}
            </form>
          </div>
        </div>
      )}

      {showConsultModal && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-2 sm:p-4">
          <div className={`${isDarkMode ? 'glass-card-dark bg-gray-900/85' : 'glass-card bg-white/95'} w-full max-w-[95vw] sm:max-w-xl md:max-w-2xl lg:max-w-4xl max-h-[90vh] overflow-y-auto rounded-3xl shadow-xl`}>
            <div className={`flex items-center justify-between p-6 border-b ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}>
              <h2 className="text-white text-2xl font-bold">Consultation</h2>
              <button onClick={() => setShowConsultModal(false)} className={`${isDarkMode ? 'hover:bg-gray-700 text-white' : 'hover:bg-gray-100 text-white'} p-2 rounded-full`}>×</button>
            </div>
            <form onSubmit={handleConsultSubmit} className="p-6 space-y-4">
              <p className="text-white text-sm">Share your contact and what products you are interested in.</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-white block text-base font-medium mb-2">Phone</label>
                  <input name="phone" value={consultForm.phone} onChange={handleConsultChange} placeholder="+66 091 815 3818" className={`w-full px-4 py-3 border rounded-2xl focus:outline-none focus:ring-2 placeholder:text-gray-400 ${isDarkMode ? 'bg-gray-800 border-gray-600 text-white focus:ring-gray-500' : 'bg-white border-gray-300 text-gray-900 focus:ring-gray-400'}`} />
                </div>
                <div>
                  <label className="text-white block text-base font-medium mb-2">Email</label>
                  <input name="email" type="email" value={consultForm.email} onChange={handleConsultChange} placeholder="you@email.com" className={`w-full px-4 py-3 border rounded-2xl focus:outline-none focus:ring-2 placeholder:text-gray-400 ${isDarkMode ? 'bg-gray-800 border-gray-600 text-white focus:ring-gray-500' : 'bg-white border-gray-300 text-gray-900 focus:ring-gray-400'}`} />
                </div>
              </div>
              <div className="grid grid-cols-1 gap-4">
                <div>
                  <label className="text-white block text-base font-medium mb-2">Company Name</label>
                  <input name="company" value={consultForm.company} onChange={handleConsultChange} placeholder="Your company" className={`w-full px-4 py-3 border rounded-2xl focus:outline-none focus:ring-2 placeholder:text-gray-400 ${isDarkMode ? 'bg-gray-800 border-gray-600 text-white focus:ring-gray-500' : 'bg-white border-gray-300 text-gray-900 focus:ring-gray-400'}`} />
                </div>
                <div>
                  <label className="text-white block text-base font-medium mb-2">Product Details</label>
                  <textarea name="details" value={consultForm.details} onChange={handleConsultChange} placeholder="Describe the products you are looking for" rows={4} className={`w-full px-4 py-3 border rounded-2xl focus:outline-none focus:ring-2 placeholder:text-gray-400 ${isDarkMode ? 'bg-gray-800 border-gray-600 text-white focus:ring-gray-500' : 'bg-white border-gray-300 text-gray-900 focus:ring-gray-400'}`}></textarea>
                </div>
                <div>
                  <label className="text-white block text-sm font-medium mb-2">Upload Images (up to 5)</label>
                  <input type="file" accept="image/*" multiple onChange={handleConsultFiles} className={`w-full px-4 py-3 border rounded-2xl focus:outline-none focus:ring-1 ${isDarkMode ? 'bg-gray-700 border-gray-600 text-white focus:ring-gray-500' : 'bg-white border-gray-200 text-black focus:ring-gray-300'}`} />
                  {consultImages.length > 0 && (
                    <div className="grid grid-cols-5 gap-2 mt-2">
                      {consultImages.map((file, idx) => (
                        <img key={idx} src={URL.createObjectURL(file)} alt="Selected" className="w-full h-16 object-cover rounded-lg" />
                      ))}
                    </div>
                  )}
                </div>
              </div>
              <div className="flex flex-col sm:flex-row gap-4 pt-2">
                <button type="button" onClick={() => setShowConsultModal(false)} className={`flex-1 px-6 py-3 rounded-2xl text-sm font-medium border ${isDarkMode ? 'border-gray-600 text-white hover:border-gray-500 hover:bg-gray-700' : 'border-gray-300 text-white hover:border-gray-400 hover:bg-gray-50'}`}>Cancel</button>
                <button type="submit" className={`flex-1 px-6 py-3 rounded-2xl text-sm font-medium ${isDarkMode ? 'bg-mustard-500 text-black hover:bg-mustard-600' : 'bg-mustard-500 text-black hover:bg-mustard-600'}`}>Submit</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Apple-style Product Grid */}
      <section className={`py-24 transition-colors duration-300 ${isDarkMode ? 'bg-gray-900' : 'bg-white'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Apple Events Style Card - Promotions */}
          <FadeIn direction="up" className="mb-8">
            <div className="group cursor-pointer rounded-3xl overflow-hidden transition-all duration-300 hover:scale-[1.01] bg-black relative h-[600px] shadow-soft hover:shadow-glow">
              <div
                ref={promoRef}
                onTouchStart={onTouchStart}
                onTouchMove={onTouchMove}
                onTouchEnd={onTouchEnd}
                className="w-full h-full overflow-hidden touch-pan-x"
              >
                <div
                  className={`flex h-full ${dragging ? 'transition-none' : 'transition-transform duration-500 ease-out'}`}
                  style={{
                    transform: `translateX(calc(-${promoIndex} * 100% + ${(dragging && promoRef.current ? (dragDelta / promoRef.current.offsetWidth) * 100 : 0)}%))`,
                  }}
                >
                  {promoSlides.map((s, idx) => (
                    <div key={idx} className="w-full h-full shrink-0 relative">
                      {/* Background Image */}
                      {s.image ? (
                        <div 
                          className="absolute inset-0 bg-cover bg-center transition-transform duration-700 hover:scale-105"
                          style={{ backgroundImage: `url(${s.image})` }}
                        />
                      ) : (
                        <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-purple-700 to-orange-600 animate-gradient-xy"></div>
                      )}
                      
                      {/* Content */}
                      <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-8 z-10">
                        <h2 className="text-5xl md:text-7xl font-bold tracking-tight text-white mb-4 drop-shadow-lg">
                          {s.title}
                        </h2>
                        <p className="text-xl md:text-2xl text-gray-100 mb-8 max-w-2xl drop-shadow-md">
                          {s.desc}
                        </p>
                        <Button 
                          onClick={() => setShowConsultModal(true)} 
                          variant="ghost"
                          size="lg"
                          className="bg-white text-black hover:bg-gray-200 hover:scale-105 shadow-xl font-semibold text-lg h-auto py-4 px-8"
                        >
                          {s.cta}
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Navigation Arrows */}
              <button
                aria-label="Previous"
                onClick={(e) => { e.stopPropagation(); setPromoIndex(i => (i - 1 + promoSlides.length) % promoSlides.length); }}
                className="absolute left-4 top-1/2 -translate-y-1/2 p-4 rounded-full bg-black/30 text-white hover:bg-black/50 backdrop-blur-md transition-all opacity-0 group-hover:opacity-100"
              >
                <ArrowLeft className="h-6 w-6" />
              </button>
              <button
                aria-label="Next"
                onClick={(e) => { e.stopPropagation(); setPromoIndex(i => (i + 1) % promoSlides.length); }}
                className="absolute right-4 top-1/2 -translate-y-1/2 p-4 rounded-full bg-black/30 text-white hover:bg-black/50 backdrop-blur-md transition-all opacity-0 group-hover:opacity-100"
              >
                <ArrowRight className="h-6 w-6" />
              </button>
              
              {/* Dots Indicators */}
              <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex space-x-2 z-20">
                {promoSlides.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={(e) => { e.stopPropagation(); setPromoIndex(idx); }}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${idx === promoIndex ? 'bg-white w-6' : 'bg-white/50 hover:bg-white/80'}`}
                  />
                ))}
              </div>
            </div>
          </FadeIn>
          
          <FadeIn direction="up" delay={200} className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Large Card - MacBook Air Style */}
            <div className={`group cursor-pointer rounded-3xl overflow-hidden transition-all duration-300 hover:scale-[1.02] ${isDarkMode ? 'glass-card-dark' : 'glass-card'} relative`}>
              <div 
                className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-300 group-hover:scale-105"
                style={{
                  backgroundImage: 'url(https://images.pexels.com/photos/1957477/pexels-photo-1957477.jpeg?auto=compress&cs=tinysrgb&w=800)',
                }}
              />
              <div className="absolute inset-0 bg-black/30" />
              <div className="relative h-80 flex flex-col justify-center items-center p-6 z-10">
                <div className="text-center">
                  <h2 className="text-3xl sm:text-4xl font-medium tracking-wide text-white mb-2">H2 SERIES</h2>
                  <p className="text-base text-gray-200 mb-4">Starting from 1,000 THB</p>
                  <div className="flex justify-center mb-4">
                    <Button variant="outline" size="sm" className="border-white text-white hover:bg-white hover:text-gray-900 px-5">
                      Learn more
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            {/* Large Card - iPad Pro Style */}
            <div className={`group cursor-pointer rounded-3xl overflow-hidden transition-all duration-300 hover:scale-[1.02] ${isDarkMode ? 'glass-card-dark' : 'glass-card'} relative`}>
              <div 
                className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-300 group-hover:scale-105"
                style={{
                  backgroundImage: 'url(https://images.pexels.com/photos/1957477/pexels-photo-1957477.jpeg?auto=compress&cs=tinysrgb&w=800)',
                }}
              />
              <div className="absolute inset-0 bg-black/30" />
              <div className="relative h-80 flex flex-col justify-center items-center p-6 z-10">
                <div className="text-center">
                  <h2 className="text-3xl sm:text-4xl font-medium tracking-wide text-white mb-2">W2 SERIES</h2>
                  <p className="text-base text-gray-200 mb-4">Starting from 1,000 THB</p>
                  <div className="flex justify-center mb-4">
                    <button className="border border-white text-white px-5 py-2 rounded-full text-sm font-medium hover:bg-white hover:text-gray-900 transition-colors">
                      Learn more
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Medium Card - iPad Air Style */}
            <div className={`group cursor-pointer rounded-3xl overflow-hidden transition-all duration-300 hover:scale-[1.02] ${isDarkMode ? 'glass-card-dark' : 'glass-card'} relative`}>
              <div 
                className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-300 group-hover:scale-105"
                style={{
                  backgroundImage: 'url(https://images.pexels.com/photos/1957477/pexels-photo-1957477.jpeg?auto=compress&cs=tinysrgb&w=800)',
                }}
              />
              <div className="absolute inset-0 bg-black/30" />
              <div className="relative h-80 flex flex-col justify-center items-center p-6 z-10">
                <div className="text-center">
                  <h2 className="text-3xl sm:text-4xl font-medium tracking-wide text-white mb-2">H10 SERIES</h2>
                  <p className="text-base text-gray-200 mb-4">Starting from 1,000 THB</p>
                  <div className="flex justify-center mb-4">
                    <button className="border border-white text-white px-5 py-2 rounded-full text-sm font-medium hover:bg-white hover:text-gray-900 transition-colors">
                      Learn more
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Medium Card - Apple Watch Style */}
            <div className={`group cursor-pointer rounded-3xl overflow-hidden transition-all duration-300 hover:scale-[1.02] ${isDarkMode ? 'glass-card-dark' : 'glass-card'} relative`}>
              <div 
                className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-300 group-hover:scale-105"
                style={{
                  backgroundImage: 'url(https://images.pexels.com/photos/1957477/pexels-photo-1957477.jpeg?auto=compress&cs=tinysrgb&w=800)',
                }}
              />
              <div className="absolute inset-0 bg-black/30" />
              <div className="relative h-80 flex flex-col justify-center items-center p-6 z-10">
                <div className="text-center">
                  <h2 className="text-3xl sm:text-4xl font-medium tracking-wide text-white mb-2">V2 SERIES</h2>
                  <p className="text-base text-gray-200 mb-4">Starting from 1,000 THB</p>
                  <div className="flex justify-center mb-4">
                    <button className="border border-white text-white px-5 py-2 rounded-full text-sm font-medium hover:bg-white hover:text-gray-900 transition-colors">
                      Learn more
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Small Cards Row */}
            <div className="md:col-span-2">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* AirPods Style */}
                <div className={`group cursor-pointer rounded-3xl overflow-hidden transition-all duration-300 hover:scale-[1.02] ${isDarkMode ? 'glass-card-dark' : 'glass-card'}`}>
                  <div className="relative h-80">
                    <div 
                      className="absolute inset-0 bg-cover bg-center transform group-hover:scale-105 transition-transform duration-300"
                      style={{
                        backgroundImage: 'url(https://images.pexels.com/photos/1957477/pexels-photo-1957477.jpeg?auto=compress&cs=tinysrgb&w=800)'
                      }}
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-40" />
                    <div className="relative h-full flex flex-col justify-center items-center text-center p-6">
                      <h2 className="text-3xl sm:text-4xl font-medium tracking-wide text-white mb-2">NX SERIES</h2>
                      <p className="text-base text-gray-200 mb-4">Starting from 1,000 THB</p>
                      <div className="flex justify-center">
                      <button className="border border-white text-white px-5 py-2 rounded-full text-sm font-medium hover:bg-white hover:text-gray-900 transition-colors">
                        Learn more
                      </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* MacBook Pro Style */}
                <div className={`group cursor-pointer rounded-3xl overflow-hidden transition-all duration-300 hover:scale-[1.02] ${isDarkMode ? 'glass-card-dark' : 'glass-card'}`}>
                  <div className="relative h-80">
                    <div 
                      className="absolute inset-0 bg-cover bg-center transform group-hover:scale-105 transition-transform duration-300"
                      style={{
                        backgroundImage: 'url(https://images.pexels.com/photos/1957477/pexels-photo-1957477.jpeg?auto=compress&cs=tinysrgb&w=800)'
                      }}
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-40" />
                    <div className="relative h-full flex flex-col justify-center items-center text-center p-6">
                      <h2 className="text-3xl sm:text-4xl font-medium tracking-wide text-white mb-2">ERGONOMIC CHAIR</h2>
                      <p className="text-base text-gray-200 mb-4">(PRICE 1,000-3,000 THB)</p>
                      <div className="flex justify-center">
                      <button className="border border-white text-white px-5 py-2 rounded-full text-sm font-medium hover:bg-white hover:text-gray-900 transition-colors">
                        Learn more
                      </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Second Row of Small Cards - positioned after small cards */}
            <div className="md:col-span-2">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Studio Display Style */}
                <div className={`group cursor-pointer rounded-3xl overflow-hidden transition-all duration-300 hover:scale-[1.02] ${isDarkMode ? 'glass-card-dark' : 'glass-card'}`}>
                  <div className="relative h-80">
                    <div 
                      className="absolute inset-0 bg-cover bg-center transform group-hover:scale-105 transition-transform duration-300"
                      style={{
                        backgroundImage: 'url(https://images.pexels.com/photos/1957477/pexels-photo-1957477.jpeg?auto=compress&cs=tinysrgb&w=800)'
                      }}
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-40" />
                    <div className="relative h-full flex flex-col justify-center items-center text-center p-6">
                      <h2 className="text-3xl sm:text-4xl font-medium tracking-wide text-white mb-2">EXECUTIVE CHAIR</h2>
                      <p className="text-base text-gray-200 mb-4">(PRICE 3,001-6,000 THB)</p>
                      <div className="flex justify-center">
                      <button className="border border-white text-white px-5 py-2 rounded-full text-sm font-medium hover:bg-white hover:text-gray-900 transition-colors">
                        Learn more
                      </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Mac Studio Style */}
                <div className={`group cursor-pointer rounded-3xl overflow-hidden transition-all duration-300 hover:scale-[1.02] ${isDarkMode ? 'glass-card-dark' : 'glass-card'}`}>
                  <div className="relative h-80">
                    <div 
                      className="absolute inset-0 bg-cover bg-center transform group-hover:scale-105 transition-transform duration-300"
                      style={{
                        backgroundImage: 'url(https://images.pexels.com/photos/1957477/pexels-photo-1957477.jpeg?auto=compress&cs=tinysrgb&w=800)'
                      }}
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-40" />
                    <div className="relative h-full flex flex-col justify-center items-center text-center p-6">
                      <h2 className="text-3xl sm:text-4xl font-medium tracking-wide text-white mb-2">CEO CHAIR</h2>
                      <p className="text-base text-gray-200 mb-4">(PRICE 6,001 THB or more)</p>
                      <div className="flex justify-center">
                        <button className="border border-white text-white px-5 py-2 rounded-full text-sm font-medium hover:bg-white hover:text-gray-900 transition-colors">
                          Learn more
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="md:col-span-2">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Mac Studio Style */}
                <div className={`group cursor-pointer rounded-3xl overflow-hidden transition-all duration-300 hover:scale-[1.02] ${isDarkMode ? 'glass-card-dark' : 'glass-card'}`}>
                  <div className="relative h-80">
                    <div 
                      className="absolute inset-0 bg-cover bg-center transform group-hover:scale-105 transition-transform duration-300"
                      style={{ backgroundImage: "url('https://images.pexels.com/photos/1957477/pexels-photo-1957477.jpeg?auto=compress&cs=tinysrgb&w=800')" }}
                    ></div>
                    <div className="absolute inset-0 bg-black bg-opacity-40"></div>
                    <div className="relative h-full flex flex-col justify-center items-center text-center p-6">
                      <h2 className="text-3xl sm:text-4xl font-medium tracking-wide text-white mb-2">Auditorium / Lecture / Bench Chair</h2>
                      <p className="text-base text-gray-200 mb-4">Free delivery and free onsite installation</p>
                      <div className="flex justify-center">
                        <button onClick={() => setShowConsultModal(true)} className="bg-blue-600 text-white px-5 py-2 rounded-full text-sm font-medium hover:bg-blue-700 transition-colors">
                          Consultation
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                {/* Studio Display Style */}
                <div className={`group cursor-pointer rounded-3xl overflow-hidden transition-all duration-300 hover:scale-[1.02] ${isDarkMode ? 'glass-card-dark' : 'glass-card'}`}>
                  <div className="relative h-80">
                    <div 
                      className="absolute inset-0 bg-cover bg-center transform group-hover:scale-105 transition-transform duration-300"
                      style={{ backgroundImage: "url('https://images.pexels.com/photos/1957477/pexels-photo-1957477.jpeg?auto=compress&cs=tinysrgb&w=800')" }}
                    ></div>
                    <div className="absolute inset-0 bg-black bg-opacity-40"></div>
                    <div className="relative h-full flex flex-col justify-center items-center text-center p-6">
                      <h2 className="text-3xl sm:text-4xl font-medium tracking-wide text-white mb-2">OTHER</h2>
                      <div className="flex justify-center">
                        <button className="bg-blue-600 text-white px-5 py-2 rounded-full text-sm font-medium hover:bg-blue-700 transition-colors">
                          Learn more
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </FadeIn>


        </div>
      </section>

      {/* Newsletter Section */}
      <section className={`py-20 transition-colors duration-300 ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn direction="up" className={`rounded-3xl p-12 text-center shadow-sm transition-colors duration-300 ${isDarkMode ? 'glass-card-dark bg-gray-800/50' : 'glass-card bg-white/70'}`}>
            <h2 className={`text-3xl font-bold mb-4 transition-colors duration-300 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{t('home.join_community')}</h2>
            <p className={`mb-8 max-w-2xl mx-auto leading-relaxed transition-colors duration-300 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              <Trans i18nKey="home.join_community_desc">
                Add LINE to receive exclusive benefits and premium offers<br />for our chairs and office furniture
              </Trans>
            </p>
            <div className="flex justify-center max-w-md mx-auto mb-8">
              <a
                href={lineUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={`inline-flex items-center justify-center px-8 py-3 rounded-full text-sm font-medium transition-all duration-300 transform hover:scale-105 hover:shadow-lg active:scale-95 ${isDarkMode ? 'bg-[#00b900] text-white hover:bg-[#00a700]' : 'bg-[#00b900] text-white hover:bg-[#00a700]'}`}
              >
                {t('home.add_line_button')}
              </a>
            </div>
            <div className={`flex items-center justify-between pt-8 border-t transition-colors duration-300 ${isDarkMode ? 'border-gray-600' : 'border-gray-200'}`}>
              <span className={`text-3xl font-light transition-colors duration-300 ${isDarkMode ? 'text-gray-200' : 'text-gray-700'}`}>{t('home.ten_percent_off')}</span>
              <span className={`text-3xl font-light transition-colors duration-300 ${isDarkMode ? 'text-gray-200' : 'text-gray-700'}`}>{t('home.offers')}</span>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Section 5: Latest Articles */}
      <section className={`py-20 transition-colors duration-300 ${isDarkMode ? 'bg-gray-900' : 'bg-white'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn direction="up" className="flex justify-between items-center mb-12">
            <h2 className={`text-3xl font-bold transition-colors duration-300 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{t('home.latest_articles')}</h2>
            <button className={`flex items-center text-sm font-medium hover:translate-x-1 transition-transform ${isDarkMode ? 'text-white' : 'text-black'}`}>
              {t('home.view_all_articles')} <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 hover:translate-x-1" />
            </button>
          </FadeIn>

          <FadeIn direction="up" delay={200} className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <article className="group cursor-pointer">
              <div className={`rounded-3xl overflow-hidden mb-4 transition-colors aspect-video ${isDarkMode ? 'glass-card-dark bg-gray-800/30 group-hover:bg-gray-700/40' : 'glass-card bg-gray-100/30 group-hover:bg-gray-200/40'}`}>
                <img
                  src="https://images.pexels.com/photos/1957477/pexels-photo-1957477.jpeg?auto=compress&cs=tinysrgb&w=400"
                  alt="Ergonomic Office Setup"
                  className="w-full h-full object-cover"
                />
              </div>
              <p className={`text-xs mb-2 transition-colors duration-300 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>April 18, 2025</p>
              <h3 className={`text-lg font-medium transition-colors ${isDarkMode ? 'text-white group-hover:text-gray-200' : 'text-gray-900 group-hover:text-black'}`}>
                {t('home.article_1_title')}
              </h3>
            </article>

            <article className="group cursor-pointer">
              <div className={`rounded-3xl overflow-hidden mb-4 transition-colors aspect-video ${isDarkMode ? 'glass-card-dark bg-gray-800/30 group-hover:bg-gray-700/40' : 'glass-card bg-gray-100/30 group-hover:bg-gray-200/40'}`}>
                <img
                  src="https://images.pexels.com/photos/1957477/pexels-photo-1957477.jpeg?auto=compress&cs=tinysrgb&w=400"
                  alt="Chair Sale"
                  className="w-full h-full object-cover"
                />
              </div>
              <p className={`text-xs mb-2 transition-colors duration-300 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>March 25, 2025</p>
              <h3 className={`text-lg font-medium transition-colors ${isDarkMode ? 'text-white group-hover:text-gray-200' : 'text-gray-900 group-hover:text-black'}`}>
                {t('home.article_2_title')}
              </h3>
            </article>

            <article className="group cursor-pointer">
              <div className={`rounded-3xl overflow-hidden mb-4 transition-colors aspect-video ${isDarkMode ? 'glass-card-dark bg-gray-800/30 group-hover:bg-gray-700/40' : 'glass-card bg-gray-100/30 group-hover:bg-gray-200/40'}`}>
                <img
                  src="https://images.pexels.com/photos/1957477/pexels-photo-1957477.jpeg?auto=compress&cs=tinysrgb&w=400"
                  alt="Perfect Chair"
                  className="w-full h-full object-cover"
                />
              </div>
              <p className={`text-xs mb-2 transition-colors duration-300 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>March 12, 2025</p>
              <h3 className={`text-lg font-medium transition-colors ${isDarkMode ? 'text-white group-hover:text-gray-200' : 'text-gray-900 group-hover:text-black'}`}>
                {t('home.article_3_title')}
              </h3>
            </article>
          </FadeIn>

          <FadeIn direction="up" delay={400} className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <div className={`${isDarkMode ? 'glass-card-dark bg-gray-800/30' : 'glass-card bg-gray-100/30'} rounded-3xl overflow-hidden aspect-video`}>
                <iframe
                  className="w-full h-full"
                  src="https://www.youtube.com/embed/riD8Xt8r1MQ?si=fkwAzaYz_AdsP2O5&start=1"
                  title="YouTube video player"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                ></iframe>
              </div>
              <p className={`mt-2 text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Ergonomic Chairs 101 — Key adjustments for comfort</p>
            </div>
            <div>
              <div className={`${isDarkMode ? 'glass-card-dark bg-gray-800/30' : 'glass-card bg-gray-100/30'} rounded-3xl overflow-hidden aspect-video`}>
                <iframe
                  className="w-full h-full"
                  src="https://www.youtube.com/embed/9fsY_0xaC8g?si=useHt9_MxSCqPfrc&start=1"
                  title="YouTube video player"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                ></iframe>
              </div>
              <p className={`mt-2 text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Ergo Tips — Sitting posture guide</p>
            </div>
            <div>
              <div className={`${isDarkMode ? 'glass-card-dark bg-gray-800/30' : 'glass-card bg-gray-100/30'} rounded-3xl overflow-hidden aspect-video`}>
                <iframe
                  className="w-full h-full"
                  src="https://www.youtube.com/embed/9vvcTpEFH6A?si=aBk0hNB0miD3Jma6"
                  title="YouTube video player"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                ></iframe>
              </div>
              <p className={`mt-2 text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Best Chairs of 2025 — Top picks and expert tips</p>
            </div>
          </FadeIn>
        </div>
      </section>

      <ShowroomModal 
        isOpen={showShowroomModal} 
        onClose={() => setShowShowroomModal(false)} 
        isDarkMode={isDarkMode} 
      />
    </div>
  );
};

export default Home;
