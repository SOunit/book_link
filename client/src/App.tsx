import { Route, Switch, Redirect } from 'react-router-dom';
import { Fragment, useContext } from 'react';
import AuthContext from './store/auth-context';
import Layout from './components/layout/Layout';
import SearchUsers from './pages/SearchUsers';
import PageNotFound from './pages/PageNotFound';
import UserDetail from './pages/UserDetail';
import Home from './pages/Home';
import Login from './pages/Login';
import './App.css';

function App() {
  const authCtx = useContext(AuthContext);
  const isLoggedIn = authCtx.isLoggedIn;

  const loggedInRoutes = (
    <Fragment>
      <Route path='/' exact>
        <Redirect to='/search' />
      </Route>
      <Route path='/search'>
        <SearchUsers />
      </Route>
      <Route path='/users/:userId'>
        <UserDetail />
      </Route>
      <Route path='/home'>
        <Home />
      </Route>
    </Fragment>
  );

  const notLoggedInRoutes = (
    <Fragment>
      <Route path='/'>
        <Redirect to='/login' />
      </Route>
    </Fragment>
  );

  return (
    <Layout>
      <Switch>
        <Route path='/login'>
          <Login />
        </Route>
        {isLoggedIn && loggedInRoutes}
        {!isLoggedIn && notLoggedInRoutes}
        <Route path='*'>
          <PageNotFound />
        </Route>
      </Switch>
    </Layout>
  );
}

export default App;
