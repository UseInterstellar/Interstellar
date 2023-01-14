import { getCloseTime } from '../localStorage';
import { millisecondsToStr } from './time';

export const processBackgroundCalculating = state => {

  let earning = 0;
  const now = (new Date()).getTime();
  const closeTime = getCloseTime() || now;

  Object.values(state.businesses).forEach(item => {
    // auto running businesses
    if (item.quantityPurchased && item.hasManager && item.lastRun) {
      const elapsedSeconds = Math.floor((now - item.lastRun)/1000);
      const completedTimes = Math.floor(elapsedSeconds/item.timeTaken);
      earning += completedTimes * item.profit;
      // Set new lastRun
      item.lastRun += completedTimes*item.timeTaken*1000;
    }
    if (item.quantityPurchased && item.hasManager && !item.lastRun) {
      item.lastRun = now;
    }

    // businesses that started but not completed when window closing.
    if (item.quantityPurchased && !item.hasManager && item.lastRun 
      && (closeTime - item.lastRun) < item.timeTaken * 1000)  {
      if ((now - item.lastRun) >= item.timeTaken * 1000) {
        earning += item.profit;
      }
    }
    state.businesses[item.id] = item;
  });
  
  state.balance.amount += earning;
  
  state.awayEarning = {
    amount: earning,
    awayDuration: millisecondsToStr(now - closeTime)
  };
  return state;
}

// Only applicable for this game data Objects, values are objects and have order property
export const objectToList = object => Object.values(object).sort((a, b) =>  a.order - b.order);