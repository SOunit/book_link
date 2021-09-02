import axios from 'axios';
import { FC, Fragment, useEffect, useState } from 'react';
import UserType from '../models/User';
import UserInfo from '../components/userInfo/UserInfo';
import UserItems from '../components/userItems/UserItems';

type HomeProps = {};

const Home: FC<HomeProps> = (props) => {
  const [user, setUser] = useState<UserType>();

  const fetchUser = async () => {
    const graphqlQuery = {
      query: `
              query FetchUser($id: ID!){
                user(id: $id){
                  id
                  name
                  about
                  imageUrl
                  items{
                    id
                    title
                    imageUrl
                  }
                }
              }

            `,
      variables: {
        id: '1',
      },
    };

    const result = await axios({
      url: '/api/graphql',
      method: 'post',
      data: graphqlQuery,
    });

    setUser(result.data.data.user);
  };

  useEffect(() => {
    fetchUser();
  }, []);

  let userInfo = null;
  let userItems = null;
  if (user) {
    userInfo = <UserInfo user={user} />;
    userItems = <UserItems items={user.items} />;
  }

  return (
    <Fragment>
      {userInfo}
      {userItems}
    </Fragment>
  );
};

export default Home;
