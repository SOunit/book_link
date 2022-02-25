import { FC } from 'react';
import GoogleAuth from '../components/organisms/googleAuth/GoogleAuth';
import SectionTitle from '../components/molecules/ui/SectionTitle/SectionTitle';
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
