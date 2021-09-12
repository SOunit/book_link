import { FC, Fragment } from 'react';
import { useHistory } from 'react-router-dom';
import User from '../../../models/User';
import Buttons from '../Buttons/Buttons';
import Button, { ButtonTypes } from '../Buttons/Button';
import classes from './UserCardDetails.module.css';

type UserCardDetailsProps = {
  user: User;
  loginUser: User;
};

const UserCardDetails: FC<UserCardDetailsProps> = (props) => {
  const history = useHistory();

  const detailClickHandler = () => {
    history.push(`/users/${props.user.id}`);
  };

  const followClickHandler = () => {
    console.log('props.user.id', props.user.id);
    console.log('props.loginUser.id', props.loginUser.id);
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
        <Button
          buttonText={'Follow'}
          buttonType={ButtonTypes.TWITTER}
          onButtonClick={followClickHandler}
        />
      </Buttons>
    </Fragment>
  );
};

export default UserCardDetails;
