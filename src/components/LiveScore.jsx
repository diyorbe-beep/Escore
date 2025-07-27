import React from 'react';
import imgs from '../assets/index'
import { BsPinAngleFill } from "react-icons/bs";
import './LiveScore.scss'
import { GiNetworkBars } from "react-icons/gi";
import { RiNotification2Fill } from "react-icons/ri";
import { Link } from 'react-router-dom';


const LiveScore = () => {
  return (
    <div>
      <div className="wrapper">
        <div className="live-score-container">
          <div className="live-score-header">
            <div className="live-score-header-top">
              <div className="live-score-header-top-katigoriya">
                <div>
                  <button>ALL</button>
                  <button>LIVE</button>
                  <button>FINISHED</button>
                  <button>SCHEDULED</button>
                </div>
                <form style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <label htmlFor="show-odds">Show odds</label>
                  <input type="checkbox" className="switch" id="show-odds" />
                  <span className="slider"></span>
                </form>
              </div>
              <div className="live-score-header-pinned-leagues">
                <h1>Belgilangan ligalar bu yerda tadbir sanalarida paydo bo'ladi.</h1>
              </div>
            </div>
            <div className="liva_score_bottom">
              <div className="live_score_bottom1">
                <div className="live_score_bottom1_top">
                  <div className='live_score_bottom1_top_logo'>
                    <img src="https://upload.wikimedia.org/wikipedia/en/thumb/b/be/Flag_of_England.svg/1200px-Flag_of_England.svg.png" alt="" />
                  </div>
                  <section>
                    <div className="live_score_bottom1_league_name">
                      <h5>England <span>Premier League</span></h5>
                    </div>
                    <div className="live_score_bottom1_leagueName_icon">
                      <h4>eScore ratings</h4>
                      <div>
                        <BsPinAngleFill />
                      </div>
                    </div>
                  </section>
                </div>
                <div className="live_score_bottom_menu">
                  <div className="live_score_bottom_match_time">
                    <h3>12:30 <span>FT</span></h3>
                  </div>
                  <Link to='/AvsB' className="live_score_bottom1_teamName">
                    <div className="teams">
                      <div className="team1">
                        <img src="https://upload.wikimedia.org/wikipedia/en/5/56/Newcastle_United_Logo.svg" alt="" />
                        <h2>Newcastle</h2>
                      </div>
                      <div className="team2 team1">
                        <img src="https://upload.wikimedia.org/wikipedia/en/thumb/e/e5/Nottingham_Forest_F.C._logo.svg/1200px-Nottingham_Forest_F.C._logo.svg.png" alt="" />
                        <h2>Forest</h2>
                      </div>
                    </div>
                    <div className="live_score_bottom1_teamsleft">
                      <GiNetworkBars className='NetworkBars' />
                      <h2>1 <span>3</span></h2>
                      <div className='live_score_bottom1_teams_notification'>
                        <RiNotification2Fill className='Notification' />
                      </div>
                    </div>
                  </Link>
                </div>
              </div>
            </div>
            <hr />
            <div className="liva_score_bottom">
              <div className="live_score_bottom1">
                <div className="live_score_bottom1_top">
                  <div className='live_score_bottom1_top_logo'>
                    <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/Flag_of_Belgium.svg/250px-Flag_of_Belgium.svg.png" alt="" />
                  </div>
                  <section className='section2'>
                    <div className="live_score_bottom1_league_name">
                      <h5>Belgium <span>Pro League</span></h5>
                    </div>
                    <div className="live_score_bottom1_leagueName_icon">
                      <h4>eScore ratings</h4>
                      <div>
                        <BsPinAngleFill />
                      </div>
                    </div>
                  </section>
                </div>
                <div className="live_score_bottom_menu">
                  <div className="live_score_bottom_match_time">
                    <h3>12:30 <span>FT</span></h3>
                  </div>
                  <Link to='/AvsB' className="live_score_bottom1_teamName">
                    <div className="teams">
                      <div className="team1">
                        <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/f6/KRC_Genk_Logo_2016.svg/1200px-KRC_Genk_Logo_2016.svg.png" alt="" />
                        <h2>Genk</h2>
                      </div>
                      <div className="team2 team1 belgiumtema2">
                        <img src="https://upload.wikimedia.org/wikipedia/en/thumb/0/0b/Royal_Antwerp_Football_Club_logo.svg/1200px-Royal_Antwerp_Football_Club_logo.svg.png" alt="" />
                        <h2>Royal Antwerp</h2>
                      </div>
                    </div>
                    <div className="live_score_bottom1_teamsleft">
                      <GiNetworkBars className='NetworkBars' />
                      <h2>1 <span>3</span></h2>
                      <div className='live_score_bottom1_teams_notification'>
                        <RiNotification2Fill className='Notification' />
                      </div>
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LiveScore; 