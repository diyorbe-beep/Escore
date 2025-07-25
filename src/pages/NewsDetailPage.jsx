import React, { useState, useEffect } from 'react';
import { FiArrowLeft, FiShare2, FiBookmark, FiClock, FiUser, FiEye } from 'react-icons/fi';
import footballNewsService, { formatNewsDate } from '../services/FootballNewsService';
import { useParams } from 'react-router-dom';
import { newsApi } from '../services/ApiService';
import './NewsDetailPage.scss';
import axios from 'axios';

const fallbackArticle = {
  title: "Test yangilik",
  author: "Admin",
  publishedAt: new Date().toISOString(),
  content: "Bu test uchun qo'yilgan yangilik matni.",
  image: "https://images.unsplash.com/photo-1517649763962-0c623066013b?auto=format&fit=crop&w=800&q=80",
  category: "TEST",
  readTime: "2 daqiqa",
  views: "100"
};

const NewsDetailPage = () => {
  const { id } = useParams();
  const [news, setNews] = useState(null);
  const [loading, setLoading] = useState(true);
  const [relatedNews, setRelatedNews] = useState([]);

  useEffect(() => {
    newsApi.getById(id).then(data => {
      setNews(data);
      setLoading(false);
      console.log('News object:', data);
    });
    fetchRelatedNews();
    // eslint-disable-next-line
  }, [id]);

  const fetchRelatedNews = async () => {
    try {
      const newsData = await footballNewsService.getAllNews();
      const sortedRelatedNews = newsData
        .slice(0, 6)
        .sort((a, b) => {
          const dateA = new Date(a.publishedAt);
          const dateB = new Date(b.publishedAt);
          return dateB - dateA;
        });
      setRelatedNews(sortedRelatedNews);
    } catch (err) {
      setRelatedNews([]);
    }
  };

  const calculateReadTime = (content) => {
    const wordsPerMinute = 200;
    const wordCount = content.split(' ').length;
    const readTime = Math.ceil(wordCount / wordsPerMinute);
    return `${readTime} daqiqa`;
  };

  const getNewsCategory = (title) => {
    const titleLower = title.toLowerCase();
    if (titleLower.includes('transfer') || titleLower.includes('haaland') || titleLower.includes('mbappe')) {
      return 'TRANSFER YANGILIKLARI';
    } else if (titleLower.includes('champions league') || titleLower.includes('uefa')) {
      return 'CHAMPIONS LEAGUE';
    } else if (titleLower.includes('premier league')) {
      return 'PREMIER LEAGUE';
    } else if (titleLower.includes('la liga')) {
      return 'LA LIGA';
    } else if (titleLower.includes('serie a')) {
      return 'SERIE A';
    }
    return 'FUTBOL YANGILIKLARI';
  };

  const extractTags = (title, description) => {
    const text = `${title} ${description}`.toLowerCase();
    const tags = [];
    
    if (text.includes('haaland')) tags.push('Haaland');
    if (text.includes('mbappe')) tags.push('Mbappe');
    if (text.includes('real madrid')) tags.push('Real Madrid');
    if (text.includes('barcelona')) tags.push('Barcelona');
    if (text.includes('manchester city')) tags.push('Manchester City');
    if (text.includes('liverpool')) tags.push('Liverpool');
    if (text.includes('transfer')) tags.push('Transfer');
    if (text.includes('champions league')) tags.push('Champions League');
    
    return tags.slice(0, 5);
  };

  if (loading) {
    return (
      <div className="news-detail-page">
        <div className="loading-state">
          <div className="loading-spinner"></div>
          <div className="loading-text">Maqola yuklanmoqda...</div>
        </div>
      </div>
    );
  }

  // Always show a card, use fallback if news is missing
  const article = news && Object.keys(news).length > 0 ? news : fallbackArticle;

  return (
    <div className="news-detail-page">
      <div className="article-container">
        <article className="main-article">
          <div className="article-header">
            <div className="article-category">{article.category}</div>
            <h1 className="article-title">{article.title}</h1>
            <div className="article-meta">
              <div className="meta-item">
                <FiUser />
                <span>{article.author}</span>
              </div>
              <div className="meta-item">
                <FiClock />
                <span>{formatNewsDate(article.publishedAt)}</span>
              </div>
              <div className="meta-item">
                <FiEye />
                <span>O'qish vaqti: {article.readTime}</span>
              </div>
              <div className="meta-item">
                <span>Ko'rishlar: {article.views}</span>
              </div>
            </div>
          </div>
          <div className="article-image">
            <img src={article.image} alt={article.title} />
            <div className="image-caption">
              {article.title}
            </div>
          </div>
          <div className="article-content">
            {(article.content || '').split('\n\n').map((paragraph, index) => (
              <p key={index} className="article-paragraph">
                {paragraph}
              </p>
            ))}
          </div>
          {article.tags && article.tags.length > 0 && (
          <div className="article-tags">
            <h4>Teglar:</h4>
            <div className="tags-list">
                {article.tags.map((tag, index) => (
                <span key={index} className="tag">{tag}</span>
              ))}
            </div>
          </div>
          )}
          <div className="article-actions">
            <button className="action-btn">
              <FiShare2 />
              Ulashish
            </button>
            <button className="action-btn">
              <FiBookmark />
              Saqlash
            </button>
            <button className="back-btn" onClick={() => window.history.back()}>
              <FiArrowLeft />
              Orqaga qaytish
            </button>
          </div>
        </article>
      </div>
    </div>
  );
};

export default NewsDetailPage; 