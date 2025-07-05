import React, { useEffect, useState } from 'react';
import NewsList from '../components/NewsList';
import FeaturedMatch from '../components/FeaturedMatch';
import { newsApi } from '../services/ApiService';

const transfers = [
  { title: "Chelsea Target Everton's", img: 'https://images.unsplash.com/photo-1517649763962-0c623066013b?auto=format&fit=crop&w=200&q=80' },
  { title: "Napoli's Scudetto Push", img: 'https://images.unsplash.com/photo-1517649763962-0c623066013b?auto=format&fit=crop&w=200&q=80' },
  { title: "Jurgen Klopp Salah's Form", img: 'https://images.unsplash.com/photo-1517649763962-0c623066013b?auto=format&fit=crop&w=200&q=80' },
];

const Home = ({search}) => {
  const [featured, setFeatured] = useState(null);

  useEffect(() => {
    newsApi.getAll().then(news => {
      console.log('Barcha yangiliklar:', news);
      const feat = (news || []).find(n => n.isFeatured && n.status === 'Published');
      console.log('Tanlangan featured:', feat);
      setFeatured(feat || null);
    });
  }, []);

  return (
    <div>
      <div className='escore-header'>
        <hr />
        <h1 className='escore-title'><span>e</span>score</h1>
        <h4 className='escore-sub-logo'>your game , your voice</h4>
        <hr />
      </div>
      <div className="home-grid">
        {/* BREAKING NEWS VERTICAL */}
        <div>
          <div className="vertical-text">KUN YANGILIGI</div>
        </div>
        <div className='home-grid-left'>
          <div className='home-grid-left-top'>
            {/* MAIN IMAGE */}
            <div style={{ gridRow: 1, gridColumn: 2 }}>
              {featured ? (
                <img
                  className="featured-news-image"
                  src={featured.image || 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRM7W-KCI9JMFHP-ejNVGNCg5yyrixJ7DN5tvlZ2mh_xmaQvrlie6wm_Cv4E-yg7mgga0A&usqp=CAU'}
                  alt={featured.title}
                />
              ) : (
                <img
                  className="featured-news-image"
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRM7W-KCI9JMFHP-ejNVGNCg5yyrixJ7DN5tvlZ2mh_xmaQvrlie6wm_Cv4E-yg7mgga0A&usqp=CAU"
                  alt="Haaland"
                />
              )}
            </div>
          </div>

          <div style={{ gridRow: 2, gridColumn: 2 }}>
            <div className="advertisement-block">REKLAMA</div>
          </div>
        </div>
        {/* POLL */}
        <div className='home-grid-right'>
          {/* HEADLINE & LEAD */}
          <div style={{ gridRow: 1, gridColumn: 3 }}>
            {featured ? (
              <div className="featured-news-content">
                <h1 className="home-headline">{featured.title}</h1>
                <div className="home-lead">{featured.content}</div>
              </div>
            ) : (
              <>
                <h1 className="home-headline">HAALAND REAL MADRIDGA  O'TYABDIMI?</h1>
                <div className="home-lead">Norvegiyalik hujumchi mavsum oxirida Dortmundning "Borussiya" klubini tark etishi mumkin.</div>
              </>
            )}
          </div>
          <div style={{ gridRow: 1, gridColumn: 4 }}>
            <div className="poll-block">
              <h3>Who will win the Champions League?</h3>
              <form>
                <label><input type="radio" name="vote" /> Man City</label>
                <label><input type="radio" name="vote" /> Real Madrid</label>
                <label><input type="radio" name="vote" /> PSG</label>
                <label><input type="radio" name="vote" /> Bayern</label>
                <button type="submit">VOTE</button>
              </form>
            </div>
          </div>
          {/* LIVE SCORE */}
          {/* RIGHT SIDEBAR: MOST READ */}
          <div style={{ gridRow: 2, gridColumn: 4 }}>
            <div className="most-read-block">
              <h4>MOST READ</h4>
              <ul>
                <li>Klopp Praises Salah's Form</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <hr />
      <NewsList search={search} />
      {/* TRANSFERS */}
      <div style={{ gridRow: 3, gridColumn: 2, gridColumnEnd: 4 }}>
        <div className="section-title">TRANSFERS</div>
        <div className="transfer-blocks">
          {transfers.map((t, i) => (
            <div className="transfer-card" key={i}>
              <img src={t.img} alt={t.title} />
              <div>{t.title}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home; 