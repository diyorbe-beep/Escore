import React from 'react';


const transfers = [
  { title: "Chelsea Target Everton's", img: 'https://images.unsplash.com/photo-1517649763962-0c623066013b?auto=format&fit=crop&w=200&q=80' },
  { title: "Napoli's Scudetto Push", img: 'https://images.unsplash.com/photo-1517649763962-0c623066013b?auto=format&fit=crop&w=200&q=80' },
  { title: "Jurgen Klopp Salah's Form", img: 'https://images.unsplash.com/photo-1517649763962-0c623066013b?auto=format&fit=crop&w=200&q=80' },
];

const Home = () => (
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
            <img className="home-main-img" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRM7W-KCI9JMFHP-ejNVGNCg5yyrixJ7DN5tvlZ2mh_xmaQvrlie6wm_Cv4E-yg7mgga0A&usqp=CAU" alt="Haaland" />
          </div>
        </div>

        <div style={{ gridRow: 2, gridColumn: 2 }}>
          <div className="live-score-block">
            <h2>LIVE SCORE</h2>
            <table className="live-score-table">
              <thead>
                <tr><th>PREMIER LEA</th><th>SPERIER A</th></tr>
              </thead>
              <tbody>
                <tr><td>LIVERPOOL</td><td>2</td></tr>
                <tr><td>BOLOGNA</td><td>1</td></tr>
                <tr><td colSpan="2">30 MIN</td></tr>
              </tbody>
            </table>
          </div>
          <div className="advertisement-block">REKLAMA</div>
        </div>
      </div>
      {/* POLL */}
      <div className='home-grid-right'>
        {/* HEADLINE & LEAD */}
        <div style={{ gridRow: 1, gridColumn: 3 }}> 
          <h1 className="home-headline">HAALAND REAL MADRIDGA  O'TYABDIMI?</h1>
          <div className="home-lead">Norvegiyalik hujumchi mavsum oxirida Dortmundning "Borussiya" klubini tark etishi mumkin.</div>
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

export default Home; 