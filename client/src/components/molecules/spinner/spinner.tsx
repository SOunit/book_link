import { FC } from 'react';
import ClipLoader from 'react-spinners/ClipLoader';
import classes from './spinner.module.css';

type Props = {
  className?: string;
};

export const Spinner: FC<Props> = ({ className }) => {
  return (
    <div className={`${classes['spinner-wrap']} ${className}`}>
      <ClipLoader color="#fff" />
    </div>
  );
};
