import { FC, Fragment, useEffect, useState } from 'react';
import UserType from '../models/User';
import SectionTitle from '../components/ui/SectionTitle/SectionTitle';
import axios from 'axios';
import keys from '../util/keys';
import DispCards from '../components/ui/DispCards/DispCards';
import { useParams } from 'react-router';
import classes from './Followings.module.css';

type FollowingsProps = {};
type FollowingsParams = {
  userId: string;
};

const Followings: FC<FollowingsProps> = (props) => {
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

  let searchedUsersSection = null;
  if (followings && followings.length > 0) {
    searchedUsersSection = <DispCards users={followings} />;
  } else {
    searchedUsersSection = (
      <p className={classes['text-no-following']}>You are following nobody!</p>
    );
  }

  return (
    <Fragment>
      <SectionTitle>Followings</SectionTitle>
      {searchedUsersSection}
    </Fragment>
  );
};
export default Followings;
