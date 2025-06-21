import React, { useState, useEffect } from 'react';
import { FiArrowRight, FiRefreshCw, FiAlertCircle, FiEye, FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { footballNewsApi, formatNewsDate, truncateText } from '../services/FootballNewsService';
import './NewsList.scss';

const NewsList = ({ onNavigate }) => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeFilter, setActiveFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [allNews, setAllNews] = useState([]);

  const itemsPerPage = 8;

  const filters = [
    { id: 'all', label: 'Barcha yangiliklar', topic: 'football' },
    { id: 'premier-league', label: 'Premier League', topic: 'premier league' },
    { id: 'la-liga', label: 'La Liga', topic: 'la liga' },
    { id: 'serie-a', label: 'Serie A', topic: 'serie a' },
    { id: 'bundesliga', label: 'Bundesliga', topic: 'bundesliga' },
    { id: 'champions-league', label: 'Champions League', topic: 'champions league' }
  ];

  // Football-related images for different categories
  const footballImages = {
    'Premier League': [
      'https://images.unsplash.com/photo-1578662996442-48f60103fc96?auto=format&fit=crop&w=400&q=80',
      'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&w=400&q=80',
      'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=400&q=80',
      'https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&w=400&q=80',
      'https://images.unsplash.com/photo-1552318965-6e6be7484ada?auto=format&fit=crop&w=400&q=80',
      'https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?auto=format&fit=crop&w=400&q=80'
    ],
    'La Liga': [
      'https://images.unsplash.com/photo-1578662996442-48f60103fc96?auto=format&fit=crop&w=400&q=80',
      'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&w=400&q=80',
      'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=400&q=80',
      'https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&w=400&q=80',
      'https://images.unsplash.com/photo-1552318965-6e6be7484ada?auto=format&fit=crop&w=400&q=80',
      'https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?auto=format&fit=crop&w=400&q=80'
    ],
    'Serie A': [
      'https://images.unsplash.com/photo-1578662996442-48f60103fc96?auto=format&fit=crop&w=400&q=80',
      'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&w=400&q=80',
      'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=400&q=80',
      'https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&w=400&q=80',
      'https://images.unsplash.com/photo-1552318965-6e6be7484ada?auto=format&fit=crop&w=400&q=80',
      'https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?auto=format&fit=crop&w=400&q=80'
    ],
    'Bundesliga': [
      'https://images.unsplash.com/photo-1578662996442-48f60103fc96?auto=format&fit=crop&w=400&q=80',
      'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&w=400&q=80',
      'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=400&q=80',
      'https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&w=400&q=80',
      'https://images.unsplash.com/photo-1552318965-6e6be7484ada?auto=format&fit=crop&w=400&q=80',
      'https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?auto=format&fit=crop&w=400&q=80'
    ],
    'Champions League': [
      'https://images.unsplash.com/photo-1578662996442-48f60103fc96?auto=format&fit=crop&w=400&q=80',
      'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&w=400&q=80',
      'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=400&q=80',
      'https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&w=400&q=80',
      'https://images.unsplash.com/photo-1552318965-6e6be7484ada?auto=format&fit=crop&w=400&q=80',
      'https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?auto=format&fit=crop&w=400&q=80'
    ],
    'Football': [
      'https://images.unsplash.com/photo-1578662996442-48f60103fc96?auto=format&fit=crop&w=400&q=80',
      'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&w=400&q=80',
      'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=400&q=80',
      'https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&w=400&q=80',
      'https://images.unsplash.com/photo-1552318965-6e6be7484ada?auto=format&fit=crop&w=400&q=80',
      'https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?auto=format&fit=crop&w=400&q=80'
    ]
  };

  // Function to get a relevant football image based on news content
  const getRelevantFootballImage = (newsItem) => {
    const category = getNewsCategory(newsItem.title);
    const images = footballImages[category] || footballImages['Football'];

    // Use the news item's title or description to determine which image to use
    const titleLower = newsItem.title.toLowerCase();
    const descriptionLower = (newsItem.description || '').toLowerCase();
    const content = titleLower + ' ' + descriptionLower;

    // Enhanced keyword matching for better image selection
    if (content.includes('goal') || content.includes('score') || content.includes('win') || content.includes('victory') || content.includes('defeat') || content.includes('loss') || content.includes('match') || content.includes('game') || content.includes('result')) {
      return images[2]; // Match action
    } else if (content.includes('player') || content.includes('transfer') || content.includes('sign') || content.includes('contract') || content.includes('deal') || content.includes('agreement') || content.includes('injury') || content.includes('suspension') || content.includes('ban') || content.includes('disciplinary') || content.includes('medical') || content.includes('recovery')) {
      return images[1]; // Players
    } else if (content.includes('team') || content.includes('club') || content.includes('league') || content.includes('championship') || content.includes('table') || content.includes('position') || content.includes('money') || content.includes('financial') || content.includes('budget') || content.includes('spending') || content.includes('revenue') || content.includes('profit')) {
      return images[0]; // Stadium
    } else if (content.includes('stadium') || content.includes('fans') || content.includes('crowd') || content.includes('supporters') || content.includes('atmosphere') || content.includes('attendance') || content.includes('audience') || content.includes('spectators')) {
      return images[3]; // Fans
    } else if (content.includes('trophy') || content.includes('champion') || content.includes('winner') || content.includes('final') || content.includes('cup') || content.includes('title') || content.includes('award') || content.includes('prize') || content.includes('medal')) {
      return images[4]; // Trophy
    } else if (content.includes('coach') || content.includes('manager') || content.includes('tactics') || content.includes('formation') || content.includes('training') || content.includes('practice') || content.includes('strategy') || content.includes('planning')) {
      return images[5]; // Training
    } else {
      // Use index based on news item position for variety
      const index = (newsItem.id || Math.random()) % images.length;
      return images[index];
    }
  };

  const fetchNews = async (filterId = 'all') => {
    try {
      setLoading(true);
      setError(null);

      const filter = filters.find(f => f.id === filterId);
      const newsData = await footballNewsApi.getNewsByTopic(filter.topic, 1, 50); // Fetch more news for pagination

      // Sort news by date (newest first)
      const sortedNews = newsData.sort((a, b) => {
        const dateA = new Date(a.publishedAt);
        const dateB = new Date(b.publishedAt);
        return dateB - dateA; // Newest first
      });

      setAllNews(sortedNews);
      setTotalPages(Math.ceil(sortedNews.length / itemsPerPage));
      setCurrentPage(1);
    } catch (err) {
      setError('Yangiliklar yuklanayotganda xatolik yuz berdi');
      console.error('Error fetching news:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNews(activeFilter);
  }, [activeFilter]);

  useEffect(() => {
    // Update displayed news based on current page
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    setNews(allNews.slice(startIndex, endIndex));
  }, [currentPage, allNews]);

  const handleFilterChange = (filterId) => {
    setActiveFilter(filterId);
    setCurrentPage(1);
  };

  const handlePageChange = (pageNum) => {
    setCurrentPage(pageNum);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleRetry = () => {
    fetchNews(activeFilter);
  };

  const handleNewsClick = (newsItem) => {
    if (newsItem.url && newsItem.url !== '#') {
      window.open(newsItem.url, '_blank');
    }
  };

  const handleDetailsClick = (newsItem) => {
    if (onNavigate) {
      onNavigate('newsdetail', newsItem);
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

  // Generate pagination numbers
  const getPaginationNumbers = () => {
    const numbers = [];
    const maxVisible = 5;
    
    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) {
        numbers.push(i);
      }
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= 4; i++) {
          numbers.push(i);
        }
        numbers.push('...');
        numbers.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        numbers.push(1);
        numbers.push('...');
        for (let i = totalPages - 3; i <= totalPages; i++) {
          numbers.push(i);
        }
      } else {
        numbers.push(1);
        numbers.push('...');
        for (let i = currentPage - 1; i <= currentPage + 1; i++) {
          numbers.push(i);
        }
        numbers.push('...');
        numbers.push(totalPages);
      }
    }
    
    return numbers;
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

      <div className="news-container">
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
                  src={getRelevantFootballImage(newsItem)}
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
                {truncateText(newsItem.description || newsItem.content || '', 150)}
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
                </div>
                <span className="news-category">
                  {getNewsCategory(newsItem.title)}
                </span>
              </div>
            </div>
          </article>
        ))}
      </div>

      {totalPages > 1 && (
        <div className="pagination">
          <button 
            className="pagination-btn prev"
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            <FiChevronLeft />
            Oldingi
          </button>
          
          <div className="pagination-numbers">
            {getPaginationNumbers().map((number, index) => (
              <button
                key={index}
                className={`pagination-number ${number === currentPage ? 'active' : ''} ${number === '...' ? 'dots' : ''}`}
                onClick={() => typeof number === 'number' && handlePageChange(number)}
                disabled={number === '...'}
              >
                {number}
              </button>
            ))}
          </div>
          
          <button 
            className="pagination-btn next"
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            Keyingi
            <FiChevronRight />
          </button>
        </div>
      )}
    </div>
  );
};

export default NewsList; 