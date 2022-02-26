import { FC, useContext } from 'react';
import { Buttons } from '../../molecules';
import { AuthContext } from '../../../store/auth-context';
import { useHistory } from 'react-router-dom';
import { Button } from '../../atoms';

export const DemoAuth: FC = () => {
  const authCtx = useContext(AuthContext);
  const history = useHistory();

  const playButtonClickHandler = () => {
    authCtx.login('1');
    history.push('/');
  };

  return (
    <Buttons>
      <Button title="Play around" onClick={playButtonClickHandler} />
    </Buttons>
  );
};
