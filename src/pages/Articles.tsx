import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Calendar, Clock, User, ArrowRight, Search, Filter, Mail } from 'lucide-react';
import { fetchArticles, Article } from '../services/articles';

interface ArticlesProps {
  isDarkMode: boolean;
}

const Articles: React.FC<ArticlesProps> = ({ isDarkMode }) => {
  const { t } = useTranslation();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [articles, setArticles] = useState<Article[]>([]);

  useEffect(() => {
    const loadArticles = async () => {
      const data = await fetchArticles();
      setArticles(data);
    };
    loadArticles();
  }, []);

  const categories = [
    { id: 'all', name: t('articles.all_articles'), count: 12 },
    { id: 'ergonomics', name: t('articles.ergonomics'), count: 4 },
    { id: 'health', name: t('articles.health_wellness'), count: 3 },
    { id: 'productivity', name: t('articles.productivity'), count: 3 },
    { id: 'design', name: t('articles.design'), count: 2 }
  ];


  const filteredArticles = articles.filter(article => {
    const categoryMatch = selectedCategory === 'all' || article.category === selectedCategory;
    const searchMatch = article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                       article.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    return categoryMatch && searchMatch;
  });

  const featuredArticle = articles.find(article => article.featured);
  const regularArticles = filteredArticles.filter(article => !article.featured);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

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
          <div className="text-center mb-12">
            <div className={`inline-flex items-center px-4 py-1.5 rounded-full text-xs font-bold tracking-wider border shadow-sm mb-6 ${isDarkMode ? 'bg-gray-800 border-gray-700 text-gray-300' : 'bg-white border-gray-200 text-slate-600'}`}>
               <span className="h-2 w-2 rounded-full mr-2 bg-mustard-500"></span>
               LATEST INSIGHTS
            </div>
            <h1 className={`text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight tracking-tight mb-6 transition-colors duration-300 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              {t('articles.title')}
            </h1>
            <div className="w-20 h-1 bg-mustard-500 mx-auto mb-8 rounded-full"></div>
            <p className={`text-lg max-w-2xl mx-auto transition-colors duration-300 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              {t('articles.subtitle')}
            </p>
          </div>

          {/* Search and Filter */}
          <div className="max-w-4xl mx-auto">
            <div className={`p-2 rounded-full shadow-lg border transition-all duration-300 ${isDarkMode ? 'bg-gray-800/80 border-gray-700 backdrop-blur-md' : 'bg-white/80 border-gray-100 backdrop-blur-md'}`}>
              <div className="flex flex-col md:flex-row gap-2">
                <div className="relative flex-1">
                  <Search className={`absolute left-4 top-3.5 h-5 w-5 ${isDarkMode ? 'text-gray-400' : 'text-gray-400'}`} />
                  <input
                    type="text"
                    placeholder={t('articles.search_placeholder')}
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className={`w-full pl-12 pr-4 py-3 rounded-full focus:outline-none transition-colors bg-transparent ${isDarkMode ? 'text-white placeholder-gray-500' : 'text-gray-900 placeholder-gray-400'}`}
                  />
                </div>
                <div className="flex items-center gap-2 px-2 pb-2 md:pb-0">
                  <div className={`h-8 w-[1px] hidden md:block ${isDarkMode ? 'bg-gray-700' : 'bg-gray-200'}`}></div>
                  <Filter className={`h-4 w-4 ml-2 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`} />
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className={`px-4 py-3 bg-transparent focus:outline-none text-sm font-medium cursor-pointer ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}
                  >
                    {categories.map((category) => (
                      <option key={category.id} value={category.id} className={isDarkMode ? 'bg-gray-800' : 'bg-white'}>
                        {category.name} ({category.count})
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Article */}
      {featuredArticle && selectedCategory === 'all' && !searchTerm && (
        <section className={`py-12 transition-colors duration-300 ${isDarkMode ? 'bg-gray-900' : 'bg-white'}`}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-8 flex items-center gap-3">
              <div className={`h-8 w-1 rounded-full ${isDarkMode ? 'bg-mustard-500' : 'bg-mustard-500'}`}></div>
              <h2 className={`text-2xl font-bold transition-colors duration-300 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                {t('articles.featured_article')}
              </h2>
            </div>
            <div className={`group relative rounded-3xl overflow-hidden transition-all duration-500 border ${isDarkMode ? 'bg-[#1a1a1a] border-white/5 hover:border-mustard-500/30' : 'bg-white border-gray-100 hover:border-mustard-500/30'} shadow-sm hover:shadow-2xl`}>
              <div className="grid grid-cols-1 lg:grid-cols-2">
                <div className="aspect-video lg:aspect-auto overflow-hidden">
                  <img
                    src={featuredArticle.image}
                    alt={featuredArticle.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <div className="p-8 lg:p-12 flex flex-col justify-center">
                  <div className="flex items-center gap-4 mb-6">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold tracking-wide shadow-sm ${isDarkMode ? 'bg-mustard-500 text-black' : 'bg-mustard-500 text-white'}`}>
                      {categories.find(cat => cat.id === featuredArticle.category)?.name}
                    </span>
                    <span className={`text-xs font-medium tracking-wider uppercase ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                      {t('articles.featured')}
                    </span>
                  </div>
                  <h3 className={`text-2xl lg:text-4xl font-bold mb-6 transition-colors duration-300 leading-tight ${isDarkMode ? 'text-white group-hover:text-mustard-500' : 'text-gray-900 group-hover:text-mustard-600'}`}>
                    {featuredArticle.title}
                  </h3>
                  <p className={`mb-8 leading-relaxed text-lg transition-colors duration-300 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    {featuredArticle.excerpt}
                  </p>
                  <div className="flex items-center justify-between mb-8 pb-8 border-b border-gray-100 dark:border-gray-800">
                    <div className="flex items-center gap-6">
                      <div className="flex items-center gap-2">
                        <User className={`h-4 w-4 ${isDarkMode ? 'text-mustard-500' : 'text-mustard-600'}`} />
                        <span className={`text-sm font-medium transition-colors duration-300 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                          {featuredArticle.author}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar className={`h-4 w-4 ${isDarkMode ? 'text-mustard-500' : 'text-mustard-600'}`} />
                        <span className={`text-sm font-medium transition-colors duration-300 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                          {formatDate(featuredArticle.date)}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className={`h-4 w-4 ${isDarkMode ? 'text-mustard-500' : 'text-mustard-600'}`} />
                      <span className={`text-sm font-medium transition-colors duration-300 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                        {featuredArticle.readTime}
                      </span>
                    </div>
                  </div>
                  <button className={`w-fit flex items-center gap-2 px-8 py-4 rounded-xl text-sm font-bold tracking-wide transition-all duration-300 ${isDarkMode ? 'bg-white text-black hover:bg-mustard-500 hover:shadow-lg hover:shadow-mustard-500/20' : 'bg-black text-white hover:bg-mustard-500 hover:shadow-lg hover:shadow-mustard-500/20'}`}>
                    {t('articles.read_article')} <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Articles Grid */}
      <section className={`py-12 transition-colors duration-300 ${isDarkMode ? 'bg-gray-900' : 'bg-white'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <div className={`h-6 w-1 rounded-full ${isDarkMode ? 'bg-mustard-500' : 'bg-mustard-500'}`}></div>
              <h2 className={`text-2xl font-bold transition-colors duration-300 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                {selectedCategory === 'all' ? t('articles.latest_articles') : `${categories.find(cat => cat.id === selectedCategory)?.name} Articles`}
              </h2>
            </div>
            <span className={`text-sm font-medium transition-colors duration-300 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
              {t('articles.articles_found', { count: filteredArticles.length })}
            </span>
          </div>

          {regularArticles.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {regularArticles.map((article) => (
                <article key={article.id} className={`group relative rounded-3xl overflow-hidden transition-all duration-500 ${isDarkMode ? 'bg-[#1a1a1a] hover:bg-[#222]' : 'bg-white hover:bg-white/60'} border ${isDarkMode ? 'border-white/5 hover:border-mustard-500/30' : 'border-gray-100 hover:border-mustard-500/30'} shadow-sm hover:shadow-2xl hover:-translate-y-1`}>
                  
                  {/* Category Badge */}
                  <div className="absolute top-4 left-4 z-10">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold tracking-wide shadow-lg ${isDarkMode ? 'bg-black/50 text-white backdrop-blur-md border border-white/10' : 'bg-white/90 text-black backdrop-blur-md shadow-sm'}`}>
                      {categories.find(cat => cat.id === article.category)?.name}
                    </span>
                  </div>

                  <div className="aspect-[16/10] overflow-hidden">
                    <img
                      src={article.image}
                      alt={article.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                  </div>
                  
                  <div className="p-6 flex flex-col h-full">
                    <div className="flex items-center gap-2 mb-4">
                       <Clock className={`h-3.5 w-3.5 ${isDarkMode ? 'text-mustard-500' : 'text-mustard-600'}`} />
                       <span className={`text-xs font-medium transition-colors duration-300 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                        {article.readTime}
                      </span>
                    </div>

                    <h3 className={`text-xl font-bold mb-3 line-clamp-2 transition-colors duration-300 ${isDarkMode ? 'text-white group-hover:text-mustard-500' : 'text-gray-900 group-hover:text-mustard-600'}`}>
                      {article.title}
                    </h3>
                    
                    <p className={`text-sm mb-6 line-clamp-3 flex-grow transition-colors duration-300 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                      {article.excerpt}
                    </p>
                    
                    <div className="pt-6 mt-auto border-t border-gray-100 dark:border-white/5 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className={`h-6 w-6 rounded-full flex items-center justify-center ${isDarkMode ? 'bg-gray-800' : 'bg-gray-100'}`}>
                           <User className={`h-3 w-3 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`} />
                        </div>
                        <span className={`text-xs font-medium transition-colors duration-300 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                          {article.author}
                        </span>
                      </div>
                      <span className={`text-xs font-medium transition-colors duration-300 ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>
                        {formatDate(article.date)}
                      </span>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="text-center py-24">
              <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full mb-6 ${isDarkMode ? 'bg-gray-800' : 'bg-gray-100'}`}>
                <Search className={`h-8 w-8 ${isDarkMode ? 'text-gray-600' : 'text-gray-400'}`} />
              </div>
              <h3 className={`text-xl font-bold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>No articles found</h3>
              <p className={`text-lg transition-colors duration-300 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                {t('articles.no_articles_found')}
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className={`relative py-24 overflow-hidden transition-colors duration-300 ${isDarkMode ? 'bg-gray-900' : 'bg-white'}`}>
         <div className="absolute inset-0 pointer-events-none" style={{
            backgroundImage: `linear-gradient(${isDarkMode ? '#374151' : '#e5e7eb'} 1px, transparent 1px), linear-gradient(90deg, ${isDarkMode ? '#374151' : '#e5e7eb'} 1px, transparent 1px)`,
            backgroundSize: '40px 40px',
            opacity: 0.3
        }}></div>
        
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div className={`inline-flex items-center justify-center p-3 rounded-2xl mb-6 ${isDarkMode ? 'bg-gray-800' : 'bg-mustard-50'}`}>
            <Mail className={`h-6 w-6 ${isDarkMode ? 'text-mustard-500' : 'text-mustard-600'}`} />
          </div>
          <h2 className={`text-3xl sm:text-4xl font-bold mb-4 transition-colors duration-300 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            {t('articles.stay_updated')}
          </h2>
          <p className={`text-lg mb-8 max-w-2xl mx-auto transition-colors duration-300 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            {t('articles.stay_updated_desc')}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder={t('home.email_placeholder')}
              className={`flex-1 px-6 py-4 border rounded-full focus:outline-none focus:ring-2 transition-colors ${isDarkMode ? 'bg-gray-800 border-gray-700 text-white placeholder-gray-500 focus:ring-mustard-500/50' : 'bg-white border-gray-200 text-black placeholder-gray-400 focus:ring-mustard-500/50'}`}
            />
            <button className={`px-8 py-4 rounded-full text-sm font-bold tracking-wide transition-all duration-300 ${isDarkMode ? 'bg-mustard-500 text-black hover:bg-mustard-400 hover:shadow-lg hover:shadow-mustard-500/20' : 'bg-mustard-500 text-black hover:bg-mustard-600 hover:shadow-lg hover:shadow-mustard-500/20'}`}>
              {t('articles.subscribe')}
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Articles;