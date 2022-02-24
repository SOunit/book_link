import { FC } from 'react';
import classes from './image.module.css';

type Props = {
  src: string;
  alt: string;
  className?: string;
  imageStyle?: string;
};

const Image: FC<Props> = ({ src, alt, className, imageStyle }) => {
  return (
    <div className={`${classes['image-container']} ${className}`}>
      <img
        className={`${classes['image']} ${imageStyle}`}
        src={src}
        alt={alt}
      />
    </div>
  );
};

export default Image;
