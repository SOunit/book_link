import { FC, Fragment, useContext } from 'react';
import { useHistory } from 'react-router';
import UserInfo from '../components/userInfo/UserInfo';
import UserItems from '../components/userItems/UserItems';
import Buttons from '../components/ui/Buttons/Buttons';
import Button, { ButtonTypes } from '../components/ui/Buttons/Button';
import AuthContext from '../store/auth-context';

type HomeProps = {};

const Home: FC<HomeProps> = () => {
  const { loginUser } = useContext(AuthContext);
  const history = useHistory();

  const editProfileClickHandler = () => {
    history.push(`/users/edit`);
  };

  const editUserItemsClickHandler = () => {
    history.push(`/users/items/edit`);
  };

  let userInfo = null;
  let userItems = null;
  if (loginUser) {
    userInfo = <UserInfo user={loginUser} />;
    userItems = <UserItems items={loginUser.items} />;
  }

  return (
    <Fragment>
      {userInfo}
      <Buttons>
        <Button
          buttonText="Edit Profile"
          buttonType={ButtonTypes.NORMAL}
          onButtonClick={editProfileClickHandler}></Button>
        <Button
          buttonText="Edit Items"
          buttonType={ButtonTypes.NORMAL}
          onButtonClick={editUserItemsClickHandler}></Button>
      </Buttons>
      {userItems}
    </Fragment>
  );
};

export default Home;
