import { FC, Fragment } from 'react';
import FollowingType from '../../../models/Following';
import UserType from '../../../models/User';
import DispCard from './DispCard';
import UserCardDetails from './UserCardDetails';

type DispCardsProps = {
  users: FollowingType[];
  loginUser: UserType;
  onUpdateUsers: any;
};

const DispCards: FC<DispCardsProps> = (props) => {
  const dispUsers = props.users.map((user) => {
    return (
      <DispCard
        key={user.id}
        imageUrl={user.imageUrl}
        imageName={`${user.name}_${user.id}`}
      >
        <UserCardDetails
          user={user}
          loginUser={props.loginUser}
          onUpdateUsers={props.onUpdateUsers}
          followings={props.users}
        />
      </DispCard>
    );
  });
  return <Fragment>{dispUsers}</Fragment>;
};

export default DispCards;
