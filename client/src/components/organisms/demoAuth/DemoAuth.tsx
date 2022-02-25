import { FC, useContext } from 'react';
import Buttons from '../../molecules/ui/Buttons/Buttons';
import Button, { ButtonTypes } from '../../molecules/ui/Buttons/Button';
import AuthContext from '../../../store/auth-context';
import { useHistory } from 'react-router-dom';

const DemoAuth: FC = () => {
  const authCtx = useContext(AuthContext);
  const history = useHistory();

  const playButtonClickHandler = () => {
    authCtx.login('1');
    history.push('/');
  };

  return (
    <Buttons>
      <Button
        buttonText="Play around"
        buttonType={ButtonTypes.NORMAL}
        onButtonClick={playButtonClickHandler}
      />
    </Buttons>
  );
};

export default DemoAuth;
