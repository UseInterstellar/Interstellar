import { BUY_BUSINESS, HIRE_MANAGER, SET_LAST_RUN } from "../actionTypes";
import businesses from '../../data/businesses';
import { round } from '../../utils/number';

const initialState = businesses;
const PROFIT_FROM_PRICE = 0.3;
const PRICE_GAIN = 1.1;

export default function(state = initialState, action) {
  switch (action.type) {
    case BUY_BUSINESS: {
      const businessId = action.payload.businessId;
      const business = state[businessId];
      const qty = action.payload.qty;
      const price = round(business.price * PRICE_GAIN * qty);
      const profit = round(business.profit + business.price * qty * PROFIT_FROM_PRICE);
      return {
        ...state,
        [businessId]: {
          ...business,
          quantityPurchased: business.quantityPurchased + qty,
          price,
          profit,
        }
      };
    }
    case SET_LAST_RUN:
      const business = state[action.payload.businessId];

      return {
        ...state,
        [business.id]: {
          ...business,
          lastRun: (new Date()).getTime()
        }
      }
    case HIRE_MANAGER: {
      const business = state[action.payload.manager.businessId];
      return {
        ...state,
        [business.id]: {
          ...business,
          hasManager: true
        }
      }
    }
    default:
      return state;
  }
}
