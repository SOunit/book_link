import axios from 'axios';
import {
  FC,
  Fragment,
  useEffect,
  useState,
  useContext,
  useCallback,
} from 'react';
import AuthContext from '../store/auth-context';
import UserType from '../models/User';
import UserInfo from '../components/userInfo/UserInfo';
import UserItems from '../components/userItems/UserItems';

type HomeProps = {};

const Home: FC<HomeProps> = (props) => {
  const [user, setUser] = useState<UserType>();
  const authCtx = useContext(AuthContext);

  const fetchUser = useCallback(async () => {
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
        id: authCtx.token,
      },
    };

    const result = await axios({
      url: '/api/graphql',
      method: 'post',
      data: graphqlQuery,
    });

    setUser(result.data.data.user);
  }, [authCtx.token]);

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

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
