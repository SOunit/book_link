import { FC } from 'react';
import classes from './Image.module.css';

type ImageProps = {
  src: string;
  alt: string;
};

const Image: FC<ImageProps> = (props) => {
  return <img src={props.src} alt={props.alt} className={classes.image} />;
};

export default Image;
