import { Route, Switch, Redirect } from 'react-router-dom';
import { useContext } from 'react';
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

  return (
    <Layout>
      <Switch>
        <Route path='/login'>
          <Login />
        </Route>
        <Route path='/' exact>
          {isLoggedIn && <Redirect to='/search' />}
          {!isLoggedIn && <Redirect to='/login' />}
        </Route>
        <Route path='/search'>
          {isLoggedIn && <SearchUsers />}
          {!isLoggedIn && <Redirect to='/login' />}
        </Route>
        <Route path='/users/:userId'>
          {isLoggedIn && <UserDetail />}
          {!isLoggedIn && <Redirect to='/login' />}
        </Route>
        <Route path='/home'>
          {isLoggedIn && <Home />}
          {!isLoggedIn && <Redirect to='/login' />}
        </Route>
        <Route path='*'>
          <PageNotFound />
        </Route>
      </Switch>
    </Layout>
  );
}

export default App;
