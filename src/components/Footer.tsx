import React from 'react';
import { Shield, Facebook, Instagram } from 'lucide-react';

interface FooterProps {
  isDarkMode: boolean;
}

const Footer: React.FC<FooterProps> = ({ isDarkMode }) => {
  return (
    <footer className={`py-16 transition-colors duration-300 ${isDarkMode ? 'bg-black text-white' : 'bg-black text-white'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Logo and Newsletter */}
          <div className="md:col-span-2">
            <div className="flex items-center mb-6">
              <Shield className="h-6 w-6 text-white mr-2" />
              <span className="text-lg font-semibold">SUPR</span>
            </div>
            <p className="text-gray-400 mb-6 max-w-md text-sm leading-relaxed">
              Start with confidence and trust—made with the "Be Comfortable" recipe. Transform your workspace, improve your posture, and feel great about your health.
            </p>
          <div className="flex gap-3">
            <input
                type="email"
                placeholder="Your email address"
                className={`flex-1 px-4 py-3 border rounded-full focus:outline-none focus:ring-1 text-white placeholder-gray-400 text-sm ${isDarkMode ? 'bg-gray-700 border-gray-600 focus:ring-gray-500' : 'bg-gray-800 border-gray-700 focus:ring-gray-600'}`}
              />
              <button className={`px-6 py-3 rounded-full text-sm font-medium transition-colors ${isDarkMode ? 'bg-gray-200 text-black hover:bg-gray-300' : 'bg-white text-black hover:bg-gray-200'}`}>
                Subscribe
              </button>
            </div>
          </div>

          {/* Shop Links */}
          <div>
            <h3 className="font-medium mb-4 text-sm">Shop</h3>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li><a href="#" className="hover:text-white transition-colors">Store</a></li>
              <li><a href="#" className="hover:text-white transition-colors">About</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Support</a></li>
            </ul>
          </div>

          {/* Product Links */}
          <div>
            <h3 className="font-medium mb-4 text-sm">Product Catalog</h3>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li><a href="#" className="hover:text-white transition-colors">Blog Catalog</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Licenses</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Changelog</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Style Guide</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-xs mb-4 md:mb-0">
            © Copyright 2025 by SUPR. All rights reserved.
          </p>
          <div className="flex space-x-4">
            <a href="https://www.facebook.com/superchairofficial" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
              <Facebook className="h-4 w-4 text-gray-400 hover:text-white cursor-pointer transition-colors" />
            </a>
            <a href="https://www.tiktok.com/@superoffice_chair" target="_blank" rel="noopener noreferrer" aria-label="TikTok">
              <svg className="h-4 w-4 text-gray-400 hover:text-white cursor-pointer transition-colors" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
              </svg>
            </a>
            <a href="https://www.instagram.com/superchair_th/?fbclid=IwY2xjawNpbiNleHRuA2FlbQIxMABicmlkETBhRDVUTWZDSjZRTFNGYmRjAR5BXIb4XuimoUoeev5UR-UXTIV35upqrW0ysauKep32BnYF4j7lAXexPrHg7g_aem_zQyt-txWOtYurtt70_uVxg#" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
              <Instagram className="h-4 w-4 text-gray-400 hover:text-white cursor-pointer transition-colors" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
