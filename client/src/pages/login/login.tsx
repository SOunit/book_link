import { FC } from 'react';
import { SectionTitle } from '../../components/molecules';
import { GoogleAuth } from '../../components/organisms';
import classes from './login.module.css';

export const Login: FC = () => {
  return (
    <section className={classes.login}>
      <SectionTitle>Google Auth</SectionTitle>
      <GoogleAuth />
    </section>
  );
};
