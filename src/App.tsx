import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import SocialSidebar from './components/SocialSidebar';
import Home from './pages/Home';
import Products from './pages/Products';
import About from './pages/About';
import Articles from './pages/Articles';
import Contact from './pages/Contact';
import Cart from './pages/Cart';
import Customize from './pages/Customize';
import ProductDetail from './pages/ProductDetail';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';
import { CartProvider } from './context/CartContext';
import { AuthProvider } from './context/AuthContext';

const App = () => {
  const [isDarkMode, setIsDarkMode] = React.useState(false);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  React.useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  return (
    <Router>
      <React.Suspense fallback={<div className="min-h-screen flex items-center justify-center text-gray-700">Loading…</div>}>
        <AuthProvider>
          <CartProvider>
            <div className="min-h-screen transition-colors duration-300">
              <Header isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />
              <SocialSidebar isDarkMode={isDarkMode} />
              {/** Error Boundary to avoid blank screens on runtime errors */}
              <ErrorBoundary>
                <Routes>
                  <Route path="/" element={<Home isDarkMode={isDarkMode} />} />
                  <Route path="/products" element={<Products isDarkMode={isDarkMode} />} />
                  <Route path="/about" element={<About isDarkMode={isDarkMode} />} />
                  <Route path="/articles" element={<Articles isDarkMode={isDarkMode} />} />
                  <Route path="/contact" element={<Contact isDarkMode={isDarkMode} />} />
                  <Route path="/cart" element={<Cart isDarkMode={isDarkMode} />} />
                  <Route path="/customize/:id" element={<Customize />} />
                  <Route path="/product/:id" element={<ProductDetail isDarkMode={isDarkMode} />} />
                  <Route path="/admin/login" element={<AdminLogin />} />
                  <Route path="/admin/dashboard" element={<AdminDashboard />} />
                </Routes>
              </ErrorBoundary>
              <Footer isDarkMode={isDarkMode} />
            </div>
          </CartProvider>
        </AuthProvider>
      </React.Suspense>
    </Router>
  );
};

export default App;

class ErrorBoundary extends React.Component<React.PropsWithChildren<{}>, { hasError: boolean; error?: any }>{
  constructor(props: React.PropsWithChildren<{}>) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError(error: any) {
    return { hasError: true, error };
  }
  componentDidCatch(error: any, info: any) {
    console.error('ErrorBoundary captured error:', error, info);
  }
  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex flex-col items-center justify-center p-6 text-center">
          <h1 className="text-2xl font-bold mb-2">Something went wrong</h1>
          <p className="text-sm text-gray-600 mb-4">Please refresh the page. We’ve logged the error.</p>
          <a href="/" className="px-4 py-2 rounded-full bg-black text-white">Back to Home</a>
        </div>
      );
    }
    return this.props.children;
  }
}
