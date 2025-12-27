import React from 'react';
import { useTranslation } from 'react-i18next';
import { Shield, CheckCircle, ArrowRight, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

interface AboutProps {
  isDarkMode: boolean;
}

const About: React.FC<AboutProps> = ({ isDarkMode }) => {
  const { t } = useTranslation();

  const stats = [
    { number: '50K+', label: t('about.happy_customers') },
    { number: '15+', label: t('about.years_experience') },
    { number: '200+', label: t('about.chair_models') },
    { number: '98.3%', label: t('about.satisfaction_rate') }
  ];

  const lineUrl = import.meta.env.VITE_LINE_URL ?? 'https://shop.line.me/@superchair';

  const features = [
    t('about.feature_1'),
    t('about.feature_2'),
    t('about.feature_3'),
    t('about.feature_4'),
    t('about.feature_5'),
    t('about.feature_6')
  ];

  const galleryImages: string[] = [
    'https://images.pexels.com/photos/1957477/pexels-photo-1957477.jpeg?auto=compress&cs=tinysrgb&w=1200',
    'https://images.pexels.com/photos/255379/pexels-photo-255379.jpeg?auto=compress&cs=tinysrgb&w=1200',
    'https://images.pexels.com/photos/813269/pexels-photo-813269.jpeg?auto=compress&cs=tinysrgb&w=1200'
  ];
  const [galleryOpen, setGalleryOpen] = React.useState(false);
  const [galleryIndex, setGalleryIndex] = React.useState(0);
  const galleryRef = React.useRef<HTMLDivElement | null>(null);
  const [gDragStart, setGDragStart] = React.useState<number | null>(null);
  const [gDragDelta, setGDragDelta] = React.useState(0);
  const [gDragging, setGDragging] = React.useState(false);
  React.useEffect(() => {
    if (!galleryOpen || galleryImages.length <= 1) return;
    const id = setInterval(() => {
      setGalleryIndex(i => (i + 1) % galleryImages.length);
    }, 4000);
    return () => clearInterval(id);
  }, [galleryOpen]);
  const onGTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    setGDragStart(e.touches[0].clientX);
    setGDragging(true);
    setGDragDelta(0);
  };
  const onGTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (gDragStart == null) return;
    const dx = e.touches[0].clientX - gDragStart;
    setGDragDelta(dx);
  };
  const onGTouchEnd = () => {
    if (gDragStart == null) {
      setGDragging(false);
      return;
    }
    const threshold = 50;
    if (gDragDelta > threshold) {
      setGalleryIndex(i => (i - 1 + galleryImages.length) % galleryImages.length);
    } else if (gDragDelta < -threshold) {
      setGalleryIndex(i => (i + 1) % galleryImages.length);
    }
    setGDragging(false);
    setGDragStart(null);
    setGDragDelta(0);
  };

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
          <div className="text-center mb-16">
            <div className={`inline-flex items-center px-4 py-1.5 rounded-full text-xs font-bold tracking-wider border shadow-sm mb-6 ${isDarkMode ? 'bg-gray-800 border-gray-700 text-gray-300' : 'bg-white border-gray-200 text-slate-600'}`}>
               <span className="h-2 w-2 rounded-full mr-2 bg-mustard-500"></span>
               WHY CHOOSE SUPR?
            </div>
            <h1 className={`text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight tracking-tight mb-6 transition-colors duration-300 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              Adaptable to Suit the<br />Physiology of Each User
            </h1>
            <div className="w-20 h-1 bg-mustard-500 mx-auto mb-8 rounded-full"></div>
            <p className={`text-lg max-w-2xl mx-auto transition-colors duration-300 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              {t('about.subtitle')}
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-8">
            {stats.map((stat, index) => (
              <div key={index} className={`group p-6 rounded-2xl border transition-all duration-300 hover:-translate-y-1 hover:shadow-xl text-center ${isDarkMode ? 'bg-[#1a1a1a] border-white/5 hover:border-mustard-500/30' : 'bg-white border-gray-100 hover:border-mustard-500/30'} shadow-sm`}>
                <div className={`text-4xl lg:text-5xl font-bold mb-2 transition-colors duration-300 flex justify-center items-start ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                  {stat.number.replace(/[+%]/g, '')}
                  <span className="text-mustard-500 text-2xl lg:text-3xl mt-1 ml-0.5">{stat.number.includes('%') ? '%' : '+'}</span>
                </div>
                <div className={`text-xs font-bold tracking-widest uppercase ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className={`py-20 transition-colors duration-300 ${isDarkMode ? 'bg-gray-800' : 'bg-gray-50'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1">
              <div className="flex items-center gap-3 mb-6">
                <div className={`h-8 w-1 rounded-full ${isDarkMode ? 'bg-mustard-500' : 'bg-mustard-500'}`}></div>
                <h2 className={`text-3xl font-bold transition-colors duration-300 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                  {t('about.our_story_title')}
                </h2>
              </div>
              <div className={`p-8 rounded-3xl border transition-all duration-300 ${isDarkMode ? 'bg-[#1a1a1a] border-white/5' : 'bg-white border-gray-100'} shadow-sm`}>
                <p className={`mb-6 leading-relaxed text-lg transition-colors duration-300 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                  {t('about.our_story_p1')}
                </p>
                <p className={`mb-6 leading-relaxed text-lg transition-colors duration-300 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                  {t('about.our_story_p2')}
                </p>
                <p className={`mb-8 leading-relaxed text-lg transition-colors duration-300 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                  {t('about.our_story_p3')}
                </p>
                <Link to="/products" className={`inline-flex items-center gap-2 px-8 py-3 rounded-full text-sm font-bold tracking-wide transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg ${isDarkMode ? 'bg-white text-black hover:bg-mustard-500 hover:shadow-mustard-500/20' : 'bg-black text-white hover:bg-mustard-500 hover:shadow-mustard-500/20'}`}>
                  {t('about.view_our_products')} <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
            <div className={`order-1 lg:order-2 group relative rounded-3xl overflow-hidden cursor-pointer h-[500px] border transition-all duration-300 ${isDarkMode ? 'border-white/5' : 'border-gray-200'} shadow-2xl`} onClick={() => setGalleryOpen(true)}>
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-500 z-10"></div>
              <img
                src="https://images.pexels.com/photos/1957477/pexels-photo-1957477.jpeg?auto=compress&cs=tinysrgb&w=600"
                alt="Our workshop and team"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute bottom-0 left-0 right-0 p-8 z-20 bg-gradient-to-t from-black/80 to-transparent">
                 <div className="flex items-center justify-between">
                    <div>
                      <p className="text-white font-bold text-xl mb-1">Our Workshop</p>
                      <p className="text-gray-300 text-sm">View Gallery</p>
                    </div>
                    <div className="h-12 w-12 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white group-hover:bg-mustard-500 group-hover:text-black transition-all duration-300">
                      <ArrowRight className="h-5 w-5" />
                    </div>
                 </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {galleryOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-2 sm:p-4">
          <div className={`${isDarkMode ? 'glass-card-dark bg-gray-800/80' : 'glass-card bg-white/80'} w-full max-w-[95vw] sm:max-w-2xl md:max-w-3xl max-h-[90vh] overflow-hidden rounded-3xl shadow-xl relative`}>
            <div
              ref={galleryRef}
              onTouchStart={onGTouchStart}
              onTouchMove={onGTouchMove}
              onTouchEnd={onGTouchEnd}
              className="w-full h-[60vh] overflow-hidden"
            >
              <div
                className="flex h-full transition-transform duration-500 ease-out"
                style={{ transform: `translateX(calc(-${galleryIndex} * 100% + ${(gDragging && galleryRef.current ? (gDragDelta / galleryRef.current.offsetWidth) * 100 : 0)}%))` }}
              >
                {galleryImages.map((src, idx) => (
                  <div key={idx} className="w-full h-full shrink-0">
                    <img src={src} alt="Gallery" className="w-full h-full object-cover" />
                  </div>
                ))}
              </div>
            </div>
            <button aria-label="Prev" onClick={() => setGalleryIndex(i => (i - 1 + (galleryImages.length || 1)) % (galleryImages.length || 1))} className={`absolute left-3 top-1/2 -translate-y-1/2 p-3 rounded-full shadow-sm ${isDarkMode ? 'bg-gray-800/60 text-white hover:bg-gray-700/80' : 'bg-white/60 text-gray-900 hover:bg-white/80'} backdrop-blur-sm`}><ArrowLeft className="h-5 w-5" /></button>
            <button aria-label="Next" onClick={() => setGalleryIndex(i => (i + 1) % (galleryImages.length || 1))} className={`absolute right-3 top-1/2 -translate-y-1/2 p-3 rounded-full shadow-sm ${isDarkMode ? 'bg-gray-800/60 text-white hover:bg-gray-700/80' : 'bg-white/60 text-gray-900 hover:bg-white/80'} backdrop-blur-sm`}><ArrowRight className="h-5 w-5" /></button>
            <button onClick={() => setGalleryOpen(false)} className={`absolute top-3 right-3 p-2 rounded-full ${isDarkMode ? 'hover:bg-gray-700 text-gray-300' : 'hover:bg-gray-100 text-gray-600'}`}>×</button>
          </div>
        </div>
      )}

      {/* Why Choose Us */}
      <section className={`py-24 transition-colors duration-300 ${isDarkMode ? 'bg-gray-900' : 'bg-white'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className={`order-2 lg:order-1 rounded-3xl overflow-hidden h-[600px] shadow-2xl relative group ${isDarkMode ? 'bg-gray-800' : 'bg-gray-100'}`}>
              <img
                src="https://images.pexels.com/photos/1957477/pexels-photo-1957477.jpeg?auto=compress&cs=tinysrgb&w=600"
                alt="Quality craftsmanship"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
              <div className="absolute bottom-8 left-8 right-8">
                 <div className="inline-flex items-center px-4 py-2 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-white text-sm font-bold mb-4">
                    <Shield className="w-4 h-4 mr-2" />
                    Premium Quality
                 </div>
                 <p className="text-white text-lg font-medium max-w-md">
                   Every piece is crafted with precision and care, ensuring lasting durability and comfort.
                 </p>
              </div>
            </div>
            
            <div className="order-1 lg:order-2">
              <div className="flex items-center gap-3 mb-6">
                 <div className={`h-8 w-1 rounded-full ${isDarkMode ? 'bg-mustard-500' : 'bg-mustard-500'}`}></div>
                 <h2 className={`text-3xl font-bold transition-colors duration-300 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                   {t('about.why_choose_us')}
                 </h2>
              </div>
              <p className={`mb-10 leading-relaxed text-lg transition-colors duration-300 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                {t('about.why_choose_us_desc')}
              </p>
              
              <div className="grid grid-cols-1 gap-4 mb-10">
                {features.map((feature, index) => (
                  <div key={index} className={`flex items-center gap-4 p-4 rounded-2xl border transition-all duration-300 hover:translate-x-2 ${isDarkMode ? 'bg-[#1a1a1a] border-white/5 hover:border-mustard-500/30' : 'bg-white border-gray-100 hover:border-mustard-500/30'} shadow-sm`}>
                    <div className={`h-10 w-10 rounded-full flex items-center justify-center flex-shrink-0 ${isDarkMode ? 'bg-mustard-500/20 text-mustard-500' : 'bg-mustard-50 text-mustard-600'}`}>
                       <CheckCircle className="h-5 w-5" />
                    </div>
                    <span className={`font-medium transition-colors duration-300 ${isDarkMode ? 'text-gray-200' : 'text-gray-700'}`}>
                      {feature}
                    </span>
                  </div>
                ))}
              </div>

              <Link to="/products" className={`inline-flex items-center gap-2 px-8 py-4 rounded-xl text-sm font-bold tracking-wide transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg ${isDarkMode ? 'bg-white text-black hover:bg-mustard-500 hover:shadow-mustard-500/20' : 'bg-black text-white hover:bg-mustard-500 hover:shadow-mustard-500/20'}`}>
                {t('about.shop_now')} <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className={`py-24 transition-colors duration-300 ${isDarkMode ? 'bg-gray-800' : 'bg-gray-50'}`}>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className={`p-12 rounded-[2.5rem] relative overflow-hidden ${isDarkMode ? 'bg-gray-900' : 'bg-white'} shadow-2xl border ${isDarkMode ? 'border-white/5' : 'border-gray-100'}`}>
            <div className="absolute inset-0 opacity-10 pointer-events-none" style={{
                backgroundImage: `linear-gradient(${isDarkMode ? '#374151' : '#e5e7eb'} 1px, transparent 1px), linear-gradient(90deg, ${isDarkMode ? '#374151' : '#e5e7eb'} 1px, transparent 1px)`,
                backgroundSize: '40px 40px'
            }}></div>
            
            <div className="relative z-10">
              <h2 className={`text-3xl sm:text-4xl font-bold mb-6 transition-colors duration-300 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                {t('about.cta_title')}
              </h2>
              <div className="w-20 h-1 bg-mustard-500 mx-auto mb-8 rounded-full"></div>
              <p className={`text-lg sm:text-xl mb-10 max-w-2xl mx-auto transition-colors duration-300 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                {t('about.cta_subtitle')}
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/products" className={`px-10 py-4 rounded-xl text-sm font-bold tracking-wide transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg ${isDarkMode ? 'bg-white text-black hover:bg-mustard-500 hover:shadow-mustard-500/20' : 'bg-black text-white hover:bg-mustard-500 hover:shadow-mustard-500/20'}`}>
                  {t('about.browse_chairs')}
                </Link>
                <Link to="/contact" className={`px-10 py-4 rounded-xl text-sm font-bold tracking-wide transition-all duration-300 border-2 hover:-translate-y-1 ${isDarkMode ? 'border-gray-700 text-white hover:border-mustard-500 hover:text-mustard-500' : 'border-gray-200 text-gray-900 hover:border-mustard-500 hover:text-mustard-600'}`}>
                  {t('about.contact_sales_button')}
                </Link>
              </div>
              
              <p className={`mt-8 text-sm font-medium ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>
                {t('about.contact_sales_desc')}
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
