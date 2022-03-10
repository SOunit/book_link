import {
  ChangeEvent,
  FC,
  Fragment,
  SyntheticEvent,
  useContext,
  useState,
} from 'react';
import { useHistory } from 'react-router-dom';
import { Button } from '../../components/atoms';
import {
  ImageUpload,
  SectionTitle,
  ValidateInput,
} from '../../components/molecules';
import { useAwsS3 } from '../../hooks/';
import { itemServices } from '../../services';
import { AuthContext } from '../../store';
import { validate, VALIDATOR_REQUIRE } from '../../util';
import classes from './create-item.module.css';

type Inputs = {
  title: { value: string; isValid: boolean };
  author: { value: string; isValid: boolean };
  isValid: boolean;
};

export const CreateItem: FC = () => {
  const [inputs, setInputs] = useState<Inputs>({
    title: { value: '', isValid: false },
    author: { value: '', isValid: false },
    isValid: false,
  });
  const [imageFile, setImageFile] = useState<File>();
  const history = useHistory();
  const { loginUser, setLoginUser } = useContext(AuthContext);
  const { uploadImageToS3 } = useAwsS3();

  const { title, author } = inputs;

  const changeTitleHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const inputTitle = event.target.value;
    const titleIsValid = validate(inputTitle, [VALIDATOR_REQUIRE()]);
    const formIsValid = true;

    setInputs((prevState) => ({
      ...prevState,
      title: {
        value: inputTitle,
        isValid: titleIsValid,
      },
      isValid: titleIsValid && formIsValid,
    }));
  };
  const changeAuthorHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const inputAuthor = event.target.value;
    setInputs((prevState) => ({
      ...prevState,
      author: {
        value: inputAuthor,
        isValid: validate(inputAuthor, [VALIDATOR_REQUIRE()]),
      },
    }));
  };
  const submitHandler = async (event: SyntheticEvent) => {
    event.preventDefault();

    if (!loginUser || !loginUser.items || !imageFile) {
      return;
    }

    try {
      // upload image
      const imageUrl = (await uploadImageToS3(imageFile)) || '';
      if (!imageUrl) {
        return;
      }

      // update db
      const itemRes = await itemServices.createItem(
        title.value,
        author.value,
        imageUrl,
      );
      const newItem = itemRes.data.data.createItem;
      await itemServices.addUserItem(loginUser.id, newItem.id);

      // update state
      setLoginUser({ ...loginUser, items: [...loginUser.items, newItem] });
    } catch (err) {
      console.log('create-item submit');
      console.log(err);
    }

    history.push('/users/items/edit');
  };

  return (
    <Fragment>
      <SectionTitle>New Item</SectionTitle>
      <form className={classes['create-item__form']} onSubmit={submitHandler}>
        <ValidateInput
          placeholder="Title"
          initialValue={title.value}
          onChange={changeTitleHandler}
          className={classes['create-item__form-input']}
          errorMessage="Please put valid title."
        />
        <ValidateInput
          placeholder="Author"
          initialValue={author.value}
          onChange={changeAuthorHandler}
          className={classes['create-item__form-input']}
          errorMessage="Please put valid Author."
        />
        <ImageUpload setImageFile={setImageFile} imageFile={imageFile} />
        <Button title="Create" />
      </form>
    </Fragment>
  );
};
