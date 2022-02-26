import { FC, Fragment } from 'react';
import { User as UserType, Following as FollowingType } from '../../../models';
import { DispCard } from './disp-card';
import { UserCardDetails } from './user-card-details';

type DispCardsProps = {
  users: FollowingType[];
  loginUser: UserType;
  onFollowClick: any;
  onFollowingClick: any;
};

export const DispCards: FC<DispCardsProps> = (props) => {
  const dispUsers = props.users.map((user) => {
    return (
      <DispCard
        key={user.id}
        imageUrl={user.imageUrl}
        imageName={`${user.name}_${user.id}`}>
        <UserCardDetails
          user={user}
          loginUser={props.loginUser}
          onFollowClick={() => props.onFollowClick(user.id)}
          onFollowingClick={() => props.onFollowingClick(user.id)}
        />
      </DispCard>
    );
  });
  return <Fragment>{dispUsers}</Fragment>;
};
