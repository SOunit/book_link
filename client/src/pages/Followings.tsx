import { FC, Fragment, useEffect, useState } from 'react';
import FollowingType from '../models/Following';
import SectionTitle from '../components/ui/SectionTitle/SectionTitle';
import axios from 'axios';
import keys from '../util/keys';
import DispCards from '../components/ui/DispCards/DispCards';
import { useParams } from 'react-router';
import classes from './Followings.module.css';
import useLoginUser from '../hooks/use-login-user';

type FollowingsProps = {};
type FollowingsParams = {
  userId: string;
};

const Followings: FC<FollowingsProps> = (props) => {
  const { loginUser } = useLoginUser();
  const params = useParams<FollowingsParams>();
  const [followings, setFollowings] = useState<FollowingType[]>();

  const fetchFollowings = async (userId: string) => {
    const graphqlQuery = {
      query: `
              query GetFollowingUsers($userId: ID!){
                getFollowingUsers(userId: $userId){
                  id
                  name
                  imageUrl
                  isFollowing
                }
              }
              `,
      variables: {
        userId,
      },
    };

    const result = await axios({
      url: keys.GRAPHQL_REQUEST_URL,
      method: 'POST',
      data: graphqlQuery,
    });

    return result.data.data.getFollowingUsers;
  };

  useEffect(() => {
    const users: FollowingType[] = [];

    fetchFollowings(params.userId).then((res) => {
      res.map((user: any) =>
        users.push({
          id: user.id,
          name: user.name,
          imageUrl: user.imageUrl,
          isFollowing: user.isFollowing,
        })
      );

      setFollowings(users);
    });
  }, [params.userId]);

  let followingUsersSection = null;
  if (followings && followings.length > 0) {
    followingUsersSection = (
      <DispCards
        users={followings}
        loginUser={loginUser!}
        onUpdateUsers={setFollowings}
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
