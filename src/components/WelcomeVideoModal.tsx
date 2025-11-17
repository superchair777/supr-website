import React, { useState, useEffect } from 'react';
import { X, Play, Volume2, VolumeX } from 'lucide-react';

interface WelcomeVideoModalProps {
  isDarkMode: boolean;
}

const WelcomeVideoModal: React.FC<WelcomeVideoModalProps> = ({ isDarkMode }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    // Check if user has seen the welcome video before
    const hasSeenWelcome = localStorage.getItem('hasSeenWelcomeVideo');
    
    if (!hasSeenWelcome) {
      // Show modal after a short delay for better UX
      const timer = setTimeout(() => {
        setIsOpen(true);
      }, 1000);
      
      return () => clearTimeout(timer);
    }
  }, []);

  const handleClose = () => {
    setIsOpen(false);
    // Mark that user has seen the welcome video
    localStorage.setItem('hasSeenWelcomeVideo', 'true');
  };

  const handleSkip = () => {
    handleClose();
  };

  const handleWatchVideo = () => {
    setIsPlaying(true);
    setIsMuted(false);
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-[100] p-4">
      <div className={`max-w-4xl w-full rounded-3xl overflow-hidden transition-colors duration-300 ${isDarkMode ? 'bg-gray-900' : 'bg-white'}`}>
        {/* Modal Header */}
        <div className={`flex items-center justify-between p-6 border-b transition-colors duration-300 ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}>
          <div>
            <h2 className={`text-2xl font-bold transition-colors duration-300 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              Welcome to SUPR! 🪑
            </h2>
            <p className={`text-sm mt-1 transition-colors duration-300 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              Discover the future of ergonomic seating
            </p>
          </div>
          <button
            onClick={handleClose}
            className={`p-2 rounded-full transition-colors ${isDarkMode ? 'hover:bg-gray-800 text-gray-400 hover:text-white' : 'hover:bg-gray-100 text-gray-500 hover:text-gray-700'}`}
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        {/* Video Content */}
        <div className="relative">
          {!isPlaying ? (
            // Video Thumbnail/Preview
            <div className="relative aspect-video bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600">
              <div className="absolute inset-0 bg-black bg-opacity-30"></div>
              
              {/* Background Pattern */}
              <div className="absolute inset-0 opacity-10">
                <div className="w-full h-full bg-gradient-to-r from-transparent via-white to-transparent transform rotate-12 scale-150"></div>
              </div>
              
              {/* Content Overlay */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center text-white">
                  <div className="mb-6">
                    <div className="w-24 h-24 mx-auto mb-4 bg-white bg-opacity-20 rounded-full flex items-center justify-center backdrop-blur-sm">
                      <Play className="h-12 w-12 text-white ml-1" />
                    </div>
                    <h3 className="text-3xl font-bold mb-2">Experience Ultimate Comfort</h3>
                    <p className="text-lg opacity-90 max-w-md mx-auto">
                      See how our ergonomic chairs transform workspaces and improve lives
                    </p>
                  </div>
                  
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <button
                      onClick={handleWatchVideo}
                      className="px-8 py-4 bg-white text-gray-900 rounded-full font-semibold hover:bg-gray-100 transition-colors flex items-center justify-center gap-2"
                    >
                      <Play className="h-5 w-5" />
                      Watch Video (2:34)
                    </button>
                    <button
                      onClick={handleSkip}
                      className="px-8 py-4 bg-transparent border-2 border-white text-white rounded-full font-semibold hover:bg-white hover:text-gray-900 transition-colors"
                    >
                      Skip for Now
                    </button>
                  </div>
                </div>
              </div>
              
              {/* Floating Elements */}
              <div className="absolute top-8 left-8 w-16 h-16 bg-white bg-opacity-10 rounded-full animate-pulse"></div>
              <div className="absolute bottom-8 right-8 w-12 h-12 bg-white bg-opacity-10 rounded-full animate-pulse delay-1000"></div>
              <div className="absolute top-1/3 right-16 w-8 h-8 bg-white bg-opacity-10 rounded-full animate-pulse delay-500"></div>
            </div>
          ) : (
            // Actual Video Player (Placeholder)
            <div className="relative aspect-video bg-black">
              {/* Video Placeholder - In a real implementation, you'd use an actual video element */}
              <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-gray-800 to-gray-900">
                <div className="text-center text-white">
                  <div className="w-20 h-20 mx-auto mb-4 bg-green-500 rounded-full flex items-center justify-center animate-pulse">
                    <Play className="h-10 w-10 text-white ml-1" />
                  </div>
                  <p className="text-lg">Video Playing...</p>
                  <p className="text-sm opacity-75 mt-2">SUPR Product Showcase</p>
                </div>
              </div>
              
              {/* Video Controls */}
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <button
                    onClick={toggleMute}
                    className="p-2 bg-black bg-opacity-50 text-white rounded-full hover:bg-opacity-70 transition-colors"
                  >
                    {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
                  </button>
                  <span className="text-white text-sm">2:34</span>
                </div>
                
                <button
                  onClick={handleClose}
                  className="px-4 py-2 bg-white text-gray-900 rounded-full text-sm font-medium hover:bg-gray-100 transition-colors"
                >
                  Continue to Site
                </button>
              </div>
              
              {/* Progress Bar */}
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-black bg-opacity-30">
                <div className="h-full bg-white w-1/3 animate-pulse"></div>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className={`p-6 border-t transition-colors duration-300 ${isDarkMode ? 'border-gray-700 bg-gray-800' : 'border-gray-200 bg-gray-50'}`}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className={`text-sm transition-colors duration-300 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                  15+ Years of Excellence
                </span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse delay-500"></div>
                <span className={`text-sm transition-colors duration-300 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                  50K+ Happy Customers
                </span>
              </div>
            </div>
            
            <div className="text-right">
              <p className={`text-xs transition-colors duration-300 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                This welcome message won't show again
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WelcomeVideoModal;