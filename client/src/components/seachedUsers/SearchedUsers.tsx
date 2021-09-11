import { FC, Fragment } from 'react';
import User from '../../models/User';
import DispCard from '../ui/DispCard/DispCard';
import UserCardDetails from '../ui/DispCard/UserCardDetails';
import SectionTitle from '../ui/SectionTitle/SectionTitle';

type SearchedUsersProps = {
  users: User[];
};

const SearchedUsers: FC<SearchedUsersProps> = (props) => {
  const dispUsers = props.users.map((user) => {
    return (
      <DispCard
        key={user.id}
        imageUrl={user.imageUrl}
        imageName={`${user.name}_${user.id}`}
      >
        <UserCardDetails user={user} />
      </DispCard>
    );
  });

  return (
    <Fragment>
      {dispUsers.length > 0 && <SectionTitle>Users</SectionTitle>}
      {dispUsers}
    </Fragment>
  );
};

export default SearchedUsers;
