import { FC, Fragment, useContext, useEffect, useState } from 'react';
import { Following as FollowingType } from '../../models';
import { useParams } from 'react-router';
import { useHistory } from 'react-router-dom';
import { followServices } from '../../services';
import {
  Buttons,
  NotFoundMessage,
  SectionTitle,
  UserCard,
} from '../../components/molecules';
import { IconButton } from '../../components/atoms';
import classes from './followers.module.css';
import { AuthContext } from '../../store';
import { useFollow } from '../../hooks';

type FollowersProps = {};
type FollowersParams = {
  userId: string;
};

export const Followers: FC<FollowersProps> = () => {
  const params = useParams<FollowersParams>();
  const [followers, setFollowers] = useState<FollowingType[]>();
  const history = useHistory();
  const { loginUser } = useContext(AuthContext);
  const { followUser, unFollowUser } = useFollow();

  const followClickHandler = (targetUserId: string) => {
    if (followers && loginUser) {
      // update state
      const newFollowers = followers.map((user) => {
        if (user.id === targetUserId) {
          user.isFollowing = true;
        }
        return user;
      });
      setFollowers(newFollowers);

      // update db
      followUser(loginUser.id, targetUserId);
    }
  };

  const followingClickHandler = (targetUserId: string) => {
    if (followers && loginUser) {
      // update state
      const newFollowers = followers.map((user) => {
        if (user.id === targetUserId) {
          user.isFollowing = false;
        }
        return user;
      });
      setFollowers(newFollowers);

      // update db
      unFollowUser(loginUser.id, targetUserId);
    }
  };

  const detailClickHandler = (userId: string) => {
    history.push(`/users/${userId}`);
  };

  useEffect(() => {
    const fetchFollowers = async (userId: string) => {
      const result = await followServices.fetchFollowerUsers(userId);
      return result.data.data.getFollowerUsers;
    };

    const users: FollowingType[] = [];

    fetchFollowers(params.userId).then((res: any) => {
      res.map((user: any) =>
        users.push({
          id: user.id,
          name: user.name,
          imageUrl: user.imageUrl,
          isFollowing: user.isFollowing,
        }),
      );

      setFollowers(users);
    });
  }, [params.userId]);

  let followingUsers = null;
  if (followers) {
    followingUsers = followers.map((user) => {
      const buttons = (
        <Buttons>
          <IconButton
            iconName="fas fa-info"
            onClick={() => detailClickHandler(user.id)}
            className={classes['followers__info-icon']}
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
          imageClassName={classes['followers__image']}
        />
      );
    });
  }

  return (
    <Fragment>
      <SectionTitle>Followers</SectionTitle>
      {followers && followers.length > 0 && followingUsers}
      {followers && followers.length <= 0 && (
        <NotFoundMessage title="" text="You are following nobody!" />
      )}
    </Fragment>
  );
};
