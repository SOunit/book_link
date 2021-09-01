import axios from 'axios';
import { Fragment, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import UserType from '../models/User';
import Buttons from '../components/ui/Buttons/Buttons';
import Button, { ButtonTypes } from '../components/ui/Buttons/Button';
import classes from './UserDetail.module.css';

type UserDetailParams = {
  userId: string;
};

const UserDetail = () => {
  const params = useParams<UserDetailParams>();
  const [user, setUser] = useState<UserType>();

  const fetchUser = async () => {
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
  };

  useEffect(() => {
    fetchUser();
  }, []);

  let dispUser = null;
  if (user) {
    let aboutText = 'No comment yet!';
    if (user.about && user.about.length > 0) {
      aboutText = user.about;
    }

    dispUser = (
      <Fragment>
        <div className={classes['user-info']}>
          <div className={classes['image-container']}>
            <img
              className={classes['user-info__image']}
              src={user.imageUrl}
              alt={user.name}
            />
          </div>
          <div className={classes['user-info__details']}>
            <p className={classes['user-info__name']}>{user.name}</p>
          </div>
        </div>
        <p className={classes['user-about']}>{aboutText}</p>
        <Buttons>
          <Button
            buttonText='Follow'
            buttonType={ButtonTypes.TWITTER}
            onButtonClick={() => {}}
          />
          <Button
            buttonText='Message'
            buttonType={ButtonTypes.NORMAL}
            onButtonClick={() => {}}
          />
        </Buttons>
        <div></div>
      </Fragment>
    );
  }

  return <Fragment>{dispUser}</Fragment>;
};

export default UserDetail;
