import { FC, Fragment } from 'react';
import { Link } from 'react-router-dom';
import UserType from '../../models/User';
import classes from './UserInfo.module.css';

type UserInfoProps = {
  user: UserType;
};

const UserInfo: FC<UserInfoProps> = (props) => {
  let aboutText = 'No comment yet!';
  if (props.user.about && props.user.about.length > 0) {
    aboutText = props.user.about;
  }
  let userImage = (
    <div className={classes['user-info__image--no-data']}>No Image</div>
  );
  if (props.user.imageUrl && props.user.imageUrl.length > 0) {
    userImage = (
      <div
        className={`${classes['image-container']} ${classes['user-image-container']}`}
      >
        <img
          className={`${classes['image']} ${classes['user-info__image']}`}
          src={props.user.imageUrl}
          alt={props.user.name}
        />
      </div>
    );
  }

  return (
    <Fragment>
      <div className={classes['user-info']}>
        {userImage}
        <div className={classes['user-info__details']}>
          <p className={classes['user-info__name']}>{props.user.name}</p>
          <Link
            className={classes['user-info__link']}
            to='/users/followings'
          >{`Followings >`}</Link>
          <Link
            className={classes['user-info__link']}
            to='/users/followings'
          >{`Followed by >`}</Link>
        </div>
      </div>
      <p className={classes['user-about']}>{aboutText}</p>
    </Fragment>
  );
};

export default UserInfo;
