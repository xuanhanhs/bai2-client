import { connectRouter } from 'connected-react-router';
import { combineReducers } from '@reduxjs/toolkit';
import { authReducer, studentReducer } from './slices';
import history from 'src/history';

const allReducer = combineReducers({
  router: connectRouter(history),
  auth: authReducer,
  student: studentReducer,
});

const rootReducer = (state, action) => {
  if (action.type === 'DESTROY_SESSION') {
    state = undefined;
  }
  return allReducer(state, action);
};

export default rootReducer;
