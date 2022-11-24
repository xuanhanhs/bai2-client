import { useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { PATH_SIGN_IN } from 'src/constants';
import { useAppDispatch } from 'src/redux/hooks';
import { authActions } from 'src/redux/slices';
import { LocalStorage } from 'src/utils';

function AuthGuard({ children }) {
  const user = LocalStorage.getItem('user');
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (user) {
      dispatch(authActions.setUser(user));
    }
  }, [dispatch, user]);

  return user ? children : <Redirect to={PATH_SIGN_IN} />;
}

export default AuthGuard;
