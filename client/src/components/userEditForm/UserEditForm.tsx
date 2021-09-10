import { FC } from 'react';
import classes from './UserEditForm.module.css';
import Buttons from '../ui/Buttons/Buttons';
import Button, { ButtonTypes } from '../ui/Buttons/Button';
import UserType from '../../models/User';

type UserEditFromProps = {
  user: UserType;
};

const UserEditForm: FC<UserEditFromProps> = (props) => {
  const submitHandler = (event: React.SyntheticEvent) => {
    event.preventDefault();
    console.log('submit!');
  };

  return (
    <form className={classes['user-edit-form']} onSubmit={submitHandler}>
      <label htmlFor='name'>Name</label>
      <input
        className={classes['user-edit__input']}
        type='text'
        id='name'
        defaultValue={props.user.name}
      />
      {/* FIXME: change image url to image file */}
      <label htmlFor='imageUrl'>Profile Image Url</label>
      <input
        className={classes['user-edit__input']}
        type='text'
        id='imageUrl'
        defaultValue={props.user.imageUrl}
      />
      <label htmlFor='about'>About</label>
      <textarea
        className={classes['user-edit__textarea']}
        id='about'
        defaultValue={props.user.about}
      />
      <Buttons>
        <Button
          buttonText='Update'
          buttonType={ButtonTypes.NORMAL}
          onButtonClick={() => {}}
        ></Button>
      </Buttons>
    </form>
  );
};

export default UserEditForm;
