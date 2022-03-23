import { FC, useContext } from 'react';
import { Redirect, Route } from 'react-router';
import { AuthContext } from '../../../services/store';

type ProtectedRouteProps = {
  component: FC<any>;
  path: string;
  exact?: any;
  socket?: any;
};

export const ProtectedRoute: FC<ProtectedRouteProps> = (props) => {
  const authCtx = useContext(AuthContext);
  const Component = props.component;

  return (
    <Route path={props.path}>
      {authCtx.isLoggedIn ? <Component {...props} /> : <Redirect to="/login" />}
    </Route>
  );
};
