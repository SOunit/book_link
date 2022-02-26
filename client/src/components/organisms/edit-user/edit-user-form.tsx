import { ChangeEvent, FC, Fragment, useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router';
import Buttons from '../../molecules/ui/Buttons/Buttons';
import keys from '../../../util/keys';
import userServices from '../../../services/userServices';
import UserType from '../../../models/User';
import { Input, Textarea } from '../../atoms';
import classes from './edit-user-form.module.css';
import { EditProfImage } from './edit-prof-image';
import Button from '../../atoms/button';
import { useContext } from 'react';
import AuthContext from '../../../store/auth-context';
import { useEffect } from 'react';

type Props = {};

type EditUserFormInput = {
  name: string;
  about: string;
};

export const EditUserForm: FC<Props> = () => {
  const history = useHistory();
  const { loginUser: user } = useContext(AuthContext);
  const [image, setImage] = useState<File>();
  const [input, setInput] = useState<EditUserFormInput>();

  const updateUser = async (userData: UserType) => {
    await userServices.updateUser(
      userData.id,
      userData.name,
      userData.about,
      userData.imageUrl,
    );
  };

  const submitHandler = async (event: React.SyntheticEvent) => {
    event.preventDefault();

    if (!input || !user) {
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
      about: input.about,
    };

    await updateUser(newUser);

    history.push('/home');
  };

  const changeNameHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setInput((prevState) => ({
      ...prevState!,
      name: e.target.value,
    }));
  };

  const changeAboutHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setInput((prevState) => ({ ...prevState!, about: e.target.value }));
  };

  useEffect(() => {
    if (user) {
      setInput({ name: user.name, about: user.about });
    }
  }, [user]);

  return (
    <form className={classes['edit-user-form']} onSubmit={submitHandler}>
      {user && (
        <Fragment>
          <EditProfImage
            image={image}
            setImage={setImage}
            userImageUrl={user.imageUrl}
          />
          <Input
            onChange={changeNameHandler}
            value={input && input.name}
            placeholder="Name"
            className={classes['edit-user-form__name-input']}
          />
          <Textarea
            onChange={changeAboutHandler}
            placeholder="About"
            value={input && input.about}
          />
          <Buttons>
            <Button
              title="Save"
              className={classes['edit-user-form__button']}
            />
          </Buttons>
        </Fragment>
      )}
    </form>
  );
};
