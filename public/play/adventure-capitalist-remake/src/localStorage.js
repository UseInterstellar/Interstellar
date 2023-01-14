import { processBackgroundCalculating } from './utils/game';

export const loadState = () => {
  try {
    const serializedState = localStorage.getItem('AdventureCapitalist_State');
    if (serializedState === null) {
      return undefined;
    }
    return processBackgroundCalculating(JSON.parse(serializedState));
  } catch (error) {
    console.warn(error);
    return undefined;
  }
}

export const saveState = (state) => {
  try {
    localStorage.setItem('AdventureCapitalist_State', JSON.stringify(state));
  } catch (error) {
    console.warn(error);
  }
}

export const getCloseTime = () => {
  try {
    const time = localStorage.getItem('AdventureCapitalist_CloseTime');
    if (time === null) {
      return undefined;
    }
    return Number(time);
  } catch (error) {
    console.warn(error);
    return undefined;
  }
}

export const saveCloseTime = () => {
  try {
    localStorage.setItem('AdventureCapitalist_CloseTime', (new Date().getTime()));
  } catch (error) {
    console.warn(error);
  }
}