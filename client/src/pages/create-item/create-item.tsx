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
import classes from './create-item.module.css';

type Inputs = {
  title: string;
  author: string;
};

export const CreateItem: FC = () => {
  const [inputs, setInputs] = useState<Inputs>({
    title: '',
    author: '',
  });
  const [imageFile, setImageFile] = useState<File>();
  const { title, author } = inputs;
  const history = useHistory();
  const { loginUser, setLoginUser } = useContext(AuthContext);
  const { uploadImageToS3 } = useAwsS3();

  const changeTitleHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setInputs((prevState) => ({ ...prevState, title: event.target.value }));
  };
  const changeAuthorHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setInputs((prevState) => ({ ...prevState, author: event.target.value }));
  };
  const submitHandler = async (event: SyntheticEvent) => {
    if (!loginUser || !loginUser.items || !imageFile) {
      return;
    }

    event.preventDefault();

    try {
      // upload image
      const imageUrl = await uploadImageToS3(imageFile);
      if (!imageUrl) {
        return;
      }

      // update db
      const itemRes = await itemServices.createItem(title, author, imageUrl);
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
          initialValue={title}
          onChange={changeTitleHandler}
          className={classes['create-item__form-input']}
          errorMessage="Please put valid title."
        />
        <ValidateInput
          placeholder="Author"
          initialValue={author}
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
