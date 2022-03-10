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
import { Textarea, Button } from '../../atoms';
import { ImageUpload, Buttons, ValidateInput } from '../../molecules';
import { AuthContext } from '../../../store/';
import { useAwsS3 } from '../../../hooks';
import { validate, VALIDATOR_REQUIRE } from '../../../util';
import classes from './edit-user-form.module.css';

type Props = {};

type EditUserFormInput = {
  name: { value: string; isValid: boolean };
  about?: { value: string; isValid: boolean };
  isValid: boolean;
};

export const EditUserForm: FC<Props> = () => {
  const history = useHistory();
  const { loginUser: user, setLoginUser } = useContext(AuthContext);
  const [imageFile, setImageFile] = useState<File>();
  const [formInputs, setFormInputs] = useState<EditUserFormInput>();
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

    if (!formInputs || !user) {
      return;
    }

    let imageUrl = user.imageUrl;
    if (imageFile) {
      imageUrl = (await uploadImageToS3(imageFile)) || imageUrl;
    }

    const newUser = {
      id: user.id,
      name: formInputs.name.value,
      imageUrl,
      about: formInputs.about ? formInputs.about.value : '',
    };

    updateUser(newUser);
  };

  const updateFormInputs = (value: string, isValid: boolean) => {
    let formIsValid = true;

    formIsValid = formIsValid && isValid;

    setFormInputs((prevState) => ({
      ...prevState!,
      name: {
        value,
        isValid,
      },
      isValid: formIsValid,
    }));
  };

  const changeNameHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const nameValue = e.target.value;
    const nameIsValid = validate(nameValue, [VALIDATOR_REQUIRE()]);

    updateFormInputs(nameValue, nameIsValid);
  };

  const changeAboutHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const aboutValue = e.target.value;
    const aboutIsValid = validate(aboutValue, [VALIDATOR_REQUIRE()]);

    updateFormInputs(aboutValue, aboutIsValid);
  };

  useEffect(() => {
    if (user) {
      const { name, about } = user;

      setFormInputs({
        name: { value: name, isValid: true },
        about: { value: about ? about : '', isValid: true },
        isValid: true,
      });
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
      {user && formInputs && (
        <Fragment>
          <ImageUpload
            imageFile={imageFile}
            setImageFile={setImageFile}
            imageUrl={user.imageUrl}
          />
          <ValidateInput
            onChange={changeNameHandler}
            initialValue={formInputs && formInputs.name.value}
            placeholder="Name"
            className={classes['edit-user-form__name-input']}
            errorMessage="Please input valid name."
          />
          <Textarea
            onChange={changeAboutHandler}
            placeholder="About"
            value={formInputs && formInputs.about && formInputs.about.value}
          />
          <Buttons>
            <Button
              title="Save"
              className={classes['edit-user-form__button']}
              disabled={!formInputs?.isValid}
            />
          </Buttons>
        </Fragment>
      )}
    </form>
  );
};
