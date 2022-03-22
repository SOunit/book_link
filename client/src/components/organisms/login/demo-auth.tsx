import { FC, useContext } from 'react';
import { Buttons } from '../../molecules';
import { AuthContext } from '../../../services/store/auth-context';
import { useHistory } from 'react-router-dom';
import { Button } from '../../atoms';

type Props = {
  className: string;
};

export const DemoAuth: FC<Props> = ({ className }) => {
  const authCtx = useContext(AuthContext);
  const history = useHistory();

  const playButtonClickHandler = () => {
    authCtx.login('1');
    history.push('/');
  };

  return (
    <Buttons className={className}>
      <Button title="Play around" onClick={playButtonClickHandler} />
    </Buttons>
  );
};
