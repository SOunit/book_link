import { FC, Fragment } from 'react';
import User from '../../models/User';
import DispCard from '../ui/DispCard/DispCard';
import UserCardDetails from '../ui/DispCard/UserCardDetails';

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
        <UserCardDetails />
      </DispCard>
    );
  });

  return <Fragment>{dispUsers}</Fragment>;
};

export default SearchedUsers;
