import React, { useEffect, useState } from 'react';
import { FiEye } from 'react-icons/fi';
import { newsApi } from '../services/ApiService';
import './NewsList.scss';
import axios from 'axios';

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

const getImageUrl = (url) => {
  if (!url) return '';
  if (url.startsWith('http')) return url;
  return `http://localhost:5000${url}`;
};

const NewsList = ({ onNavigate, search = '' }) => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');

  useEffect(() => {
    newsApi.getAll().then(data => {
      let allNews = Array.isArray(data) ? data : [];
      let published = allNews.filter(n => n.status === 'Published' && n.deleted === false);
      setNews(published.length > 0 ? published : allNews);
      setLoading(false);
    });
    axios.get('/api/categories').then(res => {
      setCategories(res.data || []);
    });
  }, []);

  const handleDetailsClick = (newsItem) => {
    if (onNavigate) {
      onNavigate('newsdetail', newsItem);
    }
  };

  const filteredNews = (selectedCategory === 'all' ? news : news.filter(n => n.category === selectedCategory))
    .filter(n => {
      const q = search.trim().toLowerCase();
      if (!q) return true;
      return (
        (n.title && n.title.toLowerCase().includes(q)) ||
        (n.content && n.content.toLowerCase().includes(q)) ||
        (n.description && n.description.toLowerCase().includes(q)) ||
        (n.category && n.category.toLowerCase().includes(q))
      );
    });

  return (
    <div className="news-list">
      <div className="news-header">
        <div className="news-filters">
          <button
            key="all"
            className="filter-btn"
            type="button"
            onClick={() => setSelectedCategory('all')}
            disabled={selectedCategory === 'all'}
          >
            Barcha yangiliklar
          </button>
          {categories.map(cat => (
            <button
              key={cat.id}
              className="filter-btn"
              type="button"
              onClick={() => setSelectedCategory(cat.name)}
              disabled={selectedCategory === cat.name}
            >
              {cat.name}
            </button>
          ))}
        </div>
      </div>
      <div className="news-container">
        {loading ? (
          <div className="no-news-message">Yuklanmoqda...</div>
        ) : filteredNews.length === 0 ? (
          <div className="no-news-message">{search ? "Bunday yangilik yo'q." : "Yangiliklar mavjud emas."}</div>
        ) : (
          filteredNews.map((newsItem) => (
            <article key={newsItem.id} className="news-card">
              <div className="news-image">
                {newsItem.image && (
                  <img
                    src={getImageUrl(newsItem.image)}
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