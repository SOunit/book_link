import { useContext, useEffect } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { Layout } from './components/organisms';
import { ProtectedRoute } from './components/molecules';
import {
  SearchUsers,
  PageNotFound,
  UserDetail,
  Home,
  Login,
  EditUser,
  EditUserItems,
  Followings,
  Chat,
  ChatList,
  CreateItem,
  Followers,
} from './pages';
import './App.css';
import { useSocket } from './hooks';
import { AuthContext } from './store';

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
        {/* Search */}
        <ProtectedRoute component={SearchUsers} path="/" exact />
        <ProtectedRoute component={SearchUsers} path="/search" />

        {/* Users */}
        <ProtectedRoute component={EditUser} path="/users/edit" />
        <ProtectedRoute component={EditUserItems} path="/users/items/edit" />
        <ProtectedRoute
          component={Followings}
          path="/users/:userId/followings"
        />
        <ProtectedRoute component={Followers} path="/users/:userId/followers" />
        <ProtectedRoute component={UserDetail} path="/users/:userId" />

        {/* Chats */}
        <ProtectedRoute component={ChatList} path="/chats" exact />
        <ProtectedRoute
          component={Chat}
          path="/chats/:userId"
          socket={socket}
        />

        {/* Home */}
        <ProtectedRoute component={Home} path="/home" />

        {/* Items */}
        <ProtectedRoute component={CreateItem} path="/items/new" />

        {/* Page Not Found */}
        <Route path="*">
          <PageNotFound />
        </Route>
      </Switch>
    </Layout>
  );
}

export default App;
