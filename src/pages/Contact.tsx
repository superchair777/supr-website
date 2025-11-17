import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Mail, Phone, MapPin, Clock, Send, MessageCircle, Users, Headphones } from 'lucide-react';

interface ContactProps {
  isDarkMode: boolean;
}

const Contact: React.FC<ContactProps> = ({ isDarkMode }) => {
  const { t } = useTranslation();
  const showroomMapUrl = 'https://maps.app.goo.gl/HnxEb2Tgtt3sCuct6';
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    inquiryType: 'general'
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission here
    console.log('Form submitted:', formData);
  };

  const contactInfo = [
    {
      icon: Mail,
      title: t('contact.email_us'),
      details: 'support@superchair.com',
      description: t('contact.email_us_desc')
    },
    {
      icon: Phone,
      title: t('contact.call_us'),
      details: '+1 (555) 123-4567',
      description: t('contact.call_us_desc')
    },
    {
      icon: MapPin,
      title: t('contact.visit_us'),
      details: '123 Ergonomic Ave, Design City, DC 12345',
      description: t('contact.visit_us_desc')
    },
    {
      icon: Clock,
      title: t('contact.business_hours'),
      details: 'Mon-Fri: 9AM-6PM EST',
      description: t('contact.business_hours_desc')
    }
  ];

  const supportOptions = [
    {
      icon: MessageCircle,
      title: t('contact.live_chat'),
      description: t('contact.live_chat_desc'),
      action: t('contact.start_chat'),
      available: true
    },
    {
      icon: Users,
      title: t('contact.wholesale_inquiries'),
      description: t('contact.wholesale_inquiries_desc'),
      action: t('contact.contact_sales'),
      available: true
    },
    {
      icon: Headphones,
      title: t('contact.technical_support'),
      description: t('contact.technical_support_desc'),
      action: t('contact.get_support'),
      available: true
    }
  ];

  const faqs = [
    {
      question: t('contact.faq_1_q'),
      answer: t('contact.faq_1_a')
    },
    {
      question: t('contact.faq_2_q'),
      answer: t('contact.faq_2_a')
    },
    {
      question: t('contact.faq_3_q'),
      answer: t('contact.faq_3_a')
    },
    {
      question: t('contact.faq_4_q'),
      answer: t('contact.faq_4_a')
    }
  ];

  return (
    <div className={`min-h-screen transition-colors duration-300 ${isDarkMode ? 'bg-gray-900' : 'bg-white'}`}>
      {/* Hero Section */}
      <section className={`py-16 transition-colors duration-300 ${isDarkMode ? 'bg-gray-900' : 'bg-white'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className={`text-5xl font-bold mb-4 transition-colors duration-300 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              {t('contact.title')}
            </h1>
            <p className={`text-lg max-w-2xl mx-auto transition-colors duration-300 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              {t('contact.subtitle')}
            </p>
          </div>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className={`py-12 transition-colors duration-300 ${isDarkMode ? 'bg-gray-800' : 'bg-gray-50'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {contactInfo.map((info, index) => (
              <div key={index} className={`text-center p-6 rounded-3xl transition-colors duration-300 ${isDarkMode ? 'bg-gray-700' : 'bg-white'}`}>
                <div className={`w-16 h-16 mx-auto mb-4 rounded-2xl flex items-center justify-center transition-colors duration-300 ${isDarkMode ? 'bg-gray-600' : 'bg-gray-100'}`}>
                  <info.icon className={`h-8 w-8 ${isDarkMode ? 'text-white' : 'text-black'}`} />
                </div>
                <h3 className={`font-bold mb-2 transition-colors duration-300 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                  {info.title}
                </h3>
                <p className={`font-medium mb-1 transition-colors duration-300 ${isDarkMode ? 'text-gray-200' : 'text-gray-800'}`}>
                  {info.details}
                </p>
                <p className={`text-sm transition-colors duration-300 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  {info.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form and Support Options */}
      <section className={`py-16 transition-colors duration-300 ${isDarkMode ? 'bg-gray-900' : 'bg-white'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div>
              <h2 className={`text-3xl font-bold mb-6 transition-colors duration-300 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                {t('contact.send_message')}
              </h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className={`block text-sm font-medium mb-2 transition-colors duration-300 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                      {t('contact.name')}
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className={`w-full px-4 py-3 border rounded-2xl focus:outline-none focus:ring-1 transition-colors ${isDarkMode ? 'bg-gray-800 border-gray-700 text-white placeholder-gray-400 focus:ring-gray-600' : 'bg-white border-gray-200 text-black placeholder-gray-500 focus:ring-gray-300'}`}
                      placeholder={t('contact.name_placeholder')}
                    />
                  </div>
                  <div>
                    <label className={`block text-sm font-medium mb-2 transition-colors duration-300 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                      {t('contact.email')}
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className={`w-full px-4 py-3 border rounded-2xl focus:outline-none focus:ring-1 transition-colors ${isDarkMode ? 'bg-gray-800 border-gray-700 text-white placeholder-gray-400 focus:ring-gray-600' : 'bg-white border-gray-200 text-black placeholder-gray-500 focus:ring-gray-300'}`}
                      placeholder={t('contact.email_placeholder')}
                    />
                  </div>
                </div>

                <div>
                  <label className={`block text-sm font-medium mb-2 transition-colors duration-300 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    {t('contact.inquiry_type')}
                  </label>
                  <select
                    name="inquiryType"
                    value={formData.inquiryType}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 border rounded-2xl focus:outline-none focus:ring-1 transition-colors ${isDarkMode ? 'bg-gray-800 border-gray-700 text-white focus:ring-gray-600' : 'bg-white border-gray-200 text-black focus:ring-gray-300'}`}
                  >
                    <option value="general">{t('contact.general_inquiry')}</option>
                    <option value="support">{t('contact.product_support')}</option>
                    <option value="wholesale">{t('contact.wholesale_orders')}</option>
                    <option value="returns">{t('contact.returns_exchanges')}</option>
                    <option value="warranty">{t('contact.warranty_claim')}</option>
                  </select>
                </div>

                <div>
                  <label className={`block text-sm font-medium mb-2 transition-colors duration-300 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    {t('contact.subject')}
                  </label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    required
                    className={`w-full px-4 py-3 border rounded-2xl focus:outline-none focus:ring-1 transition-colors ${isDarkMode ? 'bg-gray-800 border-gray-700 text-white placeholder-gray-400 focus:ring-gray-600' : 'bg-white border-gray-200 text-black placeholder-gray-500 focus:ring-gray-300'}`}
                    placeholder={t('contact.subject_placeholder')}
                  />
                </div>

                <div>
                  <label className={`block text-sm font-medium mb-2 transition-colors duration-300 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    {t('contact.message')}
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows={6}
                    className={`w-full px-4 py-3 border rounded-2xl focus:outline-none focus:ring-1 resize-none transition-colors ${isDarkMode ? 'bg-gray-800 border-gray-700 text-white placeholder-gray-400 focus:ring-gray-600' : 'bg-white border-gray-200 text-black placeholder-gray-500 focus:ring-gray-300'}`}
                    placeholder={t('contact.message_placeholder')}
                  />
                </div>

                <button
                  type="submit"
                  className={`w-full flex items-center justify-center gap-2 px-8 py-4 rounded-2xl text-sm font-medium transition-colors ${isDarkMode ? 'bg-white text-black hover:bg-gray-200' : 'bg-black text-white hover:bg-gray-800'}`}
                >
                  <Send className="h-4 w-4" />
                  {t('contact.send_message_btn')}
                </button>
              </form>
            </div>

            {/* Support Options */}
            <div>
              <h2 className={`text-3xl font-bold mb-6 transition-colors duration-300 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                {t('contact.other_ways_to_reach_us')}
              </h2>
              
              <div className="space-y-6 mb-12">
                {supportOptions.map((option, index) => (
                  <div key={index} className={`p-6 rounded-3xl border transition-colors duration-300 ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-gray-50 border-gray-200'}`}>
                    <div className="flex items-start gap-4">
                      <div className={`w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0 transition-colors duration-300 ${isDarkMode ? 'bg-gray-700' : 'bg-white'}`}>
                        <option.icon className={`h-6 w-6 ${isDarkMode ? 'text-white' : 'text-black'}`} />
                      </div>
                      <div className="flex-1">
                        <h3 className={`font-bold mb-2 transition-colors duration-300 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                          {option.title}
                        </h3>
                        <p className={`text-sm mb-4 transition-colors duration-300 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                          {option.description}
                        </p>
                        <button className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${isDarkMode ? 'bg-gray-700 text-gray-200 hover:bg-gray-600' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}>
                          {option.action}
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* FAQ Section */}
              <div>
                <h3 className={`text-xl font-bold mb-6 transition-colors duration-300 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                  {t('contact.faq')}
                </h3>
                <div className="space-y-4">
                  {faqs.map((faq, index) => (
                    <div key={index} className={`p-4 rounded-2xl transition-colors duration-300 ${isDarkMode ? 'bg-gray-800' : 'bg-gray-50'}`}>
                      <h4 className={`font-medium mb-2 transition-colors duration-300 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                        {faq.question}
                      </h4>
                      <p className={`text-sm transition-colors duration-300 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                        {faq.answer}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className={`py-16 transition-colors duration-300 ${isDarkMode ? 'bg-gray-800' : 'bg-gray-50'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className={`text-3xl font-bold mb-4 transition-colors duration-300 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              {t('contact.visit_showroom')}
            </h2>
            <p className={`text-lg transition-colors duration-300 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              {t('contact.visit_showroom_desc')}
            </p>
          </div>
          <div className={`rounded-3xl overflow-hidden h-96 transition-colors duration-300 ${isDarkMode ? 'bg-gray-700' : 'bg-gray-200'}`}>
            {/* Placeholder for map - in a real app, you'd integrate with Google Maps or similar */}
            <div className="w-full h-full flex items-center justify-center">
              <div className="text-center">
                <MapPin className={`h-16 w-16 mx-auto mb-4 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`} />
                <p className={`text-lg font-medium transition-colors duration-300 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  {t('contact.map_coming_soon')}
                </p>
                <a
                  href={showroomMapUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`text-sm transition-colors duration-300 underline ${isDarkMode ? 'text-gray-300 hover:text-gray-200' : 'text-gray-700 hover:text-gray-900'}`}
                >
                  View on Google Maps
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
