import { Fragment, useEffect, useState, useContext, FC } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import {
  Buttons,
  IconTextButton,
  Spinner,
  UserInfo,
  UserItems,
} from '../../components/molecules';
import { User as UserType } from '../../../domain/models';
import {
  ChatServices,
  useFollowStorage,
  userServices,
} from '../../../services';
import { AuthContext } from '../../../services/store';
import {
  useInitFollow,
  useFollowInUserDetail,
  useUnFollowInUserDetail,
} from '../../../application';
import classes from './user-detail.module.css';

type UserDetailParams = {
  userId: string;
};

type Props = {};

export const UserDetail: FC<Props> = () => {
  const { loginUser } = useContext(AuthContext);
  const params = useParams<UserDetailParams>();
  const history = useHistory();
  const [targetUser, setTargetUser] = useState<UserType>();
  const [isFollowing, setIsFollowing] = useState<boolean | null>(null);
  const { initIsLoaded, initFollow } = useInitFollow();
  const { followings, followers, isFollowersLoaded, isFollowingsLoaded } =
    useFollowStorage();
  const { followInUserDetail } = useFollowInUserDetail();
  const { unFollowInUserDetail } = useUnFollowInUserDetail();

  const followClickHandler = () => {
    if (loginUser && targetUser) {
      setIsFollowing(true);
      followInUserDetail(loginUser, targetUser);
    }
  };

  const followingClickHandler = () => {
    if (loginUser && targetUser) {
      setIsFollowing(false);
      unFollowInUserDetail(loginUser, targetUser);
    }
  };

  const chatClickHandler = () => {
    if (!targetUser) {
      return;
    }

    // get message
    ChatServices.fetchChat([targetUser.id, loginUser!.id]).then((res) => {
      const chats = res.data.data.getUserChat;

      if (chats && chats.length <= 0) {
        // create message if not exist
        history.push(`/chats/${targetUser.id}`);
      } else {
        if (loginUser && targetUser) {
          ChatServices.createChat(loginUser?.id, targetUser.id).then((res) => {
            history.push(`/chats/${targetUser.id}`);
          });
        }
      }
    });
  };

  useEffect(() => {
    initIsLoaded();
  }, [initIsLoaded]);

  useEffect(() => {
    if (targetUser && loginUser) {
      initFollow(targetUser.id, loginUser.id);
    }
  }, [
    targetUser,
    loginUser,
    initFollow,
    isFollowersLoaded,
    isFollowingsLoaded,
  ]);

  useEffect(() => {
    const fetchTargetUser = () => {
      userServices.fetchUser(params.userId).then((result) => {
        setTargetUser(result.data.data.user);
      });
    };

    const setFollowingState = () => {
      if (loginUser) {
        const isFollowing = followers.some((user) => user.id === loginUser.id);
        setIsFollowing(isFollowing);
      }
    };

    fetchTargetUser();
    setFollowingState();
  }, [loginUser, followers, params.userId]);

  useEffect(() => {
    if (loginUser && loginUser.id === params.userId) {
      history.push('/home');
    }
  }, [loginUser, params.userId, history]);

  let userDetail = null;
  if (targetUser && loginUser) {
    userDetail = (
      <Fragment>
        {followings && followers ? (
          <UserInfo
            user={targetUser}
            isHome={false}
            followingsCount={followings.length}
            followersCount={followers.length}
          />
        ) : (
          <Spinner />
        )}
        <Buttons className={classes['user-detail__buttons']}>
          <IconTextButton
            iconName={isFollowing ? `fa fa-user-minus` : `fa fa-user-plus`}
            text={isFollowing ? 'Following' : 'Follow'}
            onClick={isFollowing ? followingClickHandler : followClickHandler}
            className={classes['user-detail__button']}
          />
          <IconTextButton
            iconName="far fa-comment"
            text="Chat"
            onClick={chatClickHandler}
            className={classes['user-detail__button']}
          />
        </Buttons>
        {targetUser.items && <UserItems items={targetUser.items} />}
      </Fragment>
    );
  }

  return <Fragment>{userDetail}</Fragment>;
};
