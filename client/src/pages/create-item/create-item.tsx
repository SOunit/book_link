import { ChangeEvent, SyntheticEvent, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Button, Input } from '../../components/atoms';
import classes from './create-item.module.css';

export const CreateItem = () => {
  const [inputs, setInputs] = useState({
    title: '',
    author: '',
    imageUrl: '',
  });
  const { title, author, imageUrl } = inputs;
  const history = useHistory();

  const changeTitleHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setInputs((prevState) => ({ ...prevState, title: event.target.value }));
  };
  const changeAuthorHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setInputs((prevState) => ({ ...prevState, author: event.target.value }));
  };
  const changeImageUrlHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setInputs((prevState) => ({ ...prevState, imageUrl: event.target.value }));
  };
  const submitHandler = (event: SyntheticEvent) => {
    event.preventDefault();
    console.log('submit', inputs);
    history.push('/home');
  };

  return (
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
  );
};
