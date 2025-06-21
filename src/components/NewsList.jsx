import React, { useState, useEffect } from 'react';
import { FiArrowRight, FiRefreshCw, FiAlertCircle, FiEye } from 'react-icons/fi';
import { footballNewsApi, formatNewsDate, truncateText } from '../services/FootballNewsService';
import './NewsList.scss';

const NewsList = ({ onNavigate }) => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeFilter, setActiveFilter] = useState('all');
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const filters = [
    { id: 'all', label: 'Barcha yangiliklar', topic: 'football' },
    { id: 'premier-league', label: 'Premier League', topic: 'premier league' },
    { id: 'la-liga', label: 'La Liga', topic: 'la liga' },
    { id: 'serie-a', label: 'Serie A', topic: 'serie a' },
    { id: 'bundesliga', label: 'Bundesliga', topic: 'bundesliga' },
    { id: 'champions-league', label: 'Champions League', topic: 'champions league' }
  ];

  const fetchNews = async (filterId = 'all', pageNum = 1, append = false) => {
    try {
      setLoading(true);
      setError(null);
      
      const filter = filters.find(f => f.id === filterId);
      const newsData = await footballNewsApi.getNewsByTopic(filter.topic, pageNum, 6);
      
      // Sort news by date (newest first)
      const sortedNews = newsData.sort((a, b) => {
        const dateA = new Date(a.publishedAt);
        const dateB = new Date(b.publishedAt);
        return dateB - dateA; // Newest first
      });
      
      if (append) {
        setNews(prev => {
          const combinedNews = [...prev, ...sortedNews];
          // Remove duplicates and sort again
          const uniqueNews = combinedNews.filter((item, index, self) => 
            index === self.findIndex(t => t.id === item.id)
          );
          return uniqueNews.sort((a, b) => {
            const dateA = new Date(a.publishedAt);
            const dateB = new Date(b.publishedAt);
            return dateB - dateA;
          });
        });
      } else {
        setNews(sortedNews);
      }
      
      setHasMore(newsData.length === 6);
    } catch (err) {
      setError('Yangiliklar yuklanayotganda xatolik yuz berdi');
      console.error('Error fetching news:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNews(activeFilter, 1, false);
  }, [activeFilter]);

  const handleFilterChange = (filterId) => {
    setActiveFilter(filterId);
    setPage(1);
  };

  const handleLoadMore = () => {
    const nextPage = page + 1;
    setPage(nextPage);
    fetchNews(activeFilter, nextPage, true);
  };

  const handleRetry = () => {
    fetchNews(activeFilter, 1, false);
  };

  const handleNewsClick = (newsItem) => {
    if (newsItem.url && newsItem.url !== '#') {
      window.open(newsItem.url, '_blank');
    }
  };

  const handleDetailsClick = (newsItem) => {
    // Navigate to detailed news page using App component's navigation
    const articleId = newsItem.id || newsItem.title.replace(/[^a-zA-Z0-9]/g, '-').toLowerCase();
    if (onNavigate) {
      onNavigate('newsdetail', articleId);
    }
  };

  const getNewsCategory = (title) => {
    const titleLower = title.toLowerCase();
    if (titleLower.includes('premier league') || titleLower.includes('chelsea') || titleLower.includes('manchester')) {
      return 'Premier League';
    } else if (titleLower.includes('la liga') || titleLower.includes('real madrid') || titleLower.includes('barcelona')) {
      return 'La Liga';
    } else if (titleLower.includes('serie a') || titleLower.includes('napoli') || titleLower.includes('juventus')) {
      return 'Serie A';
    } else if (titleLower.includes('bundesliga') || titleLower.includes('bayern') || titleLower.includes('dortmund')) {
      return 'Bundesliga';
    } else if (titleLower.includes('champions league') || titleLower.includes('uefa')) {
      return 'Champions League';
    }
    return 'Football';
  };

  const getCurrentDate = () => {
    const now = new Date();
    const options = { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    };
    return now.toLocaleDateString('uz-UZ', options);
  };

  if (loading && news.length === 0) {
    return (
      <div className="news-list">
        <div className="loading-state">
          <div className="loading-spinner"></div>
          <div className="loading-text">Yangiliklar yuklanmoqda...</div>
        </div>
      </div>
    );
  }

  if (error && news.length === 0) {
    return (
      <div className="news-list">
        <div className="error-state">
          <FiAlertCircle className="error-icon" />
          <div className="error-text">{error}</div>
          <button className="retry-btn" onClick={handleRetry}>
            <FiRefreshCw style={{ marginRight: '8px' }} />
            Qayta urinish
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="news-list">
      <div className="news-header">
        <h2>Futbol Yangiliklari</h2>
        <div className="news-subtitle">
          {getCurrentDate()} • Eng so'nggi futbol yangiliklari va tahlillar
        </div>
        <div className="news-filters">
          {filters.map(filter => (
            <button
              key={filter.id}
              className={`filter-btn ${activeFilter === filter.id ? 'active' : ''}`}
              onClick={() => handleFilterChange(filter.id)}
            >
              {filter.label}
            </button>
          ))}
        </div>
      </div>

      <div className="news-grid">
        {news.map((newsItem, index) => (
          <article
            key={newsItem.id || index}
            className="news-card"
          >
            <div className="news-image">
              {newsItem.urlToImage ? (
                <img
                  src={newsItem.urlToImage}
                  alt={newsItem.title}
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.nextSibling.style.display = 'flex';
                  }}
                />
              ) : null}
              <div style={{ display: newsItem.urlToImage ? 'none' : 'flex' }}>
                <img 
                  src="https://images.unsplash.com/photo-1578662996442-48f60103fc96?auto=format&fit=crop&w=400&q=80" 
                  alt={newsItem.title}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </div>
            </div>
            
            <div className="news-content">
              <div className="news-meta">
                <span className="news-source">
                  {newsItem.source?.name || 'Football News'}
                </span>
                <span className="news-date">
                  {formatNewsDate(newsItem.publishedAt)}
                </span>
              </div>
              
              <h3 className="news-title">
                {newsItem.title}
              </h3>
              
              <p className="news-description">
                {truncateText(newsItem.description || newsItem.content || '', 200)}
              </p>
              
              <div className="news-footer">
                <div className="news-actions">
                  <button 
                    className="details-btn" 
                    onClick={() => handleDetailsClick(newsItem)}
                  >
                    <FiEye />
                    Batafsil
                  </button>
                  <a 
                    href={newsItem.url} 
                    className="read-more" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                  >
                    Davomini o'qish
                    <FiArrowRight />
                  </a>
                </div>
                <span className="news-category">
                  {getNewsCategory(newsItem.title)}
                </span>
              </div>
            </div>
          </article>
        ))}
      </div>

      {hasMore && (
        <div className="load-more">
          <button className="load-more-btn" onClick={handleLoadMore}>
            <FiRefreshCw style={{ marginRight: '8px' }} />
            Ko'proq yangiliklar
          </button>
        </div>
      )}
    </div>
  );
};  

export default NewsList; 