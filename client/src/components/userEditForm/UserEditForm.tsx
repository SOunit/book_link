import { FC, useRef } from 'react';
import classes from './UserEditForm.module.css';
import Buttons from '../ui/Buttons/Buttons';
import Button, { ButtonTypes } from '../ui/Buttons/Button';
import UserType from '../../models/User';
import { useHistory } from 'react-router';
import axios from 'axios';
import keys from '../../util/keys';

type UserEditFromProps = {
  user: UserType;
};

const UserEditForm: FC<UserEditFromProps> = (props) => {
  const nameInputRef = useRef<HTMLInputElement>(null);
  const imageUrlInputRef = useRef<HTMLInputElement>(null);
  const aboutTextAreaRef = useRef<HTMLTextAreaElement>(null);
  const history = useHistory();

  const updateUser = async (userData: UserType) => {
    // update user
    const graphqlQuery = {
      query: `
              mutation UpdateUser($id: ID!, $name: String!, $about: String!, $imageUrl: String!){
                updateUser(data: {
                  id: $id
                  name: $name
                  about: $about
                  imageUrl: $imageUrl
                }){
                  id
                }
              }
            `,
      variables: {
        id: userData.id,
        name: userData.name,
        about: userData.about,
        imageUrl: userData.imageUrl,
      },
    };

    await axios({
      url: keys.GRAPHQL_REQUEST_URL,
      method: 'POST',
      data: graphqlQuery,
    });
  };

  const submitHandler = (event: React.SyntheticEvent) => {
    event.preventDefault();

    const newUser = {
      id: props.user.id,
      name: nameInputRef.current!.value,
      imageUrl: imageUrlInputRef.current!.value,
      about: aboutTextAreaRef.current!.value,
      items: [],
    };

    updateUser(newUser);

    history.push('/home');
  };

  return (
    <form className={classes['user-edit-form']} onSubmit={submitHandler}>
      <label htmlFor='name'>Name</label>
      <input
        className={classes['user-edit__input']}
        type='text'
        id='name'
        defaultValue={props.user.name}
        ref={nameInputRef}
      />
      {/* FIXME: change image url to image file */}
      <label htmlFor='imageUrl'>Profile Image Url</label>
      <input
        className={classes['user-edit__input']}
        type='text'
        id='imageUrl'
        defaultValue={props.user.imageUrl}
        ref={imageUrlInputRef}
      />
      <label htmlFor='about'>About</label>
      <textarea
        className={classes['user-edit__textarea']}
        id='about'
        defaultValue={props.user.about}
        ref={aboutTextAreaRef}
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
