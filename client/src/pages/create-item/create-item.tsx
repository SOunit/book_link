import {
  ChangeEvent,
  Fragment,
  SyntheticEvent,
  useContext,
  useState,
} from 'react';
import { useHistory } from 'react-router-dom';
import { Button, Input } from '../../components/atoms';
import { SectionTitle } from '../../components/molecules';
import { itemServices } from '../../services';
import { AuthContext } from '../../store';
import classes from './create-item.module.css';

export const CreateItem = () => {
  const [inputs, setInputs] = useState({
    title: '',
    author: '',
    imageUrl: '',
  });
  const { title, author, imageUrl } = inputs;
  const history = useHistory();
  const { loginUser, setLoginUser } = useContext(AuthContext);

  const changeTitleHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setInputs((prevState) => ({ ...prevState, title: event.target.value }));
  };
  const changeAuthorHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setInputs((prevState) => ({ ...prevState, author: event.target.value }));
  };
  const changeImageUrlHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setInputs((prevState) => ({ ...prevState, imageUrl: event.target.value }));
  };
  const submitHandler = async (event: SyntheticEvent) => {
    if (!loginUser || !loginUser.items) {
      return;
    }

    event.preventDefault();
    console.log('submit', inputs);

    try {
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
        <Input
          placeholder="Title"
          value={title}
          onChange={changeTitleHandler}
          className={classes['create-item__form-input']}
        />
        <Input
          placeholder="Author"
          value={author}
          onChange={changeAuthorHandler}
          className={classes['create-item__form-input']}
        />
        <Input
          placeholder="ImageUrl"
          value={imageUrl}
          onChange={changeImageUrlHandler}
          className={classes['create-item__form-input']}
        />
        <Button title="Create" />
      </form>
    </Fragment>
  );
};
