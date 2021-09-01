import { Route, Switch, Redirect } from 'react-router-dom';
import Layout from './components/layout/Layout';
import SearchUsers from './pages/SearchUsers';
import PageNotFound from './pages/PageNotFound';
import UserDetail from './pages/UserDetail';
import './App.css';

function App() {
  return (
    <Layout>
      <Switch>
        <Route path='/' exact>
          <Redirect to='/search' />
        </Route>
        <Route path='/search'>
          <SearchUsers />
        </Route>
        <Route path='/users/:userId'>
          <UserDetail />
        </Route>
        <Route path='*'>
          <PageNotFound />
        </Route>
      </Switch>
    </Layout>
  );
}

export default App;
