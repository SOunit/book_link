import React, { useState, useEffect } from 'react';
import axios from 'axios';
import classes from './Setup.module.css';

const Setup = () => {
  const [enteredIndex, setEnteredIndex] = useState('');
  const [indexes, setIndexes] = useState<number[]>([]);

  const url = '/api/graphql';

  const fetchData = async () => {
    const graphqlQuery = {
      query: `
        query {
          values
        }
      `,
    };

    const result = await axios({ url, method: 'POST', data: graphqlQuery });
    setIndexes(result.data.data.values);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const submitHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('submit handler!');

    const graphqlQuery = {
      query: `
        mutation {
          createValue(value: ${enteredIndex})
        }
      `,
    };

    const result = await axios({ url, method: 'POST', data: graphqlQuery });
    console.log(result);

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
