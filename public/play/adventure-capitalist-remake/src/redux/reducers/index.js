import { combineReducers } from "redux";
import balance from "./balance";
import businesses from "./businesses";
import managers from "./managers";
import awayEarning from "./awayEarning";

export default combineReducers({ balance, businesses, managers, awayEarning });
