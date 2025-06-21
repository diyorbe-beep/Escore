import React, { useState } from 'react';
import { FiShare2, FiBookmark, FiMessageCircle, FiClock, FiUser } from 'react-icons/fi';
import { formatNewsDate } from '../services/FootballNewsService';
import './NewsDetail.scss';

const NewsDetail = ({ news }) => {
  const defaultArticle = {
    title: "Haaland Real Madridga o'tishi mumkin - Transfer bozorida katta harakatlar",
    author: "Ahmad Karimov",
    publishedAt: "2024-06-01T10:30:00Z",
    content: `Norvegiyalik hujumchi Erling Haaland mavsum oxirida Borussia Dortmundni tark etishi mumkin. Real Madrid uni o'z safiga qo'shib olishga harakat qilmoqda. Bu transfer bozorida eng katta yangilik hisoblanadi.\n\nReal Madrid prezidenti Florentino Perez Haalandni o'z safiga qo'shish uchun 200 million yevro taklif qilgan. Dortmund esa bu taklifni rad etgan, lekin Real Madrid yana ko'proq pul taklif qilishga tayyor.\n\nHaalandning agenti Mino Raiola Real Madrid bilan uchrashuvlar o'tkazgan va kelishuvga erishish uchun harakat qilmoqda. Haaland o'zining kelajagi haqida qaror qabul qilish uchun mavsum oxirini kutmoqda.\n\nReal Madrid menejeri Carlo Ancelotti Haalandni o'z safiga qo'shishni juda xohlayotganini aytgan. \"Haaland dunyodagi eng yaxshi hujumchilardan biri. U bizning safimizga juda mos keladi,\" - dedi Ancelotti.\n\nManchester City ham Haalandni qiziqtirmoqda va Real Madrid bilan raqobat qilmoqda. Pep Guardiola Haalandni o'z safiga qo'shish uchun harakat qilmoqda.\n\nBu transfer bozorida eng katta harakatlardan biri bo'lishi mumkin. Haaland qaysi klubni tanlashini mavsum oxirida ko'ramiz.`,
    image: "https://images.unsplash.com/photo-1517649763962-0c623066013b?auto=format&fit=crop&w=800&q=80",
    category: "TRANSFER YANGILIKLARI",
    readTime: "5 daqiqa",
    views: "12,450"
  };

  const article = news || defaultArticle;

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

  return (
    <div className="newsdetail-main">
      <div className="newsdetail-content newsdetail-row">
        <div className="newsdetail-card newsdetail-card-narrow">
          <div className='newsdetail'>
            <div className="newsdetail-image-small">
              <img src={article.image} alt={article.title} />
            </div>
            <div>
              <div className="newsdetail-category">{article.category}</div>
              <h1 className="newsdetail-title">{article.title}</h1>
            </div>
          </div>
          <div className="newsdetail-meta">
            <span><FiUser /> {article.author}</span>
            <span><FiClock /> {formatNewsDate(article.publishedAt)}</span>
            <span>O'qish vaqti: {article.readTime}</span>
            <span>Ko'rishlar: {article.views}</span>
          </div>
          <div className="newsdetail-body">
            {(article.content || '').split('\n\n').map((paragraph, idx) => (
              <p key={idx}>{paragraph}</p>
            ))}
          </div>
          <div className="newsdetail-actions">
            <button className="action-btn"><FiShare2 /> Ulashish</button>
            <button className="action-btn"><FiBookmark /> Saqlash</button>
            <button className="action-btn"><FiMessageCircle /> {comments.length} Izoh</button>
          </div>
        </div>
      </div>
      <section className="newsdetail-comments">
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
                <button className="like-btn">👍 {comment.likes}</button>
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