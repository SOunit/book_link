import { FC } from 'react';
import { Link } from 'react-router-dom';
import classes from './follow-header.module.scss';

type Props = {
  userId: string;
};

export const FollowHeader: FC<Props> = ({ userId }) => {
  return (
    <div className={classes['follow-header']}>
      <Link
        to={`/users/${userId}/followers`}
        className={classes['follow-header__title']}>
        Followers
      </Link>
      <Link
        to={`/users/${userId}/followings`}
        className={classes['follow-header__title']}>
        Following
      </Link>
    </div>
  );
};
