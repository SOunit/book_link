import { FC, Fragment, useContext } from 'react';
import { useParams } from 'react-router';
import { useHistory } from 'react-router-dom';
import {
  Buttons,
  NotFoundMessage,
  UserCard,
  FollowHeader,
} from '../../components/molecules';
import { IconButton } from '../../components/atoms';
import { AuthContext } from '../../store';
import { useFollow, useUser } from '../../hooks';
import classes from './followers.module.scss';

type FollowersProps = {};
type FollowersParams = {
  userId: string;
};

export const Followers: FC<FollowersProps> = () => {
  const params = useParams<FollowersParams>();
  const history = useHistory();
  const { loginUser } = useContext(AuthContext);
  const { followers, followClickHandler, followingClickHandler } = useFollow(
    params.userId,
    loginUser?.id,
  );
  const { user } = useUser(params.userId);

  const detailClickHandler = (userId: string) => {
    history.push(`/users/${userId}`);
  };

  let followingUsers = null;
  if (followers && loginUser) {
    followingUsers = followers.map((user) => {
      const buttons = (
        <Buttons>
          <IconButton
            iconName="fas fa-info"
            onClick={() => detailClickHandler(user.id)}
            className={classes['followers__info-icon']}
          />
          <IconButton
            iconName={user.isFollowing ? 'fa fa-user-minus' : 'fa fa-user-plus'}
            onClick={
              user.isFollowing
                ? () =>
                    followingClickHandler(user.id, loginUser.id, params.userId)
                : () => followClickHandler(user.id, loginUser.id, params.userId)
            }
          />
        </Buttons>
      );
      return (
        <UserCard
          user={user}
          actions={buttons}
          key={user.id}
          imageClassName={classes['followers__image']}
        />
      );
    });
  }

  return (
    <Fragment>
      {user && (
        <UserCard
          user={user}
          imageClassName={classes['followers__image']}
          actions={
            <Buttons>
              <IconButton
                iconName="fas fa-info"
                onClick={() => detailClickHandler(user.id)}
                className={classes['followers__info-icon']}
              />
            </Buttons>
          }
        />
      )}
      <FollowHeader userId={params.userId} />
      {followers && followers.length > 0 && followingUsers}
      {followers && followers.length <= 0 && (
        <NotFoundMessage title="" text="Nobody is following you!" />
      )}
    </Fragment>
  );
};
