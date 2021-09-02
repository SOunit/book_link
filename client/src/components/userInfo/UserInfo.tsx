import { FC, Fragment } from 'react';
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

  return (
    <Fragment>
      <div className={classes['user-info']}>
        <div
          className={`${classes['image-container']} ${classes['user-image-container']}`}
        >
          <img
            className={`${classes['image']} ${classes['user-info__image']}`}
            src={props.user.imageUrl}
            alt={props.user.name}
          />
        </div>
        <div className={classes['user-info__details']}>
          <p className={classes['user-info__name']}>{props.user.name}</p>
        </div>
      </div>
      <p className={classes['user-about']}>{aboutText}</p>
    </Fragment>
  );
};

export default UserInfo;
