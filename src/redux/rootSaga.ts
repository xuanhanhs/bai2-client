import { all } from 'redux-saga/effects';
import { authSaga, studentSaga } from './sagas';

export default function* rootSaga() {
  yield all([authSaga(), studentSaga()]);
}
