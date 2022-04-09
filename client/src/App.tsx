import { useEffect, lazy, Suspense } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { Layout } from './presentation/components/organisms';
import { ProtectedRoute } from './presentation/components/molecules';
import { SearchUsers, Login } from './presentation/pages';
import { useAuthStorage, useSocketAdapter } from './services';
import './App.css';

const PageNotFound = lazy(() =>
  import('./presentation/pages').then(({ PageNotFound }) => ({
    default: PageNotFound,
  })),
);
const UserDetail = lazy(() =>
  import('./presentation/pages').then(({ UserDetail }) => ({
    default: UserDetail,
  })),
);
const Home = lazy(() =>
  import('./presentation/pages').then(({ Home }) => ({
    default: Home,
  })),
);
const EditUser = lazy(() =>
  import('./presentation/pages').then(({ EditUser }) => ({
    default: EditUser,
  })),
);
const EditUserItems = lazy(() =>
  import('./presentation/pages').then(({ EditUserItems }) => ({
    default: EditUserItems,
  })),
);
const Chat = lazy(() =>
  import('./presentation/pages').then(({ Chat }) => ({
    default: Chat,
  })),
);
const ChatList = lazy(() =>
  import('./presentation/pages').then(({ ChatList }) => ({
    default: ChatList,
  })),
);
const CreateItem = lazy(() =>
  import('./presentation/pages').then(({ CreateItem }) => ({
    default: CreateItem,
  })),
);
const Follow = lazy(() =>
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
      </Suspense>
    </Layout>
  );
}

export default App;
