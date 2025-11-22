
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <div style={{ 
      minHeight: '100vh', 
      display: 'flex', 
      flexDirection: 'column',
      alignItems: 'center', 
      justifyContent: 'center',
      background: '#FAF4ED',
      fontFamily: 'Inter, sans-serif'
    }}>
      <div style={{ textAlign: 'center', maxWidth: '600px', padding: '40px' }}>
        <h1 style={{ 
          fontFamily: 'Playfair Display, serif',
          fontSize: '4rem',
          fontWeight: '900',
          color: '#153E75',
          marginBottom: '20px',
          textTransform: 'uppercase',
          letterSpacing: '2px'
        }}>
          eScore
        </h1>
        
        <p style={{ 
          fontSize: '1.2rem',
          color: '#111111',
          marginBottom: '40px',
          lineHeight: '1.6'
        }}>
          O'zbekistondagi eng yaxshi sport platformasi. Jonli natijalar, liga jadvallari va eng so'nggi sport yangiliklar.
        </p>
        
        <div style={{ display: 'flex', gap: '20px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <button
            onClick={() => navigate('/live-scores')}
            style={{
              padding: '15px 30px',
              background: '#153E75',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              fontSize: '1.1rem',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'all 0.3s',
              boxShadow: '0 4px 8px rgba(21, 62, 117, 0.3)'
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.background = '#1a4a8a';
              e.currentTarget.style.transform = 'translateY(-2px)';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.background = '#153E75';
              e.currentTarget.style.transform = 'translateY(0)';
            }}
          >
            <i className="ri-live-line" style={{ marginRight: '8px' }}></i>
            Jonli Natijalar
          </button>
          
          <button
            style={{
              padding: '15px 30px',
              background: 'white',
              color: '#153E75',
              border: '2px solid #153E75',
              borderRadius: '8px',
              fontSize: '1.1rem',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'all 0.3s'
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.background = '#153E75';
              e.currentTarget.style.color = 'white';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.background = 'white';
              e.currentTarget.style.color = '#153E75';
            }}
          >
            <i className="ri-trophy-line" style={{ marginRight: '8px' }}></i>
            Liga Jadvali
          </button>
        </div>
        
        <div style={{ 
          marginTop: '60px',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
          gap: '20px',
          maxWidth: '500px',
          margin: '60px auto 0'
        }}>
          <div style={{ textAlign: 'center', padding: '20px' }}>
            <i className="ri-football-line" style={{ fontSize: '2.5rem', color: '#153E75', marginBottom: '10px' }}></i>
            <h3 style={{ fontSize: '1.1rem', marginBottom: '5px', color: '#111111' }}>Jonli O'yinlar</h3>
            <p style={{ fontSize: '0.9rem', color: '#666666' }}>Real vaqtda natijalar</p>
          </div>
          
          <div style={{ textAlign: 'center', padding: '20px' }}>
            <i className="ri-bar-chart-line" style={{ fontSize: '2.5rem', color: '#153E75', marginBottom: '10px' }}></i>
            <h3 style={{ fontSize: '1.1rem', marginBottom: '5px', color: '#111111' }}>Statistika</h3>
            <p style={{ fontSize: '0.9rem', color: '#666666' }}>Batafsil tahlil</p>
          </div>
          
          <div style={{ textAlign: 'center', padding: '20px' }}>
            <i className="ri-news-line" style={{ fontSize: '2.5rem', color: '#153E75', marginBottom: '10px' }}></i>
            <h3 style={{ fontSize: '1.1rem', marginBottom: '5px', color: '#111111' }}>Yangiliklar</h3>
            <p style={{ fontSize: '0.9rem', color: '#666666' }}>So'nggi xabarlar</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
