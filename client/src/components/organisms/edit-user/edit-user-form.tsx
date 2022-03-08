import {
  ChangeEvent,
  FC,
  Fragment,
  useState,
  useEffect,
  useContext,
} from 'react';
import { useHistory } from 'react-router';
import { userServices } from '../../../services';
import { User as UserType } from '../../../models';
import { Input, Textarea, Button } from '../../atoms';
import { ImageUpload } from '../../molecules';
import { AuthContext } from '../../../store/';
import classes from './edit-user-form.module.css';
import { Buttons } from '../../molecules';
import { useAwsS3 } from '../../../hooks';

type Props = {};

type EditUserFormInput = {
  name: string;
  about?: string;
};

export const EditUserForm: FC<Props> = () => {
  const history = useHistory();
  const { loginUser: user, setLoginUser } = useContext(AuthContext);
  const [imageFile, setImageFile] = useState<File>();
  const [input, setInput] = useState<EditUserFormInput>();
  const { uploadImageToS3 } = useAwsS3();
  const [isUpdated, setIsUpdate] = useState(false);

  const updateUser = (userData: UserType) => {
    // update db
    userServices.updateUser(
      userData.id,
      userData.name,
      userData.about,
      userData.imageUrl,
    );

    // update state
    setIsUpdate(true);
    setLoginUser((prevState) => ({
      ...prevState!,
      name: userData.name,
      about: userData.about,
      imageUrl: userData.imageUrl,
    }));
  };

  const submitHandler = async (event: React.SyntheticEvent) => {
    event.preventDefault();

    if (!input || !user) {
      return;
    }

    let imageUrl = user.imageUrl;
    if (imageFile) {
      imageUrl = (await uploadImageToS3(imageFile)) || imageUrl;
    }

    const newUser = {
      id: user.id,
      name: input.name,
      imageUrl,
      about: input.about,
    };

    updateUser(newUser);
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

  useEffect(() => {
    // check if updated or not here in useEffect
    // to avoid memory leak of updateState after component unmount
    if (isUpdated) {
      history.push('/home');
    }
  }, [isUpdated, history]);

  return (
    <form className={classes['edit-user-form']} onSubmit={submitHandler}>
      {user && (
        <Fragment>
          <ImageUpload
            imageFile={imageFile}
            setImageFile={setImageFile}
            imageUrl={user.imageUrl}
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
