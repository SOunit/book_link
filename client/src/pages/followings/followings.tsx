import { FC, Fragment, useContext, useEffect, useState } from 'react';
import { Following as FollowingType } from '../../models';
import { useParams } from 'react-router';
import { useHistory } from 'react-router-dom';
import { followingServices } from '../../services';
import {
  Buttons,
  NotFoundMessage,
  SectionTitle,
  UserCard,
} from '../../components/molecules';
import { IconButton } from '../../components/atoms';
import classes from './followings.module.css';
import { AuthContext } from '../../store';

type FollowingsProps = {};
type FollowingsParams = {
  userId: string;
};

export const Followings: FC<FollowingsProps> = () => {
  const params = useParams<FollowingsParams>();
  const [followings, setFollowings] = useState<FollowingType[]>();
  const history = useHistory();
  const { loginUser } = useContext(AuthContext);

  const fetchFollowings = async (userId: string) => {
    const result = await followingServices.fetchFollowingUsers(userId);
    return result.data.data.getFollowingUsers;
  };

  const followClickHandler = (targetUserId: string) => {
    if (followings && loginUser) {
      // update state
      const newFollowings = followings.map((user) => {
        if (user.id === targetUserId) {
          user.isFollowing = true;
        }
        return user;
      });
      setFollowings(newFollowings);

      // update db
      followingServices.createFollowing(loginUser.id, targetUserId);
    }
  };

  const followingClickHandler = (targetUserId: string) => {
    if (followings && loginUser) {
      // update state
      const newFollowings = followings.map((user) => {
        if (user.id === targetUserId) {
          user.isFollowing = false;
        }
        return user;
      });
      setFollowings(newFollowings);

      // update db
      followingServices.deleteFollowing(loginUser.id, targetUserId);
    }
  };

  const detailClickHandler = (userId: string) => {
    history.push(`/users/${userId}`);
  };

  useEffect(() => {
    const users: FollowingType[] = [];

    fetchFollowings(params.userId).then((res: any) => {
      res.map((user: any) =>
        users.push({
          id: user.id,
          name: user.name,
          imageUrl: user.imageUrl,
          isFollowing: user.isFollowing,
        }),
      );

      setFollowings(users);
    });
  }, [params.userId]);

  let followingUsers = null;
  if (followings) {
    followingUsers = followings.map((user) => {
      const buttons = (
        <Buttons>
          <IconButton
            iconName="fas fa-info"
            onClick={() => detailClickHandler(user.id)}
            className={classes['followings__info-icon']}
          />
          {loginUser && loginUser.id === params.userId && (
            <IconButton
              iconName={
                user.isFollowing ? 'fa fa-user-minus' : 'fa fa-user-plus'
              }
              onClick={
                user.isFollowing
                  ? () => followingClickHandler(user.id)
                  : () => followClickHandler(user.id)
              }
            />
          )}
        </Buttons>
      );
      return (
        <UserCard
          user={user}
          actions={buttons}
          key={user.id}
          imageClassName={classes['followings__image']}
        />
      );
    });
  }

  return (
    <Fragment>
      <SectionTitle>Followings</SectionTitle>
      {followings && followings.length > 0 && followingUsers}
      {followings && followings.length <= 0 && (
        <NotFoundMessage title="" text="You are following nobody!" />
      )}
    </Fragment>
  );
};
