import axios from 'axios';
import {
  FC,
  Fragment,
  useEffect,
  useState,
  useContext,
  useCallback,
} from 'react';
import { useHistory } from 'react-router';
import AuthContext from '../store/auth-context';
import UserType from '../models/User';
import UserInfo from '../components/userInfo/UserInfo';
import UserItems from '../components/userItems/UserItems';
import Buttons from '../components/ui/Buttons/Buttons';
import Button, { ButtonTypes } from '../components/ui/Buttons/Button';

type HomeProps = {};

const Home: FC<HomeProps> = (props) => {
  // FIXME: refactor to custom hook
  const [user, setUser] = useState<UserType>();
  const authCtx = useContext(AuthContext);
  const history = useHistory();

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

  const editProfileClickHandler = () => {
    history.push(`/users/edit`);
  };

  let userInfo = null;
  let userItems = null;
  if (user) {
    userInfo = <UserInfo user={user} />;
    userItems = <UserItems items={user.items} />;
  }

  return (
    <Fragment>
      {userInfo}
      <Buttons>
        <Button
          buttonText='Edit Profile'
          buttonType={ButtonTypes.NORMAL}
          onButtonClick={editProfileClickHandler}
        ></Button>
        <Button
          buttonText='Edit Items'
          buttonType={ButtonTypes.NORMAL}
          onButtonClick={() => {}}
        ></Button>
      </Buttons>
      {userItems}
    </Fragment>
  );
};

export default Home;
