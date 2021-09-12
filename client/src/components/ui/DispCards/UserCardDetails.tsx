import { FC, Fragment } from 'react';
import { useHistory } from 'react-router-dom';
import FollowingType from '../../../models/Following';
import User from '../../../models/User';
import Buttons from '../Buttons/Buttons';
import Button, { ButtonTypes } from '../Buttons/Button';
import classes from './UserCardDetails.module.css';
import axios from 'axios';
import keys from '../../../util/keys';

type UserCardDetailsProps = {
  user: FollowingType;
  loginUser: User;
  onUpdateUsers: any;
  followings: FollowingType[];
};

const UserCardDetails: FC<UserCardDetailsProps> = (props) => {
  const history = useHistory();

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

  const detailClickHandler = () => {
    history.push(`/users/${props.user.id}`);
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

  return (
    <Fragment>
      <div className={classes['user-card__name']}>{props.user.name}</div>
      <Buttons>
        <Button
          buttonText={'Detail'}
          buttonType={ButtonTypes.NORMAL}
          onButtonClick={detailClickHandler}
        />
        {twitterButton}
      </Buttons>
    </Fragment>
  );
};

export default UserCardDetails;
