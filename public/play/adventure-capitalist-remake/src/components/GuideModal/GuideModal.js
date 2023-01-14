import React from 'react';

export function GuideModal({onClose = () => {}}) {

  return (
    <div className="modal">
      <div className="modal-content">
        <div className="modal-close" onClick={() => onClose()}>
          <img src={process.env.PUBLIC_URL + '/images/close.png'} alt="Close" />
        </div>
        <h2>Wecome!</h2>
        <div>
          <ul>
            <li>Click on the lemon icon to start earning.</li>
            <li>Try to do it manually to gain the revenue.</li>
            <li>When having enough money, you will be able to unlock more businesses and managers!</li>
            <li>Hire managers to help you do businesses automatically!</li>
          </ul>
          <h3 className="text-center">Happy playing!</h3>
        </div>
      </div>
    </div>
  );
}
