import React from 'react';
import { Facebook, Instagram } from 'lucide-react';
import ChatWidget from './ChatWidget';

interface SocialSidebarProps {
  isDarkMode: boolean;
}

const SocialSidebar: React.FC<SocialSidebarProps> = ({ isDarkMode }) => {
  return (
    <>
    {/* Desktop vertical sidebar */}
    <div className="hidden md:flex fixed right-6 top-1/2 transform -translate-y-1/2 z-50 flex-col gap-4">
      <a
        href="https://www.facebook.com/superchairofficial"
        target="_blank"
        rel="noopener noreferrer"
        className={`p-3 rounded-full shadow-lg transition-all duration-300 hover:scale-110 group ${
          isDarkMode 
            ? 'bg-gray-800 hover:bg-blue-600 text-gray-300 hover:text-white' 
            : 'bg-white hover:bg-blue-600 text-gray-600 hover:text-white'
        }`}
        aria-label="Follow us on Facebook"
      >
        <Facebook className="h-4 w-4" />
      </a>
      
      <a
        href="https://www.instagram.com/superchair_th/?fbclid=IwY2xjawNpbiNleHRuA2FlbQIxMABicmlkETBhRDVUTWZDSjZRTFNGYmRjAR5BXIb4XuimoUoeev5UR-UXTIV35upqrW0ysauKep32BnYF4j7lAXexPrHg7g_aem_zQyt-txWOtYurtt70_uVxg#"
        target="_blank"
        rel="noopener noreferrer"
        className={`p-3 rounded-full shadow-lg transition-all duration-300 hover:scale-110 group relative overflow-hidden ${
          isDarkMode 
            ? 'bg-gray-800 text-gray-300 hover:text-white' 
            : 'bg-white text-gray-600 hover:text-white'
        }`}
        aria-label="Follow us on Instagram"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-purple-500 via-pink-500 to-orange-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full"></div>
        <Instagram className="h-4 w-4 relative z-10" />
      </a>
      
      <a
        href="https://www.tiktok.com/@superoffice_chair"
        target="_blank"
        rel="noopener noreferrer"
        className={`p-3 rounded-full shadow-lg transition-all duration-300 hover:scale-110 group ${
          isDarkMode 
            ? 'bg-gray-800 hover:bg-black text-gray-300 hover:text-white' 
            : 'bg-white hover:bg-black text-gray-600 hover:text-white'
        }`}
        aria-label="Follow us on TikTok"
      >
        <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
          <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
        </svg>
      </a>
      
      <ChatWidget isDarkMode={isDarkMode} />
    </div>

    {/* Mobile bottom bar */}
    <div className="md:hidden fixed bottom-4 left-0 right-0 z-50 flex justify-center">
      <div className={`flex items-center gap-4 px-4 py-2 rounded-full shadow-lg ${isDarkMode ? 'bg-gray-800/90 backdrop-blur text-gray-200' : 'bg-white/90 backdrop-blur text-gray-700'}`}>
        <a href="https://www.facebook.com/superchairofficial" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="p-2 rounded-full">
          <Facebook className="h-5 w-5" />
        </a>
        <a href="https://www.tiktok.com/@superoffice_chair" target="_blank" rel="noopener noreferrer" aria-label="TikTok" className="p-2 rounded-full">
          <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/></svg>
        </a>
        <a href="https://www.instagram.com/superchair_th/?fbclid=IwY2xjawNpbiNleHRuA2FlbQIxMABicmlkETBhRDVUTWZDSjZRTFNGYmRjAR5BXIb4XuimoUoeev5UR-UXTIV35upqrW0ysauKep32BnYF4j7lAXexPrHg7g_aem_zQyt-txWOtYurtt70_uVxg#" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="p-2 rounded-full">
          <Instagram className="h-5 w-5" />
        </a>
        <a href={import.meta.env.VITE_LINE_URL ?? 'https://shop.line.me/@superchair'} target="_blank" rel="noopener noreferrer" aria-label="LINE" className="p-2 rounded-full">
          <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor"><path d="M20.667 4H3.333A1.333 1.333 0 0 0 2 5.333v13.334C2 19.6 2.4 20 2.889 20h0.444L6.667 17.333h14A1.333 1.333 0 0 0 22 16V5.333A1.333 1.333 0 0 0 20.667 4Z"/></svg>
        </a>
      </div>
    </div>
    </>
  );
};

export default SocialSidebar;
