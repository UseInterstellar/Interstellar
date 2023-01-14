import React from 'react';
import { useSelector } from 'react-redux';
import './AwayEarningModal.css';
import { round } from '../../utils/number';

export function AwayEarningModal({onClose = () => {}}) {
  const awayEarning = useSelector(state =>  state.awayEarning);

  return (
    <div className="modal">
      <div className="modal-content">
        <div className="modal-close" onClick={() => onClose()}>
          <img src={process.env.PUBLIC_URL + '/images/close.png'} alt="Close" />
        </div>
        <h2>Wecome back!</h2>
        <div className="come-back-info">
          Horay! While you are away for <span className="away-time">{awayEarning.awayDuration}</span>,
          the managers help you earn <span className="earning-amount">${round(awayEarning.amount).toLocaleString()}</span>.<br/><br/>
          It's amazing!
        </div>
      </div>
    </div>
  );
}
