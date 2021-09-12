import { FC, Fragment } from 'react';
import UserType from '../../models/User';
import FollowUserType from '../../models/FollowUser';
import SectionTitle from '../ui/SectionTitle/SectionTitle';
import DispCards from '../ui/DispCards/DispCards';

type SearchedUsersProps = {
  users: FollowUserType[];
  loginUser: UserType;
  onUpdateUsers: any;
};

const SearchedUsers: FC<SearchedUsersProps> = (props) => {
  return (
    <Fragment>
      {props.users.length > 0 && <SectionTitle>Users</SectionTitle>}
      <DispCards
        users={props.users}
        loginUser={props.loginUser}
        onUpdateUsers={props.onUpdateUsers}
      />
    </Fragment>
  );
};

export default SearchedUsers;
