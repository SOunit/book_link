import axios from 'axios';
import { Fragment, useEffect, useState, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import UserType from '../models/User';
import Buttons from '../components/ui/Buttons/Buttons';
import Button, { ButtonTypes } from '../components/ui/Buttons/Button';
import UserInfo from '../components/userInfo/UserInfo';
import UserItems from '../components/userItems/UserItems';

type UserDetailParams = {
  userId: string;
};

const UserDetail = () => {
  const params = useParams<UserDetailParams>();
  const [user, setUser] = useState<UserType>();
  const [following, setFollowing] = useState<boolean>(false);

  const fetchUser = useCallback(async () => {
    const graphqlQuery = {
      query: `
            query fetchUser($id: ID!){
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
        id: params.userId,
      },
    };

    const result = await axios({
      url: '/api/graphql',
      method: 'post',
      data: graphqlQuery,
    });
    setUser(result.data.data.user);
  }, [params.userId]);

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  let dispUser = null;
  if (user) {
    dispUser = (
      <Fragment>
        <UserInfo user={user} />
        <Buttons>
          <Button
            buttonText='Follow'
            buttonType={ButtonTypes.FOLLOW}
            onButtonClick={() => {}}
          />
          <Button
            buttonText='Message'
            buttonType={ButtonTypes.NORMAL}
            onButtonClick={() => {}}
          />
        </Buttons>
        <UserItems items={user.items} />
      </Fragment>
    );
  }

  return <Fragment>{dispUser}</Fragment>;
};

export default UserDetail;
