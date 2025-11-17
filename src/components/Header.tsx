import React from 'react';
import { Search, ShoppingCart, Shield, Sun, Moon, Languages, ShoppingBag, Info, Newspaper, Phone } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

interface HeaderProps {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
}

const Header: React.FC<HeaderProps> = ({ isDarkMode, toggleDarkMode }) => {
  const { t, i18n } = useTranslation();
  const { items } = useCart();
  const [mobileOpen, setMobileOpen] = React.useState(false);

  React.useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMobileOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  const toggleLanguage = () => {
    const newLang = i18n.language === 'en' ? 'th' : 'en';
    i18n.changeLanguage(newLang);
  };

  return (
    <>
    <header className={`sticky top-0 z-50 transition-colors duration-300 border-b ${isDarkMode ? 'glass-nav-dark border-gray-800/50' : 'glass-nav border-gray-100/50'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <Shield className={`h-6 w-6 mr-2 ${isDarkMode ? 'text-white' : 'text-black'}`} />
            <span className={`text-lg font-semibold ${isDarkMode ? 'text-white' : 'text-black'}`}>SUPR</span>
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex space-x-8">
            <Link to="/products" className={`text-sm transition-colors ${isDarkMode ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-black'}`}>{t('nav.products')}</Link>
            <Link to="/about" className={`text-sm transition-colors ${isDarkMode ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-black'}`}>{t('nav.about')}</Link>
            <Link to="/articles" className={`text-sm transition-colors ${isDarkMode ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-black'}`}>{t('nav.articles')}</Link>
            <Link to="/contact" className={`text-sm transition-colors ${isDarkMode ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-black'}`}>{t('nav.contact')}</Link>
          </nav>

          {/* Mobile menu button */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className={`md:hidden p-2 rounded-full transition-colors ${isDarkMode ? 'glass-button-dark text-gray-300' : 'glass-button text-gray-600'}`}
            aria-label="Toggle menu"
            aria-expanded={mobileOpen}
          >
            <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="18" x2="21" y2="18"/></svg>
          </button>

          {/* Search and Cart */}
          <div className="flex items-center space-x-4">
            <div className="relative hidden sm:block">
              <input
                type="text"
                placeholder={t('nav.search')}
                className={`pl-4 pr-10 py-2 text-sm border rounded-full focus:outline-none focus:ring-1 w-64 transition-colors ${isDarkMode ? 'bg-gray-800 border-gray-700 text-white placeholder-gray-400 focus:ring-gray-600 focus:border-gray-600' : 'bg-white border-gray-200 text-black placeholder-gray-500 focus:ring-gray-300 focus:border-gray-300'}`}
              />
              <Search className={`absolute right-3 top-2.5 h-4 w-4 ${isDarkMode ? 'text-gray-400' : 'text-gray-400'}`} />
            </div>
            
            {/* Dark Mode Toggle */}
            <button
              onClick={toggleDarkMode}
              className={`p-2 rounded-full transition-colors ${isDarkMode ? 'glass-button-dark text-yellow-400' : 'glass-button text-gray-600'}`}
              aria-label="Toggle dark mode"
            >
              {isDarkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </button>

            {/* Language Toggle */}
            <button
              onClick={toggleLanguage}
              className={`p-2 rounded-full transition-colors ${isDarkMode ? 'glass-button-dark text-gray-300' : 'glass-button text-gray-600'}`}
              aria-label="Toggle language"
            >
              <Languages className="h-4 w-4" />
            </button>
            
            <div className="relative">
              <Link to="/cart">
                <ShoppingCart className={`h-5 w-5 cursor-pointer transition-colors ${isDarkMode ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-black'}`} />
              </Link>
              <span className="absolute -top-2 -right-2 bg-black text-white text-xs rounded-full h-4 w-4 flex items-center justify-center text-[10px]">{items.length}</span>
            </div>
          </div>
        </div>
      </div>
    </header>
    {/* Mobile nav panel */}
    {mobileOpen && (
      <>
        <div
          onClick={() => setMobileOpen(false)}
          className="fixed inset-0 bg-black/30 md:hidden z-40"
          aria-hidden
        />
        <div className={`fixed top-16 left-0 right-0 md:hidden z-50 border-b shadow-lg ${isDarkMode ? 'border-gray-800 bg-gray-900' : 'border-gray-200 bg-white'}`}>
          <div className="px-4 py-4 space-y-4">
            <div className="relative">
              <input
                type="text"
                placeholder={t('nav.search')}
                className={`w-full pl-4 pr-10 py-3 text-sm border rounded-xl focus:outline-none focus:ring-1 transition-colors ${isDarkMode ? 'bg-gray-800 border-gray-700 text-white placeholder-gray-400 focus:ring-gray-600 focus:border-gray-600' : 'bg-white border-gray-200 text-black placeholder-gray-500 focus:ring-gray-300 focus:border-gray-300'}`}
              />
              <Search className={`absolute right-3 top-2.5 h-4 w-4 ${isDarkMode ? 'text-gray-400' : 'text-gray-400'}`} />
            </div>
            <Link to="/products" onClick={() => setMobileOpen(false)} className={`flex items-center gap-3 px-4 py-3 rounded-xl border transition-colors ${isDarkMode ? 'border-gray-700 hover:bg-gray-800 text-gray-200' : 'border-gray-200 hover:bg-gray-100 text-gray-800'}`}>
              <ShoppingBag className="h-5 w-5" />
              <span className="text-sm font-medium">{t('nav.products')}</span>
            </Link>
            <Link to="/about" onClick={() => setMobileOpen(false)} className={`flex items-center gap-3 px-4 py-3 rounded-xl border transition-colors ${isDarkMode ? 'border-gray-700 hover:bg-gray-800 text-gray-200' : 'border-gray-200 hover:bg-gray-100 text-gray-800'}`}>
              <Info className="h-5 w-5" />
              <span className="text-sm font-medium">{t('nav.about')}</span>
            </Link>
            <Link to="/articles" onClick={() => setMobileOpen(false)} className={`flex items-center gap-3 px-4 py-3 rounded-xl border transition-colors ${isDarkMode ? 'border-gray-700 hover:bg-gray-800 text-gray-200' : 'border-gray-200 hover:bg-gray-100 text-gray-800'}`}>
              <Newspaper className="h-5 w-5" />
              <span className="text-sm font-medium">{t('nav.articles')}</span>
            </Link>
            <Link to="/contact" onClick={() => setMobileOpen(false)} className={`flex items-center gap-3 px-4 py-3 rounded-xl border transition-colors ${isDarkMode ? 'border-gray-700 hover:bg-gray-800 text-gray-200' : 'border-gray-200 hover:bg-gray-100 text-gray-800'}`}>
              <Phone className="h-5 w-5" />
              <span className="text-sm font-medium">{t('nav.contact')}</span>
            </Link>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setMobileOpen(false) || toggleDarkMode()}
                className={`flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-colors ${isDarkMode ? 'bg-gray-800 text-gray-200 hover:bg-gray-700' : 'bg-gray-100 text-gray-800 hover:bg-gray-200'}`}
              >
                {isDarkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
                {isDarkMode ? 'Light' : 'Dark'}
              </button>
              <button
                onClick={() => { const newLang = i18n.language === 'en' ? 'th' : 'en'; i18n.changeLanguage(newLang); setMobileOpen(false); }}
                className={`flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-colors ${isDarkMode ? 'bg-gray-800 text-gray-200 hover:bg-gray-700' : 'bg-gray-100 text-gray-800 hover:bg-gray-200'}`}
              >
                <Languages className="h-4 w-4" />
                {i18n.language === 'en' ? 'ภาษาไทย' : 'English'}
              </button>
            </div>
          </div>
        </div>
      </>
    )}
    </>
  );
};

export default Header;
