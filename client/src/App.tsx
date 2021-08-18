import { Route, Switch, Redirect } from 'react-router-dom';
import Layout from './components/layout/Layout';
import SearchUsers from './pages/SearchUsers';
import PageNotFound from './pages/PageNotFound';
import './App.css';
import Setup from './setups/Setup';

function App() {
  return (
    <Setup />
    // <Layout>
    //   <Switch>
    //     <Route path='/' exact>
    //       <Redirect to='/search' />
    //     </Route>
    //     <Route path='/search'>
    //       <SearchUsers />
    //     </Route>
    //     <Route path='*'>
    //       <PageNotFound />
    //     </Route>
    //   </Switch>
    // </Layout>
  );
}

export default App;
