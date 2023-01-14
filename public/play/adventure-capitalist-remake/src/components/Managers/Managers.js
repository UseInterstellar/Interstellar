import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { hireManager } from '../../redux/actions';
import { objectToList } from '../../utils/game';

import './Managers.css';


export function Managers() {
  const managers = useSelector(state => state.managers);
  const balance = useSelector(state => state.balance);
  const [showModal, setShowModal] = useState(false);

  const available = !!objectToList(managers).find(item => item.price <= balance.amount && !item.hired);
  const dispatch = useDispatch();

  const hire = (manager) => {
    if (manager.price <= balance.amount) {
      dispatch(hireManager(manager));
    }
  }

  return (
    <div>
      <div className={'manager-btn' + (available ? ' active': '')}
        onClick={() => setShowModal(true)}>Managers</div>
      {showModal &&
        <div className="modal">
          <div className="modal-content">
            <div className="modal-close" onClick={() => setShowModal(false)}>
              <img src={process.env.PUBLIC_URL + '/images/close.png'} alt="Close" />
            </div>
            <h2>Managers</h2>
            <p className="sub-title">Managers make life easier!<br/>
              Hire one to run your business for you.
            </p>
            <div className="manager-list">
              {objectToList(managers).filter(manager => !manager.hired).map(manager => 
                <div key={manager.businessId} className="manager">
                  <div className="manager-info">
                    <div className="manager-name">{manager.name}</div>
                    <div className="manager-desc">{manager.description}</div>
                    <div className="manager-price">${manager.price.toLocaleString()}</div>
                  </div>
                  <button disabled={manager.price > balance.amount} onClick={() => { hire(manager) }}>
                    Hire
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      }
    </div>
  );
}
