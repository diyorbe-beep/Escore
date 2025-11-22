
const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer__container">
        <div className="footer__content">
          <div className="footer__section">
            <h4>eScore haqida</h4>
            <p>
              eScore - O'zbekistondagi eng yaxshi sport platformasi. 
              Jonli natijalar, liga jadvallari va eng so'nggi sport yangiliklar.
            </p>
          </div>
          
          <div className="footer__section">
            <h4>Tezkor havolalar</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <a href="/">Bosh sahifa</a>
              <a href="/live-scores">Jonli natijalar</a>
              <a href="/fixtures">O'yinlar jadvali</a>
              <a href="/standings">Liga jadvali</a>
            </div>
          </div>
          
          <div className="footer__section">
            <h4>Bog'lanish</h4>
            <p>Email: info@escore.uz</p>
            <p>Telefon: +998 90 123 45 67</p>
            <div style={{ marginTop: '15px', display: 'flex', gap: '15px' }}>
              <a href="#" style={{ fontSize: '20px' }}>
                <i className="ri-facebook-fill"></i>
              </a>
              <a href="#" style={{ fontSize: '20px' }}>
                <i className="ri-twitter-fill"></i>
              </a>
              <a href="#" style={{ fontSize: '20px' }}>
                <i className="ri-instagram-fill"></i>
              </a>
              <a href="#" style={{ fontSize: '20px' }}>
                <i className="ri-telegram-fill"></i>
              </a>
            </div>
          </div>
          
          <div className="footer__section">
            <h4>Mobil ilova</h4>
            <p>eScore ilovasini yuklab oling va barcha yangiliklar bilan tanishing!</p>
            <div style={{ marginTop: '10px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <a href="#" style={{ 
                display: 'inline-block',
                padding: '8px 12px',
                background: 'rgba(255,255,255,0.1)',
                borderRadius: '4px',
                fontSize: '12px'
              }}>
                <i className="ri-apple-line"></i> App Store
              </a>
              <a href="#" style={{ 
                display: 'inline-block',
                padding: '8px 12px',
                background: 'rgba(255,255,255,0.1)',
                borderRadius: '4px',
                fontSize: '12px'
              }}>
                <i className="ri-google-play-line"></i> Google Play
              </a>
            </div>
          </div>
        </div>
        
        <div className="footer__bottom">
          <p>
            © 2024 eScore. Barcha huquqlar himoyalangan.
            <a href="https://readdy.ai/?origin=logo">Website Builder</a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
