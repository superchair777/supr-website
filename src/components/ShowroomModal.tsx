import React from 'react';
import { X, MapPin, Clock, Phone } from 'lucide-react';
import { useTranslation } from 'react-i18next';

interface ShowroomModalProps {
  isOpen: boolean;
  onClose: () => void;
  isDarkMode: boolean;
}

const ShowroomModal: React.FC<ShowroomModalProps> = ({ isOpen, onClose, isDarkMode }) => {
  const { t, i18n } = useTranslation();
  
  if (!isOpen) return null;

  const showroomAddressTh = '22, 3 ถ. บ้านกล้วย-ไทรน้อย ตำบล พิมลราช อำเภอบางบัวทอง นนทบุรี 11110';
  const showroomAddressEn = '22, 3 Baan Kluay - Sai Noi Rd, Phimon Rat, Bang Bua Thong District, Nonthaburi 11110';
  const address = i18n.language === 'th' ? showroomAddressTh : showroomAddressEn;
  const showroomMapEmbed = 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3872.4849497226546!2d100.376409375867!3d13.92970589314818!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x30e285c5cdc19699%3A0xa393955bb2b632ab!2sSuper%20Chair%20Factory!5e0!3m2!1sen!2sth!4v1763797514841!5m2!1sen!2sth';

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
      <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
        <div 
          className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" 
          aria-hidden="true" 
          onClick={onClose}
        ></div>

        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

        <div className={`inline-block align-bottom rounded-2xl text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-4xl sm:w-full ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
          {/* Header */}
          <div className={`px-6 py-4 border-b flex items-center justify-between ${isDarkMode ? 'border-gray-700' : 'border-gray-100'}`}>
            <h3 className={`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              {t('contact.visit_us')}
            </h3>
            <button
              onClick={onClose}
              className={`p-2 rounded-full transition-colors ${isDarkMode ? 'hover:bg-gray-700 text-gray-400' : 'hover:bg-gray-100 text-gray-500'}`}
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Content */}
          <div className="grid grid-cols-1 lg:grid-cols-2">
            {/* Info Side */}
            <div className={`p-8 ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
              <div className="space-y-8">
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <div className={`p-3 rounded-xl ${isDarkMode ? 'bg-mustard-500/20 text-mustard-400' : 'bg-mustard-50 text-mustard-600'}`}>
                      <MapPin className="w-6 h-6" />
                    </div>
                    <h4 className={`text-lg font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                      {t('contact.visit_us')}
                    </h4>
                  </div>
                  <p className={`ml-12 text-base leading-relaxed ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                    {address}
                  </p>
                </div>

                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <div className={`p-3 rounded-xl ${isDarkMode ? 'bg-blue-500/20 text-blue-400' : 'bg-blue-50 text-blue-600'}`}>
                      <Clock className="w-6 h-6" />
                    </div>
                    <h4 className={`text-lg font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                      {t('contact.business_hours')}
                    </h4>
                  </div>
                  <p className={`ml-12 text-base ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                    Mon-Sat: 9:00 AM - 5:00 PM
                  </p>
                </div>

                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <div className={`p-3 rounded-xl ${isDarkMode ? 'bg-green-500/20 text-green-400' : 'bg-green-50 text-green-600'}`}>
                      <Phone className="w-6 h-6" />
                    </div>
                    <h4 className={`text-lg font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                      {t('contact.call_us')}
                    </h4>
                  </div>
                  <p className={`ml-12 text-base ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                    +66 091 815 3818
                  </p>
                </div>
              </div>
            </div>

            {/* Map Side */}
            <div className="h-[400px] lg:h-auto bg-gray-100">
              <iframe
                src={showroomMapEmbed}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Showroom Map"
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShowroomModal;
