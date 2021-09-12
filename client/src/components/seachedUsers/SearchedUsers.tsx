import { FC, Fragment } from 'react';
import User from '../../models/User';
import SectionTitle from '../ui/SectionTitle/SectionTitle';
import DispCards from '../ui/DispCards/DispCards';

type SearchedUsersProps = {
  users: User[];
  loginUser: User;
};

const SearchedUsers: FC<SearchedUsersProps> = (props) => {
  return (
    <Fragment>
      {props.users.length > 0 && <SectionTitle>Users</SectionTitle>}
      <DispCards users={props.users} loginUser={props.loginUser} />
    </Fragment>
  );
};

export default SearchedUsers;
