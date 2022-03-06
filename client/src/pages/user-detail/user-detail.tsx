import { Fragment, useEffect, useState, useCallback, useContext } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import {
  Buttons,
  IconTextButton,
  UserInfo,
  UserItems,
} from '../../components/molecules';
import { useFollow } from '../../hooks';
import { User as UserType } from '../../models';
import { ChatServices, followingServices, userServices } from '../../services';
import { AuthContext } from '../../store';
import classes from './user-detail.module.css';

type UserDetailParams = {
  userId: string;
};

export const UserDetail = () => {
  const { loginUser } = useContext(AuthContext);
  const params = useParams<UserDetailParams>();
  const history = useHistory();
  const [partnerUser, setPartnerUser] = useState<UserType>();
  const [following, setFollowing] = useState<boolean | null>(null);
  const { followUser, unFollowUser } = useFollow();

  const fetchPartnerUser = useCallback(() => {
    userServices.fetchUser(params.userId).then((result) => {
      setPartnerUser(result.data.data.user);
    });
  }, [params.userId]);

  const fetchFollowing = useCallback(() => {
    if (loginUser) {
      followingServices
        .fetchFollowing(loginUser.id, params.userId)
        .then((result) => {
          const followingUserId = result.data.data.following.followingUserId;
          if (followingUserId) {
            setFollowing(true);
          } else {
            setFollowing(false);
          }
        });
    }
  }, [loginUser, params.userId]);

  const followClickHandler = () => {
    if (loginUser && partnerUser) {
      followUser(loginUser.id, partnerUser.id);
      setFollowing(true);
    }
  };

  const followingClickHandler = () => {
    if (loginUser && partnerUser) {
      unFollowUser(loginUser.id, partnerUser.id);
      setFollowing(false);
    }
  };

  const chatClickHandler = () => {
    if (!partnerUser) {
      return;
    }

    // get message
    ChatServices.fetchChat([partnerUser.id, loginUser!.id]).then((res) => {
      const chats = res.data.data.getUserChat;

      if (chats && chats.length <= 0) {
        // create message if not exist
        history.push(`/chats/${partnerUser.id}`);
      } else {
        if (loginUser && partnerUser) {
          ChatServices.createChat(loginUser?.id, partnerUser.id).then((res) => {
            history.push(`/chats/${partnerUser.id}`);
          });
        }
      }
    });
  };

  useEffect(() => {
    fetchPartnerUser();
    fetchFollowing();
  }, [fetchPartnerUser, fetchFollowing]);

  let userDetail = null;
  if (partnerUser && loginUser) {
    userDetail = (
      <Fragment>
        <UserInfo user={partnerUser} isHome={false} />
        <Buttons className={classes['user-detail__buttons']}>
          <IconTextButton
            iconName={following ? `fa fa-user-minus` : `fa fa-user-plus`}
            text={following ? 'Following' : 'Follow'}
            onClick={following ? followingClickHandler : followClickHandler}
          />
          <IconTextButton
            iconName="far fa-comment"
            text="Chat"
            onClick={chatClickHandler}
          />
        </Buttons>
        {partnerUser.items && <UserItems items={partnerUser.items} />}
      </Fragment>
    );
  }

  return <Fragment>{userDetail}</Fragment>;
};
