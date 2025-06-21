import React, { useState, useEffect } from 'react';
import { FiArrowLeft, FiShare2, FiBookmark, FiMessageCircle, FiClock, FiUser, FiEye } from 'react-icons/fi';
import { footballNewsApi, formatNewsDate } from '../services/FootballNewsService';
import './NewsDetailPage.scss';

const NewsDetailPage = ({ newsId }) => {
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [relatedNews, setRelatedNews] = useState([]);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');

  useEffect(() => {
    if (newsId) {
      fetchArticleDetails();
      fetchRelatedNews();
    }
  }, [newsId]);

  const fetchArticleDetails = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Try to get article from API first
      const newsData = await footballNewsApi.getLatestNews(1, 20);
      const foundArticle = newsData.find(item => item.id === parseInt(newsId) || item.title.includes(newsId));
      
      if (foundArticle) {
        setArticle({
          ...foundArticle,
          readTime: calculateReadTime(foundArticle.content || foundArticle.description),
          views: Math.floor(Math.random() * 50000) + 1000,
          author: foundArticle.author || 'Futbol Muharriri',
          category: getNewsCategory(foundArticle.title),
          tags: extractTags(foundArticle.title, foundArticle.description)
        });
      } else {
        // Use fallback article if not found
        setArticle(getFallbackArticle(newsId));
      }
    } catch (err) {
      setError('Maqola yuklanayotganda xatolik yuz berdi');
      setArticle(getFallbackArticle(newsId));
    } finally {
      setLoading(false);
    }
  };

  const fetchRelatedNews = async () => {
    try {
      const newsData = await footballNewsApi.getLatestNews(1, 10);
      // Sort related news by date (newest first)
      const sortedRelatedNews = newsData
        .slice(0, 6)
        .sort((a, b) => {
          const dateA = new Date(a.publishedAt);
          const dateB = new Date(b.publishedAt);
          return dateB - dateA; // Newest first
        });
      setRelatedNews(sortedRelatedNews);
    } catch (err) {
      const fallbackNews = getFallbackRelatedNews();
      // Sort fallback news by date
      const sortedFallbackNews = fallbackNews.sort((a, b) => {
        const dateA = new Date(a.publishedAt);
        const dateB = new Date(b.publishedAt);
        return dateB - dateA;
      });
      setRelatedNews(sortedFallbackNews);
    }
  };

  const getFallbackArticle = (articleId) => {
    const articles = [
      {
        id: articleId,
        title: "Haaland Real Madridga o'tishi mumkin - Transfer bozorida katta harakatlar",
        author: "Ahmad Karimov",
        publishedAt: "2024-06-01T10:30:00Z",
        content: `Norvegiyalik hujumchi Erling Haaland mavsum oxirida Borussia Dortmundni tark etishi mumkin. Real Madrid uni o'z safiga qo'shib olishga harakat qilmoqda. Bu transfer bozorida eng katta yangilik hisoblanadi.

Real Madrid prezidenti Florentino Perez Haalandni o'z safiga qo'shish uchun 200 million yevro taklif qilgan. Dortmund esa bu taklifni rad etgan, lekin Real Madrid yana ko'proq pul taklif qilishga tayyor.

Haalandning agenti Mino Raiola Real Madrid bilan uchrashuvlar o'tkazgan va kelishuvga erishish uchun harakat qilmoqda. Haaland o'zining kelajagi haqida qaror qabul qilish uchun mavsum oxirini kutmoqda.

Real Madrid menejeri Carlo Ancelotti Haalandni o'z safiga qo'shishni juda xohlayotganini aytgan. "Haaland dunyodagi eng yaxshi hujumchilardan biri. U bizning safimizga juda mos keladi," - dedi Ancelotti.

Manchester City ham Haalandni qiziqtirmoqda va Real Madrid bilan raqobat qilmoqda. Pep Guardiola Haalandni o'z safiga qo'shish uchun harakat qilmoqda.

Bu transfer bozorida eng katta harakatlardan biri bo'lishi mumkin. Haaland qaysi klubni tanlashini mavsum oxirida ko'ramiz.`,
        image: "https://images.unsplash.com/photo-1517649763962-0c623066013b?auto=format&fit=crop&w=800&q=80",
        category: "TRANSFER YANGILIKLARI",
        readTime: "5 daqiqa",
        views: "12,450",
        tags: ["Haaland", "Real Madrid", "Transfer", "Dortmund"]
      },
      {
        id: articleId,
        title: "Mbappe PSGni tark etadi - Real Madridga o'tish ehtimoli yuqori",
        author: "Sardor Karimov",
        publishedAt: "2024-06-01T09:15:00Z",
        content: `Fransuz yulduzi Kylian Mbappe PSGni tark etish haqida qaror qabul qilgan. Real Madrid uni o'z safiga qo'shish uchun faol harakat qilmoqda.

Mbappe PSG bilan shartnomasi tugagach, Real Madridga o'tishni xohlayotganini aytgan. Real Madrid prezidenti Florentino Perez Mbappeni o'z safiga qo'shish uchun ko'p yillardan beri harakat qilmoqda.

PSG Mbappeni saqlab qolish uchun eng yuqori maosh taklif qilgan, lekin fransuz yulduzi Real Madridda o'ynashni xohlayotganini aytgan.

Real Madrid menejeri Carlo Ancelotti Mbappeni o'z safiga qo'shishni juda xohlayotganini aytgan. "Mbappe dunyodagi eng yaxshi o'yinchilardan biri. U bizning safimizga juda mos keladi," - dedi Ancelotti.

Bu transfer bozorida eng katta harakatlardan biri bo'lishi mumkin. Mbappe qaysi klubni tanlashini yaqin kunlarda ko'ramiz.`,
        image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=800&q=80",
        category: "TRANSFER YANGILIKLARI",
        readTime: "4 daqiqa",
        views: "15,230",
        tags: ["Mbappe", "PSG", "Real Madrid", "Transfer"]
      }
    ];
    
    return articles[0] || articles[1];
  };

  const getFallbackRelatedNews = () => {
    const now = new Date();
    return [
      {
        id: 1,
        title: "Chelsea Target Everton's Star Striker in Summer Transfer Window",
        description: "Chelsea are reportedly interested in signing Everton's prolific striker as they look to strengthen their attack for the upcoming season.",
        urlToImage: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?auto=format&fit=crop&w=400&q=80",
        publishedAt: new Date(now.getTime() - 1000 * 60 * 45).toISOString(), // 45 minutes ago
        source: { name: "Football News" }
      },
      {
        id: 2,
        title: "Napoli's Scudetto Push: Can They Win the Title This Season?",
        description: "Napoli are making a strong push for the Serie A title with their impressive form and tactical brilliance under their new manager.",
        urlToImage: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?auto=format&fit=crop&w=400&q=80",
        publishedAt: new Date(now.getTime() - 1000 * 60 * 60 * 1.5).toISOString(), // 1.5 hours ago
        source: { name: "Serie A News" }
      },
      {
        id: 3,
        title: "Liverpool's Title Challenge: Can They Overcome the Odds?",
        description: "Liverpool are making a late push for the Premier League title with their impressive form in recent weeks.",
        urlToImage: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?auto=format&fit=crop&w=400&q=80",
        publishedAt: new Date(now.getTime() - 1000 * 60 * 60 * 3).toISOString(), // 3 hours ago
        source: { name: "Premier League News" }
      },
      {
        id: 4,
        title: "Barcelona's Financial Crisis: How Will It Affect Their Transfer Plans?",
        description: "Barcelona's ongoing financial difficulties are expected to impact their summer transfer window activities.",
        urlToImage: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?auto=format&fit=crop&w=400&q=80",
        publishedAt: new Date(now.getTime() - 1000 * 60 * 60 * 5).toISOString(), // 5 hours ago
        source: { name: "La Liga News" }
      },
      {
        id: 5,
        title: "Bayern Munich's Bundesliga Dominance Continues",
        description: "Bayern Munich are once again showing why they are the dominant force in German football.",
        urlToImage: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?auto=format&fit=crop&w=400&q=80",
        publishedAt: new Date(now.getTime() - 1000 * 60 * 60 * 7).toISOString(), // 7 hours ago
        source: { name: "Bundesliga News" }
      },
      {
        id: 6,
        title: "PSG's Champions League Dreams: Can They Finally Win It?",
        description: "Paris Saint-Germain are determined to finally win the Champions League this season.",
        urlToImage: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?auto=format&fit=crop&w=400&q=80",
        publishedAt: new Date(now.getTime() - 1000 * 60 * 60 * 10).toISOString(), // 10 hours ago
        source: { name: "Champions League News" }
      }
    ];
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

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (newComment.trim()) {
      const comment = {
        id: comments.length + 1,
        author: "Foydalanuvchi",
        text: newComment,
        time: "Hozir",
        likes: 0
      };
      setComments([comment, ...comments]);
      setNewComment('');
    }
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

  if (error && !article) {
    return (
      <div className="news-detail-page">
        <div className="error-state">
          <div className="error-text">{error}</div>
          <button className="back-btn" onClick={() => window.history.back()}>
            <FiArrowLeft />
            Orqaga qaytish
          </button>
        </div>
      </div>
    );
  }

  if (!article) {
    return (
      <div className="news-detail-page">
        <div className="error-state">
          <div className="error-text">Maqola topilmadi</div>
          <button className="back-btn" onClick={() => window.history.back()}>
            <FiArrowLeft />
            Orqaga qaytish
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="news-detail-page">
      <div className="newspaper-header">
        <div className="newspaper-title">
          <h1>FUTBOL GAZETASI</h1>
          <div className="newspaper-subtitle">Eng so'nggi futbol yangiliklari va tahlillar</div>
        </div>
        <div className="newspaper-date">
          {getCurrentDate()}
        </div>
      </div>

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
            {article.content.split('\n\n').map((paragraph, index) => (
              <p key={index} className="article-paragraph">
                {paragraph}
              </p>
            ))}
          </div>

          <div className="article-tags">
            <h4>Teglar:</h4>
            <div className="tags-list">
              {article.tags.map((tag, index) => (
                <span key={index} className="tag">{tag}</span>
              ))}
            </div>
          </div>

          <div className="article-actions">
            <button className="action-btn">
              <FiShare2 />
              Ulashish
            </button>
            <button className="action-btn">
              <FiBookmark />
              Saqlash
            </button>
            <button className="action-btn">
              <FiMessageCircle />
              {comments.length} Izoh
            </button>
            <button className="back-btn" onClick={() => window.history.back()}>
              <FiArrowLeft />
              Orqaga qaytish
            </button>
          </div>
        </article>

        <aside className="sidebar">
          <div className="sidebar-section">
            <h3>O'xshash yangiliklar</h3>
            <div className="related-articles">
              {relatedNews.map((newsItem, index) => (
                <div key={newsItem.id || index} className="related-article">
                  <div className="related-image">
                    <img src={newsItem.urlToImage} alt={newsItem.title} />
                  </div>
                  <div className="related-content">
                    <h4>{newsItem.title}</h4>
                    <span>{formatNewsDate(newsItem.publishedAt)}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="sidebar-section">
            <h3>Kategoriyalar</h3>
            <div className="categories">
              <a href="#" className="category-link">Transfer yangiliklari</a>
              <a href="#" className="category-link">O'yin natijalari</a>
              <a href="#" className="category-link">Jamoalar</a>
              <a href="#" className="category-link">Menejerlar</a>
              <a href="#" className="category-link">Tahlillar</a>
            </div>
          </div>
        </aside>
      </div>

      <section className="comments-section">
        <h3>Izohlar ({comments.length})</h3>
        
        <form className="comment-form" onSubmit={handleCommentSubmit}>
          <textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Izohingizni yozing..."
            rows="3"
          />
          <button type="submit" className="submit-comment">
            Izoh qoldirish
          </button>
        </form>

        <div className="comments-list">
          {comments.map(comment => (
            <div key={comment.id} className="comment">
              <div className="comment-header">
                <span className="comment-author">{comment.author}</span>
                <span className="comment-time">{comment.time}</span>
              </div>
              <div className="comment-text">{comment.text}</div>
              <div className="comment-actions">
                <button className="like-btn">
                  👍 {comment.likes}
                </button>
                <button className="reply-btn">Javob berish</button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default NewsDetailPage; 