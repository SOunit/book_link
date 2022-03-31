import { useEffect } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { Layout } from './presentation/components/organisms';
import { ProtectedRoute } from './presentation/components/molecules';
import {
  SearchUsers,
  PageNotFound,
  UserDetail,
  Home,
  Login,
  EditUser,
  EditUserItems,
  Chat,
  ChatList,
  CreateItem,
  Follow,
} from './presentation/pages';
import { useAuthStorage, useSocketAdapter } from './services';
import { useInitChatList } from './application/';
import './App.css';

function App() {
  const { socket } = useSocketAdapter();
  const authStorage = useAuthStorage();
  const { token } = authStorage;
  const { initChatList } = useInitChatList();

  useEffect(() => {
    if (token) {
      initChatList(token);
    }
  }, [initChatList, token]);

  useEffect(() => {
    document.title = 'Book Link';
  });

  useEffect(() => {
    if (socket) {
      socket.emit('join', token);
    }
  }, [token, socket]);

  return (
    <Layout>
      <Switch>
        <Route path="/login">
          {authStorage.isLoggedIn ? <Redirect to="/" /> : <Login />}
        </Route>
        {/* Search */}
        <ProtectedRoute component={SearchUsers} path="/" exact />
        <ProtectedRoute component={SearchUsers} path="/search" />

        {/* Users */}
        <ProtectedRoute component={EditUser} path="/users/edit" />
        <ProtectedRoute component={EditUserItems} path="/users/items/edit" />
        <ProtectedRoute component={Follow} path="/users/:userId/followings" />
        <ProtectedRoute component={Follow} path="/users/:userId/followers" />
        <ProtectedRoute component={UserDetail} path="/users/:userId" />

        {/* Home */}
        <ProtectedRoute component={Home} path="/home" />

        {/* Items */}
        <ProtectedRoute component={CreateItem} path="/items/new" />

        {/* Chats */}
        <ProtectedRoute component={ChatList} path="/chats" exact />
        <ProtectedRoute
          component={Chat}
          path="/chats/:userId"
          socket={socket}
        />

        {/* Page Not Found */}
        <Route path="*">
          <PageNotFound />
        </Route>
      </Switch>
    </Layout>
  );
}

export default App;
