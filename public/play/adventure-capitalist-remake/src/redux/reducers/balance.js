import { round } from '../../utils/number';
import { INCREASE_BALANCE, DECREASSE_BALANCE } from "../actionTypes";


const initialState = {
  amount: 0
};

export default function(state = initialState, action) {
  switch (action.type) {
    case INCREASE_BALANCE: {
      return {
        amount: round(state.amount + action.payload.amount)
      };
    }
    case DECREASSE_BALANCE: {
      return {
        amount: round(state.amount - action.payload.amount)
      };
    }
    default:
      return state;
  }
}
