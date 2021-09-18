import { FC } from 'react';
import FollowingType from '../../../models/Following';
import Button, { ButtonTypes } from './Button';
import UserType from '../../../models/User';
import services from '../../../services/services';

type FollowButtonProps = {
  user: FollowingType;
  loginUser: UserType;
  onFollowClick: any;
  onFollowingClick: any;
};

const FollowButton: FC<FollowButtonProps> = (props) => {
  const deleteFollowing = () => {
    services.deleteFollowing(props.loginUser.id, props.user.id);
  };

  const createFollowing = () => {
    services
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

export default FollowButton;
