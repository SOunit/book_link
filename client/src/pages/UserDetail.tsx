import axios from 'axios';
import { Fragment, useEffect } from 'react';
import { useParams } from 'react-router-dom';

type UserDetailParams = {
  userId: string;
};

const UserDetail = () => {
  const params = useParams<UserDetailParams>();

  useEffect(() => {
    const result = axios({});
  }, []);

  return (
    <Fragment>
      user detail
      <p>{params.userId}</p>
    </Fragment>
  );
};

export default UserDetail;
