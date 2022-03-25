import { FC, Fragment } from 'react';
import { User } from '../../../../domain/models/user';
import { useHistory } from 'react-router-dom';
import classes from './searched-users.module.css';
import { Buttons, UserCard } from '..';
import { IconButton } from '../../atoms';
import { useFollowAdapter } from '../../../../services';

type Props = {
  users: User[];
  loginUser: User;
  onFollowClick: any;
  onFollowingClick: any;
};

export const SearchedUsers: FC<Props> = ({
  users,
  loginUser,
  onFollowClick,
  onFollowingClick,
}) => {
  const history = useHistory();
  const { createFollowing, deleteFollowing } = useFollowAdapter();

  const detailClickHandler = (user: User) => {
    history.push(`/users/${user.id}`);
  };

  return (
    <Fragment>
      {users.map((user) => {
        const followClickHandler = () => {
          // update db
          createFollowing(loginUser.id, user.id);

          // update state
          onFollowClick(user.id);
        };

        const followingClickHandler = () => {
          // delete db
          deleteFollowing(loginUser.id, user.id);

          // update state
          onFollowingClick(user.id);
        };

        const actions = (
          <Buttons>
            <IconButton
              iconName="fa fa-info"
              onClick={() => detailClickHandler(user)}
              className={classes['action-icon']}
            />
            <IconButton
              iconName={
                user.isFollowing ? 'fa fa-user-minus' : 'fa fa-user-plus'
              }
              onClick={
                user.isFollowing ? followingClickHandler : followClickHandler
              }
            />
          </Buttons>
        );

        return <UserCard key={user.id} user={user} actions={actions} />;
      })}
    </Fragment>
  );
};
