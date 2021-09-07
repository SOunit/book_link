import { FC } from 'react';
import GoogleAuth from '../components/googleAuth/GoogleAuth';
import classes from './Login.module.css';

const Login: FC = () => {
  return (
    <section className={classes.login}>
      <h2>Google Auth</h2>
      <GoogleAuth />
    </section>
  );
};

export default Login;
