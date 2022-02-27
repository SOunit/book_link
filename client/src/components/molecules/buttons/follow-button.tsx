import { FC } from 'react';
import { Following as FollowingType, User as UserType } from '../../../models';
import { followingServices } from '../../../services';
import Button, { ButtonTypes } from './button';

type FollowButtonProps = {
  user: FollowingType;
  loginUser: UserType;
  onFollowClick: any;
  onFollowingClick: any;
};

export const FollowButton: FC<FollowButtonProps> = ({
  user,
  loginUser,
  onFollowClick,
  onFollowingClick,
}) => {
  const deleteFollowing = () => {
    followingServices.deleteFollowing(loginUser.id, user.id);
  };

  const createFollowing = () => {
    followingServices.createFollowing(loginUser.id, user.id).then((result) => {
      return result.data.data.createFollowing;
    });
  };

  const followClickHandler = () => {
    // update db
    createFollowing();

    // update state
    onFollowClick();
  };

  const followingClickHandler = () => {
    // delete db
    deleteFollowing();

    // update state
    onFollowingClick();
  };

  let FollowButton = (
    <Button
      buttonText={'Follow'}
      buttonType={ButtonTypes.FOLLOW}
      onButtonClick={followClickHandler}
    />
  );
  if (user.isFollowing) {
    FollowButton = (
      <Button
        buttonText={'Following'}
        buttonType={ButtonTypes.FOLLOWING}
        onButtonClick={followingClickHandler}
      />
    );
  }

  return FollowButton;
};
