import React, { useState } from 'react';
import { MessageCircle, X, Send, MessageSquare, Mail } from 'lucide-react';

interface ChatWidgetProps {
  isDarkMode: boolean;
}

const ChatWidget: React.FC<ChatWidgetProps> = ({ isDarkMode }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedFAQ, setSelectedFAQ] = useState<number | null>(null);
  const [showFeedbackModal, setShowFeedbackModal] = useState(false);
  const [feedbackForm, setFeedbackForm] = useState({
    email: '',
    message: ''
  });

  const faqs = [
    {
      id: 1,
      question: "What is your return policy?",
      answer: "We offer a 30-day free return policy on all our chairs. If you're not completely satisfied with your purchase, you can return it within 30 days for a full refund."
    },
    {
      id: 2,
      question: "Do you offer free shipping?",
      answer: "Yes! We provide free shipping on all orders. Your chair will be delivered directly to your doorstep at no additional cost."
    },
    {
      id: 3,
      question: "What are the wholesale requirements?",
      answer: "For wholesale pricing, we require a minimum order quantity (MOQ) that varies by product, typically ranging from 5-25 units. Wholesale prices offer 25-35% savings off retail prices."
    },
    {
      id: 4,
      question: "How long is the warranty?",
      answer: "All our chairs come with a comprehensive 5-year warranty covering manufacturing defects and normal wear. We also provide lifetime customer support."
    },
    {
      id: 5,
      question: "Can I customize my chair?",
      answer: "Yes! We offer customization options including different colors, materials, and ergonomic adjustments. Contact our team to discuss your specific requirements."
    },
    {
      id: 6,
      question: "What payment methods do you accept?",
      answer: "We accept all major credit cards, PayPal, bank transfers, and for wholesale orders, we also offer net payment terms for qualified businesses."
    }
  ];

  const toggleChat = () => {
    setIsOpen(!isOpen);
    setSelectedFAQ(null);
  };

  const handleFAQClick = (faqId: number) => {
    setSelectedFAQ(selectedFAQ === faqId ? null : faqId);
  };

  const handleFeedbackChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFeedbackForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFeedbackSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle feedback submission here
    console.log('Feedback submitted:', feedbackForm);
    // Reset form and close modal
    setFeedbackForm({ email: '', message: '' });
    setShowFeedbackModal(false);
    // You could show a success message here
    alert('Thank you for your feedback! We\'ll get back to you soon.');
  };

  const openFeedbackModal = () => {
    setShowFeedbackModal(true);
  };

  const closeFeedbackModal = () => {
    setShowFeedbackModal(false);
    setFeedbackForm({ email: '', message: '' });
  };
  return (
    <>
      {/* Chat Button */}
      <button
        onClick={toggleChat}
        className={`p-3 rounded-full shadow-lg transition-all duration-300 hover:scale-110 group ${
          isDarkMode 
            ? 'bg-gray-800 hover:bg-green-600 text-gray-300 hover:text-white' 
            : 'bg-white hover:bg-green-600 text-gray-600 hover:text-white'
        }`}
        aria-label="Open chat support"
      >
        <MessageCircle className="h-4 w-4" />
      </button>

      {/* Chat Box */}
      {isOpen && (
        <div className={`fixed bottom-6 right-20 w-80 h-96 rounded-2xl shadow-2xl transition-all duration-300 z-50 flex flex-col ${
          isDarkMode ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200'
        }`}>
          {/* Chat Header */}
          <div className={`flex items-center justify-between p-4 border-b rounded-t-2xl ${
            isDarkMode ? 'border-gray-700 bg-gray-700' : 'border-gray-200 bg-gray-50'
          }`}>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                <MessageCircle className="h-4 w-4 text-white" />
              </div>
              <div>
                <h3 className={`font-medium text-sm ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                  SUPR Support
                </h3>
                <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                  Online now
                </p>
              </div>
            </div>
            <button
              onClick={toggleChat}
              className={`p-1 rounded-full hover:bg-gray-200 transition-colors ${
                isDarkMode ? 'hover:bg-gray-600 text-gray-400' : 'hover:bg-gray-200 text-gray-500'
              }`}
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          {/* Chat Content */}
          <div className="flex-1 p-4 overflow-y-auto">
            <div className={`mb-4 p-3 rounded-lg max-w-xs ${
              isDarkMode ? 'bg-gray-700' : 'bg-gray-100'
            }`}>
              <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                Hi! 👋 How can I help you today? Here are some frequently asked questions:
              </p>
            </div>

            <div className="space-y-2">
              {faqs.map((faq) => (
                <div key={faq.id}>
                  <button
                    onClick={() => handleFAQClick(faq.id)}
                    className={`w-full text-left p-3 rounded-lg text-sm transition-colors ${
                      isDarkMode 
                        ? 'bg-gray-700 hover:bg-gray-600 text-gray-300' 
                        : 'bg-gray-50 hover:bg-gray-100 text-gray-700'
                    }`}
                  >
                    {faq.question}
                  </button>
                  
                  {selectedFAQ === faq.id && (
                    <div className={`mt-2 p-3 rounded-lg border-l-4 border-green-500 ${
                      isDarkMode ? 'bg-gray-700' : 'bg-green-50'
                    }`}>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                        {faq.answer}
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Send Feedback Button */}
            <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-600">
              <button
                onClick={openFeedbackModal}
                className={`w-full flex items-center justify-center gap-2 p-3 rounded-lg text-sm font-medium transition-colors ${
                  isDarkMode 
                    ? 'bg-blue-600 hover:bg-blue-700 text-white' 
                    : 'bg-blue-600 hover:bg-blue-700 text-white'
                }`}
              >
                <MessageSquare className="h-4 w-4" />
                Send Feedback
              </button>
            </div>
          </div>

          {/* Chat Input */}
          <div className={`p-4 border-t ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}>
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Type your message..."
                className={`flex-1 px-3 py-2 text-sm border rounded-full focus:outline-none focus:ring-1 ${
                  isDarkMode 
                    ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:ring-gray-500' 
                    : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:ring-gray-400'
                }`}
              />
              <button className="p-2 bg-green-500 text-white rounded-full hover:bg-green-600 transition-colors">
                <Send className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Feedback Modal */}
      {showFeedbackModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[60] p-4">
          <div className={`max-w-md w-full rounded-2xl transition-colors duration-300 ${
            isDarkMode ? 'bg-gray-800' : 'bg-white'
          }`}>
            {/* Modal Header */}
            <div className={`flex items-center justify-between p-6 border-b transition-colors duration-300 ${
              isDarkMode ? 'border-gray-700' : 'border-gray-200'
            }`}>
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors duration-300 ${
                  isDarkMode ? 'bg-blue-600' : 'bg-blue-600'
                }`}>
                  <MessageSquare className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h3 className={`text-lg font-bold transition-colors duration-300 ${
                    isDarkMode ? 'text-white' : 'text-gray-900'
                  }`}>
                    Send Feedback
                  </h3>
                  <p className={`text-sm transition-colors duration-300 ${
                    isDarkMode ? 'text-gray-400' : 'text-gray-600'
                  }`}>
                    We'd love to hear from you
                  </p>
                </div>
              </div>
              <button
                onClick={closeFeedbackModal}
                className={`p-2 rounded-full transition-colors ${
                  isDarkMode ? 'hover:bg-gray-700 text-gray-400' : 'hover:bg-gray-100 text-gray-500'
                }`}
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Modal Content */}
            <form onSubmit={handleFeedbackSubmit} className="p-6">
              <div className="space-y-4">
                <div>
                  <label className={`block text-sm font-medium mb-2 transition-colors duration-300 ${
                    isDarkMode ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                    Email Address *
                  </label>
                  <div className="relative">
                    <Mail className={`absolute left-3 top-3 h-4 w-4 ${
                      isDarkMode ? 'text-gray-400' : 'text-gray-500'
                    }`} />
                    <input
                      type="email"
                      name="email"
                      value={feedbackForm.email}
                      onChange={handleFeedbackChange}
                      required
                      className={`w-full pl-10 pr-4 py-3 border rounded-xl focus:outline-none focus:ring-2 transition-colors ${
                        isDarkMode 
                          ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500' 
                          : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:ring-blue-500 focus:border-blue-500'
                      }`}
                      placeholder="your@email.com"
                    />
                  </div>
                </div>

                <div>
                  <label className={`block text-sm font-medium mb-2 transition-colors duration-300 ${
                    isDarkMode ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                    Your Feedback *
                  </label>
                  <textarea
                    name="message"
                    value={feedbackForm.message}
                    onChange={handleFeedbackChange}
                    required
                    rows={4}
                    className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 resize-none transition-colors ${
                      isDarkMode 
                        ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500' 
                        : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:ring-blue-500 focus:border-blue-500'
                    }`}
                    placeholder="Please share your thoughts, suggestions, or any issues you've encountered..."
                  />
                </div>
              </div>

              {/* Form Actions */}
              <div className="flex flex-col sm:flex-row gap-3 mt-6">
                <button
                  type="button"
                  onClick={closeFeedbackModal}
                  className={`flex-1 px-4 py-3 rounded-xl text-sm font-medium border transition-colors ${
                    isDarkMode 
                      ? 'border-gray-600 text-gray-300 hover:border-gray-500 hover:bg-gray-700' 
                      : 'border-gray-300 text-gray-700 hover:border-gray-400 hover:bg-gray-50'
                  }`}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
                    isDarkMode 
                      ? 'bg-blue-600 text-white hover:bg-blue-700' 
                      : 'bg-blue-600 text-white hover:bg-blue-700'
                  }`}
                >
                  <Send className="h-4 w-4" />
                  Send Feedback
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default ChatWidget;