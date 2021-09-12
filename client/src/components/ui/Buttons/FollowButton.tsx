import { FC } from 'react';
import axios from 'axios';
import FollowingType from '../../../models/Following';
import Button, { ButtonTypes } from './Button';
import UserType from '../../../models/User';
import keys from '../../../util/keys';

type FollowButtonProps = {
  user: FollowingType;
  loginUser: UserType;
  onFollowClick: any;
  onFollowingClick: any;
};

const FollowButton: FC<FollowButtonProps> = (props) => {
  const deleteFollowing = async () => {
    const graphqlQuery = {
      query: `
                  mutation DeleteFollowing($userId: ID!, $targetId: ID!){
                    deleteFollowing(userId: $userId, targetId: $targetId)
                  }
                  `,
      variables: {
        userId: props.loginUser.id,
        targetId: props.user.id,
      },
    };

    await axios({
      url: keys.GRAPHQL_REQUEST_URL,
      method: 'POST',
      data: graphqlQuery,
    });
  };

  const createFollowing = async () => {
    const graphqlQuery = {
      query: `
                  mutation CreateFollowing($userId: ID!, $targetId: ID!){
                    createFollowing(userId: $userId, targetId: $targetId)
                  }
                  `,
      variables: {
        userId: props.loginUser.id,
        targetId: props.user.id,
      },
    };

    const result = await axios({
      url: keys.GRAPHQL_REQUEST_URL,
      method: 'POST',
      data: graphqlQuery,
    });

    return result.data.data.createFollowing;
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
