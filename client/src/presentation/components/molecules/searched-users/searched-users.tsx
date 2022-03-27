import { FC, Fragment } from 'react';
import { User } from '../../../../domain';
import { useHistory } from 'react-router-dom';
import classes from './searched-users.module.css';
import { Buttons, UserCard } from '..';
import { IconButton } from '../../atoms';

type Props = {
  users: User[];
  loginUser: User;
  onFollowClick: any;
  onFollowingClick: any;
};

export const SearchedUsers: FC<Props> = ({
  users,
  onFollowClick,
  onFollowingClick,
}) => {
  const history = useHistory();

  const detailClickHandler = (user: User) => {
    history.push(`/users/${user.id}`);
  };

  const followClickHandler = (user: User) => {
    if (user.isFollowing) {
      onFollowingClick(user);
    } else {
      onFollowClick(user);
    }
  };

  return (
    <Fragment>
      {users.map((user) => {
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
              onClick={() => followClickHandler(user)}
            />
          </Buttons>
        );

        return <UserCard key={user.id} user={user} actions={actions} />;
      })}
    </Fragment>
  );
};
