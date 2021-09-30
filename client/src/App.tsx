import { Route, Switch } from 'react-router-dom';
import Layout from './components/layout/Layout';
import ProtectedRoute from './components/router/ProtectedRoute';
import SearchUsers from './pages/SearchUsers';
import PageNotFound from './pages/PageNotFound';
import UserDetail from './pages/UserDetail';
import Home from './pages/Home';
import Login from './pages/Login';
import EditProfile from './pages/EditProfile';
import EditUserItems from './pages/EditUserItems';
import Followings from './pages/Followings';
import Chat from './pages/Chat';
import ChatList from './pages/ChatList';
import './App.css';

function App() {
  return (
    <Layout>
      <Switch>
        <Route path='/login'>
          <Login />
        </Route>
        <ProtectedRoute component={SearchUsers} path='/' exact />
        <ProtectedRoute component={SearchUsers} path='/search' />
        <ProtectedRoute component={EditProfile} path='/users/edit' />
        <ProtectedRoute component={EditUserItems} path='/users/items/edit' />
        <ProtectedRoute
          component={Followings}
          path='/users/:userId/followings'
        />
        <ProtectedRoute component={UserDetail} path='/users/:userId' />
        <ProtectedRoute component={ChatList} path='/chats' exact />
        <ProtectedRoute component={Chat} path='/chats/:userId' />
        <ProtectedRoute component={Home} path='/home' />
        <Route path='*'>
          <PageNotFound />
        </Route>
      </Switch>
    </Layout>
  );
}

export default App;
