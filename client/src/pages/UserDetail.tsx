import { Fragment, useEffect, useState, useCallback, useContext } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import UserType from '../models/User';
import Buttons from '../components/ui/Buttons/Buttons';
import Button, { ButtonTypes } from '../components/ui/Buttons/Button';
import UserInfo from '../components/userInfo/UserInfo';
import UserItems from '../components/userItems/UserItems';
import FollowButton from '../components/ui/Buttons/FollowButton';
import userServices from '../services/userServices';
import followingServices from '../services/followingServices';
import ChatServices from '../services/chatServices';
import AuthContext from '../store/auth-context';

type UserDetailParams = {
  userId: string;
};

const UserDetail = () => {
  const { loginUser } = useContext(AuthContext);
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

  const chatClickHandler = () => {
    // get message
    ChatServices.fetchChat([user!.id, loginUser!.id]).then((res) => {
      const chats = res.data.data.getUserChat;

      if (chats && chats.length <= 0) {
        // create message if not exist
        history.push(`/chats/${user!.id}`);
      } else {
        if (loginUser && user) {
          ChatServices.createChat(loginUser?.id, user.id).then((res) => {
            history.push(`/chats/${user!.id}`);
          });
        }
      }
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
            buttonText="Chat"
            buttonType={ButtonTypes.NORMAL}
            onButtonClick={chatClickHandler}
          />
        </Buttons>
        <UserItems items={user.items} />
      </Fragment>
    );
  }

  return <Fragment>{dispUser}</Fragment>;
};

export default UserDetail;
