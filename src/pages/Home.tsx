import React from 'react';
import { ArrowRight, Truck, CreditCard, RotateCcw, ThumbsUp } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation, Trans } from 'react-i18next';

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

  const handleShopChairsClick = () => {
    navigate('/products');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleAboutClick = () => {
    navigate('/about');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 ${isDarkMode ? 'bg-gray-900' : 'bg-white'}`}>
      {/* Infinity Scrolling Brand Bar */}
      <section className={`py-8 transition-colors duration-300 ${isDarkMode ? 'bg-gray-900' : 'bg-white'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className={`text-center text-sm mb-6 transition-colors duration-300 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
            Trusted by leading companies worldwide
          </p>
          <div className="relative overflow-hidden">
            <div className="flex animate-scroll whitespace-nowrap">
              <div className="flex items-center justify-center shrink-0 space-x-16 px-8">
                {brandLogos.map((src, i) => (
                  <img key={`logo-a-${i}`} src={src} alt="Client logo" className="h-12 sm:h-[67px] w-auto object-contain opacity-90" loading="lazy" />
                ))}
              </div>
              <div className="flex items-center justify-center shrink-0 space-x-16 px-8">
                {brandLogos.map((src, i) => (
                  <img key={`logo-b-${i}`} src={src} alt="Client logo" className="h-12 sm:h-[67px] w-auto object-contain opacity-90" loading="lazy" />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Hero Section */}
      <section className={`py-16 transition-colors duration-300 ${isDarkMode ? 'bg-gray-900' : 'bg-white'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center min-h-[600px]">
            <div className="space-y-8">
              
              {/* Video Placeholder */}
              <div className="flex items-center justify-center">
                <div className={`relative rounded-2xl overflow-hidden shadow-xl w-full max-w-md h-64 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl cursor-pointer ${isDarkMode ? 'bg-gradient-to-br from-gray-800 to-gray-600' : 'bg-gradient-to-br from-gray-900 to-gray-700'}`}>
                  <div className="absolute inset-0 bg-black bg-opacity-20"></div>
                  <div className={`absolute top-4 right-4 px-2 py-1 rounded text-xs font-medium ${isDarkMode ? 'bg-gray-900 bg-opacity-70 text-gray-200' : 'bg-black bg-opacity-50 text-white'}`}>
                    HD
                  </div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <div className="bg-white bg-opacity-90 rounded-full p-4 mb-3 hover:bg-opacity-100 transition-all duration-300 cursor-pointer group transform hover:scale-110 active:scale-95">
                        <div className="w-6 h-6 text-black flex items-center justify-center">
                          <div className="w-0 h-0 border-l-[8px] border-l-black border-t-[6px] border-t-transparent border-b-[6px] border-b-transparent ml-1 transition-transform duration-300 group-hover:scale-110"></div>
                        </div>
                      </div>
                      <p className="text-white text-sm font-medium transition-all duration-300 hover:text-opacity-90">{t('home.watch_demo')}</p>
                      <p className="text-white text-xs opacity-75 transition-all duration-300 hover:opacity-90">{t('home.see_in_action')}</p>
                    </div>
                  </div>
                  <div className="absolute bottom-4 left-4 text-white text-xs font-medium">
                    2:34
                  </div>
                </div>
              </div>
              
              <h1 className={`text-6xl font-bold leading-tight transition-colors duration-300 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                <Trans i18nKey="home.hero_title">
                  Premium Ergonomic<br />Office Chairs
                </Trans>
              </h1>
              <p className={`text-base leading-relaxed max-w-lg transition-colors duration-300 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                {t('home.hero_subtitle')}
              </p>
              <div className="flex gap-6 pt-6">
                <button onClick={handleShopChairsClick} className={`px-10 py-4 rounded-full text-sm font-medium transition-all duration-300 transform hover:scale-105 hover:shadow-lg active:scale-95 ${isDarkMode ? 'bg-white text-black hover:bg-gray-200' : 'bg-black text-white hover:bg-gray-800'}`}>
                  {t('home.shop_chairs')}
                </button>
                <button onClick={handleAboutClick} className={`border px-10 py-4 rounded-full text-sm font-medium transition-all duration-300 transform hover:scale-105 hover:shadow-lg active:scale-95 hover:bg-opacity-5 ${isDarkMode ? 'border-gray-600 text-gray-300 hover:border-gray-500 hover:bg-white' : 'border-gray-300 text-gray-700 hover:border-gray-400 hover:bg-black'}`}>
                  {t('home.about_us')}
                </button>
              </div>

            </div>
            <div className="relative flex items-center justify-center">
              <div className="relative">
                <img
                  src="https://images.pexels.com/photos/1957477/pexels-photo-1957477.jpeg?auto=compress&cs=tinysrgb&w=600"
                  alt="Ergonomic Office Chair"
                  className="w-96 h-96 object-contain"
                />
                
                <div className="absolute top-4 right-8">
                  <div className={`w-16 h-16 flex items-center justify-center p-3 rounded-xl transition-all duration-300 hover:scale-110 hover:rotate-12 hover:shadow-lg cursor-pointer shadow-lg shadow-green-400/70 hover:shadow-green-400/90 hover:shadow-xl ${isDarkMode ? 'glass-button-dark' : 'glass-button'}`}>
                    <ThumbsUp className={`w-8 h-8 ${isDarkMode ? 'text-white' : 'text-gray-700'}`} />
                  </div>
                </div>
                <div className={`absolute -bottom-20 right-4 w-80 h-48 rounded-2xl shadow-lg transition-all duration-300 transform hover:scale-105 hover:shadow-xl ${isDarkMode ? 'glass-card-dark' : 'glass-card'}`}>
                  {/* Header with stats */}
                  <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="flex -space-x-2">
                          <div className={`w-6 h-6 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full border-2 shadow-sm ${isDarkMode ? 'border-gray-600' : 'border-gray-200'}`}></div>
                          <div className={`w-6 h-6 bg-gradient-to-br from-green-400 to-green-600 rounded-full border-2 shadow-sm ${isDarkMode ? 'border-gray-600' : 'border-gray-200'}`}></div>
                          <div className={`w-6 h-6 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full border-2 shadow-sm ${isDarkMode ? 'border-gray-600' : 'border-gray-200'}`}></div>
                          <div className={`w-6 h-6 bg-gradient-to-br from-purple-400 to-purple-600 rounded-full border-2 shadow-sm flex items-center justify-center ${isDarkMode ? 'border-gray-600' : 'border-gray-200'}`}>
                            <span className="text-white text-xs font-bold">+</span>
                          </div>
                        </div>
                        <div className="ml-2">
                          <div className="flex items-center">
                            {[...Array(5)].map((_, i) => (
                              <svg key={i} className="w-3 h-3 text-yellow-400 fill-current" viewBox="0 0 20 20">
                                <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/>
                              </svg>
                            ))}
                          </div>
                          <span className="text-xs font-medium text-white">4.9/5</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className={`text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent`}>
                          30K+
                        </div>
                        <span className={`text-xs font-medium bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent`}>{t('home.happy_users')}</span>
                      </div>
                    </div>
                  </div>

                  {/* Scrollable testimonials */}
                  <div className="h-32 overflow-y-auto p-2 space-y-2 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent">
                    {[
                      {
                        name: "Sarah M.",
                        role: "Product Designer",
                        feedback: "This chair completely transformed my work experience. No more back pain!",
                        avatar: "from-pink-400 to-pink-600",
                        rating: 5
                      },
                      {
                        name: "Mike Chen",
                        role: "Software Engineer",
                        feedback: "Best investment for my home office. The ergonomic support is incredible.",
                        avatar: "from-blue-400 to-blue-600",
                        rating: 5
                      },
                      {
                        name: "Emily R.",
                        role: "Marketing Manager",
                        feedback: "Amazing quality and comfort. My productivity has increased significantly!",
                        avatar: "from-green-400 to-green-600",
                        rating: 5
                      },
                      {
                        name: "David L.",
                        role: "Graphic Designer",
                        feedback: "Perfect for long design sessions. The lumbar support is fantastic.",
                        avatar: "from-purple-400 to-purple-600",
                        rating: 5
                      },
                      {
                        name: "Jessica T.",
                        role: "Data Analyst",
                        feedback: "Worth every penny! My back pain disappeared after switching to this chair.",
                        avatar: "from-yellow-400 to-yellow-600",
                        rating: 5
                      },
                      {
                        name: "Alex K.",
                        role: "Project Manager",
                        feedback: "Excellent build quality and comfort. Highly recommend for office workers.",
                        avatar: "from-red-400 to-red-600",
                        rating: 5
                      },
                      {
                        name: "Lisa W.",
                        role: "UX Designer",
                        feedback: "The adjustability options are perfect. Finally found my ideal sitting position.",
                        avatar: "from-indigo-400 to-indigo-600",
                        rating: 5
                      },
                      {
                        name: "Tom B.",
                        role: "Developer",
                        feedback: "Great for gaming and work. The chair adapts to my needs perfectly.",
                        avatar: "from-teal-400 to-teal-600",
                        rating: 5
                      },
                      {
                        name: "Rachel S.",
                        role: "Content Writer",
                        feedback: "Stylish and comfortable. My writing sessions are much more enjoyable now.",
                        avatar: "from-orange-400 to-orange-600",
                        rating: 4
                      },
                      {
                        name: "James H.",
                        role: "CEO",
                        feedback: "Premium quality chair that matches my executive office perfectly.",
                        avatar: "from-gray-400 to-gray-600",
                        rating: 5
                      }
                    ].map((testimonial, index) => (
                      <div key={index} className={`p-3 rounded-lg transition-all duration-300 transform hover:scale-102 ${isDarkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-50 hover:bg-gray-100'}`}>
                        <div className="flex items-start space-x-3">
                          <div className={`w-8 h-8 bg-gradient-to-br ${testimonial.avatar} rounded-full flex-shrink-0`}></div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between mb-1">
                              <div>
                                <p className={`text-xs font-medium ${isDarkMode ? 'text-gray-200' : 'text-gray-800'}`}>
                                  {testimonial.name}
                                </p>
                                <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                                  {testimonial.role}
                                </p>
                              </div>
                              <div className="flex items-center">
                                {[...Array(testimonial.rating)].map((_, i) => (
                                  <svg key={i} className="w-3 h-3 text-yellow-400 fill-current" viewBox="0 0 20 20">
                                    <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/>
                                  </svg>
                                ))}
                              </div>
                            </div>
                            <p className={`text-xs leading-relaxed ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                              "{testimonial.feedback}"
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            

          </div>
        </div>
      </section>

      {/* Apple-style Product Grid */}
      <section className={`py-16 transition-colors duration-300 ${isDarkMode ? 'bg-gray-900' : 'bg-white'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Apple Events Style Card */}
          <div className="mb-6">
            <div className="group cursor-pointer rounded-3xl overflow-hidden transition-all duration-300 hover:scale-[1.01] bg-black">
              <div className="relative h-80 flex flex-col justify-center items-center p-8">
                <div className="text-center">
                  {/* Glowing Apple-style Logo */}
                  <div className="mb-6">
                    <div className="relative inline-block">
                      <div className="w-20 h-20 mx-auto mb-4 relative">
                        <div className="absolute inset-0 bg-gradient-to-br from-blue-400 via-purple-500 to-orange-400 rounded-full blur-lg opacity-80 animate-pulse"></div>
                        <div className="relative w-full h-full bg-gradient-to-br from-blue-400 via-purple-500 to-orange-400 rounded-full flex items-center justify-center">
                          <svg className="w-12 h-12 text-white" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M7 11h2v8H7v-8zm8 0h2v8h-2v-8zM5 9V7c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2v2h-2V7H7v2H5zm14 4v6c0 1.1-.9 2-2 2H7c-1.1 0-2-.9-2-2v-6h2v6h10v-6h2z"/>
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>
                  <h2 className="text-4xl font-light text-white mb-2">SuperChair events</h2>
                  <p className="text-lg text-gray-300 mb-6">Watch online on September 12 at 10 a.m. PT.</p>
                  <div className="flex justify-center">
                    <button className="bg-blue-600 text-white px-8 py-3 rounded-full text-sm font-medium hover:bg-blue-700 transition-colors">
                      Watch event
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                  <h2 className="text-3xl font-light text-white mb-2">H2 SERIES</h2>
                  <div className="flex justify-center space-x-3 mb-4">
                    <button className="bg-blue-600 text-white px-5 py-2 rounded-full text-sm font-medium hover:bg-blue-700 transition-colors">
                      Learn more
                    </button>
                    <button className="border border-white text-white px-5 py-2 rounded-full text-sm font-medium hover:bg-white hover:text-gray-900 transition-colors">
                      Buy
                    </button>
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
                  <h2 className="text-3xl font-light text-white mb-2">W2 SERIES</h2>
                  <div className="flex justify-center space-x-3 mb-4">
                    <button className="bg-blue-600 text-white px-5 py-2 rounded-full text-sm font-medium hover:bg-blue-700 transition-colors">
                      Learn more
                    </button>
                    <button className="border border-white text-white px-5 py-2 rounded-full text-sm font-medium hover:bg-white hover:text-gray-900 transition-colors">
                      Buy
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
                  <h2 className="text-3xl font-light text-white mb-2">H10 SERIES</h2>
                  <div className="flex justify-center space-x-3 mb-4">
                    <button className="bg-blue-600 text-white px-5 py-2 rounded-full text-sm font-medium hover:bg-blue-700 transition-colors">
                      Learn more
                    </button>
                    <button className="border border-white text-white px-5 py-2 rounded-full text-sm font-medium hover:bg-white hover:text-gray-900 transition-colors">
                      Buy
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
                  <h2 className="text-3xl font-light text-white mb-2">V2 SERIES</h2>
                  <div className="flex justify-center space-x-3 mb-4">
                    <button className="bg-blue-600 text-white px-5 py-2 rounded-full text-sm font-medium hover:bg-blue-700 transition-colors">
                      Learn more
                    </button>
                    <button className="border border-white text-white px-5 py-2 rounded-full text-sm font-medium hover:bg-white hover:text-gray-900 transition-colors">
                      Buy
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
                      <h2 className="text-3xl font-light text-white mb-2">NX SERIES</h2>
                      <div className="flex justify-center space-x-3">
                        <button className="bg-blue-600 text-white px-5 py-2 rounded-full text-sm font-medium hover:bg-blue-700 transition-colors">
                          Learn more
                        </button>
                        <button className="border border-white text-white px-5 py-2 rounded-full text-sm font-medium hover:bg-white hover:text-gray-900 transition-colors">
                          Buy
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
                      <h2 className="text-3xl font-light text-white mb-2">ERGONOMIC CHAIR</h2>
                      <p className="text-base text-gray-200 mb-4">(PRICE 1,000-3,000 THB)</p>
                      <div className="flex justify-center space-x-3">
                        <button className="bg-blue-600 text-white px-5 py-2 rounded-full text-sm font-medium hover:bg-blue-700 transition-colors">
                          Learn more
                        </button>
                        <button className="border border-white text-white px-5 py-2 rounded-full text-sm font-medium hover:bg-white hover:text-gray-900 transition-colors">
                          Buy
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Second Row of Small Cards - positioned after small cards */}
            <div className="md:col-span-2 mb-16">
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
                      <h2 className="text-3xl font-light text-white mb-2">EXECUTIVE CHAIR</h2>
                      <p className="text-base text-gray-200 mb-4">(PRICE 3,001-6,000 THB)</p>
                      <div className="flex justify-center space-x-3">
                        <button className="bg-blue-600 text-white px-5 py-2 rounded-full text-sm font-medium hover:bg-blue-700 transition-colors">
                          Learn more
                        </button>
                        <button className="border border-white text-white px-5 py-2 rounded-full text-sm font-medium hover:bg-white hover:text-gray-900 transition-colors">
                          Buy
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
                      <h2 className="text-3xl font-light text-white mb-2">CEO CHAIR</h2>
                      <p className="text-base text-gray-200 mb-4">(PRICE 6,001 THB or more)</p>
                      <div className="flex justify-center space-x-3">
                        <button className="bg-blue-600 text-white px-5 py-2 rounded-full text-sm font-medium hover:bg-blue-700 transition-colors">
                          Learn more
                        </button>
                        <button className="border border-white text-white px-5 py-2 rounded-full text-sm font-medium hover:bg-white hover:text-gray-900 transition-colors">
                          Buy
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="md:col-span-2 mb-16">
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
                      <h2 className="text-3xl font-light text-white mb-2">Auditrorium / Lecture / BENCH CHAIR</h2>
                      <div className="flex justify-center space-x-3">
                        <button className="bg-blue-600 text-white px-5 py-2 rounded-full text-sm font-medium hover:bg-blue-700 transition-colors">
                          Learn more
                        </button>
                        <button className="border border-white text-white px-5 py-2 rounded-full text-sm font-medium hover:bg-white hover:text-gray-900 transition-colors">
                          Buy
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
                      <h2 className="text-3xl font-light text-white mb-2">OTHER</h2>
                      <div className="flex justify-center space-x-3">
                        <button className="bg-blue-600 text-white px-5 py-2 rounded-full text-sm font-medium hover:bg-blue-700 transition-colors">
                          Learn more
                        </button>
                        <button className="border border-white text-white px-5 py-2 rounded-full text-sm font-medium hover:bg-white hover:text-gray-900 transition-colors">
                          Buy
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Featured Spatial Experience Section */}
          <div className={`rounded-3xl overflow-hidden transition-colors duration-300 ${isDarkMode ? 'glass-card-dark bg-gray-800/60' : 'glass-card bg-white/80'}`}>
            <div className="grid grid-cols-1 lg:grid-cols-2 items-center min-h-[400px]">
              <div className="p-12 flex items-center justify-center">
                <img
                  src="https://images.pexels.com/photos/1957477/pexels-photo-1957477.jpeg?auto=compress&cs=tinysrgb&w=300"
                  alt="Ergonomic Chair"
                  className="w-64 h-64 object-cover rounded-2xl"
                />
              </div>
              <div className="p-12">
                <h2 className={`text-3xl font-bold mb-4 transition-colors duration-300 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                  {t('home.ultimate_comfort_title')}
                </h2>
                <p className={`mb-8 leading-relaxed transition-colors duration-300 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                  <Trans i18nKey="home.ultimate_comfort_desc">
                    Enhance your workspace with chairs designed for comfort<br />balanced support and top performance in every task
                  </Trans>
                </p>
                <button onClick={handleShopChairsClick} className={`px-8 py-3 rounded-full text-sm font-medium transition-all duration-300 transform hover:scale-105 hover:shadow-lg active:scale-95 ${isDarkMode ? 'bg-white text-black hover:bg-gray-200' : 'bg-black text-white hover:bg-gray-800'}`}>
                  {t('home.shop_chairs')}
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className={`py-20 transition-colors duration-300 ${isDarkMode ? 'bg-gray-50' : 'bg-gray-50'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`rounded-3xl p-12 text-center shadow-sm transition-colors duration-300 ${isDarkMode ? 'glass-card-dark bg-gray-800/50' : 'glass-card bg-white/70'}`}>
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
          </div>
        </div>
      </section>

      {/* Section 5: Latest Articles */}
      <section className={`py-20 transition-colors duration-300 ${isDarkMode ? 'bg-gray-900' : 'bg-white'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-12">
            <h2 className={`text-3xl font-bold transition-colors duration-300 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{t('home.latest_articles')}</h2>
            <button className={`flex items-center text-sm font-medium hover:translate-x-1 transition-transform ${isDarkMode ? 'text-white' : 'text-black'}`}>
              {t('home.view_all_articles')} <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 hover:translate-x-1" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
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
          </div>
        </div>
      </section>

    </div>
  );
};

export default Home;
