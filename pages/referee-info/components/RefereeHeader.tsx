import { refereeInfo } from '../../../mocks/refereeData';

export default function RefereeHeader() {
  const age = new Date().getFullYear() - new Date(refereeInfo.dateOfBirth).getFullYear();
  const experience = new Date().getFullYear() - refereeInfo.careerStart;

  return (
    <div className="referee-header">
      <div className="referee-header-content">
        <div className="referee-photo">
          <img src={refereeInfo.photo} alt={refereeInfo.name} />
        </div>

        <div className="referee-info">
          <div className="referee-title">
            <h1>{refereeInfo.name}</h1>
            <div className="referee-badges">
              {refereeInfo.fifaBadge && (
                <span className="badge fifa-badge">FIFA Hakam</span>
              )}
              <span className="badge level-badge">{refereeInfo.currentLevel}</span>
            </div>
          </div>

          <div className="referee-details">
            <div className="detail-item">
              <i className="ri-user-line"></i>
              <span className="detail-label">Lavozim:</span>
              <span className="detail-value">{refereeInfo.position}</span>
            </div>
            <div className="detail-item">
              <i className="ri-flag-line"></i>
              <span className="detail-label">Millati:</span>
              <span className="detail-value">
                <span className="flag">{refereeInfo.flag}</span>
                {refereeInfo.nationality}
              </span>
            </div>
            <div className="detail-item">
              <i className="ri-calendar-line"></i>
              <span className="detail-label">Yoshi:</span>
              <span className="detail-value">{age} yosh</span>
            </div>
            <div className="detail-item">
              <i className="ri-time-line"></i>
              <span className="detail-label">Tajriba:</span>
              <span className="detail-value">{experience} yil</span>
            </div>
            <div className="detail-item">
              <i className="ri-calendar-check-line"></i>
              <span className="detail-label">Karyera boshlanishi:</span>
              <span className="detail-value">{refereeInfo.careerStart}</span>
            </div>
          </div>

          <div className="referee-actions">
            <button className="btn-follow">
              <i className="ri-user-add-line"></i>
              Kuzatish
            </button>
            <button className="btn-compare">
              <i className="ri-git-compare-line"></i>
              Taqqoslash
            </button>
            <div className="social-links">
              <a href={`https://instagram.com/${refereeInfo.socialMedia.instagram}`} target="_blank" rel="noopener noreferrer">
                <i className="ri-instagram-line"></i>
              </a>
              <a href={`https://twitter.com/${refereeInfo.socialMedia.twitter}`} target="_blank" rel="noopener noreferrer">
                <i className="ri-twitter-x-line"></i>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}