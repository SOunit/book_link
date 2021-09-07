import { Route, Switch, Redirect } from 'react-router-dom';
import Layout from './components/layout/Layout';
import SearchUsers from './pages/SearchUsers';
import PageNotFound from './pages/PageNotFound';
import UserDetail from './pages/UserDetail';
import Home from './pages/Home';
import Login from './pages/Login';
import './App.css';

function App() {
  return (
    <Layout>
      <Switch>
        <Route path='/login'>
          <Login />
        </Route>
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
        <Route path='*'>
          <PageNotFound />
        </Route>
      </Switch>
    </Layout>
  );
}

export default App;
