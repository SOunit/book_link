import { FC, Fragment, useEffect, useState } from 'react';
import UserType from '../models/User';
import SectionTitle from '../components/ui/SectionTitle/SectionTitle';
import useUser from '../hooks/use-user';
import axios from 'axios';
import keys from '../util/keys';
import DispCards from '../components/ui/DispCards/DispCards';

type FollowingsProps = {};

const Followings: FC<FollowingsProps> = (props) => {
  const { user } = useUser();
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
    if (user) {
      const users: UserType[] = [];

      fetchFollowings(user.id).then((res) => {
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
    }
  }, [user]);

  let searchedUsersSection = null;
  if (followings && followings.length > 0) {
    searchedUsersSection = <DispCards users={followings} />;
  }

  return (
    <Fragment>
      <SectionTitle>Followings</SectionTitle>
      {searchedUsersSection}
    </Fragment>
  );
};
export default Followings;
