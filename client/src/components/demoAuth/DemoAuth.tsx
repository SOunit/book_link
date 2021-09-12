import { FC, useContext } from 'react';
import Buttons from '../ui/Buttons/Buttons';
import Button, { ButtonTypes } from '../ui/Buttons/Button';
import AuthContext from '../../store/auth-context';

const DemoAuth: FC = () => {
  const authCtx = useContext(AuthContext);

  const playButtonClickHandler = () => {
    authCtx.login('1');
  };

  const logoutButtonClickHandler = () => {
    authCtx.logout();
  };

  let loginButton = (
    <Button
      buttonText='Play around'
      buttonType={ButtonTypes.NORMAL}
      onButtonClick={playButtonClickHandler}
    />
  );

  let logoutButton = (
    <Button
      buttonText='Logout'
      buttonType={ButtonTypes.NORMAL}
      onButtonClick={logoutButtonClickHandler}
    />
  );

  return (
    <Buttons>
      {!authCtx.isLoggedIn && loginButton}
      {authCtx.isLoggedIn && logoutButton}
    </Buttons>
  );
};

export default DemoAuth;
