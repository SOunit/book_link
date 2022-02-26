import { useContext, useEffect } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import Layout from './components/organisms/layout/Layout';
import ProtectedRoute from './components/molecules/router/ProtectedRoute';
import SearchUsers from './pages/SearchUsers';
import PageNotFound from './pages/PageNotFound';
import UserDetail from './pages/UserDetail';
import Home from './pages/Home';
import Login from './pages/Login';
import EditProfile from './pages/edit-user';
import EditUserItems from './pages/EditUserItems';
import Followings from './pages/Followings';
import Chat from './pages/Chat';
import ChatList from './pages/ChatList';
import './App.css';
import useSocket from './hooks/use-socket';
import AuthContext from './store/auth-context';

function App() {
  const { socket } = useSocket();
  const authCtx = useContext(AuthContext);

  useEffect(() => {
    document.title = 'Book Link';
  });

  useEffect(() => {
    if (socket) {
      console.log('create socket');
      socket.emit('join', authCtx.token);
    }
  }, [authCtx.token, socket]);

  return (
    <Layout>
      <Switch>
        <Route path="/login">
          {authCtx.isLoggedIn ? <Redirect to="/" /> : <Login />}
        </Route>
        <ProtectedRoute component={SearchUsers} path="/" exact />
        <ProtectedRoute component={SearchUsers} path="/search" />
        <ProtectedRoute component={EditProfile} path="/users/edit" />
        <ProtectedRoute component={EditUserItems} path="/users/items/edit" />
        <ProtectedRoute
          component={Followings}
          path="/users/:userId/followings"
        />
        <ProtectedRoute component={UserDetail} path="/users/:userId" />
        <ProtectedRoute component={ChatList} path="/chats" exact />
        <ProtectedRoute
          component={Chat}
          path="/chats/:userId"
          socket={socket}
        />
        <ProtectedRoute component={Home} path="/home" />
        <Route path="*">
          <PageNotFound />
        </Route>
      </Switch>
    </Layout>
  );
}

export default App;
