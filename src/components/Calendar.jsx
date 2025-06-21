import React, { useState, useEffect } from 'react';
import FootballMatchesService from '../services/FootballMatchesService';

const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);
  const [footballMatches, setFootballMatches] = useState({});
  const [loading, setLoading] = useState(false);

  // Fetch matches when month changes
  useEffect(() => {
    const fetchMatches = async () => {
      setLoading(true);
      try {
        const matches = await FootballMatchesService.getMatchesForMonth(
          currentDate.getFullYear(), 
          currentDate.getMonth() + 1
        );
        setFootballMatches(matches);
      } catch (error) {
        console.error('Error fetching matches:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMatches();
  }, [currentDate]);

  const getDaysInMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const goToPreviousMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  const goToNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  const monthNames = [
    'Yanvar', 'Fevral', 'Mart', 'Aprel', 'May', 'Iyun',
    'Iyul', 'Avgust', 'Sentabr', 'Oktabr', 'Noyabr', 'Dekabr'
  ];

  const dayNames = ['Du', 'Se', 'Ch', 'Pa', 'Ju', 'Sh', 'Ya'];

  const daysInMonth = getDaysInMonth(currentDate);
  const firstDayOfMonth = getFirstDayOfMonth(currentDate);
  const today = new Date();

  const formatDateKey = (year, month, day) => {
    return `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
  };

  // ... Calendar.jsx ichida renderCalendarDays funksiyasini o'zgartiring:
const renderCalendarDays = () => {
  const days = [];
  for (let i = 0; i < firstDayOfMonth; i++) {
    days.push(<div key={`empty-${i}`} className="calendar-day empty"></div>);
  }
  for (let day = 1; day <= daysInMonth; day++) {
    const dateKey = formatDateKey(currentDate.getFullYear(), currentDate.getMonth(), day);
    const match = footballMatches[dateKey];
    days.push(
      <div
        key={day}
        className={`calendar-day ${match ? 'has-match' : ''}`}
        onClick={() => setSelectedDate(dateKey)}
      >
        {day}
        {match && (
          <div className="calendar-match-logos">
            <img src={match.homeLogo} alt={match.home} className="calendar-logo" />
            <img src={match.awayLogo} alt={match.away} className="calendar-logo" />
          </div>
        )}
      </div>
    );
  }
  return days;
};

  const getSelectedMatch = () => {
    if (!selectedDate) return null;
    return footballMatches[selectedDate];
  };

  const selectedMatch = getSelectedMatch();

  return (
    <div className="calendar-container">
      <div className="calendar-header">
        <button onClick={goToPreviousMonth} className="calendar-nav-btn">&lt;</button>
        <h4 className="calendar-title">
          {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
        </h4>
        <button onClick={goToNextMonth} className="calendar-nav-btn">&gt;</button>
      </div>
      
      {loading && <div className="calendar-loading">Yuklanmoqda...</div>}
      
      <div className="calendar-grid">
        <div className="calendar-weekdays">
          {dayNames.map(day => (
            <div key={day} className="calendar-weekday">{day}</div>
          ))}
        </div>
        <div className="calendar-days">
          {renderCalendarDays()}
        </div>
      </div>

      {/* Match Details */}
      {selectedMatch && (
        <div className="match-details">
          <div className="match-header">
            <span className="competition">
              {FootballMatchesService.getCompetitionNameUzbek(selectedMatch.competition)}
            </span>
            <span className={`match-time ${selectedMatch.isLive ? 'live' : ''}`}>
              {selectedMatch.isLive ? 'LIVE' : selectedMatch.time}
            </span>
          </div>
          <div className="match-teams">
            <div className="team home">{selectedMatch.home}</div>
            <div className="vs">vs</div>
            <div className="team away">{selectedMatch.away}</div>
          </div>
        </div>
      )}

      {/* Legend */}
      <div className="calendar-legend">
        <div className="legend-item">
          <div className="legend-dot match"></div>
          <span>O'yin</span>
        </div>
        <div className="legend-item">
          <div className="legend-dot live"></div>
          <span>LIVE</span>
        </div>
      </div>
    </div>
  );
};

export default Calendar; 