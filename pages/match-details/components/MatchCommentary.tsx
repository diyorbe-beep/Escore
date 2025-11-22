
const MatchCommentary = () => {
  const commentaryEvents = [
    {
      minute: "90+4'",
      text: "O'yin tugadi! Newcastle United 2-1 hisobida Nottingham Forest ustidan g'alaba qozondi.",
      type: "fulltime"
    },
    {
      minute: "90+2'",
      text: "Nottingham Forest oxirgi daqiqalarda hujum qilmoqda, ammo Newcastle himoyasi mustahkam.",
      type: "info"
    },
    {
      minute: "87'",
      text: "Almashtiruv: Newcastle - Joelinton o'rniga Sean Longstaff kiritildi.",
      type: "substitution"
    },
    {
      minute: "82'",
      text: "GOL! Newcastle United 2-1! Alexander Isak ajoyib zarba bilan to'pni darvoza burchagiga jo'natdi!",
      type: "goal"
    },
    {
      minute: "78'",
      text: "Sariq kartochka: Morgan Gibbs-White qo'pol o'yin uchun ogohlantirildi.",
      type: "yellow"
    },
    {
      minute: "65'",
      text: "GOL! Nottingham Forest 1-1! Brennan Johnson ajoyib zarba bilan hisobni tenglashdi!",
      type: "goal"
    },
    {
      minute: "58'",
      text: "Almashtiruv: Nottingham Forest - Anthony Elanga o'rniga Morgan Gibbs-White kiritildi.",
      type: "substitution"
    },
    {
      minute: "45'",
      text: "Ikkinchi taym boshlandi. Hech qanday almashtiruv yo'q.",
      type: "info"
    },
    {
      minute: "45+2'",
      text: "Birinchi taym tugadi. Newcastle United 1-0 oldinda.",
      type: "halftime"
    },
    {
      minute: "42'",
      text: "Yaqin imkoniyat! Callum Wilson zarbasi darvoza ustuniga tegdi.",
      type: "chance"
    },
    {
      minute: "28'",
      text: "GOL! Newcastle United 1-0! Bruno Guimaraes ajoyib uzoq masofadan zarba!",
      type: "goal"
    },
    {
      minute: "15'",
      text: "Nottingham Forest boshlang'ich daqiqalarda faol hujum qilmoqda.",
      type: "info"
    },
    {
      minute: "1'",
      text: "O'yin boshlandi! Newcastle United vs Nottingham Forest",
      type: "kickoff"
    }
  ];

  const getEventIcon = (type: string) => {
    switch (type) {
      case 'goal': return '⚽';
      case 'yellow': return '🟨';
      case 'red': return '🟥';
      case 'substitution': return '🔄';
      case 'chance': return '⚡';
      case 'fulltime': return '🏁';
      case 'halftime': return '⏸️';
      case 'kickoff': return '🏃';
      default: return '📝';
    }
  };

  const getEventClass = (type: string) => {
    switch (type) {
      case 'goal': return 'commentary__event--goal';
      case 'yellow': return 'commentary__event--yellow';
      case 'red': return 'commentary__event--red';
      case 'substitution': return 'commentary__event--sub';
      case 'chance': return 'commentary__event--chance';
      case 'fulltime': return 'commentary__event--fulltime';
      case 'halftime': return 'commentary__event--halftime';
      case 'kickoff': return 'commentary__event--kickoff';
      default: return 'commentary__event--info';
    }
  };

  return (
    <div className="match-commentary">
      <h3 className="match-commentary__title">O'yin Sharhi</h3>
      <div className="commentary__events">
        {commentaryEvents.map((event, index) => (
          <div key={index} className={`commentary__event ${getEventClass(event.type)}`}>
            <div className="commentary__minute">
              <span className="commentary__time">{event.minute}</span>
              <span className="commentary__icon">{getEventIcon(event.type)}</span>
            </div>
            <div className="commentary__text">
              {event.text}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MatchCommentary;
