import { Link } from 'react-router-dom';

export default () => {
  return (
    <div>
      I'm other page!
      <Link to='/'>Go back home</Link>
    </div>
  );
};
