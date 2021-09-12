import { FC, Fragment, useEffect, useState } from 'react';
import UserType from '../models/User';
import SectionTitle from '../components/ui/SectionTitle/SectionTitle';
import axios from 'axios';
import keys from '../util/keys';
import DispCards from '../components/ui/DispCards/DispCards';
import { useParams } from 'react-router';
import classes from './Followings.module.css';
import useUser from '../hooks/use-user';

type FollowingsProps = {};
type FollowingsParams = {
  userId: string;
};

const Followings: FC<FollowingsProps> = (props) => {
  const { user } = useUser();
  const params = useParams<FollowingsParams>();
  const [followings, setFollowings] = useState<UserType[]>();

  const fetchFollowings = async (userId: string) => {
    const graphqlQuery = {
      query: `
              query GetFollowings($userId: ID!){
                getFollowings(userId: $userId){
                  id
                  name
                  imageUrl
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

    return result.data.data.getFollowings;
  };

  useEffect(() => {
    const users: UserType[] = [];

    fetchFollowings(params.userId).then((res) => {
      res.map((user: any) =>
        users.push({
          id: user.id,
          name: user.name,
          imageUrl: user.imageUrl,
          about: '',
          items: [],
        })
      );

      setFollowings(users);
    });
  }, [params.userId]);

  let followingUsersSection = null;
  if (followings && followings.length > 0) {
    followingUsersSection = <DispCards users={followings} loginUser={user!} />;
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
