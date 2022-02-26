import { FC, Fragment } from 'react';
import { useHistory } from 'react-router-dom';
import { Following as FollowingType } from '../../../models';
import { User } from '../../../models';
import { Buttons } from '../buttons/buttons';
import Button, { ButtonTypes } from '../buttons/button';
import classes from './user-card-details.module.css';
import { FollowButton } from '../buttons/follow-button';

type UserCardDetailsProps = {
  user: FollowingType;
  loginUser: User;
  onFollowClick: any;
  onFollowingClick: any;
};

export const UserCardDetails: FC<UserCardDetailsProps> = (props) => {
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
          onFollowClick={props.onFollowClick}
          onFollowingClick={props.onFollowingClick}
        />
      </Buttons>
    </Fragment>
  );
};
