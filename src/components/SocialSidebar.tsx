import React, { useState } from 'react';
import { Facebook, Instagram, Contact, X, Phone } from 'lucide-react';
import { Tooltip } from './ui/Tooltip';

interface SocialSidebarProps {
  isDarkMode: boolean;
}

const SocialSidebar: React.FC<SocialSidebarProps> = ({ isDarkMode }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
    {/* Desktop vertical sidebar */}
    <div className="hidden md:flex fixed right-6 top-1/2 transform -translate-y-1/2 z-50 flex-col gap-4 items-center transition-all duration-300">
      
      {/* Menu Items */}
      <div className={`flex flex-col gap-4 transition-all duration-300 ${
        isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none absolute'
      }`}>
        <Tooltip content="Facebook" position="left">
          <a
            href="https://www.facebook.com/superchairofficial"
            target="_blank"
            rel="noopener noreferrer"
            className={`p-3 rounded-full shadow-lg transition-all duration-300 hover:scale-110 ${
              isDarkMode 
                ? 'glass-button-dark text-gray-200' 
                : 'glass-button text-gray-700'
            }`}
            aria-label="Follow us on Facebook"
          >
            <Facebook className="h-4 w-4" />
          </a>
        </Tooltip>
        
        <Tooltip content="Instagram" position="left">
          <a
            href="https://www.instagram.com/superchair_th/?fbclid=IwY2xjawNpbiNleHRuA2FlbQIxMABicmlkETBhRDVUTWZDSjZRTFNGYmRjAR5BXIb4XuimoUoeev5UR-UXTIV35upqrW0ysauKep32BnYF4j7lAXexPrHg7g_aem_zQyt-txWOtYurtt70_uVxg#"
            target="_blank"
            rel="noopener noreferrer"
            className={`p-3 rounded-full shadow-lg transition-all duration-300 hover:scale-110 relative overflow-hidden ${
              isDarkMode 
                ? 'glass-button-dark text-gray-200' 
                : 'glass-button text-gray-700'
            }`}
            aria-label="Follow us on Instagram"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500 via-pink-500 to-orange-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full"></div>
            <Instagram className="h-4 w-4 relative z-10" />
          </a>
        </Tooltip>
        
        <Tooltip content="TikTok" position="left">
          <a
            href="https://www.tiktok.com/@superoffice_chair"
            target="_blank"
            rel="noopener noreferrer"
            className={`p-3 rounded-full shadow-lg transition-all duration-300 hover:scale-110 ${
              isDarkMode 
                ? 'glass-button-dark text-gray-200' 
                : 'glass-button text-gray-700'
            }`}
            aria-label="Follow us on TikTok"
          >
            <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
            </svg>
          </a>
        </Tooltip>
        
        <Tooltip content="LINE" position="left">
          <a
            href={import.meta.env.VITE_LINE_URL ?? 'https://shop.line.me/@superchair'}
            target="_blank"
            rel="noopener noreferrer"
            className={`p-3 rounded-full shadow-lg transition-all duration-300 hover:scale-110 ${
              isDarkMode 
                ? 'glass-button-dark text-gray-200' 
                : 'glass-button text-gray-700'
            }`}
            aria-label="Add us on LINE"
          >
            <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor"><path d="M20.667 4H3.333A1.333 1.333 0 0 0 2 5.333v13.334C2 19.6 2.4 20 2.889 20h0.444L6.667 17.333h14A1.333 1.333 0 0 0 22 16V5.333A1.333 1.333 0 0 0 20.667 4Z"/></svg>
          </a>
        </Tooltip>

        <Tooltip content="Call Us" position="left">
          <a
            href="tel:+66918153818"
            className={`p-3 rounded-full shadow-lg transition-all duration-300 hover:scale-110 ${
              isDarkMode 
                ? 'glass-button-dark text-gray-200' 
                : 'glass-button text-gray-700'
            }`}
            aria-label="Call us"
          >
            <Phone className="h-4 w-4" />
          </a>
        </Tooltip>
      </div>

      {/* Main Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`relative p-3 rounded-full shadow-lg transition-all duration-300 hover:scale-110 z-50 ${
          isDarkMode 
            ? 'glass-button-dark text-gray-200' 
            : 'glass-button text-gray-700'
        } ${isOpen ? 'rotate-90' : ''}`}
        aria-label="Toggle social menu"
      >
        <span className="absolute inset-0 rounded-full bg-mustard-400 opacity-20 animate-ping"></span>
        <span className="absolute inset-0 rounded-full bg-mustard-400 opacity-20 animate-pulse"></span>
        {isOpen ? <X className="h-4 w-4 relative z-10" /> : <Contact className="h-4 w-4 relative z-10" />}
      </button>
    </div>

    {/* Mobile bottom bar */}
    <div className="md:hidden fixed bottom-4 left-0 right-0 z-50 flex justify-center">
      <div className={`flex items-center gap-4 px-4 py-2 rounded-full shadow-lg ${isDarkMode ? 'glass-card-dark' : 'glass-card'}`}>
        <Tooltip content="Facebook" position="top">
          <a href="https://www.facebook.com/superchairofficial" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className={`${isDarkMode ? 'glass-button-dark' : 'glass-button'} p-2 rounded-full`}>
            <Facebook className="h-5 w-5" />
          </a>
        </Tooltip>

        <Tooltip content="TikTok" position="top">
          <a href="https://www.tiktok.com/@superoffice_chair" target="_blank" rel="noopener noreferrer" aria-label="TikTok" className={`${isDarkMode ? 'glass-button-dark' : 'glass-button'} p-2 rounded-full`}>
            <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/></svg>
          </a>
        </Tooltip>

        <Tooltip content="Instagram" position="top">
          <a href="https://www.instagram.com/superchair_th/?fbclid=IwY2xjawNpbiNleHRuA2FlbQIxMABicmlkETBhRDVUTWZDSjZRTFNGYmRjAR5BXIb4XuimoUoeev5UR-UXTIV35upqrW0ysauKep32BnYF4j7lAXexPrHg7g_aem_zQyt-txWOtYurtt70_uVxg#" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className={`${isDarkMode ? 'glass-button-dark' : 'glass-button'} p-2 rounded-full`}>
            <Instagram className="h-5 w-5" />
          </a>
        </Tooltip>

        <Tooltip content="LINE" position="top">
          <a href={import.meta.env.VITE_LINE_URL ?? 'https://shop.line.me/@superchair'} target="_blank" rel="noopener noreferrer" aria-label="LINE" className={`${isDarkMode ? 'glass-button-dark' : 'glass-button'} p-2 rounded-full`}>
            <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor"><path d="M20.667 4H3.333A1.333 1.333 0 0 0 2 5.333v13.334C2 19.6 2.4 20 2.889 20h0.444L6.667 17.333h14A1.333 1.333 0 0 0 22 16V5.333A1.333 1.333 0 0 0 20.667 4Z"/></svg>
          </a>
        </Tooltip>

        <Tooltip content="Call Us" position="top">
          <a href="tel:+66918153818" aria-label="Call us" className={`${isDarkMode ? 'glass-button-dark' : 'glass-button'} p-2 rounded-full`}>
            <Phone className="h-5 w-5" />
          </a>
        </Tooltip>
      </div>
    </div>
    </>
  );
};

export default SocialSidebar;
