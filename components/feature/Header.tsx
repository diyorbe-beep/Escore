import { useState } from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [language, setLanguage] = useState('UZ');

  return (
    <header className="header">
      <div className="header__container">
        <a href="/" className="header__logo">
          eScore
        </a>
        
        <nav className="header__nav">
          <Link to="/" className="nav-link">Bosh sahifa</Link>
          <Link to="/live-scores" className="nav-link">Jonli Natijalar</Link>
          <Link to="/league-info/la-liga" className="nav-link">Liga Ma'lumotlari</Link>
          <Link to="/team-info/real-madrid" className="nav-link">Klub Ma'lumotlari</Link>
          <Link to="/player-info/jude-bellingham" className="nav-link">O'yinchi Ma'lumotlari</Link>
          <Link to="/match-details/newcastle-vs-nottingham" className="nav-link">O'yin Tafsilotlari</Link>
          <a href="#" className="nav-link">Transferlar</a>
          <a href="#" className="nav-link">Yangiliklar</a>
          <a href="#" className="nav-link">Aloqa</a>
          <Link to="/coach-info/carlo-ancelotti" className="nav-link">Murabbiy Ma'lumotlari</Link>
          <Link to="/referee-info/isidro-diaz-de-mera" className="nav-link">Hakam Ma'lumotlari</Link>
        </nav>

        <div className="header__actions">
          <div className="header__search">
            <input
              type="text"
              placeholder="Qidirish..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <i className="ri-search-line search-icon"></i>
          </div>
          
          <div className="header__lang">
            <select 
              value={language} 
              onChange={(e) => setLanguage(e.target.value)}
            >
              <option value="UZ">UZ</option>
              <option value="EN">EN</option>
            </select>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;