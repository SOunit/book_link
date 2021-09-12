import { FC } from 'react';
import axios from 'axios';
import FollowingType from '../../../models/Following';
import Button, { ButtonTypes } from './Button';
import UserType from '../../../models/User';
import keys from '../../../util/keys';

type TwitterButtonProps = {
  user: FollowingType;
  loginUser: UserType;
  onUpdateUsers: any;
  followings: FollowingType[];
};

const TwitterButton: FC<TwitterButtonProps> = (props) => {
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
    const newFollowings = props.followings.map((following) => {
      if (following.id === props.user.id) {
        following.isFollowing = true;
        return following;
      }
      return following;
    });

    props.onUpdateUsers(newFollowings);
  };

  const followingClickHandler = () => {
    // update state
    const newFollowings = props.followings.map((user) => {
      if (user.id === props.user.id) {
        user.isFollowing = false;
      }
      return user;
    });
    props.onUpdateUsers(newFollowings);

    // delete db
    deleteFollowing();
  };

  let twitterButton = (
    <Button
      buttonText={'Follow'}
      buttonType={ButtonTypes.TWITTER}
      onButtonClick={followClickHandler}
    />
  );
  if (props.user.isFollowing) {
    twitterButton = (
      <Button
        buttonText={'Following'}
        buttonType={ButtonTypes.FOLLOWING}
        onButtonClick={followingClickHandler}
      />
    );
  }

  return twitterButton;
};

export default TwitterButton;
