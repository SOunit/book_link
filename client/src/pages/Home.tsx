import { FC, Fragment, useContext } from 'react';
import { useHistory } from 'react-router';
import UserInfo from '../components/userInfo/UserInfo';
import UserItems from '../components/userItems/UserItems';
import AuthContext from '../store/auth-context';
import IconTextButton from '../components/molecules/icon-text-button';
import classes from './home.module.css';

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

  return (
    <Fragment>
      {loginUser && <UserInfo user={loginUser} />}
      <div className={classes['home__actions']}>
        <IconTextButton
          iconName="far fa-pen"
          text="Edit Profile"
          onClick={editProfileClickHandler}
        />
        <IconTextButton
          iconName="far fa-books"
          text="Edit Items"
          onClick={editUserItemsClickHandler}
        />
      </div>
      {loginUser && <UserItems items={loginUser.items} />}
    </Fragment>
  );
};

export default Home;
