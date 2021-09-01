import { Fragment } from 'react';
import { useParams } from 'react-router-dom';

type UserDetailParams = {
  userId: string;
};

const UserDetail = () => {
  const params = useParams<UserDetailParams>();
  return (
    <Fragment>
      user detail
      <p>{params.userId}</p>
    </Fragment>
  );
};

export default UserDetail;
