import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Mail, Phone, MapPin, Clock, Send, MessageCircle, Users } from 'lucide-react';

interface ContactProps {
  isDarkMode: boolean;
}

const Contact: React.FC<ContactProps> = ({ isDarkMode }) => {
  const { t, i18n } = useTranslation();
  const lineUrl = import.meta.env.VITE_LINE_URL ?? 'https://shop.line.me/@superchair';
  const showroomMapUrl = 'https://maps.app.goo.gl/abjTSdAYrDfZ4BvB8';
  const showroomAddressTh = '22, 3 ถ. บ้านกล้วย-ไทรน้อย ตำบล พิมลราช อำเภอบางบัวทอง นนทบุรี 11110';
  const showroomAddressEn = '22, 3 Baan Kluay - Sai Noi Rd, Phimon Rat, Bang Bua Thong District, Nonthaburi 11110';
  const mapQuery = i18n.language === 'th' ? showroomAddressTh : showroomAddressEn;
  const showroomMapEmbed = 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3872.4849497226546!2d100.376409375867!3d13.92970589314818!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x30e285c5cdc19699%3A0xa393955bb2b632ab!2sSuper%20Chair%20Factory!5e0!3m2!1sen!2sth!4v1763797514841!5m2!1sen!2sth';
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
      details: 'support@suprfactory.com',
      description: t('contact.email_us_desc')
    },
    {
      icon: Phone,
      title: t('contact.call_us'),
      details: '+66 091 815 3818',
      description: 'Mon-Sat: 9AM-5PM'
    },
    {
      icon: MapPin,
      title: t('contact.visit_us'),
      addressTh: 'ที่อยู่: 22, 3 ถ. บ้านกล้วย-ไทรน้อย ตำบล พิมลราช อำเภอบางบัวทอง นนทบุรี 11110',
      addressEn: 'Address: 22, 3 Baan Kluay - Sai Noi Rd, Phimon Rat, Bang Bua Thong District, Nonthaburi 11110',
      description: t('contact.visit_us_desc')
    },
    {
      icon: Clock,
      title: t('contact.business_hours'),
      details: 'Mon-Sat: 9AM-5PM',
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
      action: 'LINE',
      href: lineUrl,
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
      <section className={`relative py-24 overflow-hidden transition-colors duration-300 ${isDarkMode ? 'bg-gray-900' : 'bg-white'}`}>
        <div className="absolute inset-0 pointer-events-none" style={{
            backgroundImage: `linear-gradient(${isDarkMode ? '#374151' : '#e5e7eb'} 1px, transparent 1px), linear-gradient(90deg, ${isDarkMode ? '#374151' : '#e5e7eb'} 1px, transparent 1px)`,
            backgroundSize: '40px 40px',
            opacity: 0.5
        }}></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <div className={`inline-flex items-center px-4 py-1.5 rounded-full text-xs font-bold tracking-wider border shadow-sm mb-6 ${isDarkMode ? 'bg-gray-800 border-gray-700 text-gray-300' : 'bg-white border-gray-200 text-slate-600'}`}>
               <span className="h-2 w-2 rounded-full mr-2 bg-mustard-500"></span>
               GET IN TOUCH
            </div>
            <h1 className={`text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight tracking-tight mb-6 transition-colors duration-300 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              {t('contact.title')}
            </h1>
            <div className="w-20 h-1 bg-mustard-500 mx-auto mb-8 rounded-full"></div>
            <p className={`text-lg max-w-2xl mx-auto transition-colors duration-300 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              {t('contact.subtitle')}
            </p>
          </div>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className={`py-12 transition-colors duration-300 ${isDarkMode ? 'bg-gray-900' : 'bg-white'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {contactInfo.map((info, index) => (
              <div key={index} className={`group p-8 rounded-3xl border transition-all duration-300 hover:-translate-y-1 hover:shadow-xl ${isDarkMode ? 'bg-[#1a1a1a] border-white/5 hover:border-mustard-500/30' : 'bg-white border-gray-100 hover:border-mustard-500/30'} shadow-sm`}>
                <div className={`w-14 h-14 mx-auto mb-6 rounded-2xl flex items-center justify-center transition-all duration-300 group-hover:scale-110 ${isDarkMode ? 'bg-gray-800 text-mustard-500' : 'bg-mustard-50 text-mustard-600'}`}>
                  <info.icon className="h-7 w-7" />
                </div>
                <div className="text-center">
                  <h3 className={`font-bold mb-3 text-lg transition-colors duration-300 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                    {info.title}
                  </h3>
                  {('addressTh' in info) ? (
                    <p className={`text-sm font-medium mb-2 leading-relaxed transition-colors duration-300 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                      {i18n.language === 'th' ? (info as any).addressTh : (info as any).addressEn}
                    </p>
                  ) : (
                    <p className={`text-sm font-medium mb-2 transition-colors duration-300 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                      {info.details}
                    </p>
                  )}
                  <p className={`text-xs transition-colors duration-300 ${isDarkMode ? 'text-gray-500' : 'text-gray-500'}`}>
                    {info.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form and Support Options */}
      <section className={`py-16 transition-colors duration-300 ${isDarkMode ? 'bg-gray-800' : 'bg-gray-50'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Contact Form */}
            <div>
              <div className="mb-8">
                <h2 className={`text-3xl font-bold mb-4 transition-colors duration-300 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                  {t('contact.send_message')}
                </h2>
                <div className={`h-1 w-20 rounded-full ${isDarkMode ? 'bg-mustard-500' : 'bg-mustard-500'}`}></div>
              </div>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className={`block text-sm font-bold mb-2 ml-1 transition-colors duration-300 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                      {t('contact.name')}
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className={`w-full px-5 py-3.5 rounded-xl border transition-all duration-300 outline-none ${isDarkMode ? 'bg-gray-900 border-gray-700 text-white placeholder-gray-500 focus:border-mustard-500 focus:ring-1 focus:ring-mustard-500' : 'bg-white border-gray-200 text-gray-900 placeholder-gray-400 focus:border-mustard-500 focus:ring-1 focus:ring-mustard-500'}`}
                      placeholder={t('contact.name_placeholder')}
                    />
                  </div>
                  <div>
                    <label className={`block text-sm font-bold mb-2 ml-1 transition-colors duration-300 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                      {t('contact.email')}
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className={`w-full px-5 py-3.5 rounded-xl border transition-all duration-300 outline-none ${isDarkMode ? 'bg-gray-900 border-gray-700 text-white placeholder-gray-500 focus:border-mustard-500 focus:ring-1 focus:ring-mustard-500' : 'bg-white border-gray-200 text-gray-900 placeholder-gray-400 focus:border-mustard-500 focus:ring-1 focus:ring-mustard-500'}`}
                      placeholder={t('contact.email_placeholder')}
                    />
                  </div>
                  <div>
                    <label className={`block text-sm font-bold mb-2 ml-1 transition-colors duration-300 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                      {t('home.q_company_name')} <span className="text-gray-400 text-xs font-normal">({t('home.optional') || 'Optional'})</span>
                    </label>
                    <input
                      type="text"
                      name="companyName"
                      value={formData.companyName}
                      onChange={handleInputChange}
                      className={`w-full px-5 py-3.5 rounded-xl border transition-all duration-300 outline-none ${isDarkMode ? 'bg-gray-900 border-gray-700 text-white placeholder-gray-500 focus:border-mustard-500 focus:ring-1 focus:ring-mustard-500' : 'bg-white border-gray-200 text-gray-900 placeholder-gray-400 focus:border-mustard-500 focus:ring-1 focus:ring-mustard-500'}`}
                      placeholder={t('products.company_name_placeholder')}
                    />
                  </div>
                  <div>
                    <label className={`block text-sm font-bold mb-2 ml-1 transition-colors duration-300 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                      {t('home.q_contact_number')}
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      required
                      className={`w-full px-5 py-3.5 rounded-xl border transition-all duration-300 outline-none ${isDarkMode ? 'bg-gray-900 border-gray-700 text-white placeholder-gray-500 focus:border-mustard-500 focus:ring-1 focus:ring-mustard-500' : 'bg-white border-gray-200 text-gray-900 placeholder-gray-400 focus:border-mustard-500 focus:ring-1 focus:ring-mustard-500'}`}
                      placeholder={t('products.phone_number_placeholder')}
                    />
                  </div>
                </div>

                <div>
                  <label className={`block text-sm font-bold mb-2 ml-1 transition-colors duration-300 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    {t('contact.inquiry_type')}
                  </label>
                  <select
                    name="inquiryType"
                    value={formData.inquiryType}
                    onChange={handleInputChange}
                    className={`w-full px-5 py-3.5 rounded-xl border transition-all duration-300 outline-none appearance-none cursor-pointer ${isDarkMode ? 'bg-gray-900 border-gray-700 text-white focus:border-mustard-500 focus:ring-1 focus:ring-mustard-500' : 'bg-white border-gray-200 text-gray-900 focus:border-mustard-500 focus:ring-1 focus:ring-mustard-500'}`}
                  >
                    <option value="general">{t('contact.type_general')}</option>
                    <option value="sales">{t('contact.type_sales')}</option>
                    <option value="support">{t('contact.type_support')}</option>
                    <option value="wholesale">{t('contact.type_wholesale')}</option>
                  </select>
                </div>

                <div>
                  <label className={`block text-sm font-bold mb-2 ml-1 transition-colors duration-300 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    {t('contact.subject')}
                  </label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    required
                    className={`w-full px-5 py-3.5 rounded-xl border transition-all duration-300 outline-none ${isDarkMode ? 'bg-gray-900 border-gray-700 text-white placeholder-gray-500 focus:border-mustard-500 focus:ring-1 focus:ring-mustard-500' : 'bg-white border-gray-200 text-gray-900 placeholder-gray-400 focus:border-mustard-500 focus:ring-1 focus:ring-mustard-500'}`}
                    placeholder={t('contact.subject_placeholder')}
                  />
                </div>

                <div>
                  <label className={`block text-sm font-bold mb-2 ml-1 transition-colors duration-300 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    {t('contact.message')}
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows={6}
                    className={`w-full px-5 py-3.5 rounded-xl border transition-all duration-300 outline-none resize-none ${isDarkMode ? 'bg-gray-900 border-gray-700 text-white placeholder-gray-500 focus:border-mustard-500 focus:ring-1 focus:ring-mustard-500' : 'bg-white border-gray-200 text-gray-900 placeholder-gray-400 focus:border-mustard-500 focus:ring-1 focus:ring-mustard-500'}`}
                    placeholder={t('contact.message_placeholder')}
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className={`w-full px-8 py-4 rounded-xl text-sm font-bold tracking-wide transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg flex items-center justify-center gap-2 ${isDarkMode ? 'bg-mustard-500 text-black hover:bg-mustard-400 hover:shadow-mustard-500/20' : 'bg-black text-white hover:bg-gray-800 hover:shadow-gray-900/20'}`}
                >
                  <Send className="h-4 w-4" />
                  {t('contact.send_message')}
                </button>
              </form>
            </div>

            {/* Support Options */}
            <div>
              <div className="mb-8">
                <h2 className={`text-3xl font-bold mb-4 transition-colors duration-300 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                  {t('contact.other_ways_to_reach_us')}
                </h2>
                <div className={`h-1 w-20 rounded-full ${isDarkMode ? 'bg-mustard-500' : 'bg-mustard-500'}`}></div>
              </div>
              
              <div className="space-y-6 mb-12">
                {supportOptions.map((option, index) => (
                  <div key={index} className={`p-8 rounded-3xl border transition-all duration-300 hover:shadow-lg ${isDarkMode ? 'bg-[#1a1a1a] border-white/5 hover:border-mustard-500/30' : 'bg-white border-gray-100 hover:border-mustard-500/30'}`}>
                    <div className="flex items-start gap-6">
                      <div className={`w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0 transition-colors duration-300 ${isDarkMode ? 'bg-gray-800 text-mustard-500' : 'bg-mustard-50 text-mustard-600'}`}>
                        <option.icon className="h-7 w-7" />
                      </div>
                      <div className="flex-1">
                        <h3 className={`font-bold mb-2 text-lg transition-colors duration-300 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                          {option.title}
                        </h3>
                        <p className={`text-sm mb-6 leading-relaxed transition-colors duration-300 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                          {option.description}
                        </p>
                        {('href' in option) ? (
                          <>
                            <a
                              href={(option as any).href}
                              target="_blank"
                              rel="noopener noreferrer"
                              className={`inline-flex items-center justify-center px-6 py-2.5 rounded-xl text-sm font-bold transition-all duration-300 shadow-sm hover:shadow-md hover:-translate-y-0.5 ${isDarkMode ? 'bg-[#00b900] text-white hover:bg-[#00a000]' : 'bg-[#00b900] text-white hover:bg-[#00a000]'}`}
                            >
                              {option.action}
                            </a>
                            <p className={`text-xs mt-3 font-medium ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                              {i18n.language === 'th' ? 'ติดต่อ LINE ของเราเพื่อข้อมูลเพิ่มเติม' : 'Contact our LINE for more information'}
                            </p>
                          </>
                        ) : (
                          <button className={`inline-flex items-center justify-center px-6 py-2.5 rounded-xl text-sm font-bold transition-all duration-300 shadow-sm hover:shadow-md hover:-translate-y-0.5 ${isDarkMode ? 'bg-gray-700 text-white hover:bg-gray-600' : 'bg-gray-100 text-gray-900 hover:bg-gray-200'}`}>
                            {option.action}
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* FAQ Section */}
              <div>
                <h3 className={`text-xl font-bold mb-6 transition-colors duration-300 flex items-center gap-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                  <span className="text-mustard-500">?</span> {t('contact.faq')}
                </h3>
                <div className="space-y-4">
                  {faqs.map((faq, index) => (
                    <div key={index} className={`p-6 rounded-2xl transition-all duration-300 border ${isDarkMode ? 'bg-[#1a1a1a] border-white/5' : 'bg-white border-gray-100'}`}>
                      <h4 className={`font-bold mb-3 transition-colors duration-300 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                        {faq.question}
                      </h4>
                      <p className={`text-sm leading-relaxed transition-colors duration-300 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                        {faq.answer}
                      </p>
                      {faq.question === t('contact.faq_4_q') && (
                        <div className={`mt-4 p-4 rounded-xl ${isDarkMode ? 'bg-gray-800/50' : 'bg-gray-50'}`}>
                          <h5 className={`text-sm font-bold mb-2 ${isDarkMode ? 'text-gray-200' : 'text-gray-800'}`}>{t('contact.free_delivery_areas_title')}</h5>
                          <ol className={`list-decimal pl-5 space-y-1.5 text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                            <li>{t('contact.free_delivery_area_1')}</li>
                            <li>{t('contact.free_delivery_area_2')}</li>
                            <li>{t('contact.free_delivery_area_3')}</li>
                            <li>{t('contact.free_delivery_area_4')}</li>
                            <li>{t('contact.free_delivery_area_5')}</li>
                            <li>{t('contact.free_delivery_area_6')}</li>
                          </ol>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className={`py-16 transition-colors duration-300 ${isDarkMode ? 'bg-gray-900' : 'bg-white'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className={`text-3xl font-bold mb-4 transition-colors duration-300 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              {t('contact.visit_showroom')}
            </h2>
            <p className={`text-lg transition-colors duration-300 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              {t('contact.visit_showroom_desc')}
            </p>
          </div>
          <div className={`rounded-3xl overflow-hidden h-[500px] shadow-2xl transition-all duration-300 border-4 ${isDarkMode ? 'border-gray-800' : 'border-white'}`}>
            <iframe
              title="Showroom Map"
              src={showroomMapEmbed}
              className="w-full h-full border-0 transition-all duration-700"
              loading="lazy"
              allowFullScreen
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
