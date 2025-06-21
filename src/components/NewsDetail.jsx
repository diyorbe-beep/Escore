import React, { useState, useEffect } from 'react';
import { FiShare2, FiBookmark, FiMessageCircle, FiClock, FiUser } from 'react-icons/fi';
import { formatNewsDate } from '../services/FootballNewsService';
import './NewsDetail.scss';

const NewsDetail = () => {
  const [article, setArticle] = useState({
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
    views: "12,450"
  });

  const [comments, setComments] = useState([
    { id: 1, author: "Ali", text: "Haaland Realga mos tushadi! Ular juda kuchli hujumchiga ega bo'lishadi.", time: "2 soat oldin", likes: 15 },
    { id: 2, author: "Bekzod", text: "Dortmund uni osonlikcha qo'yib yubormaydi. Ular juda ko'p pul so'raydi.", time: "1 soat oldin", likes: 8 },
    { id: 3, author: "Sardor", text: "Manchester City ham Haalandni qiziqtirmoqda. Qaysi klubni tanlaydi?", time: "30 daqiqa oldin", likes: 12 }
  ]);

  const [newComment, setNewComment] = useState('');

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

  return (
    <div className="newspaper-container">
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
              Erling Haaland Borussia Dortmund safida o'ynayotgani
            </div>
          </div>

          <div className="article-content">
            {article.content.split('\n\n').map((paragraph, index) => (
              <p key={index} className="article-paragraph">
                {paragraph}
              </p>
            ))}
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
          </div>
        </article>

        <aside className="sidebar">
          <div className="sidebar-section">
            <h3>Eng ko'p o'qilgan</h3>
            <div className="popular-articles">
              <div className="popular-article">
                <div className="popular-number">1</div>
                <div className="popular-content">
                  <h4>Mbappe PSGni tark etadi</h4>
                  <span>2 soat oldin</span>
                </div>
              </div>
              <div className="popular-article">
                <div className="popular-number">2</div>
                <div className="popular-content">
                  <h4>Champions League finali</h4>
                  <span>4 soat oldin</span>
                </div>
              </div>
              <div className="popular-article">
                <div className="popular-number">3</div>
                <div className="popular-content">
                  <h4>Premier League jadvali</h4>
                  <span>6 soat oldin</span>
                </div>
              </div>
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

export default NewsDetail; 