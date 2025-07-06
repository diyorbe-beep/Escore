import React from 'react';
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

  return (
    <div className="newsdetail-main">
      <div className="newsdetail-content newsdetail-row">
        <div className="newsdetail-card newsdetail-card-narrow">
          <div className='newsdetail'>
            <div className="newsdetail-image-small">
              <img src={article.image} alt={article.title} />
            </div>
            <div className="newsdetail-text">
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
        </div>
      </div>
    </div>
  );
};

export default NewsDetail; 