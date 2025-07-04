import React, { useEffect, useState } from 'react';
import { FiEye } from 'react-icons/fi';
import './NewsList.scss';

const filters = [
  { id: 'all', label: 'Barcha yangiliklar' },
  { id: 'premier-league', label: 'Premier League' },
  { id: 'la-liga', label: 'La Liga' },
  { id: 'serie-a', label: 'Serie A' },
  { id: 'bundesliga', label: 'Bundesliga' },
  { id: 'champions-league', label: 'Champions League' },
];

const formatNewsDate = (dateStr) => {
  const date = new Date(dateStr);
  return date.toLocaleDateString('uz-UZ', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
};

const truncateText = (text, maxLength) => {
  if (!text) return '';
  return text.length > maxLength ? text.slice(0, maxLength) + '...' : text;
};

const NewsList = ({ onNavigate }) => {
  const [news, setNews] = useState([]);

  useEffect(() => {
    const stored = localStorage.getItem('news');
    if (stored) {
      setNews(JSON.parse(stored).filter(n => !n.deleted && n.status === 'Published'));
    } else {
      setNews([]);
    }
  }, []);

  const handleDetailsClick = (newsItem) => {
    if (onNavigate) {
      onNavigate('newsdetail', newsItem);
    }
  };

  return (
    <div className="news-list">
      <div className="news-header">
        <div className="news-filters">
          {filters.map(filter => (
            <button
              key={filter.id}
              className="filter-btn"
              type="button"
              disabled
            >
              {filter.label}
            </button>
          ))}
        </div>
      </div>
      <div className="news-container">
        {news.length === 0 ? (
          <div className="no-news-message">Yangiliklar mavjud emas.</div>
        ) : (
          news.map((newsItem) => (
            <article key={newsItem.id} className="news-card">
              <div className="news-image">
                {newsItem.image && (
                  <img
                    src={newsItem.image}
                    alt={newsItem.title}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                )}
              </div>
              <div className="news-content">
                <div className="news-meta">
                  <span className="news-source">
                    {newsItem.source?.name || 'Football News'}
                  </span>
                  <span className="news-date">
                    {formatNewsDate(newsItem.publishedAt || newsItem.id)}
                  </span>
                </div>
                <h3 className="news-title">{newsItem.title}</h3>
                <p className="news-description">
                  {truncateText(newsItem.content || newsItem.description || '', 150)}
                </p>
                <div className="news-footer">
                  <div className="news-actions">
                    <button
                      className="details-btn"
                      onClick={() => handleDetailsClick(newsItem)}
                    >
                      <FiEye /> Batafsil
                    </button>
                  </div>
                </div>
              </div>
            </article>
          ))
        )}
      </div>
    </div>
  );
};

export default NewsList; 