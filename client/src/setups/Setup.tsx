import React, { useState, useEffect } from 'react';
import axios from 'axios';

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
      <form onSubmit={submitHandler}>
        <label htmlFor=''>Enter your index:</label>
        <input
          type='number'
          value={enteredIndex}
          onChange={indexChangedHandler}
        />
        <button>Submit</button>
      </form>
      {renderIndexes()}
    </div>
  );
};

export default Setup;
