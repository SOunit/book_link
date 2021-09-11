import { FC } from 'react';
import classes from './SectionTitle.module.css';

const SectionTitle: FC = (props) => {
  return <h2 className={classes['section-title']}>{props.children}</h2>;
};

export default SectionTitle;
