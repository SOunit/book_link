import { FC, Fragment } from 'react';
import { Link } from 'react-router-dom';
import useGoogleAuth from '../../../hooks/login/use-google-auth';
import useModal from '../../../hooks/home/use-modal';
import { User as UserType } from '../../../models/user';
import { LogoutModal } from '../../organisms/';
import { Backdrop } from '../backdrop/backdrop';
import classes from './user-info.module.css';

type UserInfoProps = {
  user: UserType;
};

export const UserInfo: FC<UserInfoProps> = (props) => {
  const { isModalOpen, modalOpenHandler, modalCloseHandler } = useModal();
  const { signOutClickHandler } = useGoogleAuth();

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
        className={`${classes['image-container']} ${classes['user-image-container']}`}>
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
      {isModalOpen && <Backdrop onSideMenuToggle={modalCloseHandler} />}
      {isModalOpen && (
        <LogoutModal
          onConfirm={signOutClickHandler}
          onCancel={modalCloseHandler}
          title="Logout"
          text="Do you logout?"
        />
      )}
      <div className={classes['user-info']}>
        {userImage}
        <div className={classes['user-info__details']}>
          <p className={classes['user-info__name']}>{props.user.name}</p>
          <Link
            className={classes['user-info__link']}
            to={`/users/${props.user.id}/followings`}>
            <span className={classes['user-info__follow-number']}>4,321</span>{' '}
            Following
          </Link>
          <Link
            className={classes['user-info__link']}
            to={`/users/${props.user.id}/followed-by`}>
            <span className={classes['user-info__follow-number']}>1,234</span>{' '}
            Followers
          </Link>
          <p
            className={classes['user-info__logout']}
            onClick={modalOpenHandler}>
            Logout
          </p>
        </div>
      </div>
      <p className={classes['user-about']}>{aboutText}</p>
    </Fragment>
  );
};
