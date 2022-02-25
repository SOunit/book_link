import { FC } from 'react';
import Image from './Image';
import classes from './ImageContainer.module.css';

type ImageContainerProps = {
  src: string;
  alt: string;
};

const ImageContainer: FC<ImageContainerProps> = (props) => {
  return (
    <div className={classes['image-container']}>
      <Image src={props.src} alt={props.alt} />
    </div>
  );
};

export default ImageContainer;
