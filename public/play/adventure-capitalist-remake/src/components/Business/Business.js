import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CountDown } from '../CountDown';
import { Progress } from '../Progress';
import { v4 as uuidv4 } from 'uuid';
import { increaseBalance, decreaseBalance, buyBusiness, setLastRun } from '../../redux/actions';
import './Business.css';

export function Business({id, name, price, lastRun, timeTaken, hasManager, quantityPurchased, icon, profit}) {
  const [uuid, setUuid] = useState(uuidv4());
  const [running, setRunning] = useState(hasManager);
  const [timeAlreadyRun, setTimeAlreadyRun] = useState(0);
  const dispatch = useDispatch();
  const balance = useSelector(state => state.balance);

  const runBusinessManually = (e) => {
    e.preventDefault();
    if (!running) {
      setUuid(uuidv4());
      setRunning(true);
      dispatch(setLastRun(id));
    }
  }

  const onComplete = () => {
    setTimeAlreadyRun(0);
    setRunning(hasManager);
    dispatch(increaseBalance(profit));
    if (hasManager) {
      setUuid(uuidv4());
      dispatch(setLastRun(id));
    }
  }

  const buy = () => {
    if (balance.amount >= price) {
      dispatch(buyBusiness(id, 1));
      dispatch(decreaseBalance(price));
    }
  }

  useEffect(() => {
    if (hasManager) {
      setUuid(uuidv4());
      setRunning(true);
      dispatch(setLastRun(id));
    }
  // eslint-disable-next-line
  }, [hasManager]);

  useEffect(() => {
    const now = (new Date()).getTime();
    if (lastRun && now - lastRun < timeTaken) {
      setTimeAlreadyRun(now - lastRun);
      setRunning(true);
    }
  // eslint-disable-next-line
  }, []);

  return (
    <div className="business">
      {!!quantityPurchased &&
        <>
        <div className="business-icon" onClick={runBusinessManually}>
          <img src={process.env.PUBLIC_URL + '/images/' + icon} alt="icon" width="60"/>
          <div className="business-quantity">{quantityPurchased}</div>
        </div>
        <div className="business-content">
          <div className="business-progress" onClick={runBusinessManually}>
            <Progress timeTaken={timeTaken} timeAlreadyRun={timeAlreadyRun} uuid={uuid} autoStart={running}/>
            <span className="business-profit">${profit.toLocaleString()}</span>
          </div>
          <div className="business-buy-and-timer">
            <div className={'business-buy' + (balance.amount >= price ? ' active' : '')}
              onClick={buy}>
              <span>Buy</span><span>${price.toLocaleString()}</span>
            </div>
            <div className="business-timer">
              <CountDown timeTaken={timeTaken} timeAlreadyRun={timeAlreadyRun} autoStart={running} uuid={uuid} onComplete={onComplete}/>
            </div>
          </div>
        </div>
        </>
      }
      {!quantityPurchased &&
        <div className={'business-unpurchased' + (balance.amount >= price ? ' active' : '')}
          onClick={buy}
          style={{backgroundImage: `url(${process.env.PUBLIC_URL}/images/lock.png)`}}>
          <span>{name}</span><br/>
          <span className="price">${price.toLocaleString()}</span>
        </div>
      }
    </div>
  );
}
