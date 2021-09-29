import { Fragment, useEffect, useState, useCallback } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import UserType from '../models/User';
import Buttons from '../components/ui/Buttons/Buttons';
import Button, { ButtonTypes } from '../components/ui/Buttons/Button';
import UserInfo from '../components/userInfo/UserInfo';
import UserItems from '../components/userItems/UserItems';
import useLoginUser from '../hooks/use-login-user';
import FollowButton from '../components/ui/Buttons/FollowButton';
import userServices from '../services/userServices';
import followingServices from '../services/followingServices';
import ChatServices from '../services/chatServices';

type UserDetailParams = {
  userId: string;
};

const UserDetail = () => {
  const { loginUser } = useLoginUser();
  const params = useParams<UserDetailParams>();
  const history = useHistory();
  const [user, setUser] = useState<UserType>();
  const [following, setFollowing] = useState<boolean | null>(null);

  const fetchUser = useCallback(() => {
    userServices.fetchUser(params.userId).then((result) => {
      setUser(result.data.data.user);
    });
  }, [params.userId]);

  const fetchFollowing = useCallback(() => {
    if (loginUser) {
      followingServices
        .fetchFollowing(loginUser.id, params.userId)
        .then((result) => {
          const targetId = result.data.data.following.targetId;
          if (targetId) {
            setFollowing(true);
          } else {
            setFollowing(false);
          }
        });
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

  const messageClickHandler = () => {
    // get message
    ChatServices.fetchChat([user!.id, loginUser!.id]).then((res) => {
      const chats = res.data.data.getUserChat;
      if (chats && chats.length <= 0) {
        // create message if not exist
        console.log('create chat');
        history.push(`/chat/${user!.id}`);
      }
      console.log('chat exist');
      history.push(`/chat/${user!.id}`);
    });
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
            onButtonClick={messageClickHandler}
          />
        </Buttons>
        <UserItems items={user.items} />
      </Fragment>
    );
  }

  return <Fragment>{dispUser}</Fragment>;
};

export default UserDetail;
