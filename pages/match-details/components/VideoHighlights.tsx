
interface VideoHighlightsProps {
  fullView?: boolean;
}

const VideoHighlights = ({ fullView = false }: VideoHighlightsProps) => {
  const highlights = [
    {
      id: 1,
      title: "Bruno Guimaraes ajoyib goli",
      minute: "28'",
      thumbnail: "https://readdy.ai/api/search-image?query=football%20goal%20celebration%20moment%2C%20Bruno%20Guimaraes%20scoring%20from%20distance%2C%20Newcastle%20United%20blue%20jersey%2C%20stadium%20background%2C%20action%20shot&width=300&height=200&seq=goal1&orientation=landscape",
      duration: "0:45"
    },
    {
      id: 2,
      title: "Brennan Johnson tenglashtiruvchi goli",
      minute: "65'",
      thumbnail: "https://readdy.ai/api/search-image?query=football%20goal%20celebration%2C%20Brennan%20Johnson%20scoring%20for%20Nottingham%20Forest%2C%20red%20jersey%2C%20stadium%20crowd%20cheering%2C%20action%20moment&width=300&height=200&seq=goal2&orientation=landscape",
      duration: "0:38"
    },
    {
      id: 3,
      title: "Alexander Isak g'olib goli",
      minute: "82'",
      thumbnail: "https://readdy.ai/api/search-image?query=football%20winning%20goal%20celebration%2C%20Alexander%20Isak%20scoring%20decisive%20goal%2C%20Newcastle%20United%20jersey%2C%20dramatic%20moment%2C%20stadium%20lights&width=300&height=200&seq=goal3&orientation=landscape",
      duration: "0:52"
    },
    {
      id: 4,
      title: "Eng yaxshi imkoniyatlar",
      minute: "90'",
      thumbnail: "https://readdy.ai/api/search-image?query=football%20match%20highlights%20compilation%2C%20best%20chances%20and%20saves%2C%20goalkeeper%20diving%2C%20striker%20shooting%2C%20action%20montage&width=300&height=200&seq=highlights&orientation=landscape",
      duration: "2:15"
    },
    {
      id: 5,
      title: "O'yin xulosasi",
      minute: "FT",
      thumbnail: "https://readdy.ai/api/search-image?query=football%20match%20summary%2C%20final%20whistle%20moment%2C%20players%20shaking%20hands%2C%20Newcastle%20United%20victory%20celebration%2C%20stadium%20overview&width=300&height=200&seq=summary&orientation=landscape",
      duration: "1:30"
    }
  ];

  return (
    <div className={`video-highlights ${fullView ? 'video-highlights--full' : ''}`}>
      <h3 className="video-highlights__title">
        {fullView ? 'O\'yin Asosiy Lahzalari' : 'Video Lavhalar'}
      </h3>
      
      <div className={`highlights__grid ${fullView ? 'highlights__grid--full' : ''}`}>
        {highlights.map((highlight) => (
          <div key={highlight.id} className="highlight__item">
            <div className="highlight__thumbnail">
              <img 
                src={highlight.thumbnail} 
                alt={highlight.title}
                className="highlight__image"
              />
              <div className="highlight__play-button">
                <i className="ri-play-fill"></i>
              </div>
              <div className="highlight__duration">
                {highlight.duration}
              </div>
              <div className="highlight__minute">
                {highlight.minute}
              </div>
            </div>
            <div className="highlight__info">
              <h4 className="highlight__title">{highlight.title}</h4>
            </div>
          </div>
        ))}
      </div>

      {!fullView && (
        <div className="highlights__view-all">
          <button className="highlights__view-all-btn">
            Barcha videolarni ko'rish
            <i className="ri-arrow-right-line"></i>
          </button>
        </div>
      )}
    </div>
  );
};

export default VideoHighlights;
