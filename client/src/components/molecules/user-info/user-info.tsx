import { FC, Fragment } from 'react';
import { Link } from 'react-router-dom';
import useGoogleAuth from '../../../hooks/login/use-google-auth';
import useModal from '../../../hooks/home/use-modal';
import { User as UserType } from '../../../models/user';
import { LogoutModal } from '../../organisms/';
import { Backdrop } from '../backdrop/backdrop';
import { Image } from '../../atoms';
import classes from './user-info.module.css';

type UserInfoProps = {
  user: UserType;
  isHome?: boolean;
  followingsCount?: number;
  followersCount?: number;
};

export const UserInfo: FC<UserInfoProps> = ({
  user,
  isHome = false,
  followingsCount = 9999,
  followersCount = 9999,
}) => {
  const { isModalOpen, modalOpenHandler, modalCloseHandler } = useModal();
  const { signOutClickHandler } = useGoogleAuth();

  let aboutText = 'No comment yet!';
  if (user.about && user.about.length > 0) {
    aboutText = user.about;
  }

  let userImage = (
    <div className={classes['user-info__image--no-data']}>No Image</div>
  );
  if (user.imageUrl && user.imageUrl.length > 0) {
    userImage = (
      <Image
        src={user.imageUrl}
        alt={user.name}
        className={classes['user-info__image']}
        imageStyle={classes['user-info__image']}
      />
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
          <p className={classes['user-info__name']}>{user.name}</p>
          <Link
            className={classes['user-info__link']}
            to={`/users/${user.id}/followings`}>
            <span className={classes['user-info__follow-number']}>
              {followingsCount}
            </span>{' '}
            Following
          </Link>
          <Link
            className={classes['user-info__link']}
            to={`/users/${user.id}/followers`}>
            <span className={classes['user-info__follow-number']}>
              {followersCount}
            </span>{' '}
            Followers
          </Link>
          {isHome && (
            <p
              className={classes['user-info__logout']}
              onClick={modalOpenHandler}>
              Logout
            </p>
          )}
        </div>
      </div>
      <p className={classes['user-about']}>{aboutText}</p>
    </Fragment>
  );
};
