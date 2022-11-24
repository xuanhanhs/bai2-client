import { Fragment, Suspense } from 'react';
import { Route, Switch } from 'react-router-dom';
import { ConnectedRouter } from 'connected-react-router';
import routes from './routes';
import history from './history';

function App() {
  return (
    <ConnectedRouter history={history}>
      <Suspense fallback={null}>
        <Switch>
          {routes.map((route, index) => {
            const Component = route.component;
            const Guard = route.guard || Fragment;
            const Layout = route.layout || Fragment;
            const Page = () => {
              return (
                <Guard>
                  <Layout>
                    <Component />
                  </Layout>
                </Guard>
              );
            };
            return (
              <Route
                key={index}
                path={route.path}
                exact={route.exact}
                component={Page}
              />
            );
          })}
        </Switch>
      </Suspense>
    </ConnectedRouter>
  );
}

export default App;
