import { FC, Fragment, useContext } from 'react';
import { useHistory } from 'react-router';
import { AuthContext } from '../../store';
import {
  IconTextButton,
  Spinner,
  UserInfo,
  UserItems,
} from '../../components/molecules';
import classes from './home.module.css';
import { useFollow } from '../../hooks';

type HomeProps = {};

export const Home: FC<HomeProps> = () => {
  const { loginUser } = useContext(AuthContext);
  const history = useHistory();
  const { followings, followers } = useFollow(loginUser?.id, loginUser?.id);

  const editProfileClickHandler = () => {
    history.push(`/users/edit`);
  };

  const editUserItemsClickHandler = () => {
    history.push(`/users/items/edit`);
  };

  return (
    <Fragment>
      {loginUser && followers && followings ? (
        <UserInfo
          user={loginUser}
          isHome
          followersCount={followers.length}
          followingsCount={followings.length}
        />
      ) : (
        <Spinner />
      )}
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
      {loginUser && (
        <UserItems items={loginUser.items ? loginUser.items : []} />
      )}
    </Fragment>
  );
};
