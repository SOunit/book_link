import { FC, Fragment } from 'react';
import SectionTitle from '../ui/SectionTitle/SectionTitle';
import UserCard from '../organisms/user-card';
import User from '../../models/User';
import Buttons from '../ui/Buttons/Buttons';
import { useHistory } from 'react-router-dom';
import IconButton from '../atoms/icon-button';
import followingServices from '../../services/followingServices';

type Props = {
  users: User[];
  loginUser: User;
  onFollowClick: any;
  onFollowingClick: any;
};

const SearchedUsers: FC<Props> = ({
  users,
  loginUser,
  onFollowClick,
  onFollowingClick,
}) => {
  const history = useHistory();

  const detailClickHandler = (user: User) => {
    history.push(`/users/${user.id}`);
  };

  return (
    <Fragment>
      {users.length > 0 && <SectionTitle>Users</SectionTitle>}
      {users.map((user) => {
        const deleteFollowing = () => {
          followingServices.deleteFollowing(loginUser.id, user.id);
        };

        const createFollowing = () => {
          followingServices
            .createFollowing(loginUser.id, user.id)
            .then((result) => {
              return result.data.data.createFollowing;
            });
        };

        const followClickHandler = () => {
          // update db
          createFollowing();

          // update state
          onFollowClick(user.id);
        };

        const followingClickHandler = () => {
          // delete db
          deleteFollowing();

          // update state
          onFollowingClick(user.id);
        };

        const actions = (
          <Buttons>
            <IconButton
              iconName="fa fa-info"
              onClick={() => detailClickHandler(user)}
            />
            <IconButton
              iconName={
                user.isFollowing ? 'fa fa-user-plus' : 'fa fa-user-minus'
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

export default SearchedUsers;
