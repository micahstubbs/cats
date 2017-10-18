import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import counter from './counter';
import cats from './cats';

export default combineReducers({
  router: routerReducer,
  counter,
  cats
});
