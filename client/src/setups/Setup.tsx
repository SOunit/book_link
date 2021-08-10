import { useState, useEffect } from 'react';
import axios from 'axios';

const Setup = () => {
  const [index, setIndex] = useState('');
  const [values, setValues] = useState<number[]>([]);

  const fetchData = async () => {
    const result = await axios.get(
      'https://jsonplaceholder.typicode.com/posts'
    );
    console.log(result.data);
  };

  useEffect(() => {
    setValues([0, 1, 2]);
    fetchData();
  }, []);

  return <div>Setup</div>;
};

export default Setup;
