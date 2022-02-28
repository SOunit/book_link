import { FC } from 'react';
import { DemoAuth, GoogleAuth } from '../../components/organisms';
import classes from './login.module.css';

export const Login: FC = () => {
  return (
    <section className={classes.login}>
      <GoogleAuth className={classes['google-auth-button']} />
      <DemoAuth className={classes['demo-auth-button']} />
    </section>
  );
};
