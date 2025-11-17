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

const App = () => {
  const [isDarkMode, setIsDarkMode] = React.useState(false);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <Router>
      <div className="min-h-screen transition-colors duration-300">
        <Header isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />
        
        <SocialSidebar isDarkMode={isDarkMode} />
        
        <Routes>
          <Route path="/" element={<Home isDarkMode={isDarkMode} />} />
          <Route path="/products" element={<Products isDarkMode={isDarkMode} />} />
          <Route path="/about" element={<About isDarkMode={isDarkMode} />} />
          <Route path="/articles" element={<Articles isDarkMode={isDarkMode} />} />
          <Route path="/contact" element={<Contact isDarkMode={isDarkMode} />} />
          <Route path="/cart" element={<Cart isDarkMode={isDarkMode} />} />
          <Route path="/customize/:id" element={<Customize />} />
          <Route path="/product/:id" element={<ProductDetail isDarkMode={isDarkMode} />} />
        </Routes>
        
        <Footer isDarkMode={isDarkMode} />
      </div>
    </Router>
  );
};

export default App;
