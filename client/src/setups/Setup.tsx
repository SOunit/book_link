import { useState, useEffect } from 'react';

const Setup = () => {
  const [index, setIndex] = useState('');
  const [values, setValues] = useState<number[]>([]);

  useEffect(() => {
    setValues([0, 1, 2]);
  }, []);

  return <div>Setup</div>;
};

export default Setup;
