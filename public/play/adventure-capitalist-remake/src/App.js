import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Business } from './components/Business';
import { Managers } from './components/Managers';
import { AwayEarningModal } from './components/AwayEarningModal';
import { GuideModal } from './components/GuideModal';
import { objectToList } from './utils/game';

import './App.css';

function App() {
  const balance = useSelector(state => state.balance);
  const businesses = useSelector(state => state.businesses);
  const awayEarning = useSelector(state => state.awayEarning);
  const [awayEarningShow, setAwayEarningShow] = useState(false);
  const [guideModalShow, setGuideModalShow] = useState(false);

  useEffect(() => {
    if (awayEarning && awayEarning.amount) {
      setAwayEarningShow(true);
    }
  }, [awayEarning]);

  useEffect(() => {
    if (!balance.amount) {
      setGuideModalShow(true);
    }
  }, [balance]);

  return (
    <>
      <div className="App">
        <div className="side-bar">
          <img src={process.env.PUBLIC_URL + '/images/capitalist.png'} alt="Capitalist"/>
          <Managers/>
        </div>
        <div className="main">
          <div className="balance">
            <span>${balance.amount.toLocaleString()}</span>
          </div>
          <div className="businesses">
            {objectToList(businesses).map(item => 
              <Business {...item} timeTaken={item.timeTaken*1000} key={item.id} />
            )}
          </div>
        </div>
      </div>
      {awayEarningShow &&
        <AwayEarningModal onClose={() => setAwayEarningShow(false)}/>
      }
      {guideModalShow &&
        <GuideModal onClose={() => setGuideModalShow(false)}/>
      }
    </>
  );
}

export default App;
