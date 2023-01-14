import { INCREASE_BALANCE, DECREASSE_BALANCE, BUY_BUSINESS, SET_LAST_RUN, HIRE_MANAGER } from './actionTypes';

export const increaseBalance = amount => ({
  type: INCREASE_BALANCE,
  payload: {
    amount
  }
});

export const decreaseBalance = amount => ({
  type: DECREASSE_BALANCE,
  payload: {
    amount
  }
});

export const buyBusiness = (businessId, qty) => ({
  type: BUY_BUSINESS,
  payload: {
    businessId,
    qty
  }
});

export const setLastRun = (businessId) => ({
  type: SET_LAST_RUN,
  payload: {
    businessId
  }
});

export const hireManager = (manager) => ({
  type: HIRE_MANAGER,
  payload: {
    manager
  }
});