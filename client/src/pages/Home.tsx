import { FC, Fragment } from 'react';
import { useHistory } from 'react-router';
import UserInfo from '../components/userInfo/UserInfo';
import UserItems from '../components/userItems/UserItems';
import Buttons from '../components/ui/Buttons/Buttons';
import Button, { ButtonTypes } from '../components/ui/Buttons/Button';
import useUser from '../hooks/use-user';

type HomeProps = {};

const Home: FC<HomeProps> = (props) => {
  const user = useUser();
  const history = useHistory();

  const editProfileClickHandler = () => {
    history.push(`/users/edit`);
  };

  let userInfo = null;
  let userItems = null;
  if (user) {
    userInfo = <UserInfo user={user} />;
    userItems = <UserItems items={user.items} />;
  }

  return (
    <Fragment>
      {userInfo}
      <Buttons>
        <Button
          buttonText='Edit Profile'
          buttonType={ButtonTypes.NORMAL}
          onButtonClick={editProfileClickHandler}
        ></Button>
        <Button
          buttonText='Edit Items'
          buttonType={ButtonTypes.NORMAL}
          onButtonClick={() => {}}
        ></Button>
      </Buttons>
      {userItems}
    </Fragment>
  );
};

export default Home;
