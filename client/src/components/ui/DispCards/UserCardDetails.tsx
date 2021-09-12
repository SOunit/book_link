import { FC, Fragment } from 'react';
import { useHistory } from 'react-router-dom';
import FollowingType from '../../../models/Following';
import User from '../../../models/User';
import Buttons from '../Buttons/Buttons';
import Button, { ButtonTypes } from '../Buttons/Button';
import classes from './UserCardDetails.module.css';
import FollowButton from '../Buttons/FollowButton';

type UserCardDetailsProps = {
  user: FollowingType;
  loginUser: User;
  onUpdateUsers: any;
  followings: FollowingType[];
};

const UserCardDetails: FC<UserCardDetailsProps> = (props) => {
  const history = useHistory();

  const detailClickHandler = () => {
    history.push(`/users/${props.user.id}`);
  };

  return (
    <Fragment>
      <div className={classes['user-card__name']}>{props.user.name}</div>
      <Buttons>
        <Button
          buttonText={'Detail'}
          buttonType={ButtonTypes.NORMAL}
          onButtonClick={detailClickHandler}
        />
        <FollowButton
          user={props.user}
          loginUser={props.loginUser}
          onUpdateUsers={props.onUpdateUsers}
          followings={props.followings}
        />
      </Buttons>
    </Fragment>
  );
};

export default UserCardDetails;
