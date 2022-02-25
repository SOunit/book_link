import { FC, Fragment, useContext, useEffect, useState } from 'react';
import FollowingType from '../models/Following';
import SectionTitle from '../components/molecules/ui/SectionTitle/SectionTitle';
import DispCards from '../components/molecules/ui/DispCards/DispCards';
import { useParams } from 'react-router';
import classes from './Followings.module.css';
import followingServices from '../services/followingServices';
import AuthContext from '../store/auth-context';

type FollowingsProps = {};
type FollowingsParams = {
  userId: string;
};

const Followings: FC<FollowingsProps> = (props) => {
  const { loginUser } = useContext(AuthContext);
  const params = useParams<FollowingsParams>();
  const [followings, setFollowings] = useState<FollowingType[]>();

  const fetchFollowings = async (userId: string) => {
    const result = await followingServices.fetchFollowingUsers(userId);
    return result.data.data.getFollowingUsers;
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

  const followClickHandler = (targetUserId: string) => {
    // update state
    if (followings) {
      const newFollowings = followings.map((user) => {
        if (user.id === targetUserId) {
          user.isFollowing = true;
        }
        return user;
      });

      setFollowings(newFollowings);
    }
  };

  const followingClickHandler = (targetUserId: string) => {
    // update state
    if (followings) {
      const newFollowings = followings.map((user) => {
        if (user.id === targetUserId) {
          user.isFollowing = false;
        }
        return user;
      });
      setFollowings(newFollowings);
    }
  };

  let followingUsersSection = null;
  if (followings && followings.length > 0) {
    followingUsersSection = (
      <DispCards
        users={followings}
        loginUser={loginUser!}
        onFollowClick={followClickHandler}
        onFollowingClick={followingClickHandler}
      />
    );
  } else {
    followingUsersSection = (
      <p className={classes['text-no-following']}>You are following nobody!</p>
    );
  }

  return (
    <Fragment>
      <SectionTitle>Followings</SectionTitle>
      {followingUsersSection}
    </Fragment>
  );
};
export default Followings;
