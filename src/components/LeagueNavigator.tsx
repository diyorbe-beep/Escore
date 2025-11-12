
import React, { useState } from 'react';
import { countries } from '../data/footballData';

const LeagueNavigator = () => {
  const [openCountries, setOpenCountries] = useState<string[]>(['england']);

  const toggleCountry = (countryId: string) => {
    setOpenCountries(prev => 
      prev.includes(countryId) 
        ? prev.filter(id => id !== countryId)
        : [...prev, countryId]
    );
  };

  return (
    <div className="league-navigator">
      <h3 className="league-navigator__title">Ligalar</h3>
      
      {countries.map(country => (
        <div key={country.id} className="league-navigator__country">
          <div 
            className={`league-navigator__country-header ${openCountries.includes(country.id) ? 'active' : ''}`}
            onClick={() => toggleCountry(country.id)}
          >
            <img 
              src={country.flag} 
              alt={`${country.name} bayrog'i`}
              className="flag"
            />
            <span className="country-name">{country.name}</span>
            <i className="ri-arrow-down-s-line toggle-icon"></i>
          </div>
          
          {openCountries.includes(country.id) && (
            <div className="league-navigator__country-leagues">
              {country.leagues.map(league => (
                <a 
                  key={league.id} 
                  href={`#${league.id}`}
                  onClick={(e) => {
                    e.preventDefault();
                    document.getElementById(league.id)?.scrollIntoView({ 
                      behavior: 'smooth' 
                    });
                  }}
                >
                  {league.name}
                </a>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default LeagueNavigator;
