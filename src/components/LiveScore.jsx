import React from 'react';
import imgs from '../assets/index'

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
          </div>
        </div>
      </div>
    </div>
  );
};

export default LiveScore; 