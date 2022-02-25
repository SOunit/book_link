import { FC, useRef, useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router';
import Buttons from '../../molecules/ui/Buttons/Buttons';
import Button, { ButtonTypes } from '../../molecules/ui/Buttons/Button';
import keys from '../../../util/keys';
import userServices from '../../../services/userServices';
import UserType from '../../../models/User';
import classes from './edit-user-form.module.css';

type UserEditFromProps = {
  user: UserType;
};

const UserEditForm: FC<UserEditFromProps> = (props) => {
  const nameInputRef = useRef<HTMLInputElement>(null);
  const aboutTextAreaRef = useRef<HTMLTextAreaElement>(null);
  const history = useHistory();
  const [image, setImage] = useState<File>();

  const updateUser = async (userData: UserType) => {
    userServices.updateUser(
      userData.id,
      userData.name,
      userData.about,
      userData.imageUrl,
    );
  };

  const submitHandler = async (event: React.SyntheticEvent) => {
    event.preventDefault();

    let imageUrl = props.user.imageUrl;
    if (image) {
      // get aws s3 url to upload
      const uploadConfig = await axios.get('/api/upload');

      // put data to aws s3
      const upload = await axios.put(uploadConfig.data.url, image, {
        headers: {
          'Content-Type': image.type,
        },
      });

      imageUrl = keys.AWS_S3_URL + uploadConfig.data.key;
    }

    const newUser = {
      id: props.user.id,
      name: nameInputRef.current!.value,
      imageUrl: imageUrl,
      about: aboutTextAreaRef.current!.value,
      items: [],
    };

    updateUser(newUser);

    history.push('/home');
  };

  const imageChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    setImage(event.target.files![0]);
  };

  return (
    <form className={classes['user-edit-form']} onSubmit={submitHandler}>
      <label htmlFor="name">Name</label>
      <input
        className={classes['user-edit__input']}
        type="text"
        id="name"
        defaultValue={props.user.name}
        ref={nameInputRef}
      />
      {/* FIXME: change image url to image file */}
      <label htmlFor="imageUrl">Profile Image</label>
      <input
        onChange={(event) => imageChangeHandler(event)}
        className={classes['user-edit__input']}
        type="file"
        id="imageUrl"
        // defaultValue={props.user.imageUrl}
      />
      <label htmlFor="about">About</label>
      <textarea
        className={classes['user-edit__textarea']}
        id="about"
        defaultValue={props.user.about}
        ref={aboutTextAreaRef}
      />
      <Buttons>
        <Button
          buttonText="Update"
          buttonType={ButtonTypes.NORMAL}
          onButtonClick={() => {}}></Button>
      </Buttons>
    </form>
  );
};

export default UserEditForm;
