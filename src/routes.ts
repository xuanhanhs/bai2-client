import { lazy } from 'react';
import { PATH_HOME, PATH_SIGN_IN } from './constants';

import AuthLayout from './layouts/AuthLayout';
import CommonLayout from './layouts/CommonLayout';

import AuthGuard from './components/guards/AuthGuard';

const routes = [
  {
    path: PATH_HOME,
    component: lazy(() => import('./containers/Home')),
    layout: CommonLayout,
    guard: AuthGuard,
    exact: true,
  },
  {
    path: PATH_SIGN_IN,
    component: lazy(() => import('./containers/auth/SignIn')),
    layout: AuthLayout,
    exact: true,
  },
];

export default routes;
