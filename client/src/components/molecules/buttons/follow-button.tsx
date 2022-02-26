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

export const FollowButton: FC<FollowButtonProps> = (props) => {
  const deleteFollowing = () => {
    followingServices.deleteFollowing(props.loginUser.id, props.user.id);
  };

  const createFollowing = () => {
    followingServices
      .createFollowing(props.loginUser.id, props.user.id)
      .then((result) => {
        return result.data.data.createFollowing;
      });
  };

  const followClickHandler = () => {
    // update db
    createFollowing();

    // update state
    props.onFollowClick();
  };

  const followingClickHandler = () => {
    // delete db
    deleteFollowing();

    // update state
    props.onFollowingClick();
  };

  let FollowButton = (
    <Button
      buttonText={'Follow'}
      buttonType={ButtonTypes.FOLLOW}
      onButtonClick={followClickHandler}
    />
  );
  if (props.user.isFollowing) {
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
