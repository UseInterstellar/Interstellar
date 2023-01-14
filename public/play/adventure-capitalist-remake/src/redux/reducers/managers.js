import { HIRE_MANAGER } from "../actionTypes";
import managers from '../../data/managers';

const initialState = managers;

export default function(state = initialState, action) {
  switch (action.type) {
    case HIRE_MANAGER: {
      const manager = action.payload.manager;
      return {
        ...state,
        [manager.id]: {
          ...manager,
          hired: true
        }
      };
    }
    default:
      return state;
  }
}
