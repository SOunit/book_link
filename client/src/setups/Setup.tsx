import React, { useState, useEffect } from 'react';
import axios from 'axios';
import classes from './Setup.module.css';

const Setup = () => {
  const [enteredIndex, setEnteredIndex] = useState('');
  const [indexes, setIndexes] = useState<number[]>([]);

  const fetchData = async () => {
    let url = 'https://jsonplaceholder.typicode.com/posts';
    url = '/api/values/all';

    const result = await axios.get(url);

    const nums = result.data.map((num: { number: number }) => {
      return num.number;
    });

    setIndexes(nums);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const submitHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('submit handler!');

    await axios.post('/api/values', {
      index: enteredIndex,
    });

    fetchData();
    setEnteredIndex('');
  };

  const indexChangedHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEnteredIndex(e.target.value);
  };

  const renderIndexes = () => {
    const nums = indexes.map((indexNum) => indexNum).join(', ');
    return <div>{nums}</div>;
  };

  return (
    <div>
      <h1>Setup</h1>
      <form onSubmit={submitHandler} className={classes.form}>
        <label htmlFor='number' className={classes.form__label}>
          Enter your index:
        </label>
        <input
          id='number'
          type='number'
          value={enteredIndex}
          onChange={indexChangedHandler}
          className={classes.form__input}
        />
        <button className={classes.form__button}>Submit</button>
      </form>
      <h2>Numbers</h2>
      {renderIndexes()}
    </div>
  );
};

export default Setup;
