import { combineReducers } from 'redux';
import * as appData from './appDataReducer';

const rootReducer = combineReducers(Object.assign(appData));

export default rootReducer;
