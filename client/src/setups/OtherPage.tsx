import { Link } from 'react-router-dom';

const OtherPage = () => {
  return (
    <div>
      <h1>I'm an other page!</h1>
      <Link to='/'>Go back home</Link>
    </div>
  );
};

export default OtherPage;
