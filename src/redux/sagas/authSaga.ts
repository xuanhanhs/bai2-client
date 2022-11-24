import { push } from 'connected-react-router';
import { SignInData, User } from 'src/types';
import { takeLatest, call, put } from 'redux-saga/effects';
import { PayloadAction } from '@reduxjs/toolkit';
import { authActions } from '../slices';
import { AuthService } from 'src/services';
import { LocalStorage } from 'src/utils';
import { PATH_HOME, PATH_SIGN_IN } from 'src/constants';
import { toast } from 'react-toastify';

function* signIn(action: PayloadAction<SignInData>) {
  try {
    const { payload } = action;
    const res: User = yield call(AuthService.signIn, payload);
    LocalStorage.setItem('user', {
      ...res,
      authdata: window.btoa(payload.username + ':' + payload.password),
    });
    toast.success('Đăng nhập thành công');
    yield put(authActions.signInSuccess(res));
    yield put(push(PATH_HOME));
  } catch (error) {
    yield put(authActions.signInFailed((error as any).message));
  }
}

function* signOut() {
  yield LocalStorage.removeItem('user');
  yield put({
    type: 'DESTROY_SESSION',
  });
  yield put(push(PATH_SIGN_IN));
}

export function* authSaga() {
  yield takeLatest(authActions.signInStart, signIn);
  yield takeLatest(authActions.signOut, signOut);
}
