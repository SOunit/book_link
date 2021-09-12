import { FC, Fragment } from 'react';
import UserType from '../../../models/User';
import DispCard from './DispCard';
import UserCardDetails from './UserCardDetails';

type DispCardsProps = {
  users: UserType[];
  loginUser: UserType;
};

const DispCards: FC<DispCardsProps> = (props) => {
  const dispUsers = props.users.map((user) => {
    return (
      <DispCard
        key={user.id}
        imageUrl={user.imageUrl}
        imageName={`${user.name}_${user.id}`}
      >
        <UserCardDetails user={user} loginUser={props.loginUser} />
      </DispCard>
    );
  });
  return <Fragment>{dispUsers}</Fragment>;
};

export default DispCards;
