interface MatchTabsProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const MatchTabs = ({ activeTab, onTabChange }: MatchTabsProps) => {
  const tabs = [
    { id: 'overview', label: 'Umumiy' },
    { id: 'lineups', label: 'Tarkib' },
    { id: 'statistics', label: 'Statistika' },
    { id: 'standings', label: 'Jadval' },
    { id: 'h2h', label: 'O\'zaro' },
    { id: 'highlights', label: 'Asosiy' }
  ];

  return (
    <div className="match-tabs">
      <div className="match-tabs__container">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            className={`match-tabs__tab ${activeTab === tab.id ? 'match-tabs__tab--active' : ''}`}
            onClick={() => onTabChange(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default MatchTabs;