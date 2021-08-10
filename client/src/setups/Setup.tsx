import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Setup = () => {
  const [index, setIndex] = useState('');
  const [indexes, setIndexes] = useState<number[]>([]);

  const fetchData = async () => {
    let url = 'https://jsonplaceholder.typicode.com/posts';
    url = '/api/values/all';

    const result = await axios.get(url);
    console.log(result.data);

    setIndexes(result.data);
  };

  useEffect(() => {
    setIndexes([0, 1, 2, 3]);
    // fetchData();
  }, []);

  const submitHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('submit handler!');

    // await axios.post('/api/values', {
    //   index,
    // });

    // fetchData();

    setIndex('');
  };

  const changeIndexHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value);
    setIndex(e.target.value);
  };

  const renderIndexes = () => {
    const nums = indexes.map((index) => index).join(', ');
    return <div>{nums}</div>;
  };

  return (
    <div>
      <h1>Setup</h1>
      <form onSubmit={submitHandler}>
        <label htmlFor=''>Enter your index:</label>
        <input type='number' value={index} onChange={changeIndexHandler} />
        <button>Submit</button>
      </form>
      {renderIndexes()}
    </div>
  );
};

export default Setup;
