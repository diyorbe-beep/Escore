import { useNavigate } from 'react-router-dom';

interface MatchEvent {
  id: number;
  minute: number;
  type: string;
  team: string;
  player: string;
  playerOut?: string;
  description: string;
}

interface MatchTimelineProps {
  events: MatchEvent[];
}

const MatchTimeline = ({ events }: MatchTimelineProps) => {
  const navigate = useNavigate();

  const slugify = (value: string) =>
    value
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .trim()
      .replace(/\s+/g, '-');

  const handlePlayerClick = (playerName?: string) => {
    if (!playerName) return;
    navigate(`/player-info/${slugify(playerName)}`);
  };

  const handleKeyDown = (
    event: React.KeyboardEvent<HTMLDivElement>,
    playerName?: string
  ) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      handlePlayerClick(playerName);
    }
  };

  const getEventIcon = (type: string) => {
    switch (type) {
      case 'goal': return 'ri-football-line';
      case 'yellow-card': return 'ri-bookmark-line';
      case 'red-card': return 'ri-bookmark-fill';
      case 'substitution': return 'ri-arrow-left-right-line';
      default: return 'ri-circle-line';
    }
  };

  const getEventClass = (type: string) => {
    switch (type) {
      case 'goal': return 'timeline__event--goal';
      case 'yellow-card': return 'timeline__event--yellow';
      case 'red-card': return 'timeline__event--red';
      case 'substitution': return 'timeline__event--sub';
      default: return '';
    }
  };

  return (
    <div className="match-timeline">
      <h3 className="match-timeline__title">O'yin voqealari</h3>
      <div className="match-timeline__events">
        {events.map((event) => (
          <div key={event.id} className={`timeline__event ${getEventClass(event.type)} ${event.team === 'home' ? 'timeline__event--home' : 'timeline__event--away'}`}>
            <div className="timeline__minute">{event.minute}'</div>
            <div className="timeline__icon">
              <i className={getEventIcon(event.type)}></i>
            </div>
            <div className="timeline__details">
              <div
                className="timeline__player"
                role="button"
                tabIndex={0}
                onClick={() => handlePlayerClick(event.player)}
                onKeyDown={(e) => handleKeyDown(e, event.player)}
                style={{ cursor: 'pointer' }}
              >
                {event.player}
              </div>
              {event.playerOut && (
                <div
                  className="timeline__player-out"
                  role="button"
                  tabIndex={0}
                  onClick={() => handlePlayerClick(event.playerOut)}
                  onKeyDown={(e) => handleKeyDown(e, event.playerOut)}
                  style={{ cursor: 'pointer' }}
                >
                  <i className="ri-arrow-right-line"></i> {event.playerOut}
                </div>
              )}
              <div className="timeline__description">{event.description}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MatchTimeline;