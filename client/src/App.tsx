import React, { useEffect, Suspense } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { Layout } from './presentation/components/organisms';
import { SearchUsers, Login } from './presentation/pages';
import { useAuthStorage, useSocketAdapter } from './services';
import './App.css';

// import {
//   PageNotFound,
//   UserDetail,
//   EditUserItems,
//   Follow,
//   Home,
//   ChatList,
//   EditUser,
//   CreateItem,
//   Chat,
// } from './presentation/pages';

const PageNotFound = React.lazy(() =>
  import('./presentation/pages').then(({ PageNotFound }) => ({
    default: PageNotFound,
  })),
);
const UserDetail = React.lazy(() =>
  import('./presentation/pages').then(({ UserDetail }) => ({
    default: UserDetail,
  })),
);
const Home = React.lazy(() =>
  import('./presentation/pages').then(({ Home }) => ({
    default: Home,
  })),
);
const EditUser = React.lazy(() =>
  import('./presentation/pages').then(({ EditUser }) => ({
    default: EditUser,
  })),
);
const EditUserItems = React.lazy(() =>
  import('./presentation/pages').then(({ EditUserItems }) => ({
    default: EditUserItems,
  })),
);
const Chat = React.lazy(() =>
  import('./presentation/pages').then(({ Chat }) => ({
    default: Chat,
  })),
);
const ChatList = React.lazy(() =>
  import('./presentation/pages').then(({ ChatList }) => ({
    default: ChatList,
  })),
);
const CreateItem = React.lazy(() =>
  import('./presentation/pages').then(({ CreateItem }) => ({
    default: CreateItem,
  })),
);
const Follow = React.lazy(() =>
  import('./presentation/pages').then(({ Follow }) => ({
    default: Follow,
  })),
);

function App() {
  const { socket } = useSocketAdapter();
  const authStorage = useAuthStorage();
  const { token } = authStorage;

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
      <Suspense fallback={<div>Loading...</div>}>
        <Switch>
          <Route path="/login">
            {authStorage.isLoggedIn ? <Redirect to="/" /> : <Login />}
          </Route>
          {/* Search */}
          <Route path="/" exact>
            <SearchUsers />
          </Route>
          <Route path="/search">
            <SearchUsers />
          </Route>
          {/* Users */}
          <Route path="users/edit">
            <EditUser />
          </Route>
          <Route path="/users/items/edit">
            <EditUserItems />
          </Route>
          <Route path="/users/:userId/followings">
            <Follow />
          </Route>
          <Route path="/users/:userId/followers">
            <Follow />
          </Route>
          <Route path="/users/:userId">
            <UserDetail />
          </Route>
          {/* Home */}
          <Route path="/home">
            <Home />
          </Route>
          {/* Items */}
          <Route path="/items/new">
            <CreateItem />
          </Route>
          {/* Chats */}
          <Route path="/chats" exact>
            <ChatList />
          </Route>
          <Route path="/chats/:userId">
            <Chat socket={socket} />
          </Route>
          {/* Page Not Found */}
          <Route path="*">
            <PageNotFound />
          </Route>
        </Switch>
      </Suspense>
    </Layout>
  );
}

export default App;
