import { Route, Switch } from 'react-router-dom';
import Layout from './components/layout/Layout';
import SearchUsers from './pages/SearchUsers';
import PageNotFound from './pages/PageNotFound';
import './App.css';

function App() {
  return (
    <Layout>
      <Switch>
        <Route path='/search'>
          <SearchUsers />
        </Route>
        <Route path='*'>
          <PageNotFound />
        </Route>
      </Switch>
    </Layout>
  );
}

export default App;
