import React from 'react';
import { ShoppingCart, Shield, Sun, Moon, Languages, ShoppingBag, Info, Newspaper, Phone } from 'lucide-react';
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
    <header 
      className={`sticky top-0 z-50 transition-colors duration-300 border-b bg-cover bg-center bg-no-repeat ${isDarkMode ? 'glass-nav-dark border-gray-800/50' : 'glass-nav border-gray-100/50'}`}
      style={{
        backgroundImage: 'url("https://ik.imagekit.io/lfzeyp6hte/Gemini_Generated_Image_7u9uek7u9uek7u9u.png?updatedAt=1766655141537")',
        backgroundColor: 'black'
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <img
              src={'https://ik.imagekit.io/lfzeyp6hte/_f4d400.png'}
              alt="SUPR"
              className="h-[60px] w-auto"
            />
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex space-x-8">
            <Link to="/products" className="text-sm transition-colors text-gray-300 hover:text-white">Products</Link>
            <Link to="/about" className="text-sm transition-colors text-gray-300 hover:text-white">About</Link>
            <Link to="/articles" className="text-sm transition-colors text-gray-300 hover:text-white">Articles</Link>
            <Link to="/contact" className="text-sm transition-colors text-gray-300 hover:text-white">Contact</Link>
          </nav>

          <div className="md:hidden" />

          {/* Search and Cart */}
          <div className="flex items-center space-x-4">

            
            {/* Dark Mode Toggle */}
            <button
              onClick={toggleDarkMode}
              className={`p-2 rounded-full transition-colors ${isDarkMode ? 'glass-button-dark text-mustard-400' : 'glass-button text-gray-300'}`}
              aria-label="Toggle dark mode"
            >
              {isDarkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </button>

            {/* Language Toggle */}
            <button
              onClick={toggleLanguage}
              className="p-2 rounded-full transition-colors glass-button text-gray-300 hover:text-white"
              aria-label="Toggle language"
            >
              <Languages className="h-4 w-4" />
            </button>
            
            <div className="relative" id="cart-target">
              <Link to="/cart">
                <ShoppingCart className="h-5 w-5 cursor-pointer transition-colors text-gray-300 hover:text-white" />
              </Link>
              <span className="absolute -top-2 -right-2 bg-mustard-500 text-black text-xs rounded-full h-4 w-4 flex items-center justify-center text-[10px] font-bold">{items.length}</span>
            </div>
          </div>
        </div>
      </div>
    </header>
    <div className={`md:hidden border-b ${isDarkMode ? 'border-gray-800 bg-gray-900' : 'border-gray-200 bg-white'}`}>
      <div className="max-w-7xl mx-auto px-4 py-2 flex items-center justify-center gap-3 overflow-x-auto">
        <Link to="/products" className={`px-3 py-2 rounded-full text-sm font-medium ${isDarkMode ? 'bg-gray-800 text-gray-200 hover:bg-gray-700' : 'bg-gray-100 text-gray-800 hover:bg-gray-200'}`}>Products</Link>
        <Link to="/about" className={`px-3 py-2 rounded-full text-sm font-medium ${isDarkMode ? 'bg-gray-800 text-gray-200 hover:bg-gray-700' : 'bg-gray-100 text-gray-800 hover:bg-gray-200'}`}>About</Link>
        <Link to="/articles" className={`px-3 py-2 rounded-full text-sm font-medium ${isDarkMode ? 'bg-gray-800 text-gray-200 hover:bg-gray-700' : 'bg-gray-100 text-gray-800 hover:bg-gray-200'}`}>Articles</Link>
        <Link to="/contact" className={`px-3 py-2 rounded-full text-sm font-medium ${isDarkMode ? 'bg-gray-800 text-gray-200 hover:bg-gray-700' : 'bg-gray-100 text-gray-800 hover:bg-gray-200'}`}>Contact</Link>
      </div>
    </div>
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

            <Link to="/products" onClick={() => setMobileOpen(false)} className={`flex items-center gap-3 px-4 py-3 rounded-xl border transition-colors ${isDarkMode ? 'border-gray-700 hover:bg-gray-800 text-gray-200' : 'border-gray-200 hover:bg-gray-100 text-gray-800'}`}>
              <ShoppingBag className="h-5 w-5" />
              <span className="text-sm font-medium">Products</span>
            </Link>
            <Link to="/about" onClick={() => setMobileOpen(false)} className={`flex items-center gap-3 px-4 py-3 rounded-xl border transition-colors ${isDarkMode ? 'border-gray-700 hover:bg-gray-800 text-gray-200' : 'border-gray-200 hover:bg-gray-100 text-gray-800'}`}>
              <Info className="h-5 w-5" />
              <span className="text-sm font-medium">About</span>
            </Link>
            <Link to="/articles" onClick={() => setMobileOpen(false)} className={`flex items-center gap-3 px-4 py-3 rounded-xl border transition-colors ${isDarkMode ? 'border-gray-700 hover:bg-gray-800 text-gray-200' : 'border-gray-200 hover:bg-gray-100 text-gray-800'}`}>
              <Newspaper className="h-5 w-5" />
              <span className="text-sm font-medium">Articles</span>
            </Link>
            <Link to="/contact" onClick={() => setMobileOpen(false)} className={`flex items-center gap-3 px-4 py-3 rounded-xl border transition-colors ${isDarkMode ? 'border-gray-700 hover:bg-gray-800 text-gray-200' : 'border-gray-200 hover:bg-gray-100 text-gray-800'}`}>
              <Phone className="h-5 w-5" />
              <span className="text-sm font-medium">Contact</span>
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
