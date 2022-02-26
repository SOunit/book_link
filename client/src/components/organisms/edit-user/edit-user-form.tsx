import { ChangeEvent, FC, useRef, useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router';
import Buttons from '../../molecules/ui/Buttons/Buttons';
import Button, { ButtonTypes } from '../../molecules/ui/Buttons/Button';
import keys from '../../../util/keys';
import userServices from '../../../services/userServices';
import UserType from '../../../models/User';
import { Input, Textarea } from '../../atoms';
import classes from './edit-user-form.module.css';

type UserEditFromProps = {
  user: UserType;
};

type EditUserFormInput = {
  name: string;
  about: string;
};

export const EditUserForm: FC<UserEditFromProps> = ({ user }) => {
  const aboutTextAreaRef = useRef<HTMLTextAreaElement>(null);
  const history = useHistory();
  const [image, setImage] = useState<File>();
  const [input, setInput] = useState<EditUserFormInput>({
    name: user.name,
    about: user.about,
  });

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

    if (!input) {
      return;
    }

    let imageUrl = user.imageUrl;
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
      id: user.id,
      name: input.name,
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

  const changeNameHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setInput((prevState) => ({ ...prevState, name: e.target.value }));
  };

  const changeAboutHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setInput((prevState) => ({ ...prevState, about: e.target.value }));
  };

  return (
    <form className={classes['user-edit-form']} onSubmit={submitHandler}>
      {/* FIXME: change image url to image file */}
      <label htmlFor="imageUrl">Profile Image</label>
      <input
        onChange={(event) => imageChangeHandler(event)}
        className={classes['user-edit__input']}
        type="file"
        id="imageUrl"
        // defaultValue={user.imageUrl}
      />
      <Input
        onChange={changeNameHandler}
        value={input.name}
        placeholder="Name"
        className={classes['user-edit-form__name-input']}
      />
      <Textarea
        onChange={changeAboutHandler}
        placeholder="About"
        value={input.about}
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
