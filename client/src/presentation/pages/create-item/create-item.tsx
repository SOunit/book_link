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
import { useItemAdapter, useImageStorage } from '../../../services';
import { AuthContext } from '../../../services/store';
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
  const { loginUser, updateLoginUser } = useContext(AuthContext);
  const imageStorage = useImageStorage();
  const itemAdapter = useItemAdapter();

  const { title, author } = inputs;

  const getFormIsValid = (inputs: Inputs) => {
    let formIsValid = true;

    for (const value of Object.values(inputs)) {
      if (typeof value === 'object') {
        formIsValid = formIsValid && value.isValid;
      }
    }

    return formIsValid;
  };

  const changeTitleHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const inputTitle = event.target.value;
    const titleIsValid = validate(inputTitle, [VALIDATOR_REQUIRE()]);

    const formIsValid = getFormIsValid({
      ...inputs,
      title: { ...title, isValid: titleIsValid },
    });

    setInputs((prevState) => ({
      ...prevState,
      title: {
        value: inputTitle,
        isValid: titleIsValid,
      },
      isValid: formIsValid,
    }));
  };

  const changeAuthorHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const inputAuthor = event.target.value;
    const authorIsValid = validate(inputAuthor, [VALIDATOR_REQUIRE()]);

    const formIsValid = getFormIsValid({
      ...inputs,
      author: { ...author, isValid: authorIsValid },
    });

    setInputs((prevState) => ({
      ...prevState,
      author: {
        value: inputAuthor,
        isValid: authorIsValid,
      },
      isValid: formIsValid,
    }));
  };

  const submitHandler = async (event: SyntheticEvent) => {
    event.preventDefault();

    if (!loginUser || !loginUser.items || !imageFile) {
      return;
    }

    try {
      // upload image
      const imageUrl = (await imageStorage.uploadImage(imageFile)) || '';
      if (!imageUrl) {
        return;
      }

      // update db
      const itemRes = await itemAdapter.createItem(
        title.value,
        author.value,
        imageUrl,
      );
      const newItem = itemRes.data.data.createItem;
      await itemAdapter.addUserItem(loginUser.id, newItem.id);

      // update state
      updateLoginUser({ ...loginUser, items: [...loginUser.items, newItem] });
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
        <Button title="Create" disabled={!inputs.isValid} />
      </form>
    </Fragment>
  );
};
