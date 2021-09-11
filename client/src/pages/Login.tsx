import { FC } from 'react';
import GoogleAuth from '../components/googleAuth/GoogleAuth';
import SectionTitle from '../components/ui/SectionTitle/SectionTitle';
import classes from './Login.module.css';

const Login: FC = () => {
  return (
    <section className={classes.login}>
      <SectionTitle>Google Auth</SectionTitle>
      <GoogleAuth />
    </section>
  );
};

export default Login;
