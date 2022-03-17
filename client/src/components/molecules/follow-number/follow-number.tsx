import { FC, Fragment } from 'react';
import classes from './follow-number.module.scss';

type Props = {
  followCount: number;
  unitTitle: string;
};

export const FollowNumber: FC<Props> = ({ followCount, unitTitle }) => {
  return (
    <Fragment>
      <span className={classes['follow-number']}>{followCount}</span>{' '}
      {unitTitle}
    </Fragment>
  );
};
