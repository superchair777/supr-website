import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Minus, Plus, Trash2, ArrowLeft, ShoppingBag, CreditCard, Truck, Shield } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

interface CartProps {
  isDarkMode: boolean;
}

interface CartItem {
  id: number;
  name: string;
  price: number;
  originalPrice?: number | null;
  quantity: number;
  image: string;
  category: string;
  inStock: boolean;
  options?: Record<string, string> | null;
}

const Cart: React.FC<CartProps> = ({ isDarkMode }) => {
  const { t } = useTranslation();
  const { items, updateQuantity, removeItem } = useCart();
  const cartItems = items as CartItem[];

  const [promoCode, setPromoCode] = useState('');
  const [appliedPromo, setAppliedPromo] = useState<string | null>(null);

  

  const applyPromoCode = () => {
    if (promoCode.toLowerCase() === 'save10') {
      setAppliedPromo('SAVE10');
      setPromoCode('');
    } else if (promoCode.toLowerCase() === 'welcome20') {
      setAppliedPromo('WELCOME20');
      setPromoCode('');
    } else {
      alert('Invalid promo code');
    }
  };

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const promoDiscount = appliedPromo === 'SAVE10' ? subtotal * 0.1 : appliedPromo === 'WELCOME20' ? subtotal * 0.2 : 0;
  const shipping = subtotal > 500 ? 0 : 49.99;
  const tax = (subtotal - promoDiscount) * 0.08;
  const total = subtotal - promoDiscount + shipping + tax;

  const benefits = [
    {
      icon: Truck,
      title: t('cart.free_shipping'),
      description: t('cart.free_shipping_desc')
    },
    {
      icon: Shield,
      title: t('cart.warranty'),
      description: t('cart.warranty_desc')
    },
    {
      icon: CreditCard,
      title: t('cart.secure_payment'),
      description: t('cart.secure_payment_desc')
    }
  ];

  const optionLabels: Record<string, string> = {
    backrestColor: t('product.backrest_color'),
    seatColor: t('product.seat_color'),
    puColor: t('product.pu_color'),
    material: t('product.material'),
    armrests: 'Armrests',
    base: 'Base',
    wheels: 'Wheels',
    lumbar: 'Lumbar',
    headrest: 'Headrest'
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 ${isDarkMode ? 'bg-gray-900' : 'bg-white'}`}>
      {/* Header */}
      <section className={`py-8 transition-colors duration-300 ${isDarkMode ? 'bg-gray-900' : 'bg-white'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-4 mb-8">
            <Link
              to="/products"
              className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-colors ${isDarkMode ? 'bg-gray-800 text-gray-300 hover:bg-gray-700' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
            >
              <ArrowLeft className="h-4 w-4" />
              {t('cart.continue_shopping')}
            </Link>
          </div>
          
          <div className="text-center mb-8">
            <div className="flex items-center justify-center mb-4">
              <ShoppingBag className={`h-8 w-8 ${isDarkMode ? 'text-white' : 'text-black'}`} />
            </div>
            <h1 className={`text-4xl font-bold mb-2 transition-colors duration-300 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              {t('cart.shopping_cart')}
            </h1>
            <p className={`text-lg transition-colors duration-300 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              {t(cartItems.length === 1 ? 'cart.items_in_cart' : 'cart.items_in_cart_plural', { count: cartItems.length })}
            </p>
          </div>
        </div>
      </section>

      {/* Cart Content */}
      <section className={`py-8 transition-colors duration-300 ${isDarkMode ? 'bg-gray-900' : 'bg-white'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {cartItems.length === 0 ? (
            <div className="text-center py-16">
              <ShoppingBag className={`h-16 w-16 mx-auto mb-4 ${isDarkMode ? 'text-gray-400' : 'text-gray-300'}`} />
              <h2 className={`text-2xl font-bold mb-4 transition-colors duration-300 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                {t('cart.empty_cart_title')}
              </h2>
              <p className={`mb-8 transition-colors duration-300 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                {t('cart.empty_cart_subtitle')}
              </p>
              <Link
                to="/products"
                className={`px-8 py-3 rounded-full text-sm font-medium transition-colors ${isDarkMode ? 'bg-white text-black hover:bg-gray-200' : 'bg-black text-white hover:bg-gray-800'}`}
              >
                {t('cart.shop_chairs')}
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Cart Items */}
              <div className="lg:col-span-2">
                <div className="space-y-6">
                  {cartItems.map((item) => (
                    <div key={item.id} className={`rounded-3xl p-6 transition-colors duration-300 ${isDarkMode ? 'bg-gray-800' : 'bg-gray-50'}`}>
                      <div className="flex gap-6">
                        <div className="relative">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-24 h-24 object-cover rounded-2xl"
                          />
                          {!item.inStock && (
                            <div className="absolute inset-0 bg-black bg-opacity-50 rounded-2xl flex items-center justify-center">
                              <span className="text-white text-xs font-medium">{t('cart.out_of_stock')}</span>
                            </div>
                          )}
                        </div>

                        <div className="flex-1">
                          <div className="flex items-start justify-between mb-2">
                            <div>
                              <h3 className={`font-medium mb-1 transition-colors duration-300 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                                {item.name}
                              </h3>
                              <p className={`text-sm transition-colors duration-300 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                                {item.category}
                              </p>
                              {item.options && (
                                <div className="mt-2 flex flex-wrap gap-2">
                                  {Object.entries(item.options)
                                    .filter(([key]) => key !== 'qty')
                                    .map(([key, value]) => (
                                      <span key={key} className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs ${isDarkMode ? 'bg-gray-700 text-gray-200' : 'bg-white text-gray-700 border border-gray-200'}`}>
                                        <span className="font-medium">{optionLabels[key] ?? key}:</span>
                                        <span>{value}</span>
                                      </span>
                                    ))}
                                </div>
                              )}
                              {!item.inStock && (
                                <p className="text-sm text-gray-500 mt-1">{t('cart.currently_out_of_stock')}</p>
                              )}
                            </div>
                            <button
                              onClick={() => removeItem(item.id)}
                              className={`p-2 rounded-full transition-colors ${isDarkMode ? 'hover:bg-gray-700 text-gray-400 hover:text-white' : 'hover:bg-gray-200 text-gray-500 hover:text-black'}`}
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </div>

                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <span className={`font-semibold transition-colors duration-300 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                                ${item.price}
                              </span>
                              {item.originalPrice && (
                                <span className={`text-sm line-through transition-colors duration-300 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                                  ${item.originalPrice}
                                </span>
                              )}
                            </div>

                            <div className="flex items-center gap-3">
                              <div className={`flex items-center border rounded-full transition-colors duration-300 ${isDarkMode ? 'border-gray-600' : 'border-gray-300'}`}>
                                <button
                                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                  disabled={!item.inStock}
                                  className={`p-2 rounded-l-full transition-colors ${
                                    item.inStock
                                      ? isDarkMode
                                        ? 'hover:bg-gray-700 text-gray-300'
                                        : 'hover:bg-gray-100 text-gray-600'
                                      : 'text-gray-400 cursor-not-allowed'
                                  }`}
                                >
                                  <Minus className="h-3 w-3" />
                                </button>
                                <span className={`px-4 py-2 text-sm font-medium transition-colors duration-300 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                                  {item.quantity}
                                </span>
                                <button
                                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                  disabled={!item.inStock}
                                  className={`p-2 rounded-r-full transition-colors ${
                                    item.inStock
                                      ? isDarkMode
                                        ? 'hover:bg-gray-700 text-gray-300'
                                        : 'hover:bg-gray-100 text-gray-600'
                                      : 'text-gray-400 cursor-not-allowed'
                                  }`}
                                >
                                  <Plus className="h-3 w-3" />
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Order Summary */}
              <div className="lg:col-span-1">
                <div className={`rounded-3xl p-6 transition-colors duration-300 ${isDarkMode ? 'bg-gray-800' : 'bg-gray-50'}`}>
                  <h2 className={`text-xl font-bold mb-6 transition-colors duration-300 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                    {t('cart.order_summary')}
                  </h2>

                  {/* Promo Code */}
                  <div className="mb-6">
                    <label className={`block text-sm font-medium mb-2 transition-colors duration-300 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                      {t('cart.promo_code')}
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={promoCode}
                        onChange={(e) => setPromoCode(e.target.value)}
                        placeholder={t('cart.promo_code_placeholder')}
                        className={`flex-1 px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-1 transition-colors ${isDarkMode ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:ring-gray-500' : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:ring-gray-400'}`}
                      />
                      <button
                        onClick={applyPromoCode}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${isDarkMode ? 'bg-gray-700 text-gray-200 hover:bg-gray-600' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
                      >
                        {t('cart.apply')}
                      </button>
                    </div>
                    {appliedPromo && (
                      <p className="text-sm text-mustard-500 mt-2">
                        {t('cart.promo_applied', { code: appliedPromo })}
                      </p>
                    )}
                  </div>

                  {/* Price Breakdown */}
                  <div className="space-y-3 mb-6">
                    <div className="flex justify-between">
                      <span className={`transition-colors duration-300 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                        {t('cart.subtotal')}
                      </span>
                      <span className={`font-medium transition-colors duration-300 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                        ${subtotal.toFixed(2)}
                      </span>
                    </div>
                    
                    {promoDiscount > 0 && (
                      <div className="flex justify-between text-mustard-600 dark:text-mustard-400">
                    <span>{t('cart.discount', { code: appliedPromo })}</span>
                    <span>-${promoDiscount.toFixed(2)}</span>
                  </div>
                    )}
                    
                    <div className="flex justify-between">
                      <span className={`transition-colors duration-300 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                        {t('cart.shipping')}
                      </span>
                      <span className={`font-medium transition-colors duration-300 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                        {shipping === 0 ? t('cart.free') : `$${shipping.toFixed(2)}`}
                      </span>
                    </div>
                    
                    <div className="flex justify-between">
                      <span className={`transition-colors duration-300 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                        {t('cart.tax')}
                      </span>
                      <span className={`font-medium transition-colors duration-300 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                        ${tax.toFixed(2)}
                      </span>
                    </div>
                    
                    <div className={`border-t pt-3 transition-colors duration-300 ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}>
                      <div className="flex justify-between">
                        <span className={`text-lg font-bold transition-colors duration-300 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                          {t('cart.total')}
                        </span>
                        <span className={`text-lg font-bold transition-colors duration-300 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                          ${total.toFixed(2)}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Checkout Button */}
                  <button className={`w-full py-4 rounded-2xl text-sm font-medium transition-colors mb-4 ${isDarkMode ? 'bg-white text-black hover:bg-gray-200' : 'bg-black text-white hover:bg-gray-800'}`}>
                    {t('cart.proceed_to_checkout')}
                  </button>

                  <p className={`text-xs text-center transition-colors duration-300 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                    {t('cart.secure_checkout')}
                  </p>
                </div>

                {/* Benefits */}
                <div className={`rounded-3xl p-6 mt-6 transition-colors duration-300 ${isDarkMode ? 'bg-gray-800' : 'bg-gray-50'}`}>
                  <h3 className={`font-bold mb-4 transition-colors duration-300 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                    {t('cart.why_shop_with_us')}
                  </h3>
                  <div className="space-y-4">
                    {benefits.map((benefit, index) => (
                      <div key={index} className="flex items-center gap-3">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors duration-300 ${isDarkMode ? 'bg-gray-700' : 'bg-white'}`}>
                          <benefit.icon className={`h-4 w-4 ${isDarkMode ? 'text-white' : 'text-gray-700'}`} />
                        </div>
                        <div>
                          <p className={`text-sm font-medium transition-colors duration-300 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                            {benefit.title}
                          </p>
                          <p className={`text-xs transition-colors duration-300 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                            {benefit.description}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Cart;
