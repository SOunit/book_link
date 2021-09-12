import axios from 'axios';
import { Fragment, useEffect, useState, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import UserType from '../models/User';
import Buttons from '../components/ui/Buttons/Buttons';
import Button, { ButtonTypes } from '../components/ui/Buttons/Button';
import UserInfo from '../components/userInfo/UserInfo';
import UserItems from '../components/userItems/UserItems';
import useLoginUser from '../hooks/use-login-user';
import FollowButton from '../components/ui/Buttons/FollowButton';

type UserDetailParams = {
  userId: string;
};

const UserDetail = () => {
  const { loginUser } = useLoginUser();
  const params = useParams<UserDetailParams>();
  const [user, setUser] = useState<UserType>();
  const [following, setFollowing] = useState<boolean | null>(null);

  const fetchUser = useCallback(async () => {
    const graphqlQuery = {
      query: `
            query fetchUser($id: ID!){
              user(id: $id){
                id
                name
                about
                imageUrl
                items{
                  id
                  title
                  imageUrl
                }
              }
            }
          `,
      variables: {
        id: params.userId,
      },
    };

    const result = await axios({
      url: '/api/graphql',
      method: 'post',
      data: graphqlQuery,
    });

    setUser(result.data.data.user);
  }, [params.userId]);

  const fetchFollowing = useCallback(async () => {
    if (loginUser) {
      const graphqlQuery = {
        query: `
              query fetchFollowing($userId: ID!, $targetId: ID!){
                following(userId: $userId, targetId: $targetId){
                  userId
                  targetId
                }
              }
            `,
        variables: {
          userId: loginUser.id,
          targetId: params.userId,
        },
      };

      const result = await axios({
        url: '/api/graphql',
        method: 'post',
        data: graphqlQuery,
      });

      const targetId = result.data.data.following.targetId;
      if (targetId) {
        setFollowing(true);
      } else {
        setFollowing(false);
      }
    }
  }, [loginUser, params.userId]);

  useEffect(() => {
    fetchUser();
    fetchFollowing();
  }, [fetchUser, fetchFollowing]);

  const followClickHandler = () => {
    setFollowing(true);
  };

  const followingClickHandler = () => {
    setFollowing(false);
  };

  let followButton = null;
  if (user && loginUser && following !== null) {
    followButton = (
      <FollowButton
        loginUser={loginUser}
        user={{ ...user, isFollowing: following }}
        onFollowClick={followClickHandler}
        onFollowingClick={followingClickHandler}
      />
    );
  }

  let dispUser = null;
  if (user && loginUser) {
    dispUser = (
      <Fragment>
        <UserInfo user={user} />
        <Buttons>
          {followButton}
          <Button
            buttonText='Message'
            buttonType={ButtonTypes.NORMAL}
            onButtonClick={() => {}}
          />
        </Buttons>
        <UserItems items={user.items} />
      </Fragment>
    );
  }

  return <Fragment>{dispUser}</Fragment>;
};

export default UserDetail;
